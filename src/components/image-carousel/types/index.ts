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

export type ImageCarouselOptions = {
  readonly images: CarouselImage[];
  readonly viewableThumbsCount: number;
  readonly thumbsGap: number;
  readonly thumbsWidth: number;
  readonly currentImage: CarouselImage;
  readonly imageAspectRatio: AspectRatio;
  readonly thumbAspectRatio: AspectRatio;
  readonly imageMaxHeight: number;
  readonly autoPlayTimeMs: number;
  readonly hasImagesIndicator: boolean;
  readonly hasImagesIndicatorPrevNext: boolean;
  readonly autoPlayMode: "none" | "loop" | "default";
};

export type ImageCarouselProviderProps = {
  imageContainerWidth: number;
  thumbElements: HTMLElement[];
  thumbsContainerElement: HTMLElement;
  currentIndex: number;
  allLoadedThumbs: Promise<CarouselImage[]>;
  emit: {
    (e: "itemSelect", index: number): void;
  };
} & ImageCarouselOptions;

export const ImageCarouselKey = Symbol();
