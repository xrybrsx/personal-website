<script setup lang="ts">
import type { Project } from '@/types/project'
import ProjectPreview from '@/components/ui/ProjectPreview.vue'

defineProps<{
  project: Project
  index: number
}>()
</script>

<template>
  <article class="project-entry">
    <div class="project-main" :class="{ 'no-preview': !project.image?.length }">
      <span class="project-number">
        {{ String(index + 1).padStart(2, '0') }}
      </span>

      <div class="project-content">
        <h3>{{ project.title }}</h3>

        <p class="project-description">
          {{ project.description }}
        </p>

        <div class="project-technologies">
          <span v-for="(tech, i) in project.technologies" :key="tech">
            {{ tech }}
            <span v-if="i < project.technologies.length - 1">
              /
            </span>
          </span>
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
      <div v-if="project.image" class="project-preview-container">
        <ProjectPreview :images="project.image" :title="project.title" />
      </div>
      <span class="project-arrow" aria-hidden="true">
        ↗
      </span>
    </div>
  </article>
</template>

<style scoped>
.project-entry {
  position: relative;
  border-bottom: 1px solid var(--color-border);
  padding: 42px 0;
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

.project-entry:hover::after,
.project-entry:focus-within::after {
  transform: scaleX(1);
}

.project-main {
  display: grid;
  grid-template-columns:
    48px minmax(0, 1fr) minmax(260px, 420px) 32px;
  align-items: start;
  gap: 24px;
}


.project-number {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-accent);
  padding-top: 10px;
  grid-column: 1;
}

.project-content h3 {
  font-family: var(--font-display);
  font-size: clamp(30px, 3.2vw, 44px);
  font-weight: 400;
  line-height: 1.15;
  margin: 0 0 12px;
  transition: color var(--transition-fast);
  grid-column: 2;
  min-width: 0;
}

.project-preview-container {
  grid-column: 3;
  min-width: 0;
}

.project-description {
  max-width: 650px;
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 16px;
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

.project-links {
  display: flex;
  gap: 24px;
  margin-top: 20px;
}

.project-links a {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent);
}

.project-links a:hover {
  text-decoration: underline;
}

.project-arrow {
  font-size: 28px;
  color: var(--color-accent);
  transition: transform var(--transition-normal);
  grid-column: 4;
  grid-row: 1;
}

.project-entry:hover .project-content h3 {
  color: var(--color-accent);
}

.project-entry:hover .project-arrow,
.project-entry:focus-within .project-arrow {
  transform: translate(5px, -5px);
}


.project-content h3 {
  transition:
    color 250ms ease,
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}

.project-entry:hover .project-content h3,
.project-entry:focus-within .project-content h3 {
  color: var(--color-accent);
  transform: translateX(6px);
}


.project-preview-container {
  min-width: 0;
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.project-entry:hover .project-preview-container,
.project-entry:focus-within .project-preview-container {
  transform: translateY(-5px);
}



@media (max-width: 900px) {
  .project-main {
    grid-template-columns: 32px minmax(0, 1fr) 28px;
    gap: 16px;
  }

  .project-number {
    grid-column: 1;
    grid-row: 1;
  }

  .project-content {
    grid-column: 2;
    grid-row: 1;
  }

  .project-arrow {
    grid-column: 3;
    grid-row: 1;
  }

  .project-preview-container {
    grid-column: 2 / 4;
    grid-row: 2;
    max-width: 420px;
  }
}

@media (max-width: 650px) {
  .project-entry {
    padding: 30px 0;
  }

  .project-content h3 {
    font-size: 30px;
  }

  .project-preview-container {
    max-width: 100%;
  }
}


@media (prefers-reduced-motion: reduce) {

  .project-entry::after,
  .project-content h3,
  .project-preview-container,
  .project-arrow {
    transition: none;
  }
}

.project-main.no-preview {
  grid-template-columns: 48px minmax(0, 1fr) 32px;
}

.no-preview .project-arrow {
  grid-column: 3;
}

@media (max-width: 900px) {
  .project-main.no-preview {
    grid-template-columns: 32px minmax(0, 1fr) 28px;
  }
}
</style>
