import { ImageCarouselKey, ImageCarouselProviderProps } from "../../types";
import { reactiveProviderContext } from "../../useImageCarousel";
import { mount } from "@vue/test-utils";

export const mountWithImageCarouselProvider = (
  component: any,
  props: ImageCarouselProviderProps
) => {
  const provider = {
    global: {
      provide: {
        // @ts-ignore
        [ImageCarouselKey]: reactiveProviderContext(props.images, props),
      },
    },
  };
  return mount(component, provider);
};
