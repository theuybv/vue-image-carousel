<script setup lang="ts">
import {AspectRatio, CarouselImage, ImageCarouselKey} from "../types";
import {inject, onMounted, onUnmounted, ref} from "vue";

const provider = inject(ImageCarouselKey)

export type ImageDisplayProps = {
  image: CarouselImage;
  aspectRatio?: AspectRatio;
  imageMaxHeight?: number;
}
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

const onWindowResize = () => {
  emit("imageSizeChanged", imageRef.value);
  provider?.updateImageContainerWidth(imageRef.value.width)
};

onMounted(() => window.addEventListener("resize", onWindowResize));

onUnmounted(() => window.removeEventListener("resize", onWindowResize));


</script>

<template>
  <figure
      class="ImageDisplay"
      :style="{ maxHeight: `${imageMaxHeight}px`, aspectRatio: aspectRatio.toString()}"
  >
    <img
        @load="onWindowResize"
        :src="image.imageSrc"
        :alt="image.alt"
        :style="{ aspectRatio: aspectRatio.toString() }"
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
