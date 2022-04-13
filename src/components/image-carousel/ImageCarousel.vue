<script setup lang="ts">
import {ref} from "@vue/reactivity";
import ImageDisplay from "./ImageDisplay.vue";
import {CarouselImage} from "../../types";
import ThumbsContainer from "./ThumbsContainer.vue";
import {getImageThumbsInOutView, getThumbsIterator} from "../../utils";
import ImageCarouselProvider from "./providers/ImageCarouselProvider.vue";


export type ImageCarouselProps = {
  images: CarouselImage[]
}
const {images} = defineProps<ImageCarouselProps>()

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
}

const allThumbsLoaded = (thumbs: HTMLElement[], container: HTMLElement) => {
  thumbImages.value = thumbs;
  thumbsContainer.value = container;
}

</script>


<template>
  <ImageCarouselProvider :images="images" #="{context}">
    <div class="flex flex-col gap-2">
      <ImageDisplay
          :key="context.currentImage.imageSrc"
          :image="context.currentImage"
      />
      <ThumbsContainer @thumb-click="onThumbClick" @all-thumbs-loaded="allThumbsLoaded"/>
    </div>
  </ImageCarouselProvider>
</template>
