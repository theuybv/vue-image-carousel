<script setup lang="ts">
import {AspectRatio, CarouselImage} from "../types";
import {onMounted, onUnmounted, ref} from "vue";

export type ImageDisplayProps = {
  image: CarouselImage;
  aspectRatio?: AspectRatio;
  imageMaxHeight?: number;
};
const {image, aspectRatio, imageMaxHeight} = withDefaults(
    defineProps<ImageDisplayProps>(),
    {
      aspectRatio: AspectRatio["3/2"],
      imageMaxHeight: 400,
    }
);

const emit = defineEmits<{
  (e: "imageSizeChanged", image: HTMLImageElement): void;
}>();

const imageRef = ref<HTMLImageElement>(document.createElement("img"));

const onImageLoaded = () => {
  emit("imageSizeChanged", imageRef.value);
};

const onWindowResize = () => {
  emit("imageSizeChanged", imageRef.value);
};

onMounted(() => window.addEventListener("resize", onWindowResize));

onUnmounted(() => window.removeEventListener("resize", onWindowResize));


</script>

<template>
  <figure
      class="ImageDisplay"
      :style="{ maxHeight: `${imageMaxHeight}px`, aspectRatio: aspectRatio}"
  >
    <img
        @load="onImageLoaded"
        :src="image.imageSrc"
        :alt="image.alt"
        :style="{ aspectRatio: aspectRatio }"
        ref="imageRef"
    />
  </figure>
</template>

<style scoped>
.ImageDisplay {
  background: black;
}

img {
  background: black;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
