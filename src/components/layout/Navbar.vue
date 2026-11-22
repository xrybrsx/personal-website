<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'


const cvUrl = `${import.meta.env.BASE_URL}raya-bakarska-cv-2026.pdf`
const menuOpen = ref(false)

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function closeMenu() {
  menuOpen.value = false
}

function handleResize() {
  if (window.innerWidth > 900) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>



<template>
  <header class="site-header">
    <nav class="navbar" aria-label="Main navigation">
      <a href="#home" class="navbar-logo" @click="closeMenu">
        RB
      </a>

      <!-- Desktop navigation -->
      <ul class="navbar-links">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <a :href="cvUrl" target="_blank" rel="noopener noreferrer" class="navbar-cv">
        CV <span aria-hidden="true">↗</span>
      </a>

      <!-- Mobile toggle -->
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="mobile-navigation"
        @click="menuOpen = !menuOpen">
        {{ menuOpen ? 'CLOSE' : 'MENU' }}

        <span class="menu-icon" aria-hidden="true">
          {{ menuOpen ? '×' : '☰' }}
        </span>
      </button>
    </nav>

    <!-- Mobile navigation -->
    <Transition name="mobile-nav">
      <div v-if="menuOpen" id="mobile-navigation" class="mobile-menu">
        <a v-for="link in links" :key="link.href" :href="link.href" class="mobile-link" @click="closeMenu">
          {{ link.label }}
          <span aria-hidden="true">↗</span>
        </a>

        <a :href="cvUrl" target="_blank" rel="noopener noreferrer" class="mobile-cv" @click="closeMenu">
          View Curriculum Vitae ↗
        </a>
      </div>
    </Transition>
  </header>
</template>



<style scoped>
/* ========================================
   HEADER
======================================== */

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

/* Logo */

.navbar-logo {
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--color-text);
  transition: color 250ms ease;
}

.navbar-logo:hover {
  color: var(--color-accent);
}

/* ========================================
   DESKTOP NAVIGATION
======================================== */

.navbar-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(18px, 2.5vw, 40px);

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
  position: relative;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--color-text);
  transition: color 250ms ease;
}

.navbar-links a::after {
  content: '';
  position: absolute;
  bottom: -7px;
  left: 0;
  width: 100%;
  height: 1px;

  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms ease;
}

.navbar-links a:hover {
  color: var(--color-accent);
}

.navbar-links a:hover::after {
  transform: scaleX(1);
}

/* CV button */

.navbar-cv {
  display: inline-flex;
  align-items: center;
  gap: 14px;

  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 12px 26px;

  color: var(--color-text);
  white-space: nowrap;

  transition:
    border-color 250ms ease,
    background 250ms ease;
}

.navbar-cv span {
  color: var(--color-accent);
  transition: transform 250ms ease;
}

.navbar-cv:hover {
  border-color: var(--color-accent);
  background: var(--color-surface);
}

.navbar-cv:hover span {
  transform: translate(3px, -3px);
}

/* ========================================
   MOBILE TOGGLE
======================================== */

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

.menu-icon {
  color: var(--color-accent);
  font-size: 18px;
  line-height: 1;
}

/* ========================================
   MOBILE NAVIGATION
======================================== */

.mobile-menu {
  display: none;
}

/* ========================================
   TABLET & MOBILE
======================================== */

@media (max-width: 900px) {
  .navbar {
    min-height: 76px;
  }

  .navbar-links,
  .navbar-cv {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    padding: 16px 0 32px;
    background: var(--color-background);
    overflow: hidden;
  }

  .mobile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    padding: 18px 0;
    border-bottom: 1px solid var(--color-border);

    font-family: var(--font-display);
    font-size: clamp(30px, 7vw, 46px);
    color: var(--color-text);
    transition: color 250ms ease;
  }

  .mobile-link span {
    font-family: var(--font-mono);
    font-size: 22px;
    color: var(--color-accent);
  }

  .mobile-link:hover {
    color: var(--color-accent);
  }

  .mobile-cv {
    margin-top: 30px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-accent);
    text-transform: uppercase;
  }

  /* Smooth expand / collapse */

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition:
      opacity 300ms ease,
      transform 300ms ease;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }
}

/* ========================================
   ACCESSIBILITY
======================================== */

.navbar a:focus-visible,
.menu-toggle:focus-visible,
.mobile-menu a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    transition: none !important;
  }
}
</style>
