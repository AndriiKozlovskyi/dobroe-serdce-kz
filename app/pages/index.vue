<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('seo.default.title'),
  description: () => t('seo.default.description'),
  keywords: () => t('seo.default.keywords'),
  ogLocale: () => locale.value === 'kz' ? 'kk_KZ' : 'ru_RU',
  ogType: 'website',
  ogTitle: () => t('seo.default.title'),
  ogDescription: () => t('seo.default.description'),
  ogUrl: 'https://dobroe-serdce.kz/',
  ogSiteName: 'Доброе сердце',
  ogImage: 'https://dobroe-serdce.kz/logo.png',
  ogImageWidth: '512',
  ogImageHeight: '512',
  ogImageAlt: () => t('seo.default.title'),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.default.title'),
  twitterDescription: () => t('seo.default.description'),
  twitterImage: 'https://dobroe-serdce.kz/logo.png',
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
    <ContactsSection />
    <ReviewsSection />
    <AppFooter />
  </main>
</template>
