
<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

const links = [
  { number: '00', label: 'Home', href: '#home' },
  { number: '01', label: 'Experience', href: '#experience' },
  { number: '02', label: 'Projects', href: '#projects' },
  { number: '03', label: 'About', href: '#about' },
  { number: '06', label: 'Contact', href: '#contact' },
]

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <nav class="navbar" aria-label="Main navigation">
      <a href="#home" class="navbar-logo" @click="closeMenu">
        RB
      </a>

      <!-- Desktop navigation -->
      <ul class="navbar-links">
        <li v-for="link in links" :key="link.number">
          <a :href="link.href">
            <span>[{{ link.number }}]</span>
            {{ link.label }}
          </a>
        </li>
      </ul>

      <a href="#contact" class="navbar-cv">
        CV ↗
      </a>

      <!-- Mobile menu toggle -->
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'CLOSE' : 'MENU' }}
        <span aria-hidden="true">
          {{ menuOpen ? '×' : '☰' }}
        </span>
      </button>
    </nav>

    <!-- Mobile navigation -->
    <div
      v-if="menuOpen"
      id="mobile-navigation"
      class="mobile-menu"
    >
      <a
        v-for="link in links"
        :key="link.number"
        :href="link.href"
        class="mobile-link"
        @click="closeMenu"
      >
        <span>[{{ link.number }}]</span>
        {{ link.label }}
      </a>

      <a
        href="#contact"
        class="mobile-cv"
        @click="closeMenu"
      >
        Curriculum Vitae ↗
      </a>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: relative;
  z-index: 20;
  border-bottom: 1px solid var(--color-border);
}

.navbar {
  min-height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.navbar-logo {
  font-family: var(--font-display);
  font-size: 28px;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.5vw, 40px);
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-links a,
.navbar-cv,
.menu-toggle {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.025em;
}

.navbar-links a {
  text-transform: uppercase;
  white-space: nowrap;
}

.navbar-links a span {
  color: var(--color-accent);
  margin-right: 6px;
}

.navbar-links a:hover {
  color: var(--color-accent);
}

.navbar-cv {
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 12px 30px;
  white-space: nowrap;
}

.menu-toggle {
  display: none;
  align-items: center;
  gap: 14px;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 10px 18px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.menu-toggle span {
  color: var(--color-accent);
  font-size: 18px;
}

/* Mobile */
.mobile-menu {
  display: none;
}

@media (max-width: 900px) {
  .navbar {
    min-height: 76px;
  }

  .navbar-links,
  .navbar-cv {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 24px 0 36px;
    background: var(--color-background);
  }

  .mobile-link {
    display: flex;
    align-items: baseline;
    gap: 20px;
    padding: 18px 0;
    border-bottom: 1px solid var(--color-border);
    font-family: var(--font-display);
    font-size: clamp(32px, 7vw, 46px);
  }

  .mobile-link span {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-accent);
  }

  .mobile-cv {
    margin-top: 36px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-accent);
    text-transform: uppercase;
  }
}
</style>
