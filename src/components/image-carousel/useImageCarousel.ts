import { inject, reactive } from "vue";
import {
  AspectRatio,
  CarouselImage,
  ImageCarouselKey,
  ImageCarouselOptions,
  ImageCarouselProviderProps,
} from "./types";

export const defaultImageCarouselProps: ImageCarouselProviderProps = {
  allLoadedThumbs: Promise.resolve([]),
  autoPlayMode: "none",
  autoPlayTimeMs: 3000,
  currentImage: {
    imageSrc: "",
    alt: "",
    thumbSrc: "",
  },
  currentIndex: 0,
  hasImagesIndicator: false,
  hasImagesIndicatorPrevNext: false,
  imageAspectRatio: AspectRatio["3/2"],
  imageContainerWidth: 0,
  imageMaxHeight: 500,
  images: [],
  thumbAspectRatio: AspectRatio["4/3"],
  thumbElements: [],
  thumbsContainerElement: document.createElement("div"),
  thumbsGap: 8,
  thumbsWidth: 0,
  viewableThumbsCount: 0,
};

export const reactiveProviderContext = (
  images: CarouselImage[],
  options: Partial<ImageCarouselOptions>
) => {
  const overrideOptions = {
    ...defaultImageCarouselProps,
    ...options,
  };
  return reactive<ImageCarouselProviderProps>({
    ...overrideOptions,
    images,
    get thumbsWidth() {
      return (
        this.imageContainerWidth / this.viewableThumbsCount -
        this.thumbsGap +
        this.thumbsGap / this.viewableThumbsCount
      );
    },
    get currentImage() {
      return this.images[this.currentIndex];
    },
    get allLoadedThumbs() {
      return Promise.all(
        this.images.map((item: CarouselImage) => {
          return new Promise<CarouselImage>((resolve, reject) => {
            const image = new Image();
            image.src = item.thumbSrc;
            image.onload = () => {
              resolve(item);
            };
            image.onerror = () => {
              reject();
            };
          });
        })
      );
    },
  });
};

export const useImageCarousel = () => {
  return inject(
    ImageCarouselKey,
    reactiveProviderContext([], defaultImageCarouselProps)
  );
};
