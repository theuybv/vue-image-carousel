import { inject } from "vue";
import { ImageCarouselKey } from "../../../types";

export const useImageCarousel = () =>
  inject(ImageCarouselKey, {
    images: [],
    thumbsWidth: 0,
    thumbsGap: 0,
    thumbsCount: 0,
    updateImageContainerWidth: () => {},
    imageContainerWidth: 0,
    currentImage: {
      alt: "",
      imageSrc: "",
      thumbSrc: "",
    },
    currentIndex: 0,
    updateCurrentIndex: () => {},
  });
