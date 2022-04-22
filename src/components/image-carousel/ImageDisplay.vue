<script setup lang="ts">
import {ImageCarouselProviderProps} from "./types";
import {ref, watch} from "vue";
import {computedAsync, useElementSize} from '@vueuse/core'
import ThumbsIndicator from "./ThumbsIndicator.vue";
import Loader from 'vue-spinner/src/BeatLoader.vue'
import {loadImage} from "./utils";

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
    <ThumbsIndicator v-if="context.hasIndicator"/>
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
