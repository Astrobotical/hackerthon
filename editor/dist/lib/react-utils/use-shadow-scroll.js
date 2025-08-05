"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollWithShadow = useScrollWithShadow;
const react_1 = require("react");
function useScrollWithShadow(darkMode) {
    const [scrollTop, setScrollTop] = (0, react_1.useState)(0);
    const [scrollHeight, setScrollHeight] = (0, react_1.useState)(0);
    const [clientHeight, setClientHeight] = (0, react_1.useState)(0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXNoYWRvdy1zY3JvbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3JlYWN0LXV0aWxzL3VzZS1zaGFkb3ctc2Nyb2xsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtEQXNDQztBQXhDRCxpQ0FBaUM7QUFFakMsU0FBZ0IsbUJBQW1CLENBQUMsUUFBaUI7SUFDbkQsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNyQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDakQsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztJQUV0RSxTQUFTLFlBQVk7UUFDbkIsTUFBTSxRQUFRLEdBQUcsWUFBWSxLQUFLLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDM0QsTUFBTSxLQUFLLEdBQUcsU0FBUyxLQUFLLENBQUMsQ0FBQztRQUM5QixNQUFNLFNBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxJQUFJLFlBQVksR0FBRyxZQUFZLEdBQUcsU0FBUyxDQUFDO1FBQzNFLE1BQU0sWUFBWSxHQUFHLFlBQVksR0FBRyxZQUFZLENBQUM7UUFFakQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLHdCQUF3QixLQUFLLEVBQUUsQ0FBQztRQUM1QyxNQUFNLE1BQU0sR0FBRyx5QkFBeUIsS0FBSyxFQUFFLENBQUM7UUFFaEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2xCLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7UUFFRCxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNyQixDQUFDO2FBQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNyQixTQUFTLEdBQUcsR0FBRyxHQUFHLEtBQUssTUFBTSxFQUFFLENBQUM7UUFDbEMsQ0FBQzthQUFNLElBQUksUUFBUSxFQUFFLENBQUM7WUFDcEIsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNsQixDQUFDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEVBQUUsZUFBZSxFQUFFLENBQUM7QUFDeEQsQ0FBQyJ9