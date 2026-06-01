/**
 * Seeds existing Storyblok stories with content from i18n locale files.
 * Safe to re-run any time – always overwrites story content.
 *
 * Run:  npx tsx scripts/seed-storyblok.ts
 *
 * Configure in:  scripts/storyblok.config.ts
 */

import config from './storyblok.config.ts'
import { transformLocaleToStory, setSiteUrl } from '../app/utils/storyblok.ts'

setSiteUrl(config.siteUrl)

const PAT  = config.pat
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

async function main() {
  console.log('🔑 Using PAT:', PAT.slice(0, 6) + '…')

  const { spaces } = await mapi('GET', '/spaces')
  if (!spaces?.length) throw new Error('No spaces found.')
  const spaceId: number = spaces[0].id
  console.log(`\n📦 Space: ${spaces[0].name} (${spaceId})\n`)

  for (const { slug, name, messages } of config.stories) {
    const content = transformLocaleToStory(messages)

    await sleep(250)
    const res = await mapi('GET', `/spaces/${spaceId}/stories?with_slug=${slug}`)
    const storyId: number | undefined = res.stories?.[0]?.id

    if (!storyId) {
      console.log(`   ✗ ${slug} not found – run migrate-to-storyblok.ts first`)
      continue
    }

    await sleep(250)
    await mapi('PUT', `/spaces/${spaceId}/stories/${storyId}`, {
      story: { name, slug, content }, publish: 1,
    })
    console.log(`   ✓ ${slug} seeded + published`)
  }

  console.log('\n✅ Done!')
}

main().catch(e => { console.error('❌', e.message) })
