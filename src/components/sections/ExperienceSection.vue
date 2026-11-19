
<script setup lang="ts">
import { ref } from 'vue'
import { experiences } from '@/data/experience'
import ExperienceCard from '@/components/ui/ExperienceCard.vue'

const activeExperienceId = ref<string | null>(
  experiences[0]?.id ?? null
)

function toggleExperience(id: string) {
  activeExperienceId.value =
    activeExperienceId.value === id ? null : id
}
</script>

<template>
  <section id="experience" class="experience-section">
    <div class="section-heading">
      <div class="section-title">
        <span class="section-number">[02]</span>
        <h2>Experience</h2>
      </div>

      <span class="section-caption">
        MY PROFESSIONAL JOURNEY
      </span>
    </div>

    <ExperienceCard
      v-for="(experience, index) in experiences"
      :key="experience.id"
      :experience="experience"
      :index="index"
      :expanded="activeExperienceId === experience.id"
      @toggle="toggleExperience(experience.id)"
    />
  </section>
</template>

<style scoped>

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
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
  margin: 0;
  font-weight: 400;
}

@media (max-width: 650px) {
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
