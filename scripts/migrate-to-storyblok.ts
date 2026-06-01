/**
 * One-shot Storyblok migration script.
 * Creates component schemas and empty stories.
 *
 * Run:  npx tsx scripts/migrate-to-storyblok.ts
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

// ─── Nested component definitions ─────────────────────────────────────────

const NESTED_COMPONENTS = [
  {
    name: 'image_item',
    display_name: 'Image Item',
    is_nestable: true,
    schema: {
      src: { type: 'asset', filetypes: ['images'], pos: 0 },
      alt: { type: 'text', pos: 1 },
    },
  },
  {
    name: 'text_item',
    display_name: 'Text Item',
    is_nestable: true,
    schema: { text: { type: 'text', pos: 0 } },
  },
  {
    name: 'qa_item',
    display_name: 'Q&A Item',
    is_nestable: true,
    schema: {
      q: { type: 'text', display_name: 'Question', pos: 0 },
      a: { type: 'textarea', display_name: 'Answer', pos: 1 },
    },
  },
  {
    name: 'link_item',
    display_name: 'Link Item',
    is_nestable: true,
    schema: {
      label: { type: 'text', pos: 0 },
      href:  { type: 'text', pos: 1 },
    },
  },
  {
    name: 'service_item',
    display_name: 'Service Item',
    is_nestable: true,
    schema: {
      title:       { type: 'text',     pos: 0 },
      description: { type: 'textarea', pos: 1 },
    },
  },
  {
    name: 'accommodation_option',
    display_name: 'Accommodation Option',
    is_nestable: true,
    schema: {
      title:       { type: 'text',     pos: 0 },
      subtitle:    { type: 'text',     pos: 1 },
      description: { type: 'textarea', pos: 2 },
    },
  },
]

// ─── Schema builder ────────────────────────────────────────────────────────

function camelToSnake(s: string): string {
  return s.replace(/([A-Z])/g, (c) => `_${c.toLowerCase()}`)
}
function encodeField(prefix: string, key: string): string {
  const snakeKey = camelToSnake(key)
  return prefix ? `${prefix}__${snakeKey}` : snakeKey
}

const IMAGE_EXT = /\.(webp|jpg|jpeg|png|gif|svg)$/i

function buildSiteContentSchema(messages: Record<string, any>): Record<string, any> {
  const schema: Record<string, any> = {}
  let pos = 0

  function walk(obj: Record<string, any>, prefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const field = encodeField(prefix, key)

      if (typeof value === 'string') {
        if (IMAGE_EXT.test(value)) {
          schema[field] = { type: 'asset', filetypes: ['images'], pos: pos++ }
        } else {
          schema[field] = { type: value.length > 80 ? 'textarea' : 'text', pos: pos++ }
        }
      } else if (Array.isArray(value)) {
        if (value.length === 0 || typeof value[0] === 'string') {
          schema[field] = { type: 'bloks', restrict_components: true, component_whitelist: ['text_item'], pos: pos++ }
        } else if ('src' in value[0] && 'alt' in value[0]) {
          schema[field] = { type: 'bloks', restrict_components: true, component_whitelist: ['image_item'], pos: pos++ }
        } else if ('q' in value[0]) {
          schema[field] = { type: 'bloks', restrict_components: true, component_whitelist: ['qa_item'], pos: pos++ }
        } else if ('label' in value[0]) {
          schema[field] = { type: 'bloks', restrict_components: true, component_whitelist: ['link_item'], pos: pos++ }
        } else if ('subtitle' in value[0]) {
          schema[field] = { type: 'bloks', restrict_components: true, component_whitelist: ['accommodation_option'], pos: pos++ }
        } else if ('title' in value[0]) {
          schema[field] = { type: 'bloks', restrict_components: true, component_whitelist: ['service_item'], pos: pos++ }
        }
      } else if (value && typeof value === 'object') {
        walk(value as Record<string, any>, field)
      }
    }
  }

  walk(messages, '')
  return schema
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔑 Using PAT:', PAT.slice(0, 6) + '…')

  const { spaces } = await mapi('GET', '/spaces')
  if (!spaces?.length) throw new Error('No spaces found. Create a space at app.storyblok.com first.')
  const spaceId: number = spaces[0].id
  await sleep(200)

  const { space } = await mapi('GET', `/spaces/${spaceId}`)
  const previewToken: string = space.first_token ?? space.api_token ?? '(not found)'
  console.log(`\n📦 Space: "${space.name}" (${spaceId})`)
  console.log(`\n🔐 Preview token: ${previewToken}`)
  console.log('   → Copy to .env as STORYBLOK_TOKEN and NUXT_PUBLIC_STORYBLOK_TOKEN\n')

  console.log('🧩 Creating nested components…')
  for (const comp of NESTED_COMPONENTS) {
    await sleep(200)
    try {
      await mapi('POST', `/spaces/${spaceId}/components`, { component: comp })
      console.log(`   ✓ ${comp.name}`)
    } catch {
      console.log(`   ~ ${comp.name} (already exists)`)
    }
  }

  console.log('\n🗂  Creating site_content component…')
  const schema = buildSiteContentSchema(config.stories[0]!.messages)
  await sleep(200)
  try {
    await mapi('POST', `/spaces/${spaceId}/components`, {
      component: { name: 'site_content', display_name: 'Site Content', is_nestable: false, schema },
    })
    console.log('   ✓ site_content')
  } catch {
    await sleep(200)
    try {
      const { components } = await mapi('GET', `/spaces/${spaceId}/components`)
      const existing = components?.find((c: any) => c.name === 'site_content')
      if (existing) {
        await sleep(200)
        await mapi('PUT', `/spaces/${spaceId}/components/${existing.id}`, {
          component: { ...existing, schema },
        })
        console.log('   ~ site_content (updated)')
      }
    } catch (e) {
      console.log('   ~ site_content (skipped):', (e as Error).message)
    }
  }

  console.log('\n📝 Creating stories…')
  for (const { slug, name, path, messages } of config.stories) {
    const content = transformLocaleToStory(messages)

    await sleep(250)
    let storyId: number | null = null
    try {
      const res = await mapi('GET', `/spaces/${spaceId}/stories?with_slug=${slug}`)
      storyId = res.stories?.[0]?.id ?? null
    } catch { /* not found */ }

    await sleep(250)
    if (storyId) {
      console.log(`   ~ ${slug} (already exists – run seed-storyblok.ts to update content)`)
      continue
    }

    const { story } = await mapi('POST', `/spaces/${spaceId}/stories`, {
      story: { name, slug, content, real_path: path }, publish: 1,
    })
    console.log(`   ✓ ${story.slug} (created + published)`)
  }

  console.log('\n✅ Migration complete!')
  console.log('\n🔐 Add to .env:')
  console.log(`   STORYBLOK_TOKEN=${previewToken}`)
  console.log(`   NUXT_PUBLIC_STORYBLOK_TOKEN=${previewToken}`)
}

main().catch(e => { console.error('❌', e.message) })
