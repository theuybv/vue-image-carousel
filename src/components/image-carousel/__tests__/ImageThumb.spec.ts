import "@testing-library/jest-dom/extend-expect";
import { describe, expect, it } from "vitest";

import ImageThumb, { ImageThumbProps } from "../ImageThumb.vue";
import { render } from "@testing-library/vue";
import { AspectRatio } from "../types";

describe("ImageThumb", () => {
  it("render component with correct html elements", () => {
    const props: ImageThumbProps = {
      active: true,
      aspectRatio: AspectRatio["1/1"],
      image: {
        thumbSrc: "",
        imageSrc: "",
        alt: "",
      },
      width: 100,
    };
    const { getByRole } = render(ImageThumb, { props });

    const button = getByRole("button");
    const img = getByRole("img");
    expect(button).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
});
