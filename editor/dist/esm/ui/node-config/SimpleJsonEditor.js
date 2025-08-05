import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback } from "react";
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
export function SimpleJsonEditor(props) {
    const [tempDataValue, setTempDataValue] = React.useState(props.rawData || JSON.stringify(props.value, null, 2));
    React.useEffect(() => {
        if (props.rawData !== undefined) {
            setTempDataValue(props.rawData);
        }
    }, [props.rawData]);
    const [dataParseError, setDataParseError] = React.useState();
    const onValueChange = useCallback((e) => {
        const newRawValue = e.target.value;
        setTempDataValue(newRawValue);
        if (props.onChangeRaw) {
            props.onChangeRaw(newRawValue);
        }
        try {
            const data = JSON.parse(newRawValue);
            setDataParseError(undefined);
            props.onChange(data);
        }
        catch (e) {
            setDataParseError(e.message);
        }
    }, [props]);
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "4px" }, children: [props.label && _jsx(Label, { children: props.label }), _jsx(Textarea, { value: tempDataValue, onChange: onValueChange, style: {
                    minWidth: props.isExpanded ? "65vw" : "100%",
                    height: props.isExpanded ? "65vh" : undefined,
                } }), dataParseError && (_jsx("div", { className: "text-red-500 text-sm mt-1", children: dataParseError }))] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlSnNvbkVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub2RlLWNvbmZpZy9TaW1wbGVKc29uRWRpdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVVyRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsS0FPaEM7SUFDQyxNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FDdEQsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUN0RCxDQUFDO0lBRUYsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDbkIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFcEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQVUsQ0FBQztJQUVyRSxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQy9CLENBQUMsQ0FBeUMsRUFBRSxFQUFFO1FBQzVDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ25DLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTlCLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELElBQUksQ0FBQztZQUNILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLGlCQUFpQixDQUFFLENBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQyxFQUNELENBQUMsS0FBSyxDQUFDLENBQ1IsQ0FBQztJQUVGLE9BQU8sQ0FDTCxlQUFLLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQ2pFLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBQyxLQUFLLGNBQUUsS0FBSyxDQUFDLEtBQUssR0FBUyxFQUM1QyxLQUFDLFFBQVEsSUFDUCxLQUFLLEVBQUUsYUFBYSxFQUNwQixRQUFRLEVBQUUsYUFBYSxFQUN2QixLQUFLLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtvQkFDNUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDOUMsR0FDRCxFQUNELGNBQWMsSUFBSSxDQUNqQixjQUFLLFNBQVMsRUFBQywyQkFBMkIsWUFBRSxjQUFjLEdBQU8sQ0FDbEUsSUFDRyxDQUNQLENBQUM7QUFDSixDQUFDIn0=