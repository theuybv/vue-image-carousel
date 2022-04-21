<script setup lang="ts">
import {ImageCarouselProviderProps} from "./types";
import {ref, watch} from "vue";
import {useElementSize} from '@vueuse/core'
import ThumbsIndicator from "./ThumbsIndicator.vue";

const {
  context
} = defineProps<{ context: ImageCarouselProviderProps }>()

const imageRef = ref<HTMLImageElement | null>(null);
const {width} = useElementSize(imageRef)

watch(width, () => {
  context.imageContainerWidth = width.value
})

</script>

<template>
  <figure
      class="relative bg-black"
      :style="{ maxHeight: `${context.imageMaxHeight}px`, aspectRatio: context.imageAspectRatio.toString()}"
  >
    <Transition appear name="fade">
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
