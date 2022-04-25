<script setup lang="ts">
import {provide} from "vue";
import {CarouselImage, ImageCarouselKey, ImageCarouselOptions} from "../types";
import {reactiveProviderContext} from "../useImageCarousel";

const {images, options} = defineProps<{
  images: CarouselImage[],
  options: Partial<ImageCarouselOptions>
}>()

const reactiveContext = reactiveProviderContext(images, options)

provide(ImageCarouselKey, reactiveContext)

</script>

<template>
  <slot :context="reactiveContext"></slot>
</template>
