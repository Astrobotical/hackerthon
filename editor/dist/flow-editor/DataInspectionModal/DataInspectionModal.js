"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInspectionModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const ui_3 = require("../../ui");
const ui_4 = require("../../ui");
const ui_5 = require("../../ui");
const ui_6 = require("../../ui");
const react_1 = __importStar(require("react"));
const __1 = require("../..");
const BrowserJsonView_1 = require("../../lib/analytics-value-renderer/BrowserJsonView");
const loader_1 = require("../../lib/loader");
const DebuggerContext_1 = require("../DebuggerContext");
const DataInspectionModal = (props) => {
    var _a;
    const { onRequestHistory } = (0, DebuggerContext_1.useDebuggerContext)();
    const { item, isOpen } = props;
    const [data, setData] = react_1.default.useState();
    const [currIdx, setCurrIdx] = react_1.default.useState(0);
    const [search, setSearch] = react_1.default.useState("");
    const [filteredValue, setFilteredValue] = react_1.default.useState([]);
    const [debouncedSearch] = (0, __1.useDebounce)(search, 300);
    (0, react_1.useEffect)(() => {
        var _a;
        setFilteredValue((_a = data === null || data === void 0 ? void 0 : data.lastSamples.filter((sample) => {
            if (typeof sample.val === "object") {
                return JSON.stringify(sample.val).includes(debouncedSearch);
            }
            return sample.val.toString().includes(debouncedSearch);
        })) !== null && _a !== void 0 ? _a : []);
        setCurrIdx(0);
    }, [data === null || data === void 0 ? void 0 : data.lastSamples, debouncedSearch]);
    react_1.default.useEffect(() => {
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
            return (0, jsx_runtime_1.jsx)(BrowserJsonView_1.BrowserOnlyReactJson, { src: val });
        }
        return (0, jsx_runtime_1.jsx)("code", { className: "rounded bg-muted px-2 py-1", children: val.toString() });
    };
    const renderEmptyState = () => {
        if (!data || data.lastSamples.length > 0 && search.length > 0) {
            return ((0, jsx_runtime_1.jsx)(ui_5.Alert, { children: (0, jsx_runtime_1.jsxs)(ui_5.AlertDescription, { children: ["No data found for search query \"", search, "\""] }) }));
        }
        return ((0, jsx_runtime_1.jsx)(ui_5.Alert, { children: (0, jsx_runtime_1.jsxs)(ui_5.AlertDescription, { children: ["No events captured for instance ", item.insId, " ", item.pin ? `and ${item.pin.id}` : "", ". Make sure a debugger is connected and your program was triggered."] }) }));
    };
    const itemName = `"${item.insId}" ${((_a = item.pin) === null || _a === void 0 ? void 0 : _a.id) ? `(${item.pin.id})` : ""}`;
    const renderInner = () => {
        if (!data) {
            return (0, jsx_runtime_1.jsx)(loader_1.Loader, {});
        }
        if (data.total === 0) {
            return ((0, jsx_runtime_1.jsx)(ui_5.Alert, { children: (0, jsx_runtime_1.jsxs)(ui_5.AlertDescription, { children: ["No events captured for instance ", (0, jsx_runtime_1.jsx)("em", { children: item.insId }), " ", item.pin ? ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: ["and pin ", (0, jsx_runtime_1.jsx)("em", { children: item.pin.id })] })) : null, ". Make sure debugger is running and your program was triggered."] }) }));
        }
        const currEvent = filteredValue === null || filteredValue === void 0 ? void 0 : filteredValue[currIdx];
        if (!currEvent) {
            return renderEmptyState();
        }
        return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)(ui_2.Card, { className: "p-4", children: [currEvent && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Showing sample ", currIdx, " of event from", " ", (0, jsx_runtime_1.jsx)("strong", { children: (0, __1.timeAgo)(currEvent.time) }), " (", new Date(currEvent.time).toLocaleString(), ")"] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Instance: ", (0, jsx_runtime_1.jsx)("strong", { children: currEvent.insId }), ", Pin id:", " ", (0, jsx_runtime_1.jsx)("strong", { children: currEvent.pinId })] }), (0, jsx_runtime_1.jsx)("div", { children: "Value:" })] })), renderValue(currEvent)] }), (0, jsx_runtime_1.jsx)(ui_4.ScrollArea, { className: "h-[200px]", children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-1", children: filteredValue.map((sample, i) => {
                            const pinId = sample.pinId;
                            const label = `${data.total - i}. from pin "${pinId}"`;
                            return ((0, jsx_runtime_1.jsx)(ui_6.Button, { variant: i === currIdx ? "secondary" : "ghost", className: "w-full justify-start", onClick: () => setCurrIdx(i), children: label }, i));
                        }) }) })] }));
    };
    return ((0, jsx_runtime_1.jsx)(ui_1.Dialog, { open: isOpen, onOpenChange: (open) => !open && props.onClose(), children: (0, jsx_runtime_1.jsxs)(ui_1.DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [(0, jsx_runtime_1.jsx)(ui_1.DialogHeader, { children: (0, jsx_runtime_1.jsxs)(ui_1.DialogTitle, { children: ["Inspecting data for instance ", itemName] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("header", { className: "space-y-2", children: [data && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("em", { children: [itemName, " called ", data.total, " time(s)"] }), data.total > 10 && ((0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "Showing last 10 samples" }))] })), (0, jsx_runtime_1.jsx)(ui_3.Input, { type: "search", placeholder: "Search for values", onChange: (e) => setSearch(e.target.value), value: search }), debouncedSearch.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-muted-foreground", children: ["Showing ", filteredValue === null || filteredValue === void 0 ? void 0 : filteredValue.length, " of ", data === null || data === void 0 ? void 0 : data.lastSamples.length, " ", "samples matching query \"", debouncedSearch, "\""] }))] }), (0, jsx_runtime_1.jsx)("main", { children: renderInner() })] })] }) }));
};
exports.DataInspectionModal = DataInspectionModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YUluc3BlY3Rpb25Nb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbG93LWVkaXRvci9EYXRhSW5zcGVjdGlvbk1vZGFsL0RhdGFJbnNwZWN0aW9uTW9kYWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBNEU7QUFDNUUsaUNBQWdDO0FBQ2hDLGlDQUFpQztBQUNqQyxpQ0FBc0M7QUFDdEMsaUNBQW1EO0FBQ25ELGlDQUFrQztBQUVsQywrQ0FBeUM7QUFDekMsNkJBQTZDO0FBQzdDLHdGQUEwRjtBQUMxRiw2Q0FBMEM7QUFDMUMsd0RBQXdEO0FBUWpELE1BQU0sbUJBQW1CLEdBQXVDLENBQ3JFLEtBQUssRUFDTCxFQUFFOztJQUNGLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLElBQUEsb0NBQWtCLEdBQUUsQ0FBQztJQUNsRCxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUUvQixNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLGVBQUssQ0FBQyxRQUFRLEVBQWtCLENBQUM7SUFDekQsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxlQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsZUFBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEdBQ3JDLGVBQUssQ0FBQyxRQUFRLENBQWdDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFBLGVBQVcsRUFBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFbkQsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTs7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