/**
 * Uploads local public/ images to Storyblok's asset library,
 * then re-seeds stories with the real Storyblok CDN URLs.
 *
 * Run:  npx tsx scripts/upload-images.ts
 *
 * Configure in:  scripts/storyblok.config.ts
 */

import { readFile } from 'node:fs/promises'
import { join, basename } from 'node:path'
import config from './storyblok.config.ts'
import { transformLocaleToStory, setSiteUrl } from '../app/utils/storyblok.ts'

setSiteUrl(config.siteUrl)

const PAT    = config.pat
const BASE   = 'https://mapi.storyblok.com/v1'
const PUBLIC = join(process.cwd(), 'public')

async function mapi(method: string, path: string, body?: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: PAT, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json() as any
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(json)}`)
  return json
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

type SbAsset = { id: number, filename: string, name: string, alt: string }

async function uploadImage(spaceId: number, localPath: string): Promise<SbAsset> {
  const name   = basename(localPath)
  const buffer = await readFile(join(PUBLIC, localPath))
  const ext    = name.split('.').pop()?.toLowerCase()
  const mime   = ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg'

  const signed = await mapi('POST', `/spaces/${spaceId}/assets`, {
    filename: name, size: buffer.byteLength, content_type: mime,
  })

  const form = new FormData()
  for (const [k, v] of Object.entries(signed.fields as Record<string, string>)) form.append(k, v)
  form.append('file', new Blob([buffer], { type: mime }), name)

  const s3 = await fetch(signed.post_url, { method: 'POST', body: form })
  if (!s3.ok && s3.status !== 204) throw new Error(`S3 upload failed: ${s3.status}`)

  return { id: signed.id, filename: signed.pretty_url, name, alt: '' }
}

function patchImages(messages: Record<string, any>, assetMap: Map<string, SbAsset>): Record<string, any> {
  return JSON.parse(JSON.stringify(messages), (_key, value) => {
    if (typeof value === 'string' && assetMap.has(value)) return assetMap.get(value)
    return value
  })
}

async function main() {
  console.log('🔑 Using PAT:', PAT.slice(0, 6) + '…')

  const { spaces } = await mapi('GET', '/spaces')
  const spaceId: number = spaces[0].id
  console.log(`\n📦 Space: ${spaces[0].name} (${spaceId})\n`)

  const { assets } = await mapi('GET', `/spaces/${spaceId}/assets?per_page=100`)
  const existing = new Map<string, SbAsset>(
    (assets as Array<{ id: number, filename: string }> ?? []).map(a => [
      basename(a.filename),
      { id: a.id, filename: a.filename, name: basename(a.filename), alt: '' },
    ])
  )

  const assetMap = new Map<string, SbAsset>()

  console.log('🖼  Uploading images…')
  for (const localPath of config.images) {
    const name = basename(localPath)
    await sleep(300)

    if (existing.has(name)) {
      const asset = existing.get(name)!
      assetMap.set(localPath, asset)
      console.log(`   ~ ${name} (already in library)`)
    } else {
      try {
        const asset = await uploadImage(spaceId, localPath)
        assetMap.set(localPath, asset)
        console.log(`   ✓ ${name} → id=${asset.id}`)
      } catch (e) {
        console.error(`   ✗ ${name}: ${(e as Error).message}`)
      }
    }
  }

  console.log('\n📝 Re-seeding stories with Storyblok CDN URLs…')
  for (const { slug, name, path, messages } of config.stories) {
    const content = transformLocaleToStory(patchImages(messages, assetMap))

    await sleep(300)
    const res = await mapi('GET', `/spaces/${spaceId}/stories?with_slug=${slug}`)
    const storyId: number | undefined = res.stories?.[0]?.id
    if (!storyId) { console.log(`   ✗ ${slug} not found`); continue }

    await sleep(300)
    await mapi('PUT', `/spaces/${spaceId}/stories/${storyId}`, {
      story: { name, slug, content, real_path: path }, publish: 1,
    })
    console.log(`   ✓ ${slug} updated`)
  }

  console.log('\n✅ Done! Images now show in the Storyblok editor.')
}

main().catch(e => { console.error('❌', e.message) })
