import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ProjectsSection from '../ProjectsSection.vue'
import { gsap } from 'gsap'

vi.mock('gsap', () => ({
  gsap: {
    set: vi.fn(),
    fromTo: vi.fn((_element, _from, to) => {
      queueMicrotask(() => to.onComplete())
      return { kill: vi.fn() }
    }),
    to: vi.fn((element, to) => {
      queueMicrotask(() => {
        if ('y' in to) {
          element.y = to.y
          element.height = to.height
          element.opacity = to.opacity
          to.onUpdate()
        }
        to.onComplete()
      })
      return { kill: vi.fn() }
    }),
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { refresh: vi.fn() } }))

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('project list toggle', () => {
  it.each([false, true])('supports repeated toggles and scrolls back (reduced motion: %s)', async (reducedMotion) => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: reducedMotion })))
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    const wrapper = mount(ProjectsSection, { global: { stubs: { ProjectCard: true } } })
    const project = wrapper.get('.last-visible-project').element
    const footer = wrapper.get('.projects-footer').element
    vi.spyOn(project, 'getBoundingClientRect').mockReturnValue({ top: 500 } as DOMRect)
    vi.spyOn(footer, 'getBoundingClientRect').mockReturnValue({ bottom: 1400 } as DOMRect)
    vi.spyOn(wrapper.get('.extra-projects').element, 'getBoundingClientRect')
      .mockReturnValue({ height: 300 } as DOMRect)
    const button = wrapper.get('button')
    scrollTo.mockImplementation(() => {
      if (!reducedMotion) {
        // Every scroll update also applies the collapsed dimensions, before
        // completion changes the list's visibility state.
        expect(gsap.set).toHaveBeenLastCalledWith(
          wrapper.get('.extra-projects').element,
          { height: 0, opacity: 0 },
        )
        expect(button.attributes('aria-expanded')).toBe('true')
      }
    })

    for (let cycle = 0; cycle < 3; cycle++) {
      await button.trigger('click')
      await flushPromises()
      expect(button.attributes('aria-expanded')).toBe('true')
      expect(button.attributes('disabled')).toBeUndefined()
      expect(wrapper.get('.extra-projects').classes()).not.toContain('is-hidden')

      await button.trigger('click')
      await flushPromises()
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(button.attributes('disabled')).toBeUndefined()
      expect(wrapper.get('.extra-projects').classes()).toContain('is-hidden')
      expect(scrollTo).toHaveBeenLastCalledWith({
        top: Math.max(0, 500 - 96, 1400 - 300 - window.innerHeight + 24),
        behavior: 'instant',
      })
    }
    expect(scrollTo).toHaveBeenCalledTimes(3)
    wrapper.unmount()
  })
})
