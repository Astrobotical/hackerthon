import { useLayoutEffect, useCallback, useState } from "react";
export const useRect = (ref) => {
    const [rect, setRect] = useState(getRect(ref ? ref.current : null));
    const handleResize = useCallback(() => {
        if (!ref.current) {
            return;
        }
        // Update client rect
        setRect(getRect(ref.current));
    }, [ref]);
    useLayoutEffect(() => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXJlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JlYWN0LXV0aWxzL3VzZS1yZWN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFJL0QsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBUSxFQUFRLEVBQUU7SUFDeEMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVwRSxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsT0FBTztRQUNULENBQUM7UUFFRCxxQkFBcUI7UUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRVYsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUNuQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLE9BQU87UUFDVCxDQUFDO1FBRUQsWUFBWSxFQUFFLENBQUM7UUFFZixJQUFJLE9BQU8sY0FBYyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ3pDLElBQUksY0FBMEMsQ0FBQztZQUMvQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUMxRCxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWhDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDcEIsT0FBTztnQkFDVCxDQUFDO2dCQUVELGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDNUIsY0FBYyxHQUFHLFNBQVMsQ0FBQztZQUM3QixDQUFDLENBQUM7UUFDSixDQUFDO2FBQU0sQ0FBQztZQUNOLGlDQUFpQztZQUNqQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRWhELE9BQU8sR0FBRyxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRWxCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBRUYsU0FBUyxPQUFPLENBQUMsT0FBb0I7SUFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTztZQUNMLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxDQUFDO1lBQ1IsR0FBRyxFQUFFLENBQUM7WUFDTixLQUFLLEVBQUUsQ0FBQztZQUNSLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDekMsQ0FBQyJ9