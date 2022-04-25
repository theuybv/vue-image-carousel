import { describe, expect, it, beforeEach, vi } from "vitest";
import { ref } from "vue";
import { mountWithImageCarouselProvider } from "./utils";
import ImageDisplay from "../ImageDisplay.vue";
import Loader from "vue-spinner/src/BeatLoader.vue";

vi.mock("@vueuse/core", () => {
  return {
    computedAsync: vi.fn().mockReturnValue(ref("laodedImage")),
    useClamp: vi.fn().mockReturnValue(ref(0)),
    useElementSize: vi.fn().mockReturnValue({ width: ref(0) }),
    useIntervalFn: vi.fn(),
  };
});
describe("ImageDisplay", () => {
  it("should load image", () => {
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
});
