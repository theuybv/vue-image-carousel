<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";
import ImageThumb from "./ImageThumb.vue";
import {useImageCarousel} from "./providers/useImageCarousel";

const provider = useImageCarousel()

const emit = defineEmits<{
  (e: "thumbsContainerSizeChanged"): void;
  (e: "thumbClick", event: MouseEvent, index: number): void;
  (e: "allThumbsLoaded", thumbImageElements: HTMLElement[], thumbsContainerElement: HTMLElement): void;
}>();


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
  if (index >= provider.images.length - 1) {
    emit('allThumbsLoaded', imageThumbRefs.value, thumbsContainerRef.value)
  }
}

const thumbsContainerRef = ref()
const imageThumbRefs = ref([...new Array(provider.images.length)])


const onImageThumbClick = (event: MouseEvent, index: number) => {
  const timeout = setTimeout(() => {
    emit('thumbClick', event, index)
    provider.updateCurrentIndex(index)
    clearTimeout(timeout)
  }, 20)
}

</script>

<template>
  <div class="ThumbsContainer flex flex-row gap-2 overflow-hidden" ref="thumbsContainerRef"
       :style="{width: provider.imageContainerWidth + 'px'}">
    <div v-for="(item, index) in provider.images" :key="item.thumbSrc" :ref="(el) => imageThumbRefs[index] = el">
      <ImageThumb @click="(event:MouseEvent) => onImageThumbClick(event, index)"
                  :aspectRatio="3/2"
                  :width="provider.thumbsWidth || 0"
                  :image="item"
                  :onImageThumbLoaded="(event: Event) => onImageThumbLoaded(event, index)"/>
    </div>
  </div>
</template>

