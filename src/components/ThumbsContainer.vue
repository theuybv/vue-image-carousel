<script setup lang="ts">

import {onMounted, onUnmounted, Ref, ref} from "vue";
import {CarouselImage} from "../types";
import ImageThumb from "./ImageThumb.vue";

export type ThumbsContainerProps = {
  images: CarouselImage[],
  width: number,
  imageThumbRefs: Ref<HTMLElement[]>
}

const thumbContainerRef = ref<HTMLElement>(document.createElement('div'))

const emit = defineEmits<{
  (e: "thumbsContainerSizeChanged", thumbContainerElement: HTMLElement): void;
  (e: "thumbClick", index: number): void;
}>();

const {images, width, imageThumbRefs, containerRef} = defineProps<ThumbsContainerProps>()


const onWindowResize = () => {
  emit("thumbsContainerSizeChanged", thumbContainerRef.value);
};

onMounted(() => {
  window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
});

const onImageThumbLoaded = () => {
  emit('thumbsContainerSizeChanged', thumbContainerRef.value)
}

onMounted(() => {
})


</script>

<template>
  <div class="ThumbsContainer flex row overflow-hidden no-wrap q-gutter-x-sm" ref="thumbContainerRef">
    <div v-for="(item, index) in images" :ref="el => imageThumbRefs.push(el)" >
      <ImageThumb @click="$emit('thumbClick', index)" :aspectRatio="3/2"
                  :width="width / 3 - 5.3" :image="item"
                  :onImageThumbLoaded="onImageThumbLoaded"/>
    </div>
  </div>
</template>

<style scoped>
.ThumbsContainer {
  width: v-bind(width+8 + 'px');
}
</style>

