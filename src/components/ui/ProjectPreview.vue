<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
    images: string[]
    title: string
}>()

const currentIndex = ref(0)

const currentImage = computed(
    () => props.images[currentIndex.value]
)

function nextImage() {
    currentIndex.value =
        (currentIndex.value + 1) % props.images.length
}

function previousImage() {
    currentIndex.value =
        (currentIndex.value - 1 + props.images.length)
        % props.images.length
}

</script>

<template>
    <div v-if="images.length" class="project-preview">
        <div class="preview-window">
            <div class="preview-header">
                <div class="window-dots">
                    <span v-for="n in 3" :key="n"></span>
                </div>

                <span v-if="images.length > 1" class="image-counter">
                    {{ String(currentIndex + 1).padStart(2, '0') }}
                    /
                    {{ String(images.length).padStart(2, '0') }}
                </span>
            </div>

            <div class="preview-image">
                <Transition name="image-fade" mode="out-in">
                    <img v-if="currentImage" :key="currentImage" :src="currentImage"
                        :alt="`${title} screenshot ${currentIndex + 1}`" loading="lazy" />
                </Transition>
            </div>

            <div v-if="images.length > 1" class="preview-navigation">
                <button type="button" aria-label="Previous screenshot" @click="previousImage">
                    ←
                </button>

                <button type="button" aria-label="Next screenshot" @click="nextImage">
                    →
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.project-preview {
    width: 100%;
    padding: 6px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
}

.preview-window {
    overflow: hidden;
    border-radius: 6px;
    background: #101015;
}

.preview-header {
    height: 26px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
}

.window-dots {
    display: flex;
    gap: 5px;
}

.window-dots span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-accent);
    opacity: 0.65;
}

.image-counter {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--color-text-muted);
}

.preview-image {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #101015;
}

.preview-image img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: center;
}

.preview-navigation {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 10px 6px 4px;
}

.preview-navigation button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    color: var(--color-accent);
    font-size: 17px;
    cursor: pointer;
}


.preview-navigation button:hover {
    border-color: var(--color-accent);
}

.preview-navigation button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}


/* Smooth screenshot transitions */
.image-fade-enter-active,
.image-fade-leave-active {
    transition:
        opacity 250ms ease,
        transform 250ms ease;
}

.image-fade-enter-from {
    opacity: 0;
    transform: translateX(12px);
}

.image-fade-leave-to {
    opacity: 0;
    transform: translateX(-12px);
}

/* Keep navigation subtle */
.preview-navigation button {
    transition:
        color 200ms ease,
        transform 200ms ease;
}

.preview-navigation button:hover {
    color: var(--color-accent-hover);
    transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {

    .image-fade-enter-active,
    .image-fade-leave-active,
    .preview-navigation button {
        transition: none;
    }
}
</style>
