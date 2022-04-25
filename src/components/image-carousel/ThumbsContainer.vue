<script setup lang="ts">
import {onMounted, ref} from "vue";
import ImageThumb from "./ImageThumb.vue";
import {computedAsync} from "@vueuse/core";
import {getImageThumbsInOutView, getThumbsIterator} from "./utils";
import ThumbsNavigator from "./ThumbsNavigator.vue";
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import {useImageCarousel} from "./useImageCarousel";

const context = useImageCarousel()

const thumbsContainerRef = ref()
const imageThumbRefs = ref([...new Array(context.images.length)])

const thumbImages = computedAsync(
    async () => {
      return await context.allLoadedThumbs
    },
    [],
)

const onThumbClick = (_event: MouseEvent | undefined, clickedIndex: number) => {
  const {
    thumbElements,
    thumbElementsInView,
  } = getImageThumbsInOutView(context.thumbElements, context.thumbsContainerElement)

  const {firstInView, lastInView, nextInToView, prevInToView} =
      getThumbsIterator(thumbElements, thumbElementsInView)

  if (lastInView.index === clickedIndex && nextInToView) {
    scrollIntoView(nextInToView.element, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
      boundary: context.thumbsContainerElement
    })
  } else if (firstInView.index === clickedIndex && prevInToView) {
    scrollIntoView(prevInToView.element, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
      boundary: context.thumbsContainerElement
    })
  }
  context.currentIndex = clickedIndex
}


onMounted(() => {
  context.thumbElements = imageThumbRefs.value
  context.thumbsContainerElement = thumbsContainerRef.value
})

</script>

<template>
  <div class="flex flex-row gap-2 overflow-hidden" ref="thumbsContainerRef"
       :style="{width: context.imageContainerWidth + 'px'}">

    <div v-for="(item, index) in thumbImages" :key="item.thumbSrc" :ref="(el) => imageThumbRefs[index] = el">
      <ImageThumb :active="context.currentIndex === index"
                  @click="onThumbClick($event, index)"
                  :aspectRatio="context.thumbAspectRatio"
                  :width="context.thumbsWidth"
                  :image="item" :key="index"/>
    </div>
    <ThumbsNavigator v-if="thumbImages.length" />
  </div>
</template>
<style scoped>
</style>
