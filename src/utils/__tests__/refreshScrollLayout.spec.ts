import { afterEach, describe, expect, it, vi } from 'vitest'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { refreshScrollLayout } from '../refreshScrollLayout'

vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { refresh: vi.fn() } }))

afterEach(() => {
  vi.resetAllMocks()
  vi.unstubAllGlobals()
  document.documentElement.removeAttribute('style')
  document.body.removeAttribute('style')
})

describe('refreshScrollLayout', () => {
  it('restores the reading position if a refresh resets scrolling to the top', () => {
    vi.stubGlobal('scrollX', 0)
    vi.stubGlobal('scrollY', 900)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    document.documentElement.style.setProperty('scroll-behavior', 'smooth')
    document.body.style.setProperty('scroll-behavior', 'smooth', 'important')

    vi.mocked(ScrollTrigger.refresh).mockImplementation(() => {
      expect(document.documentElement.style.scrollBehavior).toBe('auto')
      expect(document.body.style.scrollBehavior).toBe('auto')
      vi.stubGlobal('scrollY', 0)
    })

    refreshScrollLayout()

    expect(scrollTo).toHaveBeenCalledExactlyOnceWith({ left: 0, top: 900, behavior: 'instant' })
    expect(document.documentElement.style.scrollBehavior).toBe('smooth')
    expect(document.body.style.getPropertyPriority('scroll-behavior')).toBe('important')
  })

  it('does not issue a scroll command when the refresh preserves the position', () => {
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    refreshScrollLayout()
    expect(scrollTo).not.toHaveBeenCalled()
    expect(document.documentElement.style.getPropertyValue('scroll-behavior')).toBe('')
    expect(document.body.style.getPropertyValue('scroll-behavior')).toBe('')
  })
})
