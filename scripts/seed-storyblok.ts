/**
 * Fills existing Storyblok stories with content from the i18n locale files.
 *
 * Run:  npx tsx scripts/seed-storyblok.ts
 *
 * Safe to re-run any time – it only updates story content, never touches
 * component schemas or creates/deletes stories.
 * Stories must already exist (run migrate-to-storyblok.ts first).
 */

import ruMessages from '../i18n/locales/ru.ts'
import kzMessages from '../i18n/locales/kz.ts'
import { transformLocaleToStory } from '../app/utils/storyblok.ts'

const PAT  = process.env.STORYBLOK_MANAGEMENT_TOKEN ?? 'sb_pat_fsFb2QcEYZWihLU67UTaeaUL7-SzOo6_1mOUoOxpbB8'
const BASE = 'https://mapi.storyblok.com/v1'

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

const STORIES = [
  { slug: 'site-content-kz', name: 'Site Content (KZ)', messages: kzMessages },
  { slug: 'site-content-ru', name: 'Site Content (RU)', messages: ruMessages },
]

async function main() {
  console.log('🔑 Using PAT:', PAT.slice(0, 6) + '…')

  const { spaces } = await mapi('GET', '/spaces')
  if (!spaces?.length) throw new Error('No spaces found.')
  const spaceId: number = spaces[0].id
  console.log(`\n📦 Space: ${spaces[0].name} (${spaceId})\n`)

  for (const { slug, name, messages } of STORIES) {
    const content = transformLocaleToStory(messages as any)

    await sleep(250)
    const res = await mapi('GET', `/spaces/${spaceId}/stories?with_slug=${slug}`)
    const storyId: number | undefined = res.stories?.[0]?.id

    if (!storyId) {
      console.log(`   ✗ ${slug} not found – run migrate-to-storyblok.ts first`)
      continue
    }

    await sleep(250)
    await mapi('PUT', `/spaces/${spaceId}/stories/${storyId}`, {
      story: { name, slug, content },
      publish: 1,
    })
    console.log(`   ✓ ${slug} seeded + published`)
  }

  console.log('\n✅ Done!')
}

main().catch(e => { console.error('❌', e.message) })
