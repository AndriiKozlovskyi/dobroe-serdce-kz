<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="contacts" class="relative overflow-hidden py-20 lg:py-32" style="background: var(--color-ivory-100);">
    <div
      class="pointer-events-none absolute left-0 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 sm:h-[700px] sm:w-[700px]"
      style="background: radial-gradient(circle, var(--color-brand-50) 0%, transparent 70%);"
    />

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8">

      <div class="mb-16 text-center" data-animate>
        <div class="eyebrow mb-5 justify-center">{{ t('contacts.eyebrow') }}</div>
        <h2 class="section-title mb-5">
          <span class="text-sapphire-800">{{ t('contacts.titleBlue') }}</span><br>
          <span class="text-brand-500">{{ t('contacts.titleGold') }}</span>
        </h2>
        <p class="section-subtitle mx-auto max-w-xl">
          {{ t('contacts.subtitle') }}
        </p>
      </div>

      <div class="grid gap-12 lg:grid-cols-1">

        <div data-animate>
          <div class="mb-8 overflow-hidden rounded-3xl shadow-lift ring-1 ring-ink-100">
            <iframe
              class="contact-map-frame"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2501.541181548874!2d71.42291657698297!3d51.172247635131455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424580d55804208f%3A0x8eeb11fd4356cb6!2z0L_RgNC-0YHQvy4g0KDQtdGB0L_Rg9Cx0LvQuNC60LgsIDAyMDAwMCDQkNGB0YLQsNC90LAsINCa0LDQt9Cw0YXRgdGC0LDQvQ!5e0!3m2!1sru!2spl!4v1773859914767!5m2!1sru!2spl"
              width="100%"
              height="260"
              style="border: 0; filter: sepia(0.12) contrast(1.05);"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              :title="t('contacts.mapTitle')"
            />
          </div>

          <div class="space-y-2">
            <a
              href="https://maps.app.goo.gl/RrKjbFp21wWgB1MM9"
              target="_blank" rel="noopener noreferrer"
              class="group flex items-center gap-4 rounded-2xl border border-ivory-200 bg-white p-2 px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-card"
            >
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:bg-sapphire-700"
                style="background: var(--color-sapphire-100);"
              >
                <svg
                  class="h-5 w-5 transition-colors duration-300 group-hover:text-white"
                  style="color: var(--color-sapphire-700);"
                  fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
              </div>
              <div>
                <div class="font-body text-xs font-semibold uppercase tracking-wider text-ink-400">{{ t('contacts.address') }}</div>
                <div class="mt-0.5 font-body text-base font-medium text-ink-900">{{ t('contacts.addressCity') }}</div>
                <div class="font-body text-sm text-ink-500">{{ t('contacts.addressStreet') }}</div>
              </div>
              <svg class="ml-auto mt-1 h-4 w-4 flex-shrink-0 text-ink-300 transition-colors duration-200 group-hover:text-brand-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
              </svg>
            </a>

            <a
              href="tel:+380961462910"
              class="group flex items-center gap-4 rounded-2xl border border-ivory-200 bg-white p-2 px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-card"
            >
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:bg-sapphire-700"
                style="background: var(--color-sapphire-100);"
              >
                <svg
                  class="h-5 w-5 transition-colors duration-300 group-hover:text-white"
                  style="color: var(--color-sapphire-700);"
                  fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                </svg>
              </div>
              <div>
                <div class="font-body text-xs font-semibold uppercase tracking-wider text-ink-400">{{ t('contacts.phone') }}</div>
                <div class="mt-0.5 font-body text-base font-semibold text-sapphire-700">
                  +38 096 146 29 10
                </div>
                <div class="font-body text-xs text-ink-400">{{ t('contacts.phoneHint') }}</div>
              </div>
            </a>

            <div class="flex items-center gap-4 rounded-2xl border border-ivory-200 bg-white p-2 px-4">
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                style="background: var(--color-sapphire-100);"
              >
                <svg
                  class="h-5 w-5"
                  style="color: var(--color-sapphire-700);"
                  fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <div class="font-body text-xs font-semibold uppercase tracking-wider text-ink-400">{{ t('contacts.hours') }}</div>
                <div class="mt-0.5 font-body text-base font-medium text-ink-900">{{ t('contacts.hoursMain') }}</div>
                <div class="font-body text-xs text-ink-400">{{ t('contacts.hoursHint') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (hover: none) and (pointer: coarse) {
  .contact-map-frame {
    pointer-events: none;
  }
}
</style>
