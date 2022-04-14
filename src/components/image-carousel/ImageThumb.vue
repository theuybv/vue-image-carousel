<script setup lang="ts">

import {AspectRatio, CarouselImage} from "../../types";

export type ImageThumbProps = {
  image: CarouselImage,
  aspectRatio: AspectRatio
  width: number
}
const {image, aspectRatio, width} = defineProps<ImageThumbProps>()

</script>

<template>
  <button class="ImageThumb" :style="{width: width + 'px', aspectRatio: aspectRatio.toString()}">
    <img :src="image.imageSrc" :alt="image.alt" :style="{aspectRatio: aspectRatio.toString()}"/>
  </button>
</template>

<style scoped>
.ImageThumb {
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  margin: 0;
}

img {
  width: 100%;
  height: 100%;
  background: black;
  object-fit: cover;
}
</style>
