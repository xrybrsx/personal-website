<script setup lang="ts">
import { ref, computed, nextTick, onUnmounted, type ComponentPublicInstance } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard.vue'

const showAll = ref(false)
const isAnimating = ref(false)

const extraProjectsRef = ref<HTMLElement | null>(null)
const lastVisibleProjectRef = ref<HTMLElement | null>(null)
const projectsFooterRef = ref<HTMLElement | null>(null)

function setLastVisibleProject(element: Element | ComponentPublicInstance | null) {
  lastVisibleProjectRef.value = element instanceof HTMLElement ? element : null
}

const firstProjects = computed(() => projects.slice(0, 2))
const remainingProjects = computed(() => projects.slice(2))

let animation: gsap.core.Tween | undefined

async function toggleProjects() {
  const element = extraProjectsRef.value

  if (!element || isAnimating.value) return

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  isAnimating.value = true
  animation?.kill()

  if (!showAll.value) {
    // EXPAND
    showAll.value = true
    await nextTick()

    gsap.set(element, {
      visibility: 'visible',
    })

    if (reducedMotion) {
      gsap.set(element, {
        clearProps: 'height,opacity,visibility',
      })
      isAnimating.value = false
      ScrollTrigger.refresh()
      return
    }

    animation = gsap.fromTo(
      element,
      {
        height: 0,
        opacity: 0,
      },
      {
        height: 'auto',
        opacity: 1,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(element, {
            clearProps: 'height,opacity,visibility',
          })

          isAnimating.value = false
          ScrollTrigger.refresh()
        },
      },
    )
  } else {
    // COLLAPSE
    const target = lastVisibleProjectRef.value
    const footer = projectsFooterRef.value
    const returnY = target && footer
      ? Math.max(
          0,
          target.getBoundingClientRect().top + window.scrollY - 96,
          footer.getBoundingClientRect().bottom + window.scrollY
            - element.getBoundingClientRect().height - window.innerHeight + 24,
        )
      : window.scrollY

    const finishCollapse = async () => {
      showAll.value = false

      try {
        await nextTick()
        // The hidden class owns the collapsed styles; don't leave inline styles
        // behind for the next expansion.
        gsap.set(element, { clearProps: 'height,opacity,visibility' })
        ScrollTrigger.refresh()

        if (reducedMotion) {
          window.scrollTo({ top: returnY, behavior: 'instant' })
        }
      } finally {
        isAnimating.value = false
      }
    }

    if (reducedMotion) {
      await finishCollapse()
      return
    }

    // Use the same progress for scrolling and collapsing so the footer moves
    // back into place as the page returns to the second project.
    const collapse = {
      y: window.scrollY,
      height: element.getBoundingClientRect().height,
      opacity: 1,
    }
    animation = gsap.to(collapse, {
      y: returnY,
      height: 0,
      opacity: 0,
      duration: Math.min(1.2, Math.max(0.6, Math.abs(collapse.y - returnY) / 2400)),
      ease: 'power2.inOut',
      onUpdate: () => {
        gsap.set(element, { height: collapse.height, opacity: collapse.opacity })
        window.scrollTo({ top: collapse.y, behavior: 'instant' })
      },
      onComplete: () => {
        void finishCollapse()
      },
    })
  }
}

onUnmounted(() => {
  animation?.kill()
})
</script>


<template>
  <section id="projects" class="projects-section">
    <div class="section-heading">
      <div class="section-title">

        <h2>Selected Projects</h2>
      </div>

      <span class="section-caption">
        WORK / INDEX
      </span>
    </div>


    <div class="projects-list">
      <!-- First two projects -->
      <template v-for="(project, index) in firstProjects" :key="project.id">
        <div v-if="index === firstProjects.length - 1" :ref="setLastVisibleProject" class="last-visible-project">
          <ProjectCard :project="project" :index="index" />
        </div>

        <ProjectCard v-else :project="project" :index="index" />
      </template>

      <!-- Additional projects -->
      <div ref="extraProjectsRef" class="extra-projects" :class="{ 'is-hidden': !showAll }" :inert="!showAll"
        :aria-hidden="!showAll">
        <ProjectCard v-for="(project, index) in remainingProjects" :key="project.id" :project="project"
          :index="index + 2" />
      </div>

      <!-- Show More / Show Less -->
      <div v-if="remainingProjects.length" ref="projectsFooterRef" class="projects-footer">
        <button type="button" class="projects-toggle" :disabled="isAnimating" :aria-expanded="showAll"
          @click="toggleProjects">
          {{ showAll ? 'Show Less' : 'Show More Projects' }}

          <span class="toggle-icon" aria-hidden="true">
            {{ showAll ? '−' : '+' }}
          </span>
        </button>
      </div>
    </div>

  </section>
</template>

<style scoped>
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 20px;
}

.section-number,
.section-caption {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
}

.section-number {
  color: var(--color-accent);
}

.section-caption {
  color: var(--color-text-muted);
}

.section-title h2 {
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 400;
  margin: 0;
}

@media (max-width: 650px) {
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}

.extra-projects {
  overflow: hidden;
}

.extra-projects.is-hidden {
  height: 0;
  opacity: 0;
  visibility: hidden;
}

.projects-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 40px 0 20px;
}

.projects-toggle {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding: 14px 24px;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 12px;
  cursor: pointer;
  transition:
    background var(--transition-normal),
    border-color var(--transition-normal);
}

.projects-toggle:hover {
  border-color: var(--color-accent);
  background: var(--color-surface);
}

.projects-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.toggle-icon {
  font-size: 20px;
  color: var(--color-accent);
  line-height: 1;
}

.projects-count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
}

@media (max-width: 650px) {
  .projects-footer {
    gap: 14px;
    padding-top: 28px;
  }

  .projects-toggle {
    gap: 16px;
    padding: 12px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-toggle {
    transition: none;
  }
}
</style>
