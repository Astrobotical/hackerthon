"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRect = void 0;
const react_1 = require("react");
const useRect = (ref) => {
    const [rect, setRect] = (0, react_1.useState)(getRect(ref ? ref.current : null));
    const handleResize = (0, react_1.useCallback)(() => {
        if (!ref.current) {
            return;
        }
        // Update client rect
        setRect(getRect(ref.current));
    }, [ref]);
    (0, react_1.useLayoutEffect)(() => {
        const element = ref.current;
        if (!element) {
            return;
        }
        handleResize();
        if (typeof ResizeObserver === "function") {
            let resizeObserver;
            resizeObserver = new ResizeObserver(() => handleResize());
            resizeObserver.observe(element);
            return () => {
                if (!resizeObserver) {
                    return;
                }
                resizeObserver.disconnect();
                resizeObserver = undefined;
            };
        }
        else {
            // Browser support, remove freely
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [ref.current]);
    return rect;
};
exports.useRect = useRect;
function getRect(element) {
    if (!element) {
        return {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
        };
    }
    return element.getBoundingClientRect();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXJlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3JlYWN0LXV0aWxzL3VzZS1yZWN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBK0Q7QUFJeEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFRLEVBQVEsRUFBRTtJQUN4QyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXBFLE1BQU0sWUFBWSxHQUFHLElBQUEsbUJBQVcsRUFBQyxHQUFHLEVBQUU7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixPQUFPO1FBQ1QsQ0FBQztRQUVELHFCQUFxQjtRQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFVixJQUFBLHVCQUFlLEVBQUMsR0FBRyxFQUFFO1FBQ25CLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2IsT0FBTztRQUNULENBQUM7UUFFRCxZQUFZLEVBQUUsQ0FBQztRQUVmLElBQUksT0FBTyxjQUFjLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDekMsSUFBSSxjQUEwQyxDQUFDO1lBQy9DLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQzFELGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFaEMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNwQixPQUFPO2dCQUNULENBQUM7Z0JBRUQsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM1QixjQUFjLEdBQUcsU0FBUyxDQUFDO1lBQzdCLENBQUMsQ0FBQztRQUNKLENBQUM7YUFBTSxDQUFDO1lBQ04saUNBQWlDO1lBQ2pDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFaEQsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFbEIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUE1Q1csUUFBQSxPQUFPLFdBNENsQjtBQUVGLFNBQVMsT0FBTyxDQUFDLE9BQW9CO0lBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNiLE9BQU87WUFDTCxNQUFNLEVBQUUsQ0FBQztZQUNULE1BQU0sRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQztZQUNSLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxFQUFFLENBQUM7WUFDUixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3pDLENBQUMifQ==