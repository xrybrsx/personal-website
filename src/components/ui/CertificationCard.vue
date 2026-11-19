
<script setup lang="ts">
import type { Certification } from '@/types/certification'

defineProps<{
  certification: Certification
}>()
</script>

<template>
  <article class="certification-entry">
    <div>
      <h3>{{ certification.name }}</h3>
      <p>{{ certification.issuer }}</p>
    </div>

    <div class="certification-meta">
      <span v-if="certification.year">
        {{ certification.year }}
      </span>

      <a
        v-if="certification.credentialUrl"
        :href="certification.credentialUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        View ↗
      </a>
    </div>
  </article>
</template>

<style scoped>
.certification-entry {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
  padding: 25px 0;
  border-bottom: 1px solid var(--color-border);
}

.certification-entry h3 {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 6px;
}

.certification-entry p {
  font-size: 13px;
  color: var(--color-text-muted);
}

.certification-meta {
  display: flex;
  gap: 20px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.certification-meta a {
  color: var(--color-accent);
}

@media (max-width: 600px) {
  .certification-entry {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
