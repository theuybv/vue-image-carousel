<script setup lang="ts">
import ImageDisplay from "./ImageDisplay.vue";
import {CarouselImage, ImageCarouselProviderProps} from "./types";
import ThumbsContainer from "./ThumbsContainer.vue";
import ImageCarouselProvider from "./providers/ImageCarouselProvider.vue";

export type ImageCarouselProps = {
  images: CarouselImage[]
  options: Partial<ImageCarouselProviderProps>
}
const {images, options} = defineProps<ImageCarouselProps>()

</script>

<template>
  <ImageCarouselProvider :images="images" #="{context}" :options="options">
      <ImageDisplay
          class="mb-2"
          :key="context.currentImage.imageSrc"
      />
      <ThumbsContainer v-if="context.viewableThumbsCount > 0" />
  </ImageCarouselProvider>
</template>
