<script setup lang="ts">
import ImageCarousel from './components/image-carousel/ImageCarousel.vue';
import {getDemoImages} from "./data";
import {AspectRatio, CarouselImage} from "./types";
import {ref} from "vue";


const images = ref<CarouselImage[]>(getDemoImages(10, AspectRatio['3/2']))

</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col gap-8">
      <ImageCarousel :images="images" :options="{thumbsCount: 3, imageAspectRatio: AspectRatio['1/1']}"/>
      <ImageCarousel :images="images" :options="{thumbsCount: 6}"/>
    </div>
  </div>
</template>

