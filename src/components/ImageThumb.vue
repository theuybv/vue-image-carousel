<script setup lang="ts">

import {AspectRatio, CarouselImage} from "../types";

export type ImageThumbProps = {
  image: CarouselImage,
  aspectRatio: AspectRatio
  width: number
  onImageThumbLoaded: () => void
}
const {image, aspectRatio, width, onImageThumbLoaded} = defineProps<ImageThumbProps>()

</script>

<template>
  <button class="ImageThumb">
    <img @load="onImageThumbLoaded" :src="image.imageSrc" :alt="image.alt"/>
  </button>
</template>

<style scoped>
.ImageThumb {
  border: none;
  cursor: pointer;
  display: flex;
  width: v-bind(width+ 'px');
  padding: 0;
  margin: 0;
  aspect-ratio: v-bind(aspectRatio);
}

img {
  width: 100%;
  height: 100%;
  aspect-ratio: v-bind(aspectRatio);
  background: black;
  object-fit: cover;
}
</style>
