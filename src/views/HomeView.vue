<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const mainRef = ref<HTMLElement | null>(null)

useScrollReveal(mainRef)
</script>

<template>
  <main ref="mainRef">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <CertificationsSection />
    <ContactSection />
  </main>
</template>


<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: var(--section-spacing);
  padding-bottom: var(--section-spacing);
}
</style>
