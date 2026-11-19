
<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section id="about" class="about-section">
    <div class="section-heading">
      <span class="section-number">[01]</span>
      <h2>About</h2>
    </div>

    <div class="about-content">
      <div class="about-description">
        <p>{{ profile.about }}</p>
      </div>

      <div class="about-details">
        <div>
          <span class="detail-label">CURRENT FOCUS</span>
          <p>Java, Spring Boot & Banking Systems</p>
        </div>

        <div>
          <span class="detail-label">LOCATION</span>
          <p>{{ profile.location }}</p>
        </div>

        <div>
          <span class="detail-label">BACKGROUND</span>
          <p>Computer Science — University of Southampton</p>
        </div>
      </div>
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
  margin-bottom: 48px;
}

.section-number,
.detail-label {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

.section-heading h2 {
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 400;
  margin: 0;
}

.about-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: clamp(32px, 6vw, 100px);
}

.about-description {
  max-width: 700px;
  font-size: clamp(18px, 1.8vw, 24px);
  line-height: 1.65;
}

.about-details {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.about-details p {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 750px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>
