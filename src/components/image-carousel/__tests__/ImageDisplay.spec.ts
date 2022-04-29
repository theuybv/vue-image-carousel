import { beforeEach, describe, expect, it, MockedFunction, vi } from "vitest";
import { ref } from "vue";
import { mountWithImageCarouselProvider } from "./utils";
import ImageDisplay from "../ImageDisplay.vue";
import Loader from "vue-spinner/src/BeatLoader.vue";
import { computedAsync } from "@vueuse/core";
import { defaultImageCarouselProps } from "../useImageCarousel";
import ThumbsIndicator from "../ThumbsIndicator.vue";
import ImagesNavigator from "../ImagesNavigator.vue";

vi.mock("@vueuse/core", () => {
  return {
    computedAsync: vi.fn(),
    useClamp: vi.fn().mockReturnValue(ref(0)),
    useElementSize: vi.fn().mockReturnValue({ width: ref(0) }),
    useIntervalFn: vi.fn(),
  };
});

describe("ImageDisplay", () => {
  describe("loaded image state", () => {
    beforeEach(() => {
      const computedAsyncMock = computedAsync as MockedFunction<
        typeof computedAsync
      >;

      computedAsyncMock.mockReturnValue(ref("loadedimage"));
    });

    it("should load image", () => {
      const wrapper = mountWithImageCarouselProvider(ImageDisplay, {
        ...defaultImageCarouselProps,
        images: [
          {
            imageSrc: "",
            alt: "",
            thumbSrc: "",
          },
        ],
      });

      expect(wrapper.find("figure img").exists()).toBeTruthy();
      expect(wrapper.findComponent(Loader).exists()).not.toBeTruthy();
    });

    it("should hasImagesIndicator && hasImagesIndicatorPrevNext", () => {
      const wrapper = mountWithImageCarouselProvider(ImageDisplay, {
        ...defaultImageCarouselProps,
        hasImagesIndicator: true,
        hasImagesIndicatorPrevNext: true,
        images: [
          {
            imageSrc: "",
            alt: "",
            thumbSrc: "",
          },
        ],
      });

      expect(wrapper.findComponent(ThumbsIndicator).exists()).toBeTruthy();
      expect(wrapper.findComponent(ImagesNavigator).exists()).toBeTruthy();
    });
  });

  describe("unloaded image state", () => {
    beforeEach(() => {
      const computedAsyncMock = computedAsync as MockedFunction<
        typeof computedAsync
      >;

      computedAsyncMock.mockReturnValue(ref(undefined));
    });

    it("should show loading icon when image is loading", () => {
      const wrapper = mountWithImageCarouselProvider(ImageDisplay, {
        ...defaultImageCarouselProps,
        images: [
          {
            imageSrc: "",
            alt: "",
            thumbSrc: "",
          },
        ],
      });

      expect(wrapper.find("figure img").exists()).toBeFalsy();
      expect(wrapper.findComponent(Loader).exists()).toBeTruthy();
    });
  });
});
