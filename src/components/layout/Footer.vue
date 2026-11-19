
<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <span>© {{ currentYear }} Raya Bakarska</span>
    <span>SOFTWARE ENGINEER / SOFIA, BG</span>
    <a href="#home">BACK TO TOP ↑</a>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  padding-block: 30px;
  border-top: 1px solid var(--color-border);

  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.site-footer a {
  color: var(--color-accent);
  transition: color var(--transition-fast);
}

.site-footer a:hover {
  color: var(--color-accent-hover);
}
</style>
