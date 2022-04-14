<script setup lang="ts">
import ImageDisplay from "./ImageDisplay.vue";
import {AspectRatio, CarouselImage} from "../../types";
import ThumbsContainer from "./ThumbsContainer.vue";
import ImageCarouselProvider from "./providers/ImageCarouselProvider.vue";

export type ImageCarouselOptions = {
  imageAspectRatio?: AspectRatio
  thumbAspectRatio?: AspectRatio
  imageMaxHeight?: number
  thumbsCount?: number
  thumbsGap?: number
}
export type ImageCarouselProps = {
  images: CarouselImage[]
  options: ImageCarouselOptions
}
const {images, options} = defineProps<ImageCarouselProps>()

</script>


<template>
  <ImageCarouselProvider :images="images" #="{context}" :options="options">
    <div class="flex flex-col gap-2">
      <ImageDisplay
          :key="context.currentImage.imageSrc"
          :context="context"
      />
      <ThumbsContainer :context="context"/>
    </div>
  </ImageCarouselProvider>
</template>
