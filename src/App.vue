<script setup lang="ts">
import ImageCarousel from './components/image-carousel/ImageCarousel.vue';
import {getDemoImages} from "./components/image-carousel/data";
import {AspectRatio, CarouselImage} from "./components/image-carousel/types";
import {ref} from "vue";


const images1 = ref<CarouselImage[]>(getDemoImages(10, AspectRatio['1/1']))
const images2 = ref<CarouselImage[]>(getDemoImages(4, AspectRatio['3/2']))

</script>

<template>
  <div class="container mx-auto p-8">
    <div class="flex flex-wrap flex-row gap-8">
      <ImageCarousel :images="images1"
                     :options="{ thumbsCount: 3, imageAspectRatio: AspectRatio['3/2']}"/>
      <ImageCarousel :images="images2" :options="{hasIndicator: true, thumbsCount: 6}"/>
    </div>
  </div>
</template>

