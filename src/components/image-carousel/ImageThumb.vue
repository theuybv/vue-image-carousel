<script setup lang="ts">

import {AspectRatio, CarouselImage} from "../../types";

export type ImageThumbProps = {
  image: CarouselImage,
  aspectRatio: AspectRatio
  width: number
  active: boolean
}
const {image, aspectRatio, width, active} = defineProps<ImageThumbProps>()

</script>

<template>
  <button class="box-content cursor-pointer flex flex-col p-0 m-0" :style="{width: width + 'px', aspectRatio: aspectRatio.toString()}">
    <img class="hover:scale-[0.98] transition-all w-full h-full bg-black object-cover" :src="image.imageSrc" :alt="image.alt"
         :style="{aspectRatio: aspectRatio.toString()}"/>
    <div :class="{'animate-fade h-[4px]': active}" class="w-full bg-red-600" />
  </button>
</template>
