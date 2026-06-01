function camelToSnake(s: string): string {
  return s.replace(/([A-Z])/g, (c) => `_${c.toLowerCase()}`)
}

function snakeToCamel(s: string): string {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

// Nesting separator: __ (double underscore). Within each segment: snake_case.
// e.g. app.callAria → app__call_aria,  seo.default.title → seo__default__title
function encodeField(prefix: string, key: string): string {
  const snakeKey = camelToSnake(key)
  return prefix ? `${prefix}__${snakeKey}` : snakeKey
}

function uid(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

const IMAGE_EXT = /\.(webp|jpg|jpeg|png|gif|svg)$/i

let SITE_URL = ''
export function setSiteUrl(url: string) { SITE_URL = url }

type SbAsset = { id: number | null, filename: string, name: string, alt: string, fieldtype: string, title: string, focus: string, copyright: string, is_external_url: boolean }

function toAsset(src: string | SbAsset): SbAsset {
  if (typeof src === 'object' && 'filename' in src) {
    return { ...src, fieldtype: 'asset', title: src.title || '', focus: src.focus || '', copyright: src.copyright || '', is_external_url: false }
  }
  const filename = src.startsWith('/') ? `${SITE_URL}${src}` : src
  return { id: null, filename, name: '', alt: '', fieldtype: 'asset', title: '', focus: '', copyright: '', is_external_url: false }
}

export function transformLocaleToStory(messages: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = { component: 'site_content' }

  function walk(obj: Record<string, any>, prefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const field = encodeField(prefix, key)

      if (typeof value === 'string') {
        result[field] = IMAGE_EXT.test(value) ? toAsset(value) : value
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          result[field] = []
        } else if (typeof value[0] === 'string') {
          result[field] = value.map(text => ({ component: 'text_item', text, _uid: uid() }))
        } else if ('q' in value[0]) {
          result[field] = value.map(i => ({ component: 'qa_item', q: i.q, a: i.a, _uid: uid() }))
        } else if ('src' in value[0] && 'alt' in value[0]) {
          result[field] = value.map(i => ({ component: 'image_item', src: toAsset(i.src), alt: i.alt, _uid: uid() }))
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
        if ('filename' in value) {
          result[field] = toAsset(value as SbAsset)  // ensure fieldtype is set
        } else {
          walk(value as Record<string, any>, field)
        }
      }
    }
  }

  walk(messages, '')
  return result
}

export function transformStoryToLocale(content: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [rawKey, value] of Object.entries(content)) {
    if (rawKey.startsWith('_') || rawKey === 'component') continue

    // Split on __ for nesting, convert each segment back to camelCase
    const parts = rawKey.split('__').map(snakeToCamel)
    let obj = result
    for (const part of parts.slice(0, -1)) {
      obj[part] ??= {}
      obj = obj[part]
    }
    const last = parts.at(-1)!

    if (Array.isArray(value)) {
      obj[last] = value.map((blok: any) => {
        switch (blok.component) {
          case 'text_item':            return blok.text
          case 'qa_item':              return { q: blok.q, a: blok.a }
          case 'image_item':           return { src: blok.src?.filename ?? blok.src, alt: blok.alt }
          case 'link_item':            return { label: blok.label, href: blok.href }
          case 'service_item':         return { title: blok.title, description: blok.description }
          case 'accommodation_option': return { title: blok.title, subtitle: blok.subtitle, description: blok.description }
          default:                     return blok
        }
      })
    } else if (value && typeof value === 'object' && 'filename' in value) {
      // Storyblok asset field → extract CDN URL
      obj[last] = (value as { filename: string }).filename
    } else {
      obj[last] = value
    }
  }

  return result
}
