import { inject } from "vue";
import { ImageCarouselKey, ImageCarouselProviderProps } from "./types";

export const useImageCarousel = () =>
  inject(ImageCarouselKey) as ImageCarouselProviderProps;
