<script setup lang="ts">
import type { Experience } from '@/types/experience'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineProps<{
  experience: Experience
  index: number
  expanded: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()


const prefersReducedMotion = () =>
  window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

function onEnter(el: Element, done: () => void) {
  if (prefersReducedMotion()) {
    done()
    ScrollTrigger.refresh()
    return
  }

  const details = el as HTMLElement
  const items = details.querySelectorAll(
    '.responsibility-list li',
  )

  gsap.set(details, {
    height: 0,
    opacity: 0,
  })

  const timeline = gsap.timeline({
    onComplete: () => {
      gsap.set(details, {
        clearProps: 'height,opacity',
      })
      done()
      ScrollTrigger.refresh()
    },
  })

  timeline.to(details, {
    height: 'auto',
    opacity: 1,
    duration: 0.55,
    ease: 'power2.inOut',
  })

  if (items.length) {
    timeline.from(
      items,
      {
        opacity: 0,
        y: 12,
        stagger: 0.06,
        duration: 0.4,
        ease: 'power2.out',
      },
      0.15,
    )
  }
}

function onLeave(el: Element, done: () => void) {
  if (prefersReducedMotion()) {
    done()
    ScrollTrigger.refresh()
    return
  }

  gsap.to(el, {
    height: 0,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.inOut',
    onComplete: () => {
      done()
      ScrollTrigger.refresh()
    },
  })
}

</script>

<template>
  <article class="experience-entry" :class="{ 'is-expanded': expanded }">
    <button class="experience-trigger" type="button" :aria-expanded="expanded"
      :aria-controls="`experience-details-${experience.id}`" @click="emit('toggle')">
      <span class="entry-number">
        {{ String(index + 1).padStart(2, '0') }} /
      </span>

      <span class="entry-heading">


        <span class="entry-company-row">
          <img v-if="experience.logo" :src="experience.logo" alt="" class="company-logo" />

          <span class="entry-company">
            {{ experience.displayCompany ?? experience.company }}
          </span>
        </span>

        <span v-if="experience.relationship" class="entry-relationship">
          {{ experience.relationship }}

          <img v-if="experience.employerLogo" :src="experience.employerLogo" alt="" class="employer-logo" />
        </span>


        <span class="entry-role">
          {{ experience.role }}

        </span>

      </span>

      <span class="entry-period">
        {{ experience.period }}
      </span>

      <span class="entry-arrow" aria-hidden="true">
        {{ expanded ? '↖' : '↗' }}
      </span>
    </button>

    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <div v-if="expanded" :id="`experience-details-${experience.id}`" class="details-reveal">
        <p class="entry-description">
          {{ experience.description }}
        </p>

        <div v-if="experience.responsibilities?.length" class="responsibilities">
          <p class="detail-label">
            SELECTED CONTRIBUTIONS /
            {{ String(experience.responsibilities?.length ?? 0).padStart(2, '0') }}
          </p>

          <ol class="responsibility-list">
            <li v-for="(responsibility, i) in experience.responsibilities ?? []" :key="i">
              <span class="responsibility-number">
                {{ String(i + 1).padStart(2, '0') }}
              </span>

              <span>{{ responsibility }}</span>
            </li>
          </ol>
        </div>
        <div class="technology-list">
          <span v-for="tech in experience.technologies" :key="tech" class="technology-tag">
            {{ tech }}
          </span>
        </div>
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.experience-entry {
  border-bottom: 1px solid var(--color-border);
}

/* Full-width clickable heading */
.experience-trigger {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto 32px;
  align-items: start;
  gap: 24px;
  width: 100%;
  padding: 38px 0;
  background: transparent;
  border: 0;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
}

.entry-number,
.entry-period,
.entry-role,
.detail-label {
  font-family: var(--font-mono);
  font-size: 12px;
}

.entry-number {
  color: var(--color-accent);
  padding-top: 12px;
}

.entry-heading {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
}

.entry-company {
  font-family: var(--font-display);
  font-size: clamp(27px, 3vw, 39px);
  line-height: 1.1;
  overflow-wrap: anywhere;
  transition: color var(--transition-fast);
}

.entry-relationship {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.entry-role {
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
}

.entry-period {
  color: var(--color-text-muted);
  padding-top: 10px;
  white-space: nowrap;
}

.entry-arrow {
  font-size: 25px;
  color: var(--color-accent);
  transition: transform var(--transition-normal);
}

.experience-trigger:hover .entry-company,
.is-expanded .entry-company {
  color: var(--color-accent);
}

.experience-trigger:hover .entry-arrow {
  transform: translate(3px, -3px);
}

.experience-trigger:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

/* Expanded content */
.experience-details {
  padding: 0 48px 48px 80px;
}

.entry-description {
  max-width: 780px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 36px;
}

.detail-label {
  color: var(--color-accent);
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.responsibility-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
}

.responsibility-list li {
  display: grid;
  grid-template-columns: 35px minmax(0, 1fr);
  gap: 20px;
  padding: 16px 0;
  border-top: 1px solid var(--color-border);
  font-size: 14px;
  line-height: 1.7;
}

.responsibility-number {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 12px;
}

.technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.technology-tag {
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 7px 13px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
}

@media (max-width: 650px) {
  .experience-trigger {
    grid-template-columns: 30px minmax(0, 1fr) 25px;
    gap: 12px;
    padding: 28px 0;
  }

  .entry-period {
    grid-column: 2;
    padding: 0;
  }

  .entry-arrow {
    grid-column: 3;
    grid-row: 1;
  }

  .experience-details {
    padding: 0 0 32px 42px;
  }

  .responsibility-list li {
    gap: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {

  .entry-company,
  .entry-arrow {
    transition: none;
  }
}


.entry-company-row {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
}

.company-logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
  flex-shrink: 0;
}

.entry-relationship {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.employer-logo {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

@media (max-width: 650px) {
  .company-logo {
    width: 28px;
    height: 28px;
  }

  .entry-company-row {
    gap: 12px;
  }
}

.details-reveal {
  overflow: hidden;
}

.entry-arrow {
  display: inline-block;
  transform-origin: center;
  transition:
    transform 300ms ease,
    color 300ms ease;
}

.is-expanded .entry-arrow {
  transform: rotate(-90deg);
}

@media (prefers-reduced-motion: reduce) {
  .entry-arrow {
    transition: none;
  }
}
</style>
