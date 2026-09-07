import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const CITY_PAGE_PREFIX = 'iv-therapy-clinics-'

/** Folders under app/best that are static city pages (have page.tsx). */
export function discoverCityPageFolders(): string[] {
  const bestDir = join(process.cwd(), 'app', 'best')
  if (!existsSync(bestDir)) return []

  return readdirSync(bestDir, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory()) return false
      if (!entry.name.startsWith(CITY_PAGE_PREFIX)) return false
      return existsSync(join(bestDir, entry.name, 'page.tsx'))
    })
    .map((entry) => entry.name)
    .sort()
}
