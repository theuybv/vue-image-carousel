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
