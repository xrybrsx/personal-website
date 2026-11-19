
<script setup lang="ts">
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard.vue'
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="section-heading">
      <div class="section-title">
        <span class="section-number">[03]</span>
        <h2>Selected Projects</h2>
      </div>

      <span class="section-caption">
        WORK / INDEX
      </span>
    </div>

    <div class="projects-list">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :index="index"
      />
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
</style>
