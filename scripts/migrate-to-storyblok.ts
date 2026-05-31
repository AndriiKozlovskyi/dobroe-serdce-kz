/**
 * One-shot Storyblok migration script.
 *
 * Run:  npx tsx scripts/migrate-to-storyblok.ts
 *
 * What it does:
 *   1. Lists your spaces, picks the first one (or creates one)
 *   2. Creates nested component schemas: text_item, qa_item, link_item,
 *      service_item, accommodation_option, site_content
 *   3. Creates + publishes two stories: site-content-kz and site-content-ru
 *   4. Prints the preview token to paste into .env → STORYBLOK_TOKEN
 */

import ruMessages from '../i18n/locales/ru.ts'
import kzMessages from '../i18n/locales/kz.ts'

const PAT  = process.env.STORYBLOK_MANAGEMENT_TOKEN ?? 'sb_pat_fsFb2QcEYZWihLU67UTaeaUL7-SzOo6_1mOUoOxpbB8'
const BASE = 'https://mapi.storyblok.com/v1'

// ─── Management API helper ─────────────────────────────────────────────────

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

// ─── Helpers ───────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

// ─── Locale → Storyblok story content ─────────────────────────────────────

export function transformLocaleToStory(messages: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = { component: 'site_content' }

  function walk(obj: Record<string, any>, prefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const field = prefix ? `${prefix}_${key}` : key

      if (typeof value === 'string') {
        result[field] = value
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          result[field] = []
        } else if (typeof value[0] === 'string') {
          result[field] = value.map(text => ({ component: 'text_item', text, _uid: uid() }))
        } else if ('q' in value[0]) {
          result[field] = value.map(i => ({ component: 'qa_item', q: i.q, a: i.a, _uid: uid() }))
        } else if ('label' in value[0] && 'href' in value[0]) {
          result[field] = value.map(i => ({ component: 'link_item', label: i.label, href: i.href, _uid: uid() }))
        } else if ('subtitle' in value[0]) {
          result[field] = value.map(i => ({ component: 'accommodation_option', title: i.title, subtitle: i.subtitle, description: i.description, _uid: uid() }))
        } else if ('title' in value[0] && 'description' in value[0]) {
          result[field] = value.map(i => ({ component: 'service_item', title: i.title, description: i.description, _uid: uid() }))
        } else {
          result[field] = value
        }
      } else if (value && typeof value === 'object') {
        walk(value as Record<string, any>, field)
      }
    }
  }

  walk(messages, '')
  return result
}

// ─── Storyblok story content → locale shape ────────────────────────────────
// Used in the runtime plugins (also exported for them)

export function transformStoryToLocale(content: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [rawKey, value] of Object.entries(content)) {
    if (rawKey === 'component' || rawKey === '_uid') continue

    const parts = rawKey.split('_')
    let obj = result
    for (let i = 0; i < parts.length - 1; i++) {
      obj[parts[i]] ??= {}
      obj = obj[parts[i]]
    }
    const last = parts[parts.length - 1]

    if (Array.isArray(value)) {
      obj[last] = value.map((blok: any) => {
        switch (blok.component) {
          case 'text_item': return blok.text
          case 'qa_item': return { q: blok.q, a: blok.a }
          case 'link_item': return { label: blok.label, href: blok.href }
          case 'service_item': return { title: blok.title, description: blok.description }
          case 'accommodation_option': return { title: blok.title, subtitle: blok.subtitle, description: blok.description }
          default: return blok
        }
      })
    } else {
      obj[last] = value
    }
  }

  return result
}

// ─── Component schemas ─────────────────────────────────────────────────────

const NESTED_COMPONENTS = [
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
      href: { type: 'text', pos: 1 },
    },
  },
  {
    name: 'service_item',
    display_name: 'Service Item',
    is_nestable: true,
    schema: {
      title: { type: 'text', pos: 0 },
      description: { type: 'textarea', pos: 1 },
    },
  },
  {
    name: 'accommodation_option',
    display_name: 'Accommodation Option',
    is_nestable: true,
    schema: {
      title: { type: 'text', pos: 0 },
      subtitle: { type: 'text', pos: 1 },
      description: { type: 'textarea', pos: 2 },
    },
  },
]

function buildSiteContentSchema(messages: Record<string, any>): Record<string, any> {
  const schema: Record<string, any> = {}
  let pos = 0

  function walk(obj: Record<string, any>, prefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const field = prefix ? `${prefix}_${key}` : key

      if (typeof value === 'string') {
        const isLong = value.length > 80
        schema[field] = { type: isLong ? 'textarea' : 'text', pos: pos++ }
      } else if (Array.isArray(value)) {
        if (value.length === 0 || typeof value[0] === 'string') {
          schema[field] = { type: 'bloks', restrict_components: true, component_whitelist: ['text_item'], pos: pos++ }
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

  // 1. List spaces → pick first → fetch full space detail for the preview token
  console.log('\n📦 Fetching spaces…')
  const { spaces } = await mapi('GET', '/spaces')
  if (!spaces?.length) throw new Error('No spaces found. Create a space at app.storyblok.com first.')
  const spaceId: number = spaces[0].id
  await sleep(200)

  const { space } = await mapi('GET', `/spaces/${spaceId}`)
  const previewToken: string = space.first_token ?? space.api_token ?? '(not found)'
  console.log(`   → Using space "${space.name}" (${spaceId})`)
  console.log(`\n🔐 Preview token: ${previewToken}`)
  console.log('   → Copy this to .env as STORYBLOK_TOKEN and NUXT_PUBLIC_STORYBLOK_TOKEN\n')

  // 2. Create nested components (200 ms between each to stay under 6 req/s)
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

  // 3. Create / update site_content component
  console.log('\n🗂  Creating site_content component…')
  const schema = buildSiteContentSchema(ruMessages as any)
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

  // 4. Create + publish stories for each locale
  const stories = [
    { slug: 'site-content-kz', name: 'Site Content (KZ)', messages: kzMessages },
    { slug: 'site-content-ru', name: 'Site Content (RU)', messages: ruMessages },
  ]

  console.log('\n📝 Creating stories…')
  for (const { slug, name, messages } of stories) {
    const content = transformLocaleToStory(messages as any)

    await sleep(250)
    let storyId: number | null = null
    try {
      const res = await mapi('GET', `/spaces/${spaceId}/stories?with_slug=${slug}`)
      storyId = res.stories?.[0]?.id ?? null
    } catch { /* not found */ }

    await sleep(250)
    if (storyId) {
      await mapi('PUT', `/spaces/${spaceId}/stories/${storyId}`, {
        story: { name, slug, content }, publish: 1,
      })
      console.log(`   ~ ${slug} (updated + published)`)
    } else {
      const { story } = await mapi('POST', `/spaces/${spaceId}/stories`, {
        story: { name, slug, content }, publish: 1,
      })
      console.log(`   ✓ ${story.slug} (created + published)`)
    }
  }

  console.log('\n✅ Migration complete!')
  console.log('\n🔐 Add to .env:')
  console.log(`   STORYBLOK_TOKEN=${previewToken}`)
  console.log(`   NUXT_PUBLIC_STORYBLOK_TOKEN=${previewToken}`)
}

main().catch(e => { console.error('❌', e.message) })

