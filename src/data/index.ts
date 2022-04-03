import { faker } from "@faker-js/faker";
import { AspectRatio } from "../types";
export const getDemoImages = (
  numberOfImages: number,
  aspectRatio: AspectRatio
) => {
  return [...Array(numberOfImages)].map((_value, index) => {
    const maxWidth = 1024;
    const height = Math.round(aspectRatio * maxWidth);
    const width = Math.round(height * aspectRatio);
    const imageSrc = `https://picsum.photos/${width}/${height}?random=${index}`;

    return {
      thumbSrc: imageSrc,
      imageSrc: imageSrc,
      alt: faker.name.lastName(),
    };
  });
};
