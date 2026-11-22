<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { profile } from '@/data/profile'

const heroRef = ref<HTMLElement | null>(null)

let gsapContext: gsap.Context | undefined

onMounted(() => {
  if (!heroRef.value) return

  // Respect users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  gsapContext = gsap.context(() => {
    const timeline = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 0.8,
      },
    })

    timeline
      .from('.hero-eyebrow', {
        y: 15,
        autoAlpha: 0,
        duration: 0.5,
      })
      .from(
        '.hero-content h1',
        {
          y: 35,
          autoAlpha: 0,
        },
        0.15,
      )
      .from(
        '.hero-description',
        {
          y: 20,
          autoAlpha: 0,
        },
        0.35,
      )
      .from(
        '.hero-actions a',
        {
          y: 15,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.6,
        },
        0.45,
      )
      .from(
        '.code-card',
        {
          x: 35,
          autoAlpha: 0,
          duration: 1,
        },
        0.5,
      )
  }, heroRef.value)
})

onUnmounted(() => {
  gsapContext?.revert()
})
</script>


<template>
  <section id="home" ref="heroRef" class="hero">
    <div class="hero-content">
      <span class="hero-eyebrow">
        Software Developer
      </span>

      <h1>{{ profile.name }}</h1>

      <p class="hero-description">
        {{ profile.tagline }}
      </p>

      <div class="hero-actions">
        <a href="#experience" class="button-primary">
          Explore Work ↗
        </a>

        <a href="#about" class="button-secondary">
          About Me
        </a>
      </div>
    </div>

    <div class="hero-visual">
      <div class="code-card">
        <div class="code-card-header">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <pre><code>{
  "role": "Software Developer",
  "focus": ["Java", "APIs", "Cloud"],
  "tools": ["Spring Boot", "Azure", "SQL"]
}</code></pre>
      </div>
    </div>
  </section>
</template>


<style scoped>
/* ========================================
   HERO LAYOUT
======================================== */

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: 64px;

  min-height: 520px;
  padding-block: 70px;

  position: relative;
  isolation: isolate;
}

.hero-content {
  max-width: 620px;
  min-width: 0;
}

/* ========================================
   HERO TYPOGRAPHY
======================================== */

.hero-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 24px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(52px, 5vw, 86px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.035em;
  margin-bottom: 28px;
}

.hero-description {
  font-family: var(--font-mono);
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.8;
  color: var(--color-text-muted);
  max-width: 520px;
  margin-bottom: 32px;
}

/* ========================================
   HERO BUTTONS
======================================== */

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.button-primary,
.button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;
  padding: 15px 28px;

  font-family: var(--font-mono);
  font-size: 13px;
  text-decoration: none;

  transition:
    background var(--transition-normal),
    border-color var(--transition-normal),
    transform var(--transition-normal);
}

.button-primary {
  background: var(--color-accent);
  color: var(--color-background);
}

.button-secondary {
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.button-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
}

.button-secondary:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.button-primary:focus-visible,
.button-secondary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

/* ========================================
   HERO VISUAL
======================================== */

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  min-width: 0;
}

/* Decorative curved outline */

.hero-visual::before {
  content: "";
  position: absolute;

  width: min(420px, 85vw);
  aspect-ratio: 1;

  border: 1px solid rgba(183, 155, 229, 0.16);
  border-radius: 45% 55% 65% 35%;

  transform: rotate(-30deg);
  pointer-events: none;
}

/* ========================================
   CODE CARD
======================================== */

.code-card {
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 460px;
  min-width: 0;
  padding: 28px;

  background: rgba(29, 27, 37, 0.85);
  backdrop-filter: blur(12px);

  border: 1px solid var(--color-border);
  border-radius: 14px;
}

.code-card-header {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 20px;
}

.code-card-header span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.code-card pre {
  margin: 0;
  overflow-x: auto;

  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 2;
  color: var(--color-text);
}

/* ========================================
   TABLET
======================================== */

@media (max-width: 900px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
    min-height: auto;

    padding-block: 64px 80px;
    gap: 48px;
  }

  .hero h1 {
    font-size: clamp(48px, 8vw, 72px);
  }

  .hero-visual::before {
    width: min(280px, 75vw);
  }
}

/* ========================================
   MOBILE
======================================== */

@media (max-width: 600px) {
  .hero {
    gap: 32px;
    padding-block: 48px 56px;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    margin-bottom: 16px;
  }

  .hero h1 {
    font-size: clamp(42px, 11vw, 58px);
    line-height: 1.08;
    margin-bottom: 20px;
  }

  .hero-description {
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 28px;
  }

  .hero-actions {
    gap: 10px;
  }

  .button-primary,
  .button-secondary {
    padding: 12px 18px;
    font-size: 12px;
  }

  .hero-visual {
    width: 100%;
  }

  .hero-visual::before {
    width: min(220px, 70vw);
  }

  .code-card {
    max-width: 100%;
    padding: 20px;
    border-radius: 12px;
  }

  .code-card-header {
    margin-bottom: 12px;
  }

  .code-card pre {
    font-size: 11px;
    line-height: 1.8;
  }
}

/* ========================================
   ACCESSIBILITY
======================================== */

@media (prefers-reduced-motion: reduce) {

  .button-primary,
  .button-secondary {
    transition: none;
  }
}
</style>
