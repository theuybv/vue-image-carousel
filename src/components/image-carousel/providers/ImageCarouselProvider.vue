<script setup lang="ts">
import {provide, reactive} from "vue";
import {CarouselImage, ImageCarouselKey, ImageCarouselProvider} from "../../../types";

const {images} = defineProps<{ images: CarouselImage[] }>()

const reactiveContext = reactive<ImageCarouselProvider>({
  images,
  currentIndex: 0,
  updateCurrentIndex(value: number) {
    this.currentIndex = value
  },
  imageContainerWidth: 0,
  updateImageContainerWidth(value: number) {
    this.imageContainerWidth = value;
  },
  thumbsCount: 6,
  thumbsGap: 8,
  get thumbsWidth() {
    return (
        this.imageContainerWidth / this.thumbsCount -
        this.thumbsGap +
        this.thumbsGap / this.thumbsCount
    );
  },
  get currentImage() {
    return this.images[this.currentIndex];
  }
})
provide(ImageCarouselKey, reactiveContext)

</script>

<template>
  <slot v-bind:context="reactiveContext"></slot>
</template>
