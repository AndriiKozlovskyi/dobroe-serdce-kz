<script setup lang="ts">
const { isScrolled } = useScrolled(24)
const { lang, setLang } = useLocale()
const isMobileMenuOpen = ref(false)
const isLangDropdownOpen = ref(false)
const activeItem = ref<string | null>(null)

const ui = computed(() => {
  if (lang.value === 'kz') {
    return {
      navAria: 'Басты навигация',
      callAria: 'Қоңырау шалу',
      openMenuAria: 'Мәзірді ашу',
      mobileMenuAria: 'Мобильді мәзір',
      callButton: 'Қоңырау шалу',
      navItems: [
        { label: 'Біз туралы', href: '#about' },
        { label: 'Қызметтер', href: '#services' },
        { label: 'Тұру', href: '#accommodation' },
        { label: 'Құжаттар', href: '#documents' },
        { label: 'Баға', href: '#price' },
        { label: 'Байланыс', href: '#contacts' },
      ],
    }
  }

  return {
    navAria: 'Главная навигация',
    callAria: 'Позвонить',
    openMenuAria: 'Открыть меню',
    mobileMenuAria: 'Мобильное меню',
    callButton: 'Позвонить',
    navItems: [
      { label: 'О нас', href: '#about' },
      { label: 'Услуги', href: '#services' },
      { label: 'Проживание', href: '#accommodation' },
      { label: 'Документы', href: '#documents' },
      { label: 'Цена', href: '#price' },
      { label: 'Контакты', href: '#contacts' },
    ],
  }
})

const navItems = computed(() => ui.value.navItems)

function scrollToSection(href: string) {
  activeItem.value = href
  isMobileMenuOpen.value = false
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="ds-header" :class="{ 'ds-header--scrolled': isScrolled }" role="banner">
    <div class="ds-header__bg" aria-hidden="true" />

    <nav class="ds-header__nav" :aria-label="ui.navAria">
      <div class="ds-logo__img-wrap" style="position: relative; display: inline-block">
        <div
          style="
            position: absolute;
            top: -5.5px;
            left: 41%;
            transform: translateX(-50%);
            font-family: var(--font-family-body, system-ui, sans-serif);
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--color-brand-500);
            white-space: nowrap;
            pointer-events: none;
          "
        >
          Астана
        </div>
        <NuxtImg src="/dobroe_serdce.webp" alt="Логотип Доброе сердце" class="ds-logo__img" />
      </div>

      <ul class="ds-nav__list" role="list">
        <li v-for="item in navItems" :key="item.href" class="ds-nav__item">
          <button
            class="ds-nav__link"
            :class="{ 'ds-nav__link--active': activeItem === item.href }"
            @click="scrollToSection(item.href)"
          >
            {{ item.label }}
            <span class="ds-nav__underline" aria-hidden="true" />
          </button>
        </li>
      </ul>

      <div class="flex gap-6">
        <div class="hidden items-center gap-4 lg:flex">
          <a
            href="https://instagram.com/pansionat_dobroe_serdce"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="group relative flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Icon
              name="skill-icons:instagram"
              class="relative z-10 h-[30px] w-[30px] text-white/70 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
            />
          </a>
          <a
            href="https://wa.me/380961462910"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            class="group relative flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Icon
              name="logos:whatsapp-icon"
              class="relative z-10 h-[30px] w-[30px] text-white/70 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
            />
          </a>
        </div>

        <div
          class="border-sapphire-700 bg-sapphire-700 hidden items-center gap-0 rounded-full border p-0.5 md:flex"
        >
          <button
            class="font-body px-3 py-1 text-xs font-semibold tracking-wider transition-colors"
            :class="lang === 'ru' ? 'bg-yellow-500 rounded-full text-white' : 'text-white rounded-full'"
            @click="setLang('ru')"
          >
            RU
          </button>
          <button
            class="font-body px-3 py-1 text-xs rounded-full font-semibold tracking-wider transition-colors"
            :class="lang === 'kz' ? 'bg-yellow-500 text-white' : 'text-white rounded-full'"
            @click="setLang('kz')"
          >
            KZ
          </button>
        </div>

        <div class="relative flex md:hidden">
          <button
            class="border-sapphire-700 bg-sapphire-700 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider text-white transition-colors"
            @click="isLangDropdownOpen = !isLangDropdownOpen"
          >
            {{ lang === 'ru' ? 'RU' : 'KZ' }}
            <svg
              class="ml-1 inline-block h-3 w-3 transition-transform"
              :class="{ 'rotate-180': isLangDropdownOpen }"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          <Transition
            enter-active-class="transition-all duration-200"
            leave-active-class="transition-all duration-200"
            enter-from-class="opacity-0 scale-95"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isLangDropdownOpen"
              class="absolute right-0 top-full mt-2 rounded-lg border border-sapphire-700 bg-white shadow-lg"
            >
              <button
                class="block w-full px-4 py-2 text-left text-xs font-semibold tracking-wider transition-colors hover:bg-sapphire-50"
                :class="lang === 'ru' ? 'text-sapphire-700 bg-sapphire-50' : 'text-ink-800'"
                @click="setLang('ru'); isLangDropdownOpen = false"
              >
                Русский (RU)
              </button>
              <button
                class="block w-full px-4 py-2 text-left text-xs font-semibold tracking-wider transition-colors hover:bg-sapphire-50"
                :class="lang === 'kz' ? 'text-sapphire-700 bg-sapphire-50' : 'text-ink-800'"
                @click="setLang('kz'); isLangDropdownOpen = false"
              >
                Қазақша (KZ)
              </button>
            </div>
          </Transition>
        </div>

        <a href="tel:+380961462910" class="ds-cta" :aria-label="ui.callAria">
          <span class="ds-cta__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </span>
          <span class="ds-cta__label">+38 096 146 29 10</span>
          <span class="ds-cta__shimmer" aria-hidden="true" />
        </a>
      </div>

      <button
        class="ds-burger"
        :class="{ 'ds-burger--open': isMobileMenuOpen }"
        :aria-label="ui.openMenuAria"
        :aria-expanded="isMobileMenuOpen"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span class="ds-burger__bar ds-burger__bar--top" />
        <span class="ds-burger__bar ds-burger__bar--mid" />
        <span class="ds-burger__bar ds-burger__bar--bot" />
      </button>
    </nav>

    <Transition name="ds-drawer">
      <div
        v-if="isMobileMenuOpen"
        class="ds-drawer"
        role="dialog"
        aria-modal="true"
        :aria-label="ui.mobileMenuAria"
      >
        <div class="ds-drawer__sep" aria-hidden="true" />
        <ul class="ds-drawer__list" role="list">
          <li
            v-for="(item, i) in navItems"
            :key="item.href"
            class="ds-drawer__item"
            :style="`--i: ${i}`"
          >
            <button class="ds-drawer__link" @click="scrollToSection(item.href)">
              <span class="ds-drawer__dot" aria-hidden="true" />
              {{ item.label }}
            </button>
          </li>
        </ul>
        <a href="tel:+380961462910" class="ds-drawer__cta">
          <svg class="ds-drawer__cta-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          {{ ui.callButton }}
        </a>
        <div class="flex justify-center gap-2 pt-3">
          <button
            class="font-body rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider transition-colors"
            :class="lang === 'ru' ? 'border-sapphire-700 bg-sapphire-600 text-white' : 'border-sapphire-700 text-sapphire-600 bg-white'"
            @click="setLang('ru')"
          >
            RU
          </button>
          <button
            class="font-body rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider transition-colors"
            :class="lang === 'kz' ? 'border-sapphire-600 bg-sapphire-600 text-white' : 'border-sapphire-700 text-sapphire-600 bg-white'"
            @click="setLang('kz')"
          >
            KZ
          </button>
        </div>
        <div class="flex items-center justify-center gap-6 pt-4">
          <a
            href="https://instagram.com/pansionat_dobroe_serdce"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="group relative flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Icon name="skill-icons:instagram" class="relative z-10 h-[30px] w-[30px] transition-all duration-300 group-hover:scale-110" />
          </a>
          <a
            href="https://t.me/pansionat_dobroe_serdce"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            class="group relative inline-flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Icon name="logos:telegram" class="relative z-10 h-8 w-8 text-white/70 transition-all duration-300 group-hover:text-white" />
          </a>
          <a
            href="https://wa.me/380961462910"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            class="group relative flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Icon name="logos:whatsapp-icon" class="relative z-10 h-[30px] w-[30px] transition-all duration-300 group-hover:scale-110" />
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.ds-header {
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur: 650ms;
  background-color: rgb(255, 255, 255);
  --s: 0;
  position: sticky;
  inset: 0 0 auto;
  z-index: 50;
}
.ds-header--scrolled { --s: 1; }

.ds-header__bg {
  position: absolute;
  inset: 0;
  background: rgba(253, 252, 248, var(--s));
  backdrop-filter: blur(calc(var(--s) * 22px));
  -webkit-backdrop-filter: blur(calc(var(--s) * 22px));
  box-shadow: 0 1px 0 rgba(15, 13, 11, calc(var(--s) * 0.08)), 0 4px 48px rgba(15, 13, 11, calc(var(--s) * 0.06));
  transition: background var(--dur) var(--ease), backdrop-filter var(--dur) var(--ease), -webkit-backdrop-filter var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
  pointer-events: none;
}
.ds-header--scrolled .ds-header__bg {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 1px 0 rgba(15, 13, 11, 0.08), 0 12px 40px rgba(15, 13, 11, 0.08);
}

.ds-header__nav {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80rem;
  margin: 0 auto;
  padding: calc(18px - var(--s) * 8px) 1.4rem;
  transition: padding var(--dur) var(--ease);
}
@media (min-width: 1024px) {
  .ds-header__nav { padding-left: 2rem; padding-right: 2rem; }
}

.ds-logo__img-wrap { position: relative; flex-shrink: 0; }
.ds-logo__img { height: 38px; width: auto; object-fit: contain; }

.ds-nav__list {
  display: none;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
@media (min-width: 1024px) { .ds-nav__list { display: flex; } }

.ds-nav__link {
  position: relative;
  font-family: var(--font-family-body, system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.3rem 0;
  color: var(--color-blue-500);
  transition: color var(--dur) var(--ease);
  outline: none;
}
.ds-header--scrolled .ds-nav__link { color: var(--color-ink-800); }
.ds-nav__link:hover, .ds-nav__link--active { color: var(--color-brand-500); }

.ds-nav__underline {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--color-brand-500), var(--color-brand-300));
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
}
.ds-nav__link:hover .ds-nav__underline, .ds-nav__link--active .ds-nav__underline { transform: scaleX(1); }

.ds-cta {
  display: none;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  font-family: var(--font-family-body, system-ui, sans-serif);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
  background: linear-gradient(135deg, var(--color-blue-700), var(--color-blue-600));
  border: 1px solid var(--color-blue-800);
  backdrop-filter: blur(calc((1 - var(--s)) * 14px));
  -webkit-backdrop-filter: blur(calc((1 - var(--s)) * 14px));
  transition: background var(--dur) var(--ease), border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), backdrop-filter var(--dur) var(--ease), transform 0.22s ease;
}
@media (min-width: 1024px) { .ds-cta { display: flex; } }
.ds-cta:hover { transform: translateY(-2px); box-shadow: inset 0 0 0 9999px rgba(0, 61, 138, calc(var(--s) * 0.9 + 0.1)), 0 8px 32px rgba(0, 99, 181, calc(0.12 + var(--s) * 0.28)); }
.ds-cta:active { transform: translateY(0); }
.ds-cta__icon { width: 12px; height: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ds-cta__icon svg { width: 100%; height: 100%; }
.ds-cta__shimmer {
  position: absolute; top: 0; bottom: 0; left: -80%; width: 55%;
  background: linear-gradient(105deg, transparent 35%, rgba(249, 189, 21, 0.25) 50%, transparent 65%);
  transform: skewX(-20deg); pointer-events: none; transition: left 0s;
}
.ds-cta:hover .ds-cta__shimmer { left: 140%; transition: left 0.55s ease; }

.ds-burger {
  display: flex; flex-direction: column; justify-content: center; gap: 4px;
  width: 32px; height: 32px; padding: 5px; border: none; background: transparent;
  cursor: pointer; border-radius: 8px; transition: background 0.2s;
}
@media (min-width: 1024px) { .ds-burger { display: none; } }
.ds-burger__bar { display: block; height: 2px; border-radius: 2px; background: var(--color-ink-900); transition: background var(--dur) var(--ease), transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, width 0.3s ease; }
.ds-burger__bar--top, .ds-burger__bar--mid, .ds-burger__bar--bot { width: 22px; }
.ds-burger--open .ds-burger__bar--top { transform: translateY(6.5px) rotate(45deg); }
.ds-burger--open .ds-burger__bar--mid { opacity: 0; transform: scaleX(0); }
.ds-burger--open .ds-burger__bar--bot { transform: translateY(-6.5px) rotate(-45deg); }

.ds-drawer {
  position: relative; z-index: 2;
  padding: 0 1.5rem 1.25rem;
  background: rgba(253, 252, 248, 0.97);
  backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
  box-shadow: 0 8px 40px rgba(15, 13, 11, 0.09);
}
@media (min-width: 1024px) { .ds-drawer { display: none; } }
.ds-drawer__sep { height: 1px; margin: 0 -1.5rem 0.875rem; background: linear-gradient(90deg, transparent, rgba(15, 13, 11, 0.06) 20%, rgba(15, 13, 11, 0.06) 80%, transparent); }
.ds-drawer__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.ds-drawer__item { opacity: 0; transform: translateX(-8px); animation: drawerIn 0.42s cubic-bezier(0.16, 1, 0.3, 1) calc(50ms + var(--i) * 40ms) forwards; }
@keyframes drawerIn { to { opacity: 1; transform: translateX(0); } }
.ds-drawer__link { display: flex; align-items: center; gap: 0.7rem; width: 100%; padding: 0.65rem 0.875rem; border: none; background: transparent; border-radius: 0.625rem; font-family: var(--font-family-body, system-ui, sans-serif); font-size: 0.875rem; font-weight: 500; color: var(--color-ink-800); cursor: pointer; text-align: left; transition: background 0.2s, color 0.2s, padding-left 0.28s cubic-bezier(0.16, 1, 0.3, 1); }
.ds-drawer__link:hover { background: var(--color-sapphire-50); color: var(--color-sapphire-700); padding-left: 1.125rem; }
.ds-drawer__dot { width: 4px; height: 4px; border-radius: 50%; background: var(--color-brand-500); flex-shrink: 0; opacity: 0; transform: scale(0); transition: opacity 0.2s, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1); }
.ds-drawer__link:hover .ds-drawer__dot { opacity: 1; transform: scale(1); }
.ds-drawer__cta { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; margin-top: 0.875rem; padding: 0.85rem 1.5rem; border-radius: 9999px; background: linear-gradient(135deg, var(--color-sapphire-700), var(--color-sapphire-800)); color: white; font-family: var(--font-family-body, system-ui, sans-serif); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; box-shadow: 0 4px 20px rgba(0, 99, 181, 0.28); transition: transform 0.22s, box-shadow 0.22s; opacity: 0; animation: drawerIn 0.42s cubic-bezier(0.16, 1, 0.3, 1) calc(50ms + 6 * 40ms) forwards; }
.ds-drawer__cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0, 99, 181, 0.38); }
.ds-drawer__cta-icon { width: 15px; height: 15px; flex-shrink: 0; }

.ds-drawer-enter-active { transition: opacity 0.32s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.ds-drawer-leave-active { transition: opacity 0.22s ease, transform 0.28s ease; }
.ds-drawer-enter-from, .ds-drawer-leave-to { opacity: 0; transform: translateY(-8px); }
.ds-drawer-enter-to, .ds-drawer-leave-from { opacity: 1; transform: translateY(0); }
</style>
