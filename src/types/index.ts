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
  test?: string,
  readonly images: CarouselImage[];
  imageContainerWidth: number;
  thumbElements: HTMLElement[];
  thumbsContainerElement: HTMLElement;
  readonly thumbsCount: number;
  readonly thumbsGap: number;
  readonly thumbsWidth: number;
  readonly currentImage: CarouselImage;
  currentIndex: number;
  readonly imageAspectRatio: AspectRatio;
  readonly thumbAspectRatio: AspectRatio;
  readonly imageMaxHeight: number;
  allLoadedThumbs: Promise<CarouselImage[]>;
};

export const ImageCarouselKey = Symbol() as InjectionKey<ImageCarouselProvider>;
