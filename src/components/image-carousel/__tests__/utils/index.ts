import {
  CarouselImage,
  ImageCarouselKey,
  ImageCarouselProviderProps,
} from "../../types";
import {
  defaultImageCarouselProps,
  reactiveProviderContext,
} from "../../useImageCarousel";
import { mount } from "@vue/test-utils";

export const mountWithImageCarouselProvider = (
  component: any,
  options: {
    images?: CarouselImage[];
    props?: ImageCarouselProviderProps;
  }
) => {
  const provider = {
    global: {
      provide: {
        // @ts-ignore
        [ImageCarouselKey]: reactiveProviderContext(
          options.images || [],
          options.props || defaultImageCarouselProps
        ),
      },
    },
  };
  return mount(component, provider);
};
