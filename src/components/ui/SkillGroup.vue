
<script setup lang="ts">
import type { SkillCategory } from '@/types/skill'

defineProps<{
  category: SkillCategory
}>()
</script>

<template>
  <article class="skill-group">
    <h3>{{ category.title }}</h3>

    <div class="skill-list">
      <span
        v-for="skill in category.skills"
        :key="skill"
      >
        {{ skill }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.skill-group {
  padding: 28px 0;
  border-bottom: 1px solid var(--color-border);
}

.skill-group h3 {
  font-family: var(--font-mono);
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-list span {
  font-size: 14px;
  padding: 7px 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text);
}
</style>
