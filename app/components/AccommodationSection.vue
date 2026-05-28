<script setup lang="ts">
interface AccommodationOption {
  icon: string
  gradient: string
  iconBg: string
}

const { t, tm } = useI18n()

const options: AccommodationOption[] = [
  {
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="58" height="58">
      <path style="fill:#FFFFFF;" d="M13.2,7.1c6.3,0,11.4,5.1,11.4,11.4s-5.1,11.4-11.4,11.4S1.8,24.7,1.8,18.4S6.9,7.1,13.2,7.1 M13.2,5.3C5.9,5.3,0,11.2,0,18.4s5.9,13.2,13.2,13.2s13.2-5.9,13.2-13.2S20.5,5.3,13.2,5.3L13.2,5.3z M13.2,7.9c-0.3,0-0.5,0.2-0.5,0.5v0.5c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V8.4C13.6,8.1,13.4,7.9,13.2,7.9z M13.6,16.6V12c0-0.3-0.2-0.5-0.5-0.5s-0.5,0.2-0.5,0.5v4.6c-0.6,0.2-1.1,0.7-1.3,1.3H8.2c-0.3,0-0.5,0.2-0.5,0.5c0,0.3,0.2,0.5,0.5,0.5h3.2c0.2,0.8,0.9,1.4,1.8,1.4c1,0,1.8-0.8,1.8-1.8C15,17.5,14.4,16.8,13.6,16.6z M13.2,19.3c-0.5,0-0.9-0.4-0.9-0.9c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9C14.1,18.9,13.7,19.3,13.2,19.3z"/>
      <path style="fill:#F9BD15;" d="M30.5,13.8c-0.7-3.7-2.6-7-5.4-9.5c-3-2.6-6.8-4-10.8-4c-0.2,0-0.4,0.2-0.4,0.4s0.2,0.4,0.4,0.4c7.6,0,14,5.3,15.4,12.7l-1.6-0.4c0.9,0.8,1.8,2.2,2.3,3.4c0.3-1.2,0.9-2.7,1.6-3.7L30.5,13.8z"/>
    </svg>`,
    gradient: 'from-sapphire-700 to-sapphire-600',
    iconBg: 'bg-sapphire-50',
  },
  {
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <path style="fill:#FFFFFF;" d="M14,5.6c5.5,0,10,4.5,10,10s-4.5,10-10,10s-10-4.5-10-10S8.5,5.6,14,5.6 M14,4C7.6,4,2.4,9.2,2.4,15.6S7.6,27.2,14,27.2S25.6,22,25.6,15.6S20.4,4,14,4L14,4z M14.4,14V10c0-0.2-0.2-0.4-0.4-0.4s-0.4,0.2-0.4,0.4V14c-0.6,0.1-1,0.6-1.1,1.1H9.6c-0.2,0-0.4,0.2-0.4,0.4S9.4,16,9.6,16h2.9c0.2,0.7,0.8,1.2,1.5,1.2c0.9,0,1.6-0.7,1.6-1.6C15.6,14.8,15.1,14.2,14.4,14z M14,16.4c-0.4,0-0.8-0.4-0.8-0.8s0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S14.4,16.4,14,16.4z"/>
      <path style="fill:#F9BD15;" d="M29.6,15.6C29.6,7,22.6,0,14,0c-0.2,0-0.4,0.2-0.4,0.4s0.2,0.4,0.4,0.4c8.2,0,14.9,6.7,14.9,14.9c0,7.1-5,13.2-11.9,14.6l0.5-1.2L14,30.9l3.8,1.1L17,30.9C24.3,29.5,29.6,23.1,29.6,15.6z"/>
    </svg>`,
    gradient: 'from-sapphire-700 to-sapphire-600',
    iconBg: 'bg-brand-50',
  },
  {
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <path style="fill:#FFFFFF;" d="M16,5.8c5.6,0,10.2,4.6,10.2,10.2S21.6,26.2,16,26.2S5.8,21.6,5.8,16S10.4,5.8,16,5.8 M16,4.1C9.4,4.1,4.1,9.4,4.1,16S9.4,27.9,16,27.9S27.9,22.6,27.9,16S22.6,4.1,16,4.1L16,4.1z M16.4,14.4v-4.2c0-0.2-0.2-0.4-0.4-0.4c-0.2,0-0.4,0.2-0.4,0.4v4.2c-0.6,0.1-1,0.6-1.2,1.2h-2.9c-0.2,0-0.4,0.2-0.4,0.4s0.2,0.4,0.4,0.4h2.9c0.2,0.7,0.8,1.2,1.6,1.2c0.9,0,1.6-0.7,1.6-1.6C17.6,15.2,17.1,14.6,16.4,14.4z M16,16.8c-0.5,0-0.8-0.4-0.8-0.8s0.4-0.8,0.8-0.8c0.5,0,0.8,0.4,0.8,0.8S16.5,16.8,16,16.8z"/>
      <path style="fill:#F9BD15;" d="M16,0c-0.2,0-0.4,0.2-0.4,0.4s0.2,0.4,0.4,0.4c8.4,0,15.3,6.8,15.3,15.3S24.4,31.3,16,31.3S0.7,24.4,0.7,16c0-4.3,1.8-8.5,5.1-11.3L6,6l2.1-3.4l-3.9,1L5.4,4C2,7.1,0,11.4,0,16c0,8.8,7.2,16,16,16s16-7.2,16-16C32,7.2,24.8,0,16,0z"/>
    </svg>`,
    gradient: 'from-sapphire-800 to-sapphire-700',
    iconBg: 'bg-sapphire-50',
  },
  {
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <path style="fill:#0063B5;" d="M3.4,0.5C3.4,0.2,3.6,0,3.9,0H7c0.2,0,0.4,0.1,0.5,0.3l1.9,4.8h9c1.4,0,2.6,1.2,2.6,2.6v1c0,0.3-0.2,0.5-0.5,0.5h-9.3c-0.3,0-0.5-0.2-0.5-0.5c0-0.3,0.2-0.5,0.5-0.5h8.8V7.8c0-0.9-0.7-1.6-1.6-1.6H9.6v3.1c0,0.3-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5V5.8L6.6,1H3.9C3.6,1,3.4,0.8,3.4,0.5z M14.7,21.6c0,2.3-1.9,4.1-4.1,4.1s-4.1-1.9-4.1-4.1c0-2.3,1.9-4.1,4.1-4.1C12.9,17.5,14.7,19.3,14.7,21.6z M18,14.3c1.9,1.9,3,4.5,3,7.3c0,2.9-1.2,5.4-3,7.3c-1.9,1.9-4.5,3-7.3,3c-2.9,0-5.4-1.2-7.3-3c-1.9-1.9-3-4.5-3-7.3c0-2.9,1.2-5.4,3-7.3c1.9-1.9,4.5-3,7.3-3C13.5,11.2,16.1,12.4,18,14.3z"/>
    </svg>`,
    gradient: 'from-sapphire-700 to-sapphire-600',
    iconBg: 'bg-sapphire-50',
  },
]

const optionsView = computed(() => {
  const optionTexts = tm('accommodation.options') as Array<{ title: string; subtitle: string; description: string }>
  return options.map((option, index) => ({
    ...option,
    title: optionTexts[index]?.title ?? '',
    subtitle: optionTexts[index]?.subtitle ?? '',
    description: optionTexts[index]?.description ?? '',
  }))
})

const acceptedView = computed(() => tm('accommodation.accepted') as string[])
const notAcceptedView = computed(() => tm('accommodation.notAccepted') as string[])
</script>

<template>
  <section id="accommodation" class="bg-ivory-50 py-20 lg:py-32 overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mb-16 text-center" data-animate>
        <div class="eyebrow mb-5 justify-center">{{ t('accommodation.eyebrow') }}</div>
        <h2 class="section-title mb-5">
          <span class="text-sapphire-800">{{ t('accommodation.titleBlue') }}</span><br>
          <span class="text-brand-500">{{ t('accommodation.titleGold') }}</span>
        </h2>
      </div>

      <div class="mb-20 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(option, i) in optionsView"
          :key="i"
          class="group relative overflow-hidden rounded-3xl border border-ivory-200 bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift sm:p-8"
          :class="`animation-delay-${i * 100}`"
          data-animate
        >
          <div :class="`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`" />
          <div class="relative z-10">
            <span class="clock-icon mb-4 block transition-all duration-300" v-html="option.icon" />
            <h3 class="mb-1.5 font-display text-xl font-semibold leading-snug text-ink-900 transition-colors duration-300 group-hover:text-white">{{ option.title }}</h3>
            <p class="mb-4 font-body text-sm font-semibold uppercase tracking-wider transition-colors duration-300 text-sapphire-800 group-hover:text-white/70">{{ option.subtitle }}</p>
            <p class="font-body text-sm leading-relaxed text-ink-500 transition-colors duration-300 group-hover:text-white/80">{{ option.description }}</p>
          </div>
          <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      <div class="grid gap-8 grid-cols-1 lg:grid-cols-2" data-animate>
        <div
          class="rounded-3xl border p-8 transition-all duration-300 hover:shadow-card"
          style="background: linear-gradient(135deg, var(--color-sage-50), var(--color-sage-100)); border-color: var(--color-sage-200);"
        >
          <div class="mb-6 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl" style="background: var(--color-sage-100);">
              <svg class="h-6 w-6" style="color: var(--color-sage-600);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-display text-2xl font-semibold text-ink-900">{{ t('accommodation.acceptedTitle') }}</h3>
              <p class="font-body text-xs text-ink-400">{{ t('accommodation.acceptedSubtitle') }}</p>
            </div>
          </div>
          <ul class="space-y-3">
            <li v-for="item in acceptedView" :key="item" class="flex items-start gap-3 font-body text-sm text-ink-700">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0" style="color: var(--color-sage-600);" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>

        <div
          class="rounded-3xl border p-8 transition-all duration-300 hover:shadow-card"
          style="background: linear-gradient(135deg, #fdf3f3, #fae8e8); border-color: #f0c4c4;"
        >
          <div class="mb-6 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl" style="background: #f9dada;">
              <svg class="h-6 w-6" style="color: #c0392b;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-display text-2xl font-semibold text-ink-900">{{ t('accommodation.blockedTitle') }}</h3>
              <p class="font-body text-xs text-ink-400">{{ t('accommodation.blockedSubtitle') }}</p>
            </div>
          </div>
          <ul class="mb-6 space-y-3">
            <li v-for="item in notAcceptedView" :key="item" class="flex items-start gap-3 font-body text-sm text-ink-700">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0" style="color: #c0392b;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
              {{ item }}
            </li>
          </ul>
          <p class="font-body text-xs leading-relaxed" style="color: #a93226; opacity: 0.75;">{{ t('accommodation.blockedNote') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.clock-icon :deep(path:first-child) { fill: var(--color-sapphire-700) !important; }
.clock-icon :deep(path:last-child) { fill: var(--color-brand-500) !important; }
.clock-icon :deep(path:only-child) { fill: var(--color-sapphire-700) !important; }
.group:hover .clock-icon :deep(path:first-child) { fill: #ffffff !important; }
.group:hover .clock-icon :deep(path:last-child) { fill: var(--color-brand-400) !important; }
.group:hover .clock-icon :deep(path:only-child) { fill: #ffffff !important; }
</style>
