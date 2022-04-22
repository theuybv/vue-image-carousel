<script setup lang="ts">
import {provide, reactive} from "vue";
import {AspectRatio, CarouselImage, ImageCarouselKey, ImageCarouselOptions, ImageCarouselProviderProps} from "../types";

const {images, options} = defineProps<{
  images: CarouselImage[],
  options: Partial<ImageCarouselOptions>
}>()

const emit = defineEmits<{
  (e: 'itemSelect', index: number): void
}>()

const reactiveContext = reactive<ImageCarouselProviderProps>({
  emit,
  autoPlayTimeMs: options.autoPlayTimeMs || 5000,
  autoPlayMode: options.autoPlayMode || 'none',
  hasIndicator: options.hasIndicator || false,
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
    return Promise.all(this.images.map((item: CarouselImage) => {
      return new Promise<CarouselImage>((resolve, reject) => {
        const image = new Image()
        image.src = item.thumbSrc
        image.onload = () => {
          resolve(item)
        }
        image.onerror = () => {
          reject()
        }
      })
    }))
  }
})
provide(ImageCarouselKey, reactiveContext)

</script>

<template>
  <slot :context="reactiveContext"></slot>
</template>
