import { transformStoryToLocale } from '../../shared/storyblok-transforms'

function deepMerge(target: any, source: any): any {
  const result = { ...target }
  for (const key of Object.keys(source ?? {})) {
    const isObject = (v: any) => v && typeof v === 'object' && !Array.isArray(v)
    result[key] = isObject(source[key]) && isObject(target[key])
      ? deepMerge(target[key], source[key])
      : source[key]
  }
  return result
}

const hydrated = new Set<string>()

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const token = config.public.storyblokToken as string
  const version = (config.public.storyblokVersion as string) ?? 'published'

  if (!token) return

  const i18n = nuxtApp.$i18n as any

  // SSR locale was already injected by the server plugin
  hydrated.add(i18n.locale.value)

  async function inject(locale: string) {
    if (hydrated.has(locale)) return
    const slug = locale === 'ru' ? 'site-content-ru' : 'site-content-kz'
    try {
      const data = await $fetch<any>('https://api.storyblok.com/v2/cdn/stories/' + slug, {
        params: { token, version },
      })
      const sbMessages = transformStoryToLocale(data.story.content)
      const existing = i18n.getLocaleMessage(locale) ?? {}
      i18n.setLocaleMessage(locale, deepMerge(existing, sbMessages))
      hydrated.add(locale)
    } catch (e) {
      console.warn(`[storyblok-i18n] Client fetch failed (${locale}):`, (e as Error).message)
    }
  }

  watch(i18n.locale, (newLocale: string) => inject(newLocale))
})
