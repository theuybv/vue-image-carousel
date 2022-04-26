import { describe, expect, it, beforeEach, vi, MockedFunction } from "vitest";
import { ref } from "vue";
import { mountWithImageCarouselProvider } from "./utils";
import ImageDisplay from "../ImageDisplay.vue";
import Loader from "vue-spinner/src/BeatLoader.vue";
import { computedAsync } from "@vueuse/core";

vi.mock("@vueuse/core", () => {
  return {
    computedAsync: vi.fn(),
    useClamp: vi.fn().mockReturnValue(ref(0)),
    useElementSize: vi.fn().mockReturnValue({ width: ref(0) }),
    useIntervalFn: vi.fn(),
  };
});
describe("ImageDisplay", () => {
  it("should load image", () => {
    const computedAsyncMock = computedAsync as MockedFunction<
      typeof computedAsync
    >;

    computedAsyncMock.mockReturnValue(ref("loadedimage"));

    const wrapper = mountWithImageCarouselProvider(ImageDisplay, {
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

  it("should show loading icon when image is loading", () => {
    const computedAsyncMock = computedAsync as MockedFunction<
      typeof computedAsync
    >;

    computedAsyncMock.mockReturnValue(ref(undefined));

    const wrapper = mountWithImageCarouselProvider(ImageDisplay, {
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
