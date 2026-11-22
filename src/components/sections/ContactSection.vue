<script setup lang="ts">
import { computed } from 'vue'
import { profile } from '@/data/profile'

const contactLinks = computed(() => [
  ...(profile.email
    ? [{
      label: 'EMAIL',
      value: profile.email,
      url: `mailto:${profile.email}`,
    }]
    : []),
  ...(profile.linkedinUrl
    ? [{
      label: 'LINKEDIN',
      value: 'Connect on LinkedIn',
      url: profile.linkedinUrl,
    }]
    : []),
  ...(profile.githubUrl
    ? [{
      label: 'GITHUB',
      value: 'Explore my GitHub',
      url: profile.githubUrl,
    }]
    : []),
])
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-meta">

      <span class="section-caption">
        END OF INDEX — START OF CONVERSATION
      </span>
    </div>

    <div class="contact-intro">
      <h2>
        Have something in mind?
        <em>Let's talk.</em>
      </h2>

      <p>
        Interesting projects, engineering challenges,
        and new opportunities.
      </p>
    </div>

    <div v-if="contactLinks.length" class="contact-links">
      <a v-for="link in contactLinks" :key="link.label" :href="link.url"
        :target="link.label === 'EMAIL' ? undefined : '_blank'"
        :rel="link.label === 'EMAIL' ? undefined : 'noopener noreferrer'" class="contact-link">
        <span class="link-label">{{ link.label }}</span>
        <span class="link-value">{{ link.value }}</span>
        <span class="link-arrow" aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding-bottom: 80px;
}

.contact-meta {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 24px;
}

.section-number,
.section-caption,
.link-label {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
}

.section-number {
  color: var(--color-accent);
}

.section-caption {
  color: var(--color-text-muted);
}

.contact-intro {
  padding-block: clamp(60px, 9vw, 120px);
}

.contact-intro h2 {
  font-family: var(--font-display);
  font-size: clamp(44px, 5vw, 76px);
  line-height: 1.1;
  font-weight: 400;
  max-width: 900px;
}

.contact-intro h2 em {
  display: block;
  color: var(--color-accent);
  font-weight: 400;
}

.contact-intro p {
  margin-top: 28px;
  color: var(--color-text-muted);
  font-size: 15px;
  line-height: 1.8;
}

.contact-link {
  display: grid;
  grid-template-columns: 130px 1fr 32px;
  align-items: center;
  gap: 20px;
  padding: 25px 0;
  border-top: 1px solid var(--color-border);
  transition: color var(--transition-fast);
}

.contact-link:last-child {
  border-bottom: 1px solid var(--color-border);
}

.link-label {
  color: var(--color-accent);
}

.link-value {
  font-family: var(--font-body);
  font-size: clamp(15px, 1.7vw, 20px);
  overflow-wrap: anywhere;
}

.link-arrow {
  font-size: 24px;
  color: var(--color-accent);
  transition: transform var(--transition-normal);
}

.contact-link:hover .link-value {
  color: var(--color-accent);
}

.contact-link:hover .link-arrow {
  transform: translate(4px, -4px);
}

@media (max-width: 650px) {
  .contact-meta {
    flex-direction: column;
  }

  .contact-link {
    grid-template-columns: 1fr 28px;
    gap: 10px;
  }

  .link-label {
    grid-column: 1 / -1;
  }

  .link-arrow {
    grid-column: 2;
    grid-row: 2;
  }
}

@media (prefers-reduced-motion: reduce) {

  .contact-link,
  .link-arrow {
    transition: none;
  }
}
</style>
