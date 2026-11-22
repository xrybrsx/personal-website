<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { refreshScrollLayout } from '@/utils/refreshScrollLayout'
import type { Project } from '@/types/project'
import ProjectPreview from '@/components/ui/ProjectPreview.vue'

defineProps<{
  project: Project
  index: number
}>()

const expanded = ref(false)
const detailsRef = ref<HTMLElement | null>(null)

let animation: gsap.core.Tween | undefined

function toggleProject() {
  const element = detailsRef.value
  if (!element) return

  animation?.kill()

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  const finish = () => {
    refreshScrollLayout()
  }

  if (reducedMotion) {
    expanded.value = !expanded.value

    gsap.set(element, {
      clearProps: 'height,opacity,visibility',
    })

    finish()
    return
  }

  if (!expanded.value) {
    expanded.value = true

    gsap.set(element, {
      height: 0,
      opacity: 0,
      visibility: 'visible',
    })

    animation = gsap.to(element, {
      height: 'auto',
      opacity: 1,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(element, {
          clearProps: 'height,opacity,visibility',
        })
        finish()
      },
    })
  } else {
    animation = gsap.to(element, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        expanded.value = false
        gsap.set(element, {
          clearProps: 'height,opacity,visibility',
        })
        finish()
      },
    })
  }
  if (window.matchMedia('(pointer: fine)').matches) {
    (document.activeElement as HTMLElement)?.blur()
  }
}

onUnmounted(() => {
  animation?.kill()
})
</script>

<template>
  <article class="project-entry" :class="{ 'is-expanded': expanded }">
    <button class="project-trigger" type="button" :aria-expanded="expanded"
      :aria-controls="`project-details-${project.id}`" @click="toggleProject">
      <span class="project-number">
        {{ String(index + 1).padStart(2, '0') }}
      </span>

      <span class="project-heading">
        <span class="project-title">
          {{ project.title }}
        </span>

        <span class="project-description">
          {{ project.description }}
        </span>

        <span class="project-technologies">
          <span v-for="(tech, i) in project.technologies" :key="tech">
            {{ tech }}
            <span v-if="i < project.technologies.length - 1">
              /
            </span>
          </span>
        </span>
      </span>

      <span class="project-arrow" aria-hidden="true">
        {{ expanded ? '↖' : '↗' }}
      </span>
    </button>

    <div :id="`project-details-${project.id}`" ref="detailsRef" class="project-details"
      :class="{ 'is-collapsed': !expanded }" :aria-hidden="!expanded" :inert="!expanded">
      <div class="project-details-inner">
        <div v-if="project.image?.length" class="project-preview-container">
          <ProjectPreview :images="project.image" :title="project.title" />
        </div>

        <div v-if="project.githubUrl || project.liveUrl" class="project-links">
          <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>

          <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer">
            Live Demo ↗
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-entry {
  position: relative;
  border-bottom: 1px solid var(--color-border);
}

.project-entry::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (hover: hover) and (pointer: fine) {
  .project-entry:hover::after {
    transform: scaleX(1);
  }
}

@media (hover: none),
(pointer: coarse) {
  .project-entry.is-expanded::after {
    transform: scaleX(1);
  }
}

/* Clickable project heading */

.project-trigger {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 32px;
  align-items: start;
  gap: 24px;
  width: 100%;
  padding: 38px 0;
  background: transparent;
  border: none;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
}

.project-number {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-accent);
  padding-top: 10px;
}

.project-heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

.project-title {
  font-family: var(--font-display);
  font-size: clamp(30px, 3.2vw, 44px);
  font-weight: 400;
  line-height: 1.15;
  transition:
    color 250ms ease,
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}

.project-description {
  display: block;
  max-width: 750px;
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.project-arrow {
  font-size: 28px;
  color: var(--color-accent);
  display: inline-block;
  transition: transform 300ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .project-trigger:hover .project-title {
    color: var(--color-accent);
  }
}

@media (hover: none),
(pointer: coarse) {
  .is-expanded .project-title {
    color: var(--color-accent);
  }
}

@media (hover: hover) and (pointer: fine) {
  .project-trigger:hover .project-title {
    transform: translateX(6px);
  }
}

@media (hover: hover) and (pointer: fine) {
  .project-trigger:hover .project-arrow {
    transform: translate(3px, -3px);
  }
}

.project-trigger:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

/* Expanded project content */

.project-details {
  overflow: hidden;
}

.project-details.is-collapsed {
  height: 0;
  opacity: 0;
  visibility: hidden;
}

.project-details-inner {
  padding: 0 48px 38px 72px;
}

.project-preview-container {
  max-width: 780px;
  min-width: 0;
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.project-preview-container:hover {
  transform: translateY(-5px);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 24px;
}

.project-links a {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent);
}

.project-links a:hover {
  text-decoration: underline;
}

/* Mobile */

@media (max-width: 650px) {
  .project-trigger {
    grid-template-columns: 26px minmax(0, 1fr) 24px;
    gap: 12px;
    padding: 28px 0;
  }

  .project-number {
    font-size: 11px;
    padding-top: 7px;
  }

  .project-heading {
    gap: 12px;
  }

  .project-title {
    font-size: clamp(26px, 7vw, 34px);
  }

  .project-description {
    font-size: 14px;
    line-height: 1.7;
  }

  .project-technologies {
    font-size: 10px;
  }

  .project-arrow {
    font-size: 22px;
  }

  .project-details-inner {
    padding: 0 0 28px 38px;
  }

  .project-preview-container {
    max-width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {

  .project-entry::after,
  .project-title,
  .project-arrow,
  .project-preview-container {
    transition: none;
  }
}
</style>
