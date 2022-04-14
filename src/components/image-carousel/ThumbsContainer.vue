<script setup lang="ts">

import {onMounted, ref} from "vue";
import ImageThumb from "./ImageThumb.vue";
import {computedAsync} from "@vueuse/core";
import {ImageCarouselProvider} from "../../types";
import {getImageThumbsInOutView, getThumbsIterator} from "../../utils";

const {
  context
} = defineProps<{ context: ImageCarouselProvider }>()


const onThumbClick = (event: MouseEvent, clickedIndex: number) => {

  const timeout = setTimeout(() => {
    const {
      thumbElements,
      thumbElementsInView,
    } = getImageThumbsInOutView(context.thumbElements, context.thumbsContainerElement)

    const {firstInView, lastInView, nextInToView, prevInToView} =
        getThumbsIterator(thumbElements, thumbElementsInView)

    if (lastInView.index === clickedIndex && nextInToView) {
      context.thumbsContainerElement.scroll({
        left: context.thumbsContainerElement.scrollLeft + nextInToView.element.offsetWidth + 8,
        behavior: 'smooth',
      })
    } else if (firstInView.index === clickedIndex && prevInToView) {
      context.thumbsContainerElement.scroll({
        left: context.thumbsContainerElement.scrollLeft - prevInToView.element.offsetWidth - 8,
        behavior: 'smooth',
      })
    }
    context.updateCurrentIndex(clickedIndex)
    clearTimeout(timeout)
  }, 20)


}
const thumbsContainerRef = ref()
const imageThumbRefs = ref([...new Array(context.images.length)])

const thumbImages = computedAsync(
    async () => {
      return await context.allLoadedThumbs
    },
    [],
)

onMounted(() => {
  context.updateThumbElements(imageThumbRefs.value)
  context.updateThumbsContainerElement(thumbsContainerRef.value)
})

</script>

<template>
  <div class="ThumbsContainer flex flex-row gap-2 overflow-hidden" ref="thumbsContainerRef"
       :style="{width: context.imageContainerWidth + 'px'}">
    <div v-for="(item, index) in thumbImages" :key="item.thumbSrc" :ref="(el) => imageThumbRefs[index] = el">
      <ImageThumb @click="onThumbClick($event, index)"
                  :aspectRatio="context.thumbAspectRatio"
                  :width="context.thumbsWidth"
                  :image="item"/>
    </div>
  </div>
</template>

