<script setup lang="ts">
import ImageCarousel from './components/image-carousel/ImageCarousel.vue';
import {getDemoImages} from "./components/image-carousel/data";
import {AspectRatio, CarouselImage, ImageCarouselOptions} from "./components/image-carousel/types";


const imageCarouselDemoList: {
  images: CarouselImage[]
  imageSourceAspectRatio: AspectRatio,
  numberOfImages: number
  options: Partial<ImageCarouselOptions> | any
}[] = [{
  options: {
    autoPlayMode: 'default',
    autoPlayTimeMs: 10000,
    viewableThumbsCount: 4,
    imageAspectRatio: AspectRatio['3/2'],
    thumbAspectRatio: AspectRatio['4/3']
  },
  numberOfImages: 10,
  imageSourceAspectRatio: AspectRatio['3/2'],
  get images() {
    return getDemoImages(this.numberOfImages, this.imageSourceAspectRatio)
  },
},
  {
    options: {
      autoPlayMode: 'loop',
      autoPlayTimeMs: 5000,
      viewableThumbsCount: 5,
      imageAspectRatio: AspectRatio['3/2'],
      thumbAspectRatio: AspectRatio['1/1']
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
      hasImagesIndicator: true,
      imageAspectRatio: AspectRatio['3/2']
    },
    numberOfImages: 8,
    imageSourceAspectRatio: AspectRatio['3/2'],
    get images() {
      return getDemoImages(this.numberOfImages, this.imageSourceAspectRatio)
    },

  },
  {
    options: {
      autoPlayMode: 'none',
      autoPlayTimeMs: 3000,
      hasImagesIndicator: true,
      hasImagesIndicatorPrevNext: true,
      imageAspectRatio: AspectRatio['3/2']
    },
    numberOfImages: 5,
    imageSourceAspectRatio: AspectRatio['3/2'],
    get images() {
      return getDemoImages(this.numberOfImages, this.imageSourceAspectRatio)
    },

  },
  {
    options: {
      autoPlayMode: 'none',
      autoPlayTimeMs: 3000,
      hasImagesIndicator: false,
      hasImagesIndicatorPrevNext: true,
      imageAspectRatio: AspectRatio['4/3'],
      thumbAspectRatio: AspectRatio['1/1']
    },
    numberOfImages: 12,
    imageSourceAspectRatio: AspectRatio['4/3'],
    get images() {
      return getDemoImages(this.numberOfImages, this.imageSourceAspectRatio)
    },
  }]

</script>

<template>
  <div class="container mx-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="(item, index) in imageCarouselDemoList">
        <ImageCarousel :images="item.images"
                       :options="item.options"/>
          <p v-for="(key, index) in Object.keys(item.options)"><strong>{{ key }}: </strong>{{ item.options[key] }}</p>
          <p><strong>numberOfImages: </strong>{{ item.numberOfImages }}</p>
          <p><strong>imageSourceAspectRatio: </strong>{{ item.imageSourceAspectRatio }}</p>
      </div>
    </div>
  </div>
</template>

