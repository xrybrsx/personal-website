import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function refreshScrollLayout() {
  const left = window.scrollX
  const top = window.scrollY
  const styles = [document.documentElement.style, document.body.style]
  const previous = styles.map((style) => ({
    value: style.getPropertyValue('scroll-behavior'),
    priority: style.getPropertyPriority('scroll-behavior'),
  }))

  // ScrollTrigger temporarily scrolls to zero while measuring. Keep those
  // writes synchronous, including on Safari with global smooth scrolling.
  styles.forEach((style) => style.setProperty('scroll-behavior', 'auto', 'important'))
  try {
    ScrollTrigger.refresh()
  } finally {
    if (window.scrollX !== left || window.scrollY !== top) {
      window.scrollTo({ left, top, behavior: 'instant' })
    }
    styles.forEach((style, index) => {
      const saved = previous[index]!
      if (saved.value) {
        style.setProperty('scroll-behavior', saved.value, saved.priority)
      } else {
        style.removeProperty('scroll-behavior')
      }
    })
  }
}
