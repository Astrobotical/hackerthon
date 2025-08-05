"use strict";
// from https://gist.github.com/reecelucas/2f510e6b8504008deaaa52732202d2da
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollBlock = void 0;
const react_1 = require("react");
const useScrollBlock = () => {
    const scroll = (0, react_1.useRef)(false);
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
exports.useScrollBlock = useScrollBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXNjcm9sbC1ibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcmVhY3QtdXRpbHMvdXNlLXNjcm9sbC1ibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkVBQTJFOzs7QUFFM0UsaUNBQStCO0FBRS9CLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTtJQUMxQixNQUFNLE1BQU0sR0FBRyxJQUFBLGNBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQztJQUU3QixNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDdkIsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXO1lBQUUsT0FBTztRQUU1QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO1FBQ3RDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFFMUIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRW5ELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1RCxNQUFNLGdCQUFnQixHQUNwQixRQUFRLENBQ04sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUNoRSxJQUFJLENBQUMsQ0FBQztRQUVUOzs7OztXQUtHO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLENBQUMsU0FBUztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxTQUFTO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLFNBQVM7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsU0FBUztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFHLGdCQUFnQixHQUFHLGNBQWMsSUFBSSxDQUFDO1FBRW5FLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUMsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUN2QixJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVc7WUFBRSxPQUFPO1FBRTVDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFDdEMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUUxQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUVwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUMsQ0FBQztJQUVGLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRU8sd0NBQWMifQ==