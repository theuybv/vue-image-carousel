<script setup lang="ts">
import {ref} from "@vue/reactivity";
import ImageDisplay from "./ImageDisplay.vue";
import {CarouselImage} from "../types";
import ThumbsContainer from "./ThumbsContainer.vue";
import {nextTick, onMounted, Ref, watch} from "vue";
import {getImageThumbsInOutView} from "../utils";

const imageContainerWidth = ref<number>(0);
const imageThumbRefs = ref<HTMLElement[]>([]);

const imageSizeChanged = (image: HTMLImageElement) => {
  imageContainerWidth.value = image.offsetWidth;
};

export type ImageCarouselProps = {
  images: CarouselImage[]
}
const {images} = defineProps<ImageCarouselProps>()

const currentImage = ref<CarouselImage>(images[0])
const imageThumbsRefs = ref<HTMLElement[]>([])
const thumbsContainerRef = ref<HTMLElement>(document.createElement('div'))

const thumbsContainerSizeChanged = (thumbContainerElement: HTMLElement) => {
 thumbsContainerRef.value = thumbContainerElement
}

const onThumbClick = (index: number) => {
  currentImage.value = images[index]
}

onMounted(async () => {
  await nextTick()




})

watch([thumbsContainerRef, imageThumbsRefs], ([thumbContainer, imageThumbs]) => {
  const {
    thumbElements,
    thumbElementsInView,
    thumbElementsNotInView
  } = getImageThumbsInOutView(imageThumbs, thumbContainer)

  console.log(thumbContainer)
  console.log(imageThumbs)

})

</script>


<template>
  <section class="flex col ImageCarousel q-gutter-y-sm">
    <ImageDisplay
        :key="currentImage.imageSrc"
        @image-size-changed="imageSizeChanged"
        :image="currentImage"
    />
    <ThumbsContainer :imageThumbRefs="imageThumbRefs" @thumb-click="onThumbClick"
                     :width="imageContainerWidth" :images="images"
                     @thumbs-container-size-changed="thumbsContainerSizeChanged"/>
  </section>
</template>

<style scoped>
.ImageCarousel {
}
</style>

