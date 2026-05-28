<script setup lang="ts">
const visible = ref(true)

onMounted(() => {
  setTimeout(() => { visible.value = false }, 0)
})
</script>

<template>
  <Transition name="splash">
    <div v-if="visible" class="splash" aria-hidden="true">
      <div class="splash__bg" />
      <div class="splash__overlay" />
      <div class="splash__body">
        <img src="/logo.webp" alt="" class="splash__logo" />
        <p class="splash__name">Доброе сердце</p>
        <div class="splash__dots">
          <span class="splash__dot" />
          <span class="splash__dot" />
          <span class="splash__dot" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Blurred photo background */
.splash__bg {
  position: absolute;
  inset: -5%;
  background: url('/about/care.webp') center / cover no-repeat;
  filter: blur(22px);
  transform: scale(1.08);
}

/* Dark overlay for contrast */
.splash__overlay {
  position: absolute;
  inset: 0;
  background: rgba(2, 12, 34, 0.62);
}

/* Logo + text */
.splash__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: splashIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes splashIn {
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}

.splash__logo {
  width: 96px;
  height: 96px;
  object-fit: contain;
  filter: drop-shadow(0 4px 24px rgba(0, 0, 0, 0.4));
}

.splash__name {
  font-family: var(--font-family-display, serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}

/* Loading dots */
.splash__dots {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.25rem;
}
.splash__dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  animation: dotPulse 1.2s ease-in-out infinite;
}
.splash__dot:nth-child(2) { animation-delay: 0.2s; }
.splash__dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes dotPulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40%           { opacity: 1;   transform: scale(1.15); }
}

/* Fade-out transition */
.splash-enter-active { transition: opacity 0.4s ease; }
.splash-leave-active { transition: opacity 0.55s ease; }
.splash-enter-from, .splash-leave-to { opacity: 0; }
</style>
