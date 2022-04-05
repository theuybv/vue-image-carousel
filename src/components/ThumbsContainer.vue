<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";
import {CarouselImage} from "../types";
import ImageThumb from "./ImageThumb.vue";

export type ThumbsContainerProps = {
  images: CarouselImage[],
  width: number,
}


const emit = defineEmits<{
  (e: "thumbsContainerSizeChanged"): void;
  (e: "thumbClick", event: MouseEvent, index: number): void;
  (e: "allThumbsLoaded", thumbImageElements: HTMLElement[], thumbsContainerElement: HTMLElement): void;
}>();

const {images, width} = defineProps<ThumbsContainerProps>()

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

const thumbsCount = 6;
const thumbsGap = 8;
</script>

<template>
  <div class="ThumbsContainer flex flex-row gap-2 overflow-hidden" ref="thumbsContainerRef"
       :style="{width: width + 'px'}">
    <div v-for="(item, index) in images" :key="item.thumbSrc" :ref="(el) => imageThumbRefs[index] = el">
      <ImageThumb @click="(event:MouseEvent) => {
        $emit('thumbClick', event, index)
      }" :aspectRatio="3/2"
                  :width="(width / thumbsCount - thumbsGap) + thumbsGap / thumbsCount" :image="item"
                  :onImageThumbLoaded="(event) => onImageThumbLoaded(event, index)"/>
    </div>
  </div>
</template>

<style scoped>
.ThumbsContainer {
}
</style>

