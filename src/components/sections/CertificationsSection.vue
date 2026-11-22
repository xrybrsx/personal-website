<script setup lang="ts">
import { certifications } from '@/data/certifications'
import CertificationCard from '@/components/ui/CertificationCard.vue'
</script>

<template>
  <section id="certifications" class="certifications-section">
    <div class="section-heading">

      <h2>Certifications</h2>
    </div>

    <div class="certifications-list">
      <CertificationCard v-for="certification in certifications" :key="certification.id"
        :certification="certification" />
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
  color: var(--color-accent);
  font-size: 12px;
}

.section-heading h2 {
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 400;
  margin: 0;
}
</style>
