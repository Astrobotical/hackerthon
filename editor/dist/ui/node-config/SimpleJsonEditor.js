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
exports.SimpleJsonEditor = SimpleJsonEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const label_1 = require("../components/ui/label");
const textarea_1 = require("../components/ui/textarea");
function SimpleJsonEditor(props) {
    const [tempDataValue, setTempDataValue] = react_1.default.useState(props.rawData || JSON.stringify(props.value, null, 2));
    react_1.default.useEffect(() => {
        if (props.rawData !== undefined) {
            setTempDataValue(props.rawData);
        }
    }, [props.rawData]);
    const [dataParseError, setDataParseError] = react_1.default.useState();
    const onValueChange = (0, react_1.useCallback)((e) => {
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
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "4px" }, children: [props.label && (0, jsx_runtime_1.jsx)(label_1.Label, { children: props.label }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { value: tempDataValue, onChange: onValueChange, style: {
                    minWidth: props.isExpanded ? "65vw" : "100%",
                    height: props.isExpanded ? "65vh" : undefined,
                } }), dataParseError && ((0, jsx_runtime_1.jsx)("div", { className: "text-red-500 text-sm mt-1", children: dataParseError }))] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlSnNvbkVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91aS9ub2RlLWNvbmZpZy9TaW1wbGVKc29uRWRpdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlBLDRDQXdEQzs7QUFwRUQsK0NBQTJDO0FBQzNDLGtEQUErQztBQUMvQyx3REFBcUQ7QUFVckQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FPaEM7SUFDQyxNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsZUFBSyxDQUFDLFFBQVEsQ0FDdEQsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUN0RCxDQUFDO0lBRUYsZUFBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDbkIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFcEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHLGVBQUssQ0FBQyxRQUFRLEVBQVUsQ0FBQztJQUVyRSxNQUFNLGFBQWEsR0FBRyxJQUFBLG1CQUFXLEVBQy9CLENBQUMsQ0FBeUMsRUFBRSxFQUFFO1FBQzVDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ25DLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTlCLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELElBQUksQ0FBQztZQUNILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLGlCQUFpQixDQUFFLENBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQyxFQUNELENBQUMsS0FBSyxDQUFDLENBQ1IsQ0FBQztJQUVGLE9BQU8sQ0FDTCxpQ0FBSyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUNqRSxLQUFLLENBQUMsS0FBSyxJQUFJLHVCQUFDLGFBQUssY0FBRSxLQUFLLENBQUMsS0FBSyxHQUFTLEVBQzVDLHVCQUFDLG1CQUFRLElBQ1AsS0FBSyxFQUFFLGFBQWEsRUFDcEIsUUFBUSxFQUFFLGFBQWEsRUFDdkIsS0FBSyxFQUFFO29CQUNMLFFBQVEsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07b0JBQzVDLE1BQU0sRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7aUJBQzlDLEdBQ0QsRUFDRCxjQUFjLElBQUksQ0FDakIsZ0NBQUssU0FBUyxFQUFDLDJCQUEyQixZQUFFLGNBQWMsR0FBTyxDQUNsRSxJQUNHLENBQ1AsQ0FBQztBQUNKLENBQUMifQ==