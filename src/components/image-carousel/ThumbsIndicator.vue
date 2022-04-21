<script setup lang="ts">

import {ImageCarouselKey, ImageCarouselProviderProps} from "./types";
import {inject} from "vue";

const context = inject(ImageCarouselKey) as ImageCarouselProviderProps

const onIndicatorClick = (event:MouseEvent, index: number) => {
  context.currentIndex = index
  /*context.thumbsContainerElement.scroll({
    left: context.thumbElements[index].offsetLeft - 8,
    behavior: 'smooth',
  })*/
}

</script>
<template>
  <section class="absolute bottom-0 w-full">
    <div class="flex w-full justify-center">
      <nav class="pb-3">
        <ul class="flex flex-row gap-2">
          <li v-for="(item, index) in context.images" :key="item.thumbSrc">
                <button
                    :class="{'bg-red-600': index === context.currentIndex, 'bg-white opacity-80': index !== context.currentIndex}"
                    class="rounded-full w-3 h-3 hover:bg-red-200"
                    aria-label="thumb indicator" @click="onIndicatorClick($event, index)"
                />
          </li>
        </ul>
      </nav>
    </div>
  </section>

</template>

