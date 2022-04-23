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


const onItemSelect = (index: number) => {
  // console.log(index)
}
</script>


<template>
  <ImageCarouselProvider :images="images" #="{context}" :options="options" @itemSelect="onItemSelect">
      <ImageDisplay
          class="mb-2"
          :key="context.currentImage.imageSrc"
          :context="context"
      />
      <ThumbsContainer v-if="context.viewableThumbsCount > 0" :context="context"/>
  </ImageCarouselProvider>
</template>
