"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounce = useDebounce;
const react_1 = require("react");
// Our hook
function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWRlYm91bmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci91c2UtZGVib3VuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQ0FpQ0M7QUFwQ0QsaUNBQXNFO0FBRXRFLFdBQVc7QUFDWCxTQUFnQixXQUFXLENBQ3pCLEtBQVEsRUFDUixLQUFhO0lBRWIsd0NBQXdDO0lBQ3hDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUQsSUFBQSxpQkFBUyxFQUNQLEdBQUcsRUFBRTtRQUNILG9FQUFvRTtRQUNwRSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQzlCLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVWLCtEQUErRDtRQUMvRCxtRUFBbUU7UUFDbkUscURBQXFEO1FBQ3JELHNFQUFzRTtRQUN0RSwyRUFBMkU7UUFDM0UsbUVBQW1FO1FBQ25FLHVFQUF1RTtRQUN2RSxrREFBa0Q7UUFDbEQsT0FBTyxHQUFHLEVBQUU7WUFDVixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELHVDQUF1QztJQUN2QyxnRUFBZ0U7SUFDaEUsa0RBQWtEO0lBQ2xELENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUNmLENBQUM7SUFFRixPQUFPLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDN0MsQ0FBQyJ9