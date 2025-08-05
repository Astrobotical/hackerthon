import { useState, useEffect } from "react";
// Our hook
export function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Set debouncedValue to value (passed in) after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // Return a cleanup function that will be called every time ...
        // ... useEffect is re-called. useEffect will only be re-called ...
        // ... if value changes (see the inputs array below).
        // This is how we prevent debouncedValue from changing if value is ...
        // ... changed within the delay period. Timeout gets cleared and restarted.
        // To put it in context, if the user is typing within our app's ...
        // ... search box, we don't want the debouncedValue to update until ...
        // ... they've stopped typing for more than 500ms.
        return () => {
            clearTimeout(handler);
        };
    }, 
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value, delay]);
    return [debouncedValue, setDebouncedValue];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWRlYm91bmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci91c2UtZGVib3VuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQTRCLE1BQU0sT0FBTyxDQUFDO0FBRXRFLFdBQVc7QUFDWCxNQUFNLFVBQVUsV0FBVyxDQUN6QixLQUFRLEVBQ1IsS0FBYTtJQUViLHdDQUF3QztJQUN4QyxNQUFNLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTVELFNBQVMsQ0FDUCxHQUFHLEVBQUU7UUFDSCxvRUFBb0U7UUFDcEUsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUM5QixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFViwrREFBK0Q7UUFDL0QsbUVBQW1FO1FBQ25FLHFEQUFxRDtRQUNyRCxzRUFBc0U7UUFDdEUsMkVBQTJFO1FBQzNFLG1FQUFtRTtRQUNuRSx1RUFBdUU7UUFDdkUsa0RBQWtEO1FBQ2xELE9BQU8sR0FBRyxFQUFFO1lBQ1YsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCx1Q0FBdUM7SUFDdkMsZ0VBQWdFO0lBQ2hFLGtEQUFrRDtJQUNsRCxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FDZixDQUFDO0lBRUYsT0FBTyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzdDLENBQUMifQ==