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
      <div class="page-loader__bg" />
      <div class="page-loader__overlay" />
      <div class="page-loader__body">
        <div class="page-loader__ring">
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
  overflow: hidden;
}

.page-loader__bg {
  position: absolute;
  inset: -5%;
  background: url('/about/care.webp') center / cover no-repeat;
  filter: blur(22px);
  transform: scale(1.08);
}

.page-loader__overlay {
  position: absolute;
  inset: 0;
  background: rgba(2, 12, 34, 0.68);
}

.page-loader__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Spinning ring around logo */
.page-loader__ring {
  position: relative;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-loader__ring::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2.5px solid rgba(255, 255, 255, 0.12);
  border-top-color: rgba(249, 189, 21, 0.85);
  animation: loaderSpin 0.9s linear infinite;
}
@keyframes loaderSpin {
  to { transform: rotate(360deg); }
}

.page-loader__logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.4));
}

/* Transition */
.page-loader-enter-active { transition: opacity 0.18s ease; }
.page-loader-leave-active { transition: opacity 0.32s ease; }
.page-loader-enter-from,
.page-loader-leave-to    { opacity: 0; }
</style>
