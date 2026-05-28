export type SiteLang = 'ru' | 'kz'

export function useLocale() {
  const { locale, setLocale } = useI18n()

  const setLang = (value: SiteLang) => {
    setLocale(value)
  }

  const isRu = computed(() => locale.value === 'ru')

  return {
    lang: locale,
    isRu,
    setLang,
  }
}
