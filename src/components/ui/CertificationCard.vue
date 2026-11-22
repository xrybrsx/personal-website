<script setup lang="ts">
import type { Certification } from '@/types/certification'

defineProps<{
  certification: Certification
}>()

const issuerLogo = (issuer: string): string | undefined => {
  const name = issuer.toLowerCase()

  if (name.includes('oracle')) {
    return `${import.meta.env.BASE_URL}logos/oracle.png`
  }

  if (name.includes('microsoft')) {
    return `${import.meta.env.BASE_URL}logos/microsoft.png`
  }

  return undefined
}
</script>

<template>
  <article class="certification-entry">
    <div class="certification-logo">
      <img v-if="issuerLogo(certification.issuer)" :src="issuerLogo(certification.issuer)"
        :alt="`${certification.issuer} logo`" />
    </div>

    <div class="certification-content">
      <h3>{{ certification.name }}</h3>

      <div class="certification-details">
        <span>{{ certification.issuer }}</span>
        <span v-if="certification.year">
          / {{ certification.year }}
        </span>
      </div>
    </div>

    <a v-if="certification.credentialUrl" :href="certification.credentialUrl" target="_blank" rel="noopener noreferrer"
      class="certification-link" :aria-label="`Verify ${certification.name}`">
      <span>View Credential</span>
      <span aria-hidden="true">↗</span>
    </a>
  </article>
</template>

<style scoped>
.certification-entry {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) auto;
  align-items: center;
  gap: 28px;
  padding: 30px 12px;
  border-bottom: 1px solid var(--color-border);
  transition: background 250ms ease;
}

.certification-entry:hover {
  background: var(--color-surface);
}

.certification-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.certification-logo img {
  max-width: 85px;
  max-height: 42px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.certification-content {
  min-width: 0;
}

.certification-content h3 {
  font-family: var(--font-display);
  font-size: clamp(19px, 2vw, 25px);
  font-weight: 400;
  line-height: 1.3;
  margin: 0 0 8px;
  transition: color 250ms ease;
}

.certification-entry:hover h3 {
  color: var(--color-accent);
}

.certification-details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.certification-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent);
  white-space: nowrap;
  text-decoration: none;
}

.certification-link span:last-child {
  font-size: 20px;
  transition: transform 250ms ease;
}

.certification-link:hover span:last-child {
  transform: translate(3px, -3px);
}

.certification-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

/* Mobile */
@media (max-width: 650px) {
  .certification-entry {
    grid-template-columns: 65px minmax(0, 1fr);
    gap: 12px 16px;
    padding: 24px 0;
  }

  .certification-logo {
    justify-content: flex-start;
  }

  .certification-logo img {
    max-width: 65px;
    max-height: 36px;
  }

  .certification-content h3 {
    font-size: 18px;
  }

  .certification-details {
    font-size: 10px;
  }

  .certification-link {
    grid-column: 2;
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {

  .certification-entry,
  .certification-content h3,
  .certification-link span:last-child {
    transition: none;
  }
}
</style>
