<script setup lang="ts">

import {ref, watch} from "vue";
import {ImageCarouselProviderProps} from "./types";
import {getImageThumbsInOutView, getThumbsIterator} from "./utils";
import {useElementSize, useScroll} from "@vueuse/core";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

const {
  context
} = defineProps<{ context: ImageCarouselProviderProps }>()

const getThumbs = () => {
  const {
    thumbElements,
    thumbElementsInView,
  } = getImageThumbsInOutView(context.thumbElements, context.thumbsContainerElement)

  const {nextInToView, prevInToView} =
      getThumbsIterator(thumbElements, thumbElementsInView)

  return {
    nextInToView,
    prevInToView
  }
}

const {height} = useElementSize(context.thumbsContainerElement)
const {isScrolling} = useScroll(context.thumbsContainerElement)

const navPosY = ref<number>()
const showPrev = ref<boolean>((() => {
  const {prevInToView} = getThumbs()
  return prevInToView !== undefined;
})())
const showNext = ref<boolean>((() => {
  const {nextInToView} = getThumbs()
  return nextInToView !== undefined;
})())

watch(height, () => {
  navPosY.value = context.thumbsContainerElement.offsetHeight / 2 - 24 / 2
})

watch(isScrolling, () => {
  if (!isScrolling.value) {
    const {prevInToView, nextInToView} = getThumbs()
    showPrev.value = prevInToView !== undefined;
    showNext.value = nextInToView !== undefined;
  }
})

const onNextClick = (_event: MouseEvent) => {
  const {nextInToView} = getThumbs()
  if (nextInToView) {
    scrollIntoView(nextInToView.element, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
      boundary: context.thumbsContainerElement
    })
  }
}

const onPrevClick = (_event: MouseEvent) => {
  const {prevInToView} = getThumbs()
  if (prevInToView) {
    scrollIntoView(prevInToView.element, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
      boundary: context.thumbsContainerElement
    })
  }
}

</script>
<template>
  <nav class="absolute">
    <div class="relative" :style="{top: navPosY + 'px', width: context.imageContainerWidth + 'px'}">
      <button class="absolute left-0 bg-white" v-if="showPrev" @click="onPrevClick($event)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button class="absolute right-0 bg-white" v-if="showNext" @click="onNextClick($event)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </nav>
</template>
