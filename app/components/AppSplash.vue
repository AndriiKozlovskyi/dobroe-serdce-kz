<script setup lang="ts">
const visible = ref(true)
const started = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { started.value = true })
  })
})

function onSpinDone() {
  visible.value = false
}
</script>

<template>
  <Transition name="splash">
    <div v-if="visible" class="splash" aria-hidden="true">
      <div class="splash__body">
        <div class="splash__ring">
          <div class="splash__track-outer" />
          <div class="splash__track-inner" />
          <img
            src="/logo.webp"
            alt=""
            class="splash__logo"
            :class="{ 'splash__logo--spin': started }"
            @animationend="onSpinDone"
          />
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
  background: #ffffff;
}

/* Subtle radial glow on the otherwise flat white */
.splash::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 60% at 50% 50%,
    rgba(0, 99, 181, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* ── Body appear animation ────────────────────── */
.splash__body {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bodyIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes bodyIn {
  from { opacity: 0; transform: scale(0.82); }
  to   { opacity: 1; transform: scale(1); }
}

/* ── Ring container ───────────────────────────── */
.splash__ring {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Static track circles ─────────────────────── */
.splash__track-outer,
.splash__track-inner {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.splash__track-outer {
  inset: -20px;
  border: 1.5px solid rgba(0, 99, 181, 0.07);
}
.splash__track-inner {
  inset: -7px;
  border: 1.5px solid rgba(249, 189, 21, 0.11);
}

/* ── Outer arc — sapphire, clockwise ──────────── */
.splash__ring::before {
  content: '';
  position: absolute;
  inset: -20px;
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
  animation: arcCW 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ── Inner arc — gold, counter-clockwise ─────── */
.splash__ring::after {
  content: '';
  position: absolute;
  inset: -7px;
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
  animation: arcCCW 0.9s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ── Logo ─────────────────────────────────────── */
.splash__logo {
  position: relative;
  z-index: 1;
  width: 60px;
  height: 60px;
  object-fit: contain;
  transform: rotate(180deg);
  opacity: 0;
  filter: drop-shadow(0 3px 12px rgba(0, 99, 181, 0.15));
  transform-origin: center center;
}

.splash__logo--spin {
  animation: halfSpin 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes halfSpin {
  from { transform: rotate(180deg); opacity: 0; }
  35%  { opacity: 1; }
  to   { transform: rotate(0deg);   opacity: 1; }
}

@keyframes arcCW  { to { transform: rotate(360deg);  } }
@keyframes arcCCW { to { transform: rotate(-360deg); } }

/* ── Splash transition ────────────────────────── */
.splash-enter-active { transition: opacity 0.3s ease; }
.splash-leave-active { transition: opacity 0.5s ease; }
.splash-enter-from, .splash-leave-to { opacity: 0; }
</style>
