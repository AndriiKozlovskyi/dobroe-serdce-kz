<script setup lang="ts">
const { t, tm } = useI18n()

const factors = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>`,
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/></svg>`,
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>`,
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/></svg>`,
  },
]

const factorsView = computed(() => {
  const labels = tm('price.factorLabels') as string[]
  return factors.map((factor, index) => ({
    ...factor,
    label: labels[index] ?? '',
  }))
})

const stepsView = computed(() => {
  const steps = tm('price.steps') as string[]
  return steps.map((text, index) => ({ n: index + 1, text }))
})
</script>

<template>
  <section id="price" class="relative overflow-hidden bg-ivory-50 py-20 lg:py-32">

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">

        <div class="relative" data-animate>
          <div
            class="group relative overflow-hidden rounded-3xl border border-ivory-200 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(0,36,85,0.18)] sm:p-10"
            style="background: linear-gradient(160deg, rgba(255,255,255,0.98) 0%, var(--color-sapphire-50) 62%, rgba(255,255,255,0.95) 100%);"
          >
            <div
              class="pointer-events-none absolute -right-20 -top-16 h-48 w-48 rounded-full blur-2xl"
              style="background: radial-gradient(circle, rgba(0,99,181,0.22) 0%, rgba(0,99,181,0) 70%);"
            />
            <div
              class="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full blur-2xl"
              style="background: radial-gradient(circle, rgba(249,189,21,0.2) 0%, rgba(249,189,21,0) 72%);"
            />

            <img src="/logo.png" alt="" class="pointer-events-none absolute right-8 top-8 h-20 w-20 opacity-[0.09] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105" />

            <div class="relative z-10 h-full">
              <div class="mb-4 flex flex-wrap items-center gap-2">
                <div class="flex-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                  {{ t('price.cardTitle') }}
                </div>
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 font-body text-[11px] font-medium uppercase tracking-[0.12em]"
                  style="background: var(--color-brand-100); color: var(--color-gold-600);"
                >
                  {{ t('price.cardBadge') }}
                </span>
              </div>

              <div class="mb-2 font-display font-bold text-ink-900" style="font-size: clamp(1.8rem, 8vw, 4rem); line-height: 1;">
                {{ t('price.cardBig') }}
              </div>
              <div class="mb-7 h-0.5 w-20" style="background: linear-gradient(90deg, var(--color-sapphire-700), transparent);" />

              <p class="mb-8 font-body text-sm leading-relaxed text-ink-700/95">
                {{ t('price.cardText') }}
              </p>

              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div
                  v-for="(factor, i) in factorsView"
                  :key="i"
                  class="group/factor flex items-start gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5"
                  style="border-color: var(--color-sapphire-200); background: rgba(232, 244, 253, 0.85);"
                >
                  <span
                    class="mt-0.5 h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover/factor:scale-110"
                    style="color: var(--color-sapphire-700);"
                    v-html="factor.icon"
                  />
                  <span class="font-body text-xs leading-snug font-medium text-ink-700">{{ factor.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-animate class="delay-200 mt-8 lg:mt-0">
          <div class="eyebrow mb-5">{{ t('price.eyebrow') }}</div>
          <h2 class="section-title mb-6">
            <span class="text-sapphire-800">{{ t('price.titleBlue') }}</span><br>
            <span class="text-brand-500">{{ t('price.titleGold') }}</span>
          </h2>
          <div class="gold-divider mb-8" />
          <p class="section-subtitle mb-10 leading-prose">
            {{ t('price.subtitle') }}
          </p>

          <ol class="mb-10 space-y-5">
            <li v-for="step in stepsView" :key="step.n" class="group flex items-center gap-4">
              <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center">
                <img src="/logo-blue.png" alt="icon" class="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <p class="font-body text-base font-medium text-ink-700 text-left max-w-[calc(100%-4rem)]">{{ step.text }}</p>
              <div class="h-px flex-1 bg-ivory-200 transition-all duration-300 group-hover:bg-brand-100 hidden sm:block" />
            </li>
          </ol>

          <div class="flex flex-wrap items-center gap-4">
            <a href="tel:+380961462910" class="btn-primary">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              {{ t('price.cta') }}
            </a>
            <div class="font-body text-sm text-ink-400">+38 096 146 29 10</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
