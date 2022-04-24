<script setup lang="ts">
import {useImageCarousel} from "./useImageCarousel";
import {computed} from "vue";

const context = useImageCarousel()


const showPrev = computed(() => {
  return context.currentIndex !== 0
})

const showNext = computed(() => {
  return context.currentIndex !== context.images.length - 1
})

const onNextClick = () => {
  context.currentIndex = context.currentIndex + 1
}

const onPrevClick = () => {
  context.currentIndex = context.currentIndex - 1
}


</script>
<template>
  <section class="absolute w-full h-full top-0 pointer-events-none">
    <nav class="relative flex h-full items-center">
      <button :disabled="!showPrev" @click="onPrevClick"  class="disabled:opacity-30 absolute bg-white left-2 rounded-full pointer-events-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
    <button :disabled="!showNext" @click="onNextClick" class="disabled:opacity-30 absolute bg-white right-2 rounded-full pointer-events-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </nav>
  </section>
</template>
