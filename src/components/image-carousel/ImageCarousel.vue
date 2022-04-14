<script setup lang="ts">
import {ref} from "@vue/reactivity";
import ImageDisplay from "./ImageDisplay.vue";
import {CarouselImage, ImageCarouselKey} from "../../types";
import ThumbsContainer from "./ThumbsContainer.vue";
import {getImageThumbsInOutView, getThumbsIterator} from "../../utils";
import ImageCarouselProvider from "./providers/ImageCarouselProvider.vue";
import {inject} from "vue";


export type ImageCarouselProps = {
  images: CarouselImage[]
}
const {images} = defineProps<ImageCarouselProps>()

</script>


<template>
  <ImageCarouselProvider :images="images" #="{context}">
    <div class="flex flex-col gap-2">
      <ImageDisplay
          :key="context.currentImage.imageSrc"
          :context="context"
      />
      <ThumbsContainer :context="context" />
    </div>
  </ImageCarouselProvider>
</template>
