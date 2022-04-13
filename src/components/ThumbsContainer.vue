<script setup lang="ts">

import {inject, onMounted, onUnmounted, ref} from "vue";
import {CarouselImage, ImageCarouselKey} from "../types";
import ImageThumb from "./ImageThumb.vue";

const provider = inject(ImageCarouselKey)


export type ThumbsContainerProps = {
  images: CarouselImage[],
}



const emit = defineEmits<{
  (e: "thumbsContainerSizeChanged"): void;
  (e: "thumbClick", event: MouseEvent, index: number): void;
  (e: "allThumbsLoaded", thumbImageElements: HTMLElement[], thumbsContainerElement: HTMLElement): void;
}>();

const {images} = defineProps<ThumbsContainerProps>()

const onWindowResize = () => {
  emit("thumbsContainerSizeChanged");
};

onMounted(() => {
  window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
});

const onImageThumbLoaded = (event: Event, index: number) => {
  if (index >= images.length - 1) {
    emit('allThumbsLoaded', imageThumbRefs.value, thumbsContainerRef.value)
  }
}

const thumbsContainerRef = ref()
const imageThumbRefs = ref([...new Array(images.length)])


const onImageThumbClick = (event: MouseEvent, index: number) => {
  const timeout = setTimeout(() => {
    emit('thumbClick', event, index)
    clearTimeout(timeout)
  }, 20)
}

</script>

<template>
  <div class="ThumbsContainer flex flex-row gap-2 overflow-hidden" ref="thumbsContainerRef"
       :style="{width: provider?.imageContainerWidth + 'px'}">
    <div v-for="(item, index) in images" :key="item.thumbSrc" :ref="(el) => imageThumbRefs[index] = el">
      <ImageThumb @click="(event:MouseEvent) => onImageThumbClick(event, index)"
                  :aspectRatio="3/2"
                  :width="provider?.thumbsWidth || 0"
                  :image="item"
                  :onImageThumbLoaded="(event: Event) => onImageThumbLoaded(event, index)"/>
    </div>
  </div>
</template>

