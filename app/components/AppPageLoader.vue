<script setup lang="ts">
const loading = ref(false)
const router = useRouter()

let removeBeforeEach: (() => void) | null = null
let removeAfterEach:  (() => void) | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  removeBeforeEach = router.beforeEach(() => {
    if (hideTimer) clearTimeout(hideTimer)
    loading.value = true
  })

  removeAfterEach = router.afterEach(() => {
    hideTimer = setTimeout(() => { loading.value = false }, 120)
  })
})

onUnmounted(() => {
  removeBeforeEach?.()
  removeAfterEach?.()
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <Transition name="page-loader">
    <div v-if="loading" class="page-loader" aria-hidden="true">
      <div class="page-loader__body">
        <div class="page-loader__ring">
          <div class="page-loader__track-outer" />
          <div class="page-loader__track-inner" />
          <img src="/logo.webp" alt="" class="page-loader__logo" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

/* Barely-there radial glow so the center doesn't feel flat */
.page-loader::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 55% 55% at 50% 50%,
    rgba(0, 99, 181, 0.04) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.page-loader__body {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Ring container ───────────────────────────── */
.page-loader__ring {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Static track circles ─────────────────────── */
.page-loader__track-outer,
.page-loader__track-inner {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.page-loader__track-outer {
  inset: -16px;
  border: 1.5px solid rgba(0, 99, 181, 0.07);
}
.page-loader__track-inner {
  inset: -6px;
  border: 1.5px solid rgba(249, 189, 21, 0.10);
}

/* ── Outer arc — sapphire, clockwise ──────────── */
.page-loader__ring::before {
  content: '';
  position: absolute;
  inset: -16px;
  border-radius: 50%;
  background: conic-gradient(
    transparent             0%,
    transparent            48%,
    rgba(0, 99, 181, 0.10) 64%,
    rgba(0, 99, 181, 0.55) 82%,
    rgba(0, 99, 181, 1)   100%
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2.5px));
  mask:         radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2.5px));
  animation: arcCW 1.35s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ── Inner arc — gold, counter-clockwise ─────── */
.page-loader__ring::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: conic-gradient(
    transparent              0%,
    transparent             50%,
    rgba(249, 189, 21, 0.10) 67%,
    rgba(249, 189, 21, 0.55) 84%,
    rgba(249, 189, 21, 1)   100%
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px));
  mask:         radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px));
  animation: arcCCW 0.88s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ── Logo ─────────────────────────────────────── */
.page-loader__logo {
  position: relative;
  z-index: 1;
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 99, 181, 0.13));
  animation: logoPulse 2.6s ease-in-out infinite;
}

@keyframes arcCW  { to { transform: rotate(360deg);  } }
@keyframes arcCCW { to { transform: rotate(-360deg); } }
@keyframes logoPulse {
  0%, 100% { transform: scale(1);    opacity: 1;    }
  50%      { transform: scale(1.07); opacity: 0.86; }
}

/* ── Enter / leave ───────────────────────────── */
.page-loader-enter-active { transition: opacity 0.18s ease; }
.page-loader-leave-active { transition: opacity 0.35s ease; }
.page-loader-enter-from,
.page-loader-leave-to    { opacity: 0; }
</style>
