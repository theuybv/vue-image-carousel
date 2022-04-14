<script setup lang="ts">
import {provide, reactive} from "vue";
import {AspectRatio, CarouselImage, ImageCarouselKey, ImageCarouselProvider} from "../../../types";

const {images} = defineProps<{ images: CarouselImage[] }>()

const reactiveContext = reactive<ImageCarouselProvider>({
  imageAspectRatio: AspectRatio['3/2'],
  thumbAspectRatio: AspectRatio['4/3'],
  imageMaxHeight: 400,
  thumbsCount: 6,
  thumbsGap: 8,
  images,
  updateThumbElements(value: HTMLElement[]) {
    this.thumbElements = value
  },
  thumbElements: [],
  thumbsContainerElement: document.createElement('div'),
  updateThumbsContainerElement(value: HTMLElement) {
    this.thumbsContainerElement = value;
  },
  currentIndex: 0,
  updateCurrentIndex(value: number) {
    this.currentIndex = value
  },
  imageContainerWidth: 0,
  updateImageContainerWidth(value: number) {
    this.imageContainerWidth = value;
  },
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
