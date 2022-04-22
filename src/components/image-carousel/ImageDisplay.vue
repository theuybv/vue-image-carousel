<script setup lang="ts">
import {ImageCarouselProviderProps} from "./types";
import {ref, watch} from "vue";
import {computedAsync, useElementSize, useIntervalFn, useScroll} from '@vueuse/core'
import ThumbsIndicator from "./ThumbsIndicator.vue";
import Loader from 'vue-spinner/src/BeatLoader.vue'
import {loadImage} from "./utils";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

const {
  context
} = defineProps<{ context: ImageCarouselProviderProps }>()

const imageRef = ref<HTMLImageElement | null>(null);
const {width} = useElementSize(imageRef)

watch(width, () => {
  context.imageContainerWidth = width.value
})

const loadedImage = computedAsync(
    async () => {
      return await loadImage(context.currentImage.imageSrc)
    },
    undefined,
)

const {isScrolling} = useScroll(context.thumbsContainerElement)


const onAutoplay = () => {
  const isLastIndex = context.currentIndex >= context.images.length - 1;
  if (isLastIndex && context.autoPlayMode === 'default') {
    intervalFn.pause()
    return
  }

  const nextIndex = isLastIndex ? 0 : context.currentIndex + 1
  context.currentIndex = nextIndex
  const target = context.thumbElements[nextIndex];
  try {
    scrollIntoView(target, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
      boundary: context.thumbsContainerElement
    })
  } catch (e) {

  }
}

const intervalFn = useIntervalFn(onAutoplay, context.autoPlayTimeMs, {immediate: context.autoPlayMode !== 'none'})

watch([() => context.currentIndex, isScrolling], ([clickedIndex, isScrolling]) => {
  if (isScrolling) {

  }
})

</script>

<template>
  <figure
      class="relative bg-black"
      :style="{ maxHeight: `${context.imageMaxHeight}px`, aspectRatio: context.imageAspectRatio.toString()}"
  >
    <Loader color="#fff" class="flex w-full h-full justify-center items-center" v-if="!loadedImage"/>
    <Transition v-else appear name="fade">
      <img
          class="bg-black w-full h-full object-contain"
          :src="context.currentImage.imageSrc"
          :alt="context.currentImage.alt"
          :style="{ aspectRatio: context.imageAspectRatio.toString() }"
          ref="imageRef"
      />
    </Transition>
    <ThumbsIndicator v-if="context.hasIndicator" />
  </figure>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
