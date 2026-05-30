/** Convert Storyblok story content → nested i18n message tree */
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
          case 'text_item':            return blok.text
          case 'qa_item':              return { q: blok.q, a: blok.a }
          case 'link_item':            return { label: blok.label, href: blok.href }
          case 'service_item':         return { title: blok.title, description: blok.description }
          case 'accommodation_option': return { title: blok.title, subtitle: blok.subtitle, description: blok.description }
          default:                     return blok
        }
      })
    } else {
      obj[last] = value
    }
  }

  return result
}
