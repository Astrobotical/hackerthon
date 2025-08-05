// from https://gist.github.com/reecelucas/2f510e6b8504008deaaa52732202d2da
import { useRef } from "react";
const useScrollBlock = () => {
    const scroll = useRef(false);
    const blockScroll = () => {
        if (typeof document === "undefined")
            return;
        const html = document.documentElement;
        const { body } = document;
        if (!body || !body.style || scroll.current)
            return;
        const scrollBarWidth = window.innerWidth - html.clientWidth;
        const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0;
        /**
         * 1. Fixes a bug in iOS and desktop Safari whereby setting
         *    `overflow: hidden` on the html/body does not prevent scrolling.
         * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
         *    scroll if an `overflow-x` style is also applied to the body.
         */
        html.style.position = "relative"; /* [1] */
        body.style.position = "relative"; /* [1] */
        html.style.overflow = "hidden"; /* [2] */
        body.style.overflow = "hidden"; /* [2] */
        body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
        scroll.current = true;
    };
    const allowScroll = () => {
        if (typeof document === "undefined")
            return;
        const html = document.documentElement;
        const { body } = document;
        if (!body || !body.style || !scroll.current)
            return;
        html.style.position = "";
        html.style.overflow = "";
        body.style.position = "";
        body.style.overflow = "";
        body.style.paddingRight = "";
        scroll.current = false;
    };
    return { blockScroll, allowScroll };
};
export { useScrollBlock };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXNjcm9sbC1ibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcmVhY3QtdXRpbHMvdXNlLXNjcm9sbC1ibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyRUFBMkU7QUFFM0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUU7SUFDMUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTdCLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUN2QixJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVc7WUFBRSxPQUFPO1FBRTVDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFDdEMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUUxQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsT0FBTztZQUFFLE9BQU87UUFFbkQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVELE1BQU0sZ0JBQWdCLEdBQ3BCLFFBQVEsQ0FDTixNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQ2hFLElBQUksQ0FBQyxDQUFDO1FBRVQ7Ozs7O1dBS0c7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxTQUFTO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLFNBQVM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsU0FBUztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxTQUFTO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEdBQUcsZ0JBQWdCLEdBQUcsY0FBYyxJQUFJLENBQUM7UUFFbkUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ3ZCLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVztZQUFFLE9BQU87UUFFNUMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztRQUN0QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDO1FBRTFCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRXBELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFN0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQyxDQUFDO0lBRUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQztBQUN0QyxDQUFDLENBQUM7QUFFRixPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMifQ==