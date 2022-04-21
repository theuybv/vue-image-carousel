import {ThumbsInOutView} from "../types";

export const intersectRect = (aElement: HTMLElement, bElement: HTMLElement) => {
    const a = aElement.getBoundingClientRect();
    const b = bElement.getBoundingClientRect();
    return (
        a.left <= b.right &&
        b.left <= a.right &&
        a.top <= b.bottom &&
        b.top <= a.bottom
    );
};

export const getImageThumbsInOutView = (
    imageThumbs: HTMLElement[],
    thumbsContainer: HTMLElement
) => {
    const thumbElements: ThumbsInOutView[] = imageThumbs.map((imageThumb, index) => {
        return {
            index,
            element: imageThumb,
            isInView: intersectRect(imageThumb, thumbsContainer),
        };
    });
    const thumbElementsInView = thumbElements.filter((value) => {
        return value.isInView;
    });
    const thumbElementsNotInView = thumbElements.filter((value) => {
        return !value.isInView;
    });

    return {
        thumbElements,
        thumbElementsInView,
        thumbElementsNotInView,
    };
};



export const getThumbsIterator = (thumbsElements: ThumbsInOutView[], thumbElementsInView: ThumbsInOutView[]) => {
    const lastInView = thumbElementsInView[thumbElementsInView.length - 1]
    const firstInView = thumbElementsInView[0]
    const nextInToView = lastInView && thumbsElements[lastInView.index + 1]
    const prevInToView = firstInView && thumbsElements[firstInView.index - 1]
    return {
        lastInView,
        firstInView,
        nextInToView,
        prevInToView,
    }
}
