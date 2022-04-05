<script setup lang="ts">
import ImageCarousel from './components/ImageCarousel.vue';
import {getDemoImages} from "./data";
import {AspectRatio, CarouselImage} from "./types";
import {ref} from "vue";


const images = ref<CarouselImage[]>(getDemoImages(10, AspectRatio['3/2']))

</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col gap-8">
      <ImageCarousel :images="images"/>
      <ImageCarousel :images="images"/>
    </div>
  </div>
</template>

