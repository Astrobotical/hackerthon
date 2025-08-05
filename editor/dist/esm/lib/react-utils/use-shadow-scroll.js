import { useState } from "react";
export function useScrollWithShadow(darkMode) {
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const onScrollHandler = (event) => {
        setScrollTop(Math.floor(event.target.scrollTop));
        setScrollHeight(Math.floor(event.target.scrollHeight));
        setClientHeight(Math.floor(event.target.clientHeight));
    };
    const color = darkMode ? "rgb(50 50 50 / 1)" : "rgb(235 235 235 / 1)";
    function getBoxShadow() {
        const isBottom = clientHeight === scrollHeight - scrollTop;
        const isTop = scrollTop === 0;
        const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop;
        const isScrollable = scrollHeight > clientHeight;
        let boxShadow = "none";
        const top = `inset 0 8px 5px -5px ${color}`;
        const bottom = `inset 0 -8px 5px -5px ${color}`;
        if (!isScrollable) {
            return boxShadow;
        }
        if (isTop) {
            boxShadow = bottom;
        }
        else if (isBetween) {
            boxShadow = `${top}, ${bottom}`;
        }
        else if (isBottom) {
            boxShadow = top;
        }
        return boxShadow;
    }
    return { boxShadow: getBoxShadow(), onScrollHandler };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXNoYWRvdy1zY3JvbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JlYWN0LXV0aWxzL3VzZS1zaGFkb3ctc2Nyb2xsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxRQUFpQjtJQUNuRCxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRCxNQUFNLGVBQWUsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNqRCxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDdkQsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO0lBRXRFLFNBQVMsWUFBWTtRQUNuQixNQUFNLFFBQVEsR0FBRyxZQUFZLEtBQUssWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUMzRCxNQUFNLEtBQUssR0FBRyxTQUFTLEtBQUssQ0FBQyxDQUFDO1FBQzlCLE1BQU0sU0FBUyxHQUFHLFNBQVMsR0FBRyxDQUFDLElBQUksWUFBWSxHQUFHLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDM0UsTUFBTSxZQUFZLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUVqRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDdkIsTUFBTSxHQUFHLEdBQUcsd0JBQXdCLEtBQUssRUFBRSxDQUFDO1FBQzVDLE1BQU0sTUFBTSxHQUFHLHlCQUF5QixLQUFLLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbEIsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUVELElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLENBQUM7YUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLFNBQVMsR0FBRyxHQUFHLEdBQUcsS0FBSyxNQUFNLEVBQUUsQ0FBQztRQUNsQyxDQUFDO2FBQU0sSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNwQixTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsRUFBRSxlQUFlLEVBQUUsQ0FBQztBQUN4RCxDQUFDIn0=