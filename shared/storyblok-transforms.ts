// camelCase ↔ snake_case helpers
function camelToSnake(s: string): string {
  return s.replace(/([A-Z])/g, (c) => `_${c.toLowerCase()}`)
}

function snakeToCamel(s: string): string {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

// Nesting levels separated by __ (double underscore).
// camelCase converted to snake_case within each segment.
// e.g. app.callAria → app__call_aria,  seo.default.title → seo__default__title
function encodeField(prefix: string, key: string): string {
  const snakeKey = camelToSnake(key)
  return prefix ? `${prefix}__${snakeKey}` : snakeKey
}

function uid(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

export function transformLocaleToStory(messages: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = { component: 'site_content' }

  function walk(obj: Record<string, any>, prefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const field = encodeField(prefix, key)

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

export function transformStoryToLocale(content: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [rawKey, value] of Object.entries(content)) {
    if (rawKey.startsWith('_') || rawKey === 'component') continue

    const parts = rawKey.split('__').map(snakeToCamel)
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
