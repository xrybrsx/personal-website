
<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div class="app-layout">
    <div class="page-container">
      <Navbar />

      <slot />

      <Footer />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: var(--container-width);
  margin-inline: auto;
  padding-inline: var(--page-padding);
}
</style>
