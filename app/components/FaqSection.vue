<script setup lang="ts">
const { t, tm, rt } = useI18n()

const openIndex = ref<number | null>(null)

const items = computed(() =>
  (tm('faq.items') as Array<Record<string, any>>).map((item: any) => ({
    q: rt(item.q),
    a: rt(item.a),
  }))
)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

const faqSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.value.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}))

useHead({
  script: [{ type: 'application/ld+json', innerHTML: computed(() => JSON.stringify(faqSchema.value)) }],
})
</script>

<template>
  <section id="faq" class="relative overflow-hidden py-20 lg:py-32" style="background: var(--color-ivory-100);">
    <div class="absolute left-0 right-0 top-0 h-px" style="background: linear-gradient(90deg, transparent, var(--color-ivory-300), transparent);" />

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mb-14 text-center" data-animate>
        <div class="eyebrow mb-5 justify-center">{{ t('faq.eyebrow') }}</div>
        <h2 class="section-title mb-5">
          <span class="text-sapphire-800">{{ t('faq.titleBlue') }}&nbsp;</span>
          <span class="text-brand-500">{{ t('faq.titleGold') }}</span>
        </h2>
        <p class="section-subtitle mx-auto max-w-2xl">{{ t('faq.subtitle') }}</p>
      </div>

      <div class="mx-auto max-w-3xl" data-animate>
        <div
          v-for="(item, i) in items"
          :key="i"
          class="border-b border-ivory-200 last:border-b-0"
        >
          <button
            class="group flex w-full items-center justify-between gap-6 py-5 text-left"
            :aria-expanded="openIndex === i"
            :aria-controls="`faq-answer-${i}`"
            @click="toggle(i)"
          >
            <h3 class="font-display text-base font-semibold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-sapphire-700 sm:text-lg">
              {{ item.q }}
            </h3>
            <div
              class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300"
              :class="openIndex === i
                ? 'bg-sapphire-700 text-white rotate-45'
                : 'bg-ivory-200 text-ink-500 group-hover:bg-sapphire-100 group-hover:text-sapphire-700'"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>

          <div
            :id="`faq-answer-${i}`"
            role="region"
            class="overflow-hidden transition-all duration-300 ease-in-out"
            :class="openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'"
          >
            <p class="font-body text-base leading-relaxed text-ink-600">{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
