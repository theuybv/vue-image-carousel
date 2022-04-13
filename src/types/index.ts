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
  imageContainerWidth: number;
  updateImageContainerWidth: (value: number) => void;
  thumbsCount: number;
  thumbsGap: number;
  thumbsWidth: number;
};

export const ImageCarouselKey = Symbol() as InjectionKey<ImageCarouselProvider>;
