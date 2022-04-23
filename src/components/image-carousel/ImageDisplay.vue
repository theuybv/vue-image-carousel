<script setup lang="ts">
import {ImageCarouselProviderProps} from "./types";
import {ref, watch} from "vue";
import {computedAsync, useElementSize, useIntervalFn, useScroll} from '@vueuse/core'
// import {useClamp, useSwipe}  from '@vueuse/core'
import ThumbsIndicator from "./ThumbsIndicator.vue";
import Loader from 'vue-spinner/src/BeatLoader.vue'
import {loadImage} from "./utils";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import ImagesNavigator from "./ImagesNavigator.vue";

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

/*const {direction} = usePointerSwipe(imageRef)
watch(direction, () => {
  if (direction.value === 'LEFT') {
    const index = useClamp(context.currentIndex--, 0, context.images.length - 1)
    context.currentIndex = index.value
  } else if (direction.value === 'RIGHT') {
    const index = useClamp(context.currentIndex++, 0, context.images.length - 1)
    context.currentIndex = index.value
  }
})*/

</script>

<template>
  <div
      ref="swipeRef"
      class="relative bg-black"
      :style="{ maxHeight: `${context.imageMaxHeight}px`, aspectRatio: context.imageAspectRatio.toString()}"
  >
    <Loader color="#fff" class="flex w-full h-full justify-center items-center" v-if="!loadedImage"/>
    <Transition v-else appear name="fade">
      <figure>
        <img
            class="bg-black w-full h-full object-contain"
            :src="context.currentImage.imageSrc"
            :alt="context.currentImage.alt"
            :style="{ aspectRatio: context.imageAspectRatio.toString() }"
            ref="imageRef"
        />
      </figure>
    </Transition>
    <ThumbsIndicator v-if="context.hasImagesIndicator"/>
    <ImagesNavigator v-if="context.hasImagesIndicatorPrevNext"/>
  </div>
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
