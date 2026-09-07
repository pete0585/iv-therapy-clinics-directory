/** Public origin used for sitemap URLs and absolute canonicals. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ivtherapyclinicfinder.com'
).replace(/\/$/, '')

export function cityPageCanonical(folder: string): string {
  return `${SITE_URL}/best/${folder}`
}
