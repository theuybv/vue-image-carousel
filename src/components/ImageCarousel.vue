<script setup lang="ts">
import {ref} from "@vue/reactivity";
import ImageDisplay from "./ImageDisplay.vue";
import {CarouselImage, ImageCarouselKey, ImageCarouselProvider} from "../types";
import ThumbsContainer from "./ThumbsContainer.vue";
import {getImageThumbsInOutView, getThumbsIterator} from "../utils";
import {provide, reactive} from "vue";


provide(ImageCarouselKey, reactive<ImageCarouselProvider>({
  imageContainerWidth: 0,
  updateImageContainerWidth(value: number) {
    this.imageContainerWidth = value
  },
  thumbsCount: 6,
  thumbsGap: 8,
  get thumbsWidth() {
    return ((this.imageContainerWidth / this.thumbsCount - this.thumbsGap) + this.thumbsGap / this.thumbsCount) || 0
  }
}))

const imageContainerWidth = ref<number>(0);

const imageSizeChanged = (image: HTMLImageElement) => {
  imageContainerWidth.value = image.offsetWidth
};

export type ImageCarouselProps = {
  images: CarouselImage[]
}
const {images} = defineProps<ImageCarouselProps>()

const currentImage = ref<CarouselImage>(images[0])
const thumbImages = ref<HTMLElement[]>()
const thumbsContainer = ref<HTMLElement>()

const onThumbClick = (event: MouseEvent, clickedIndex: number) => {


  if (thumbsContainer.value && thumbImages.value) {
    const thumbsContainerElement = thumbsContainer.value;
    const {
      thumbElements,
      thumbElementsInView,
    } = getImageThumbsInOutView(thumbImages.value, thumbsContainer.value)

    const {firstInView, lastInView, nextInToView, prevInToView} =
        getThumbsIterator(thumbElements, thumbElementsInView)

    if (lastInView.index === clickedIndex && nextInToView) {
      thumbsContainerElement.scroll({
        left: thumbsContainerElement.scrollLeft + nextInToView.element.offsetWidth + 8,
        behavior: 'smooth',
      })
    } else if (firstInView.index === clickedIndex && prevInToView) {
      thumbsContainerElement.scroll({
        left: thumbsContainerElement.scrollLeft - prevInToView.element.offsetWidth - 8,
        behavior: 'smooth',
      })
    }
  }
  currentImage.value = images[clickedIndex]
}

const allThumbsLoaded = (thumbs: HTMLElement[], container: HTMLElement) => {
  thumbImages.value = thumbs;
  thumbsContainer.value = container;
}

</script>


<template>
  <section class="flex flex-col gap-2">
    <ImageDisplay
        :key="currentImage.imageSrc"
        @image-size-changed="imageSizeChanged"
        :image="currentImage"
    />
    <ThumbsContainer @thumb-click="onThumbClick"
                     :width="imageContainerWidth" :images="images"
                     @all-thumbs-loaded="allThumbsLoaded"/>
  </section>
</template>
