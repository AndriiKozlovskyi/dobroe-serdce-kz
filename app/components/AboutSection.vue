<script setup lang="ts">
const { t, tm, rt } = useI18n()
const missions = computed(() => (tm('about.missions') as any[]).map((m: any) => rt(m)))
</script>

<template>
  <section id="about" class="relative overflow-hidden bg-ivory-50 py-20 lg:py-32">
    <div
      class="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/3 rounded-full opacity-40"
      style="background: radial-gradient(circle, var(--color-sapphire-50) 0%, transparent 70%);"
    />
    <div
      class="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full opacity-30"
      style="background: radial-gradient(circle, var(--color-ivory-300) 0%, transparent 70%);"
    />

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid items-center gap-16 lg:grid-cols-2 xl:gap-24">

        <div class="relative" data-animate>
          <div class="relative overflow-hidden rounded-3xl shadow-lift">
            <NuxtImg
              src="/about/care.webp"
              alt="Персонал пансионата ухаживает за пожилым человеком"
              class="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[460px]"
              loading="lazy"
            />
            <div class="absolute inset-0 rounded-3xl" style="box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15);" />
          </div>

          <div class="absolute -right-6 top-8 hidden overflow-hidden rounded-2xl shadow-lift lg:block" style="width: 180px; height: 200px;">
            <NuxtImg src="/about/hugs.webp" alt="Уютная комната пансионата" class="h-full w-full object-cover" loading="lazy" />
          </div>

          <div class="absolute -bottom-8 -right-6 hidden overflow-hidden rounded-2xl shadow-lift lg:block" style="width: 160px; height: 160px;">
            <NuxtImg src="/about/heart.webp" alt="Прогулка на свежем воздухе" class="h-full w-full object-cover" loading="lazy" />
          </div>

          <div
            class="absolute -bottom-8 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lift lg:-left-6"
            style="background: linear-gradient(135deg, var(--color-sapphire-700), var(--color-sapphire-800));"
          >
            <div class="relative">
              <NuxtImg src="/logo.webp" alt="Логотип Доброе сердце" class="h-11 w-11 rounded-full bg-white p-1 ring-1 ring-white/30" />
            </div>
            <div>
              <div class="font-display text-lg font-semibold leading-none text-white">Доброе сердце</div>
              <div class="mt-0.5 font-body text-xs text-white/65">{{ t('about.badgeSubtitle') }}</div>
            </div>
          </div>

          <div class="glass absolute left-6 top-8 rounded-xl px-4 py-3 shadow-card lg:-left-8">
            <div class="font-display text-3xl font-bold leading-none" style="color: var(--color-sapphire-500);">10+</div>
            <div class="mt-0.5 font-body text-xs font-medium uppercase tracking-wider text-sapphire-500">{{ t('about.yearsLabel') }}</div>
          </div>
        </div>

        <div data-animate class="delay-200 lg:pl-4">
          <div class="eyebrow mb-5">{{ t('about.eyebrow') }}</div>

          <h2 class="section-title mb-6 text-balance">
            <span class="text-sapphire-800">{{ t('about.titleBlue') }}<br></span>
            <span class="text-brand-500">{{ t('about.titleGold') }}</span>
          </h2>

          <div class="gold-divider mb-8" />

          <p class="section-subtitle mb-8 leading-prose">{{ t('about.intro') }}</p>

          <ul class="mb-10 space-y-5">
            <li v-for="(mission, i) in missions" :key="i" class="flex items-start gap-4 group">
              <div
                class="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style="background: linear-gradient(135deg, var(--color-brand-100), var(--color-brand-50));"
              >
                <NuxtImg src="/logo-blue.webp" alt="" class="h-4 w-4 object-contain" />
              </div>
              <span class="font-body text-base leading-relaxed text-ink-700">{{ mission }}</span>
            </li>
          </ul>

          <p class="mb-10 font-body text-sm leading-loose text-ink-500">{{ t('about.outro') }}</p>

          <div class="flex flex-wrap items-center gap-4">
            <a href="tel:+380961462910" class="btn-primary">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              {{ t('about.ctaCall') }}
            </a>
            <a
              href="#services"
              class="btn-outline"
              @click.prevent="($el as HTMLElement).ownerDocument.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })"
            >
              {{ t('about.ctaServices') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
