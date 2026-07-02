import { expect, test } from '@playwright/test'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs'
import { dirname, isAbsolute, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

type Viewport = {
  width: number
  height: number
}

type MatrixItem = {
  id: string
  candidate: string
  state: string
  artifact_role: string
  viewport: Viewport
  output: string
  selected?: boolean
  query?: string
  url?: string
  full_page?: boolean
  ready_selector?: string
  wait_ms?: number
}

type CaptureManifest = {
  goal_slug: string
  run_slug: string
  source: string
  matrix: MatrixItem[]
}

const repoRoot = process.cwd()

function resolveFromRepo(value: string) {
  return isAbsolute(value) ? value : resolve(repoRoot, value)
}

function resolveFromManifest(manifestPath: string, value: string) {
  return isAbsolute(value) ? value : resolve(dirname(manifestPath), value)
}

function findManifestPaths() {
  const fromEnv = process.env.REFERENCE_CAPTURE_MANIFEST

  if (fromEnv) {
    return fromEnv
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map(resolveFromRepo)
  }

  const root = resolve(repoRoot, 'docs/goals')
  const results: string[] = []

  function walk(dir: string) {
    if (!existsSync(dir)) return

    for (const entry of readdirSync(dir)) {
      const absolute = resolve(dir, entry)
      const stat = statSync(absolute)

      if (stat.isDirectory()) {
        walk(absolute)
        continue
      }

      if (entry === 'capture-manifest.json') {
        results.push(absolute)
      }
    }
  }

  walk(root)
  return results
}

function readManifest(manifestPath: string): CaptureManifest {
  const parsed = JSON.parse(readFileSync(manifestPath, 'utf8')) as CaptureManifest

  if (!parsed.goal_slug || !parsed.run_slug || !parsed.source || !Array.isArray(parsed.matrix)) {
    throw new Error(`Invalid capture manifest: ${manifestPath}`)
  }

  return parsed
}

function buildTargetUrl(manifest: CaptureManifest, item: MatrixItem) {
  if (item.url) return item.url

  const sourcePath = resolveFromRepo(manifest.source)
  const baseUrl = pathToFileURL(sourcePath).href
  const query = item.query ?? `?candidate=${encodeURIComponent(item.candidate)}`

  return query ? `${baseUrl}${query.startsWith('?') ? query : `?${query}`}` : baseUrl
}

function readPngSize(filePath: string) {
  const buffer = readFileSync(filePath)
  const signature = buffer.subarray(0, 8).toString('hex')

  if (signature !== '89504e470d0a1a0a') {
    throw new Error(`Not a PNG file: ${filePath}`)
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

const manifests = findManifestPaths()

if (manifests.length === 0) {
  throw new Error('No capture-manifest.json files found under docs/goals')
}

for (const manifestPath of manifests) {
  const manifest = readManifest(manifestPath)

  test.describe(`${manifest.goal_slug}/${manifest.run_slug}`, () => {
    for (const item of manifest.matrix) {
      test(item.id, async ({ page }) => {
        const outputPath = resolveFromManifest(manifestPath, item.output)

        mkdirSync(dirname(outputPath), { recursive: true })
        await page.setViewportSize(item.viewport)
        await page.goto(buildTargetUrl(manifest, item), { waitUntil: 'domcontentloaded' })
        await page.locator('body').waitFor({ state: 'visible' })

        if (item.ready_selector) {
          await page.locator(item.ready_selector).waitFor({ state: 'visible' })
        }

        await page.evaluate(() => (document.fonts ? document.fonts.ready.then(() => undefined) : undefined))
        await page.waitForTimeout(item.wait_ms ?? 100)
        await page.screenshot({
          path: outputPath,
          fullPage: item.full_page ?? false,
          scale: 'css',
        })

        expect(existsSync(outputPath)).toBe(true)

        const size = readPngSize(outputPath)
        expect(size.width).toBe(item.viewport.width)

        if (!item.full_page) {
          expect(size.height).toBe(item.viewport.height)
        }
      })
    }
  })
}
