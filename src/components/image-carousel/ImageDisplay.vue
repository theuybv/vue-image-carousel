<script setup lang="ts">
import {ImageCarouselProvider} from "./types";
import {ref, watch} from "vue";
import {useElementSize} from '@vueuse/core'

const {
  context
} = defineProps<{ context: ImageCarouselProvider }>()

const imageRef = ref<HTMLImageElement | null>(null);
const {width} = useElementSize(imageRef)

watch(width, () => {
  context.imageContainerWidth = width.value
})

</script>

<template>
  <figure
      class="ImageDisplay"
      :style="{ maxHeight: `${context.imageMaxHeight}px`, aspectRatio: context.imageAspectRatio.toString()}"
  >
    <Transition appear name="fade">
      <img
          :src="context.currentImage.imageSrc"
          :alt="context.currentImage.alt"
          :style="{ aspectRatio: context.imageAspectRatio.toString() }"
          ref="imageRef"
      />
    </Transition>
  </figure>

</template>

<style scoped>
.ImageDisplay {
  background: black;
}

img {
  background: black;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
