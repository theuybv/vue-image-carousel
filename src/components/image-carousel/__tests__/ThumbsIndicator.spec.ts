import ThumbsIndicator from "../ThumbsIndicator.vue";
import { mountWithImageCarouselProvider } from "./utils";
import { defaultImageCarouselProps } from "../useImageCarousel";

describe("ThumbsIndicator", () => {
  const images = [
    {
      thumbSrc: "",
      alt: "",
      imageSrc: "",
    },
    {
      thumbSrc: "",
      alt: "",
      imageSrc: "",
    },
  ];

  it("should render indicators and change currentIndex by clicking on item", async () => {
    const wrapper = mountWithImageCarouselProvider(ThumbsIndicator, {
      ...defaultImageCarouselProps,
      images,
    });
    expect(wrapper.findAll("button")).toHaveLength(images.length);
    const secondButton = wrapper.findAll("button")[1];
    const firstButton = wrapper.findAll("button")[0];
    await secondButton.trigger("click");
    expect(secondButton.attributes()).toMatchObject({
      "aria-selected": "true",
    });
    expect(firstButton.element).toHaveAttribute("aria-selected", "false");
    expect(secondButton.element).toHaveAttribute("aria-selected", "true");
  });
});
