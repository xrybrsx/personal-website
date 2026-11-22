<script setup lang="ts">
import { skillCategories } from '@/data/skills'
import SkillGroup from '@/components/ui/SkillGroup.vue'
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="section-heading">

      <h2>Technical Skills</h2>
    </div>

    <div class="skills-grid">
      <SkillGroup v-for="category in skillCategories" :key="category.id" :category="category" />
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 24px;
}

.section-number {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent);
}

.section-heading h2 {
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 400;
  margin: 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 48px;
}

@media (max-width: 700px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
