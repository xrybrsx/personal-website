
import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(
    container: Ref<HTMLElement | null>,
) {
    let context: gsap.Context | undefined

    onMounted(() => {
        if (!container.value) return

        if (
            window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches
        ) {
            return
        }

        context = gsap.context(() => {
            const selectors = [
                '.section-heading',
                '.experience-entry',
                '.project-entry',
                '.about-content',
                '.skill-group',
                '.certification-entry',
                '.contact-meta',
                '.contact-intro',
                '.contact-link',
            ]

            const elements =
                container.value!.querySelectorAll<HTMLElement>(
                    selectors.join(', '),
                )

            elements.forEach((element) => {
                gsap.from(element, {
                    y: 24,
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 90%',
                        once: true,
                    },
                })
            })
        }, container.value)
    })

    onUnmounted(() => {
        context?.revert()
    })
}
