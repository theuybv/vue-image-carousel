<script setup lang="ts">
import ImageCarousel from './components/image-carousel/ImageCarousel.vue';
import {getDemoImages} from "./components/image-carousel/data";
import {AspectRatio, CarouselImage, ImageCarouselOptions} from "./components/image-carousel/types";


const imageCarouselDemoList: {
  images: CarouselImage[]
  imageSourceAspectRatio: AspectRatio,
  numberOfImages: number
  options: Partial<ImageCarouselOptions>
}[] = [{
  options: {
    autoPlayMode: 'default',
    autoPlayTimeMs: 10000,
    thumbsCount: 4,
    imageAspectRatio: AspectRatio['3/2']
  },
  numberOfImages: 10,
  imageSourceAspectRatio: AspectRatio['1/1'],
  get images() {
    return getDemoImages(this.numberOfImages, this.imageSourceAspectRatio)
  },

},
  {
    options: {
      autoPlayMode: 'loop',
      autoPlayTimeMs: 3000,
      hasIndicator: true,
      imageAspectRatio: AspectRatio['3/2']
    },
    numberOfImages: 8,
    imageSourceAspectRatio: AspectRatio['3/2'],
    get images() {
      return getDemoImages(this.numberOfImages, this.imageSourceAspectRatio)
    },

  }]

</script>

<template>
  <div class="container mx-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-2  gap-8 ">
      <div class="gap-2 flex flex-col" v-for="(item, index) in imageCarouselDemoList">
        <ImageCarousel :images="item.images"
                       :options="item.options"/>
        <ul class="prose text-center">
          <li><strong>autoPlayMode: </strong>{{ item.options.autoPlayMode }}</li>
          <li><strong>autoPlayTimeMs: </strong>{{ item.options.autoPlayTimeMs }}</li>
          <li><strong>hasIndicator: </strong>{{ item.options.hasIndicator || false }}</li>
          <li><strong>thumbsCount: </strong>{{ item.options.thumbsCount || 0 }}</li>
          <li><strong>imageAspectRatio: </strong>{{ item.options.imageAspectRatio }}</li>
          <li><strong>numberOfImages: </strong>{{ item.numberOfImages }}</li>
          <li><strong>imageSourceAspectRatio: </strong>{{ item.imageSourceAspectRatio }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

