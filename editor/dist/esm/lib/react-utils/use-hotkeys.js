import hotkeys from "hotkeys-js";
import { useCallback, useEffect } from "react";
export let currentHotkeys = new Map();
export function useHotkeys(keys, callback, menuData, deps = [], controlRef) {
    const memoisedCallback = useCallback((...args) => {
        if (!controlRef || controlRef.current) {
            callback(...args);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps, callback]);
    useEffect(() => {
        hotkeys(keys, {}, memoisedCallback);
        currentHotkeys.set(keys, menuData);
        return () => {
            currentHotkeys.delete(keys);
            hotkeys.unbind(keys, memoisedCallback);
        };
    }, [keys, memoisedCallback, menuData]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWhvdGtleXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JlYWN0LXV0aWxzL3VzZS1ob3RrZXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBeUIsTUFBTSxZQUFZLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFVL0MsTUFBTSxDQUFDLElBQUksY0FBYyxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO0FBRS9ELE1BQU0sVUFBVSxVQUFVLENBQ3hCLElBQVksRUFDWixRQUFvQixFQUNwQixRQUF5QixFQUN6QixPQUFjLEVBQUUsRUFDaEIsVUFBNEM7SUFHNUMsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQ2xDLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtRQUNWLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUM7SUFDSCxDQUFDO0lBQ0QsdURBQXVEO0lBQ3ZELENBQUMsR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQ3BCLENBQUM7SUFFRixTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2IsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNwQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVuQyxPQUFPLEdBQUcsRUFBRTtZQUNWLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtRQUN4QyxDQUFDLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDIn0=