<!--
  HeroSection.vue — COLORS ONLY CHANGED
  Changes:
    • #dcc07e headline italic/line → var(--color-brand-500) #F9BD15 (unified gold token)
    • Floating orb gold #dcc07e → brand-500
    • Floating orb red #b33628 → sapphire-900 (calm, on-brand, not alarming)
    • stat divider border-white unchanged (functional)
    • bg-hero-gradient → unchanged (uses CSS var already correct)
-->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import garden from '../../public/garden-old.mp4'
import gardenMobile from '../../public/garden-mobile-old.mp4'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const useVideo = ref(true)
const heroVideoRef = ref<HTMLVideoElement | null>(null)
const heroVideoSrc = ref(garden)
let mobileVideoQuery: MediaQueryList | null = null
let onVisibilityChange: (() => void) | null = null
let onViewportChange: (() => void) | null = null

function prefersInstantScroll() {
  return window.matchMedia('(prefers-reduced-motion: reduce), (hover: none) and (pointer: coarse)')
    .matches
}

function scrollTo(id: string) {
  document
    .querySelector(id)
    ?.scrollIntoView({ behavior: prefersInstantScroll() ? 'auto' : 'smooth' })
}

const stats = computed(() => [
  {
    value: '24/7',
    label: t('hero.statLabel'),
  },
])

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
  mobileVideoQuery = window.matchMedia('(max-width: 767px)')

  useVideo.value = !(prefersReducedMotion || saveData)

  const updateVideoSource = () => {
    heroVideoSrc.value = mobileVideoQuery?.matches ? gardenMobile : garden
  }

  updateVideoSource()

  onVisibilityChange = () => {
    const video = heroVideoRef.value
    if (!video) return
    if (document.hidden) {
      video.pause()
    } else if (useVideo.value) {
      void video.play().catch(() => undefined)
    }
  }

  onViewportChange = () => {
    const video = heroVideoRef.value
    const nextSrc = mobileVideoQuery?.matches ? gardenMobile : garden

    if (heroVideoSrc.value === nextSrc) return

    heroVideoSrc.value = nextSrc

    if (!video) return

    video.load()

    if (useVideo.value && !document.hidden) {
      void video.play().catch(() => undefined)
    }
  }

  document.addEventListener('visibilitychange', onVisibilityChange)
  mobileVideoQuery.addEventListener('change', onViewportChange)
})

onUnmounted(() => {
  if (onVisibilityChange) {
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }

  if (onViewportChange) {
    mobileVideoQuery?.removeEventListener('change', onViewportChange)
  }
})
</script>

<template>
  <section
    class="hero-section min-stable-screen relative flex items-center overflow-hidden"
    :aria-label="t('hero.aria')"
  >
    <!-- ── Layered background ── -->
    <div class="hero-media absolute inset-0">
      <video
        ref="heroVideoRef"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="hero-video absolute inset-0 h-full w-full object-cover object-center"
      >
        <source :src="heroVideoSrc" type="video/mp4" />
      </video> -->
      <!-- Multi-layer gradient for depth -->
      <div class="absolute inset-0 bg-[#3a6048]/10" />
    </div>

    <div
      class="hero-content relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-28 xl:px-16"
    >
      <div class="hero-copy lg:max-w-3xl">
        <h1
          class="hero-title animate-fade-up font-display w-full text-center leading-none tracking-tight text-white lg:text-left"
          style="font-size: clamp(1.95rem, 8.2vw, 5.5rem); font-weight: 700; line-height: 1.05; will-change: transform; animation-delay: 0s;"
        >
          {{ t('hero.titleBlue') }}<br />
          <span>{{ t('hero.titleGold') }}</span>
        </h1>

        <!-- decorative line: brand-500 → transparent (was #DAA532 → transparent) -->
        <div
          class="hero-divider animate-fade-in mt-7 mb-8 h-px w-24 origin-left"
          style="background: linear-gradient(90deg, var(--color-brand-500), transparent); animation-delay: 0.1s;"
        />

        <p
          class="hero-subtitle animate-fade-up font-body font-600 max-w-xl text-left text-xl leading-relaxed md:text-xl"
          style="color: rgba(255, 255, 255, 0.9); will-change: transform; animation-delay: 0.1s;"
        >
          {{ t('hero.subtitle') }}
        </p>

        <div
          class="hero-stats animate-fade-up mt-10 flex flex-wrap items-start justify-start gap-5 sm:mt-12 sm:gap-8"
          style="animation-delay: 0.2s;"
        >
          <div v-for="stat in stats" :key="stat.value" class="hero-stat flex flex-col gap-1">
            <div
              class="font-display font-700 text-white"
              style="font-size: clamp(2rem, 3.5vw, 2.75rem); line-height: 1"
            >
              {{ stat.value }}
            </div>
            <div class="font-body font-400 text-xs tracking-widest text-white/80 uppercase">
              {{ stat.label }}
            </div>
          </div>
          <div class="hero-stats-divider mx-2 hidden w-px self-stretch bg-white/15 sm:block" />
          <div class="hero-stat flex flex-col gap-1">
            <div
              class="font-display font-700 text-white"
              style="font-size: clamp(2rem, 3.5vw, 2.75rem); line-height: 1"
            >
              4×
            </div>
            <div class="font-body font-400 text-xs tracking-widest text-white/80 uppercase">
              {{ t('hero.mealLabel') }}
            </div>
          </div>
        </div>

        <div
          class="hero-actions animate-fade-up mt-9 flex flex-col items-stretch gap-3 delay-400 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <button
            class="hero-action btn-primary justify-center sm:w-auto"
            @click="scrollTo('#contacts')"
          >
            {{ t('hero.ctaPrimary') }}
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            class="hero-action btn-ghost w-full justify-center sm:w-auto"
            @click="scrollTo('#about')"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {{ t('hero.ctaSecondary') }}
          </button>
        </div>

        <!-- Social media icons -->
        <div
          class="hero-socials animate-fade-up mt-8 flex items-center justify-center w-full gap-5 delay-500 sm:mt-10 sm:gap-6"
        >
          <a
            href="https://instagram.com/pansionat_dobroe_serdce"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="group relative inline-flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Icon
              name="skill-icons:instagram"
              class="relative z-10 h-8 w-8 text-white/70 transition-all duration-300 group-hover:text-white"
            />
          </a>
          <a
            href="https://t.me/pansionat_dobroe_serdce"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            class="group relative inline-flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Icon
              name="logos:telegram"
              class="relative z-10 h-8 w-8 text-white/70 transition-all duration-300 group-hover:text-white"
            />
          </a>
          <a
            href="https://wa.me/380961462910"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            class="group relative inline-flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Icon
              name="logos:whatsapp-icon"
              class="relative z-10 h-8 w-8 text-white/70 transition-all duration-300 group-hover:text-white"
            />
          </a>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
    >
      <span class="font-body text-[10px] tracking-[0.2em] text-white/40 uppercase">{{
        t('hero.scrollHint')
      }}</span>
      <button
        class="animate-scroll flex flex-col items-center"
        :aria-label="t('hero.scrollButtonAria')"
        @click="scrollTo('#about')"
      >
        <div
          class="flex h-8 w-5 items-start justify-center rounded-full border border-white/25 pt-1.5"
        >
          <div class="h-1.5 w-1 rounded-full bg-white/60" />
        </div>
      </button>
    </div>

    <!-- bottom gold line: brand-500 (was rgba(201,169,78,...)) -->
    <div
      class="absolute right-0 bottom-0 left-0 h-px"
      style="
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(249, 189, 21, 0.45) 30%,
          rgba(249, 189, 21, 0.45) 70%,
          transparent 100%
        );
      "
    />
  </section>
</template>

<style scoped>
.hero-section {
    width: 100%;
  height: 100%;
}


.hero-media {
  overflow: hidden;
    width: 100%;
  height: 100%;
}

.hero-video {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}

@media (max-width: 767px) {
  .hero-section {
    align-items: flex-start;
  }

  .hero-content {
    padding-top: 7.5rem;
    padding-bottom: 3.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hero-copy {
    max-width: none;
  }

  .hero-title {
    font-size: clamp(1.55rem, 7.5vw, 2.65rem) !important;
    line-height: 1.08 !important;
    text-wrap: balance;
  }

  .hero-divider {
    margin-top: 1.25rem;
    margin-bottom: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    width: 5rem;
  }

  .hero-subtitle {
    max-width: none;
    text-align: left;
    font-size: 1rem;
    line-height: 1.6;
  }

  .hero-stats {
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .hero-stat {
    flex-direction: column;
    gap: 0.25rem;
  }

  .hero-stats-divider {
    display: none;
  }

  .hero-actions {
    margin-top: 2rem;
    gap: 0.85rem;
  }

  .hero-action {
  }

  .hero-media {
  }

  .hero-video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    transform: none;
    object-position: center center;
  }
}
</style>
