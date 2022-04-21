<script setup lang="ts">
import {provide, reactive} from "vue";
import {AspectRatio, CarouselImage, ImageCarouselKey, ImageCarouselProvider} from "../types";
import {ImageCarouselOptions} from "../ImageCarousel.vue";

const {images, options} = defineProps<{
  images: CarouselImage[],
  options: ImageCarouselOptions
}>()

const reactiveContext = reactive<ImageCarouselProvider>({
  thumbsScrollDelay: 80,
  imageAspectRatio: options.imageAspectRatio || AspectRatio['3/2'],
  thumbAspectRatio: options.thumbAspectRatio || AspectRatio['4/3'],
  imageMaxHeight: options.imageMaxHeight || 400,
  thumbsCount: options.thumbsCount || 6,
  thumbsGap: options.thumbsGap || 8,
  images,
  thumbElements: [],
  thumbsContainerElement: document.createElement('div'),
  currentIndex: 0,
  imageContainerWidth: 0,
  get thumbsWidth() {
    return (
        this.imageContainerWidth / this.thumbsCount -
        this.thumbsGap +
        this.thumbsGap / this.thumbsCount
    );
  },
  get currentImage() {
    return this.images[this.currentIndex];
  },
  get allLoadedThumbs() {
    const images = this.images.map((item: CarouselImage) => {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = item.thumbSrc
        image.onload = () => {
          resolve(item)
        }
        image.onerror = () => {
          reject()
        }
      })
    })
    return Promise.all(images)
  }
})
provide(ImageCarouselKey, reactiveContext)

</script>

<template>
  <slot v-bind:context="reactiveContext"></slot>
</template>
