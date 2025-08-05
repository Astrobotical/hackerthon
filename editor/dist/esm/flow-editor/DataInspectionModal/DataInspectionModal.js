import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui";
import { Card } from "../../ui";
import { Input } from "../../ui";
import { ScrollArea } from "../../ui";
import { Alert, AlertDescription } from "../../ui";
import { Button } from "../../ui";
import React, { useEffect } from "react";
import { timeAgo, useDebounce } from "../..";
import { BrowserOnlyReactJson } from "../../lib/analytics-value-renderer/BrowserJsonView";
import { Loader } from "../../lib/loader";
import { useDebuggerContext } from "../DebuggerContext";
export const DataInspectionModal = (props) => {
    var _a;
    const { onRequestHistory } = useDebuggerContext();
    const { item, isOpen } = props;
    const [data, setData] = React.useState();
    const [currIdx, setCurrIdx] = React.useState(0);
    const [search, setSearch] = React.useState("");
    const [filteredValue, setFilteredValue] = React.useState([]);
    const [debouncedSearch] = useDebounce(search, 300);
    useEffect(() => {
        var _a;
        setFilteredValue((_a = data === null || data === void 0 ? void 0 : data.lastSamples.filter((sample) => {
            if (typeof sample.val === "object") {
                return JSON.stringify(sample.val).includes(debouncedSearch);
            }
            return sample.val.toString().includes(debouncedSearch);
        })) !== null && _a !== void 0 ? _a : []);
        setCurrIdx(0);
    }, [data === null || data === void 0 ? void 0 : data.lastSamples, debouncedSearch]);
    React.useEffect(() => {
        async function fetchData() {
            var _a, _b, _c, _d;
            const data = await onRequestHistory(item.insId, (_b = (_a = item.pin) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "", (_d = (_c = item.pin) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : "input");
            setData(data);
        }
        fetchData();
    }, [item, onRequestHistory]);
    const renderValue = (event) => {
        const val = event.val;
        if (typeof val === "object") {
            return _jsx(BrowserOnlyReactJson, { src: val });
        }
        return _jsx("code", { className: "rounded bg-muted px-2 py-1", children: val.toString() });
    };
    const renderEmptyState = () => {
        if (!data || data.lastSamples.length > 0 && search.length > 0) {
            return (_jsx(Alert, { children: _jsxs(AlertDescription, { children: ["No data found for search query \"", search, "\""] }) }));
        }
        return (_jsx(Alert, { children: _jsxs(AlertDescription, { children: ["No events captured for instance ", item.insId, " ", item.pin ? `and ${item.pin.id}` : "", ". Make sure a debugger is connected and your program was triggered."] }) }));
    };
    const itemName = `"${item.insId}" ${((_a = item.pin) === null || _a === void 0 ? void 0 : _a.id) ? `(${item.pin.id})` : ""}`;
    const renderInner = () => {
        if (!data) {
            return _jsx(Loader, {});
        }
        if (data.total === 0) {
            return (_jsx(Alert, { children: _jsxs(AlertDescription, { children: ["No events captured for instance ", _jsx("em", { children: item.insId }), " ", item.pin ? (_jsxs(React.Fragment, { children: ["and pin ", _jsx("em", { children: item.pin.id })] })) : null, ". Make sure debugger is running and your program was triggered."] }) }));
        }
        const currEvent = filteredValue === null || filteredValue === void 0 ? void 0 : filteredValue[currIdx];
        if (!currEvent) {
            return renderEmptyState();
        }
        return (_jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { className: "p-4", children: [currEvent && (_jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { children: ["Showing sample ", currIdx, " of event from", " ", _jsx("strong", { children: timeAgo(currEvent.time) }), " (", new Date(currEvent.time).toLocaleString(), ")"] }), _jsxs("div", { children: ["Instance: ", _jsx("strong", { children: currEvent.insId }), ", Pin id:", " ", _jsx("strong", { children: currEvent.pinId })] }), _jsx("div", { children: "Value:" })] })), renderValue(currEvent)] }), _jsx(ScrollArea, { className: "h-[200px]", children: _jsx("div", { className: "space-y-1", children: filteredValue.map((sample, i) => {
                            const pinId = sample.pinId;
                            const label = `${data.total - i}. from pin "${pinId}"`;
                            return (_jsx(Button, { variant: i === currIdx ? "secondary" : "ghost", className: "w-full justify-start", onClick: () => setCurrIdx(i), children: label }, i));
                        }) }) })] }));
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && props.onClose(), children: _jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { children: ["Inspecting data for instance ", itemName] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("header", { className: "space-y-2", children: [data && (_jsxs("div", { className: "space-y-1", children: [_jsxs("em", { children: [itemName, " called ", data.total, " time(s)"] }), data.total > 10 && (_jsx("div", { className: "text-sm text-muted-foreground", children: "Showing last 10 samples" }))] })), _jsx(Input, { type: "search", placeholder: "Search for values", onChange: (e) => setSearch(e.target.value), value: search }), debouncedSearch.length > 0 && (_jsxs("div", { className: "text-sm text-muted-foreground", children: ["Showing ", filteredValue === null || filteredValue === void 0 ? void 0 : filteredValue.length, " of ", data === null || data === void 0 ? void 0 : data.lastSamples.length, " ", "samples matching query \"", debouncedSearch, "\""] }))] }), _jsx("main", { children: renderInner() })] })] }) }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YUluc3BlY3Rpb25Nb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mbG93LWVkaXRvci9EYXRhSW5zcGVjdGlvbk1vZGFsL0RhdGFJbnNwZWN0aW9uTW9kYWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxPQUFPLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFReEQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQXVDLENBQ3JFLEtBQUssRUFDTCxFQUFFOztJQUNGLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLGtCQUFrQixFQUFFLENBQUM7SUFDbEQsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFL0IsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMs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