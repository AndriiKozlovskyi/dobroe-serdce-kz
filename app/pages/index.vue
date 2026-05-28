<script setup lang="ts">
const { t, locale } = useI18n()

const BASE_URL = 'https://dobroe-serdce.kz'
const canonicalUrl = computed(() => locale.value === 'ru' ? `${BASE_URL}/ru` : `${BASE_URL}/`)
const ogUrl = computed(() => canonicalUrl.value)

useSeoMeta({
  title: () => t('seo.default.title'),
  description: () => t('seo.default.description'),
  keywords: () => t('seo.default.keywords'),
  ogLocale: () => locale.value === 'kz' ? 'kk_KZ' : 'ru_RU',
  ogType: 'website',
  ogTitle: () => t('seo.default.title'),
  ogDescription: () => t('seo.default.description'),
  ogUrl,
  ogSiteName: 'Доброе сердце',
  ogImage: `${BASE_URL}/logo.png`,
  ogImageWidth: '512',
  ogImageHeight: '512',
  ogImageAlt: () => t('seo.default.title'),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.default.title'),
  twitterDescription: () => t('seo.default.description'),
  twitterImage: `${BASE_URL}/logo.png`,
})

const nursingHomeSchema = {
  '@context': 'https://schema.org',
  '@type': ['NursingHome', 'LocalBusiness'],
  name: 'Доброе сердце',
  alternateName: [
    'Пансионат для пожилых людей Астана',
    'Дом престарелых Астана',
    'Пансионат Доброе сердце',
  ],
  description: 'Частный пансионат для пожилых людей в Астане. Круглосуточный квалифицированный уход, медицинская поддержка, 5-разовое питание, комфортное проживание. Принимаем здоровых пожилых, лежачих больных, людей с деменцией, после инсульта и операций.',
  url: 'https://dobroe-serdce.kz/',
  telephone: '+380961462910',
  logo: 'https://dobroe-serdce.kz/logo.png',
  image: 'https://dobroe-serdce.kz/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'просп. Республики',
    addressLocality: 'Астана',
    addressRegion: 'Астана',
    addressCountry: 'KZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.1801,
    longitude: 71.4460,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  priceRange: 'Индивидуально',
  currenciesAccepted: 'KZT',
  paymentAccepted: 'Наличные, Банковский перевод',
  availableLanguage: [{ '@type': 'Language', name: 'Russian' }, { '@type': 'Language', name: 'Kazakh' }],
  sameAs: ['https://2gis.kz/astana/firm/70000001059285683'],
  hasMap: 'https://2gis.kz/astana/firm/70000001059285683',
  knowsAbout: [
    'Уход за пожилыми людьми',
    'Лежачие больные',
    'Болезнь Альцгеймера',
    'Старческая деменция',
    'Реабилитация после инсульта',
    'Реабилитация после перелома шейки бедра',
  ],
  serviceArea: {
    '@type': 'City',
    name: 'Астана',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Круглосуточная медсестра', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Медицинский уход', value: true },
    { '@type': 'LocationFeatureSpecification', name: '5-разовое питание', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Ежедневные прогулки', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Гигиенический уход', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Контроль приёма лекарств', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Онлайн-встречи с родными', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Индивидуальный трансфер', value: true },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '12',
  },
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(nursingHomeSchema) },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl },
  ],
})
</script>

<template>
  <main>
    <AppHeader />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <AccommodationSection />
    <GallerySection />
    <DocumentsSection />
    <PriceSection />
    <FaqSection />
    <ContactsSection />
    <ReviewsSection />
    <AppFooter />
  </main>
</template>
