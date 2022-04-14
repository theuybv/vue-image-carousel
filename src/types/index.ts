import { InjectionKey } from "vue";

export enum AspectRatio {
  "16/9" = 16 / 9,
  "9/16" = 9 / 16,
  "3/2" = 3 / 2,
  "3/4" = 3 / 4,
  "4/3" = 4 / 3,
  "1/1" = 1,
}

export type CarouselImage = {
  imageSrc: string;
  thumbSrc: string;
  alt?: string;
};

export type ThumbsInOutView = {
  index: number;
  element: HTMLElement;
  isInView: boolean;
};

export type ImageCarouselProvider = {
  images: CarouselImage[];
  imageContainerWidth: number;
  updateImageContainerWidth: (value: number) => void;
  updateCurrentIndex: (value: number) => void;
  updateThumbsContainerElement: (value: HTMLElement) => void;
  updateThumbElements: (value: HTMLElement[]) => void;
  thumbElements: HTMLElement[];
  thumbsContainerElement: HTMLElement;
  thumbsCount: number;
  thumbsGap: number;
  thumbsWidth: number;
  currentImage: CarouselImage;
  currentIndex: number;
  imageAspectRatio: AspectRatio;
  thumbAspectRatio: AspectRatio;
  imageMaxHeight: number;
  allLoadedThumbs: Promise<CarouselImage[]>;
};

export const ImageCarouselKey = Symbol() as InjectionKey<ImageCarouselProvider>;
