<script setup lang="ts">
import ImageCarousel from './components/ImageCarousel.vue';
import {getDemoImages} from "./data";
import {AspectRatio} from "./types";


const images = getDemoImages(10, AspectRatio['3/2'])

</script>

<template>
  <ImageCarousel :images="images" />
</template>

