"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("../../ui");
const react_1 = require("react");
const DarkModeContext_1 = require("../../flow-editor/DarkModeContext");
const utils_1 = require("../../lib/utils");
const SelectionIndicator = (props) => {
    const { selection, onCenter, onGroup, onDelete } = props;
    const dark = (0, DarkModeContext_1.useDarkMode)();
    if (!selection) {
        return null;
    }
    const inner = (0, react_1.useMemo)(() => {
        switch (selection.type) {
            case "input":
                return ((0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["\"", selection.pinId, "\""] }), " input selected"] }));
            case "output":
                return ((0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["\"", selection.pinId, "\""] }), " output selected"] }));
            case "instances":
                return ((0, jsx_runtime_1.jsxs)("span", { children: [selection.ids.length, " instance", selection.ids.length > 1 ? "s" : "", " selected"] }));
            case "connections":
                return ((0, jsx_runtime_1.jsxs)("span", { children: [selection.ids.length, " connection", selection.ids.length > 1 ? "s" : "", " selected"] }));
        }
    }, [selection]);
    const onDeleteClick = () => {
        switch (selection.type) {
            case "instances":
                onDelete(selection.ids);
                break;
            case "connections":
                onDelete(selection.ids);
                break;
        }
    };
    const actions = {
        center: ((0, jsx_runtime_1.jsx)(ui_1.Button, { onClick: onCenter, variant: "outline", size: "sm", children: "Center" })),
        group: ((0, jsx_runtime_1.jsx)(ui_1.Button, { onClick: onGroup, variant: "outline", size: "sm", children: "Group" })),
        delete: ((0, jsx_runtime_1.jsx)(ui_1.Button, { onClick: onDeleteClick, variant: "outline", size: "sm", className: "text-destructive hover:bg-destructive/90 hover:text-destructive-foreground", children: "Delete" })),
    };
    const actionsMap = {
        instances: [actions.center, actions.group, actions.delete],
        connections: [actions.delete],
        input: [actions.center],
        output: [actions.center],
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("flex items-center gap-2 p-2 rounded-md border absolute bottom-[10px] left-1/2 -translate-x-1/2 text-xs z-1 select-none", dark ? "bg-background border-border" : "bg-white border-input"), children: [inner, " ", (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: actionsMap[selection.type] })] }));
};
exports.SelectionIndicator = SelectionIndicator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0aW9uSW5kaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9TZWxlY3Rpb25JbmRpY2F0b3IvU2VsZWN0aW9uSW5kaWNhdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUNBQWtDO0FBQ2xDLGlDQUF1QztBQUN2Qyx1RUFBZ0U7QUFDaEUsMkNBQXFDO0FBbUM5QixNQUFNLGtCQUFrQixHQUFzQyxDQUNuRSxLQUFLLEVBQ0wsRUFBRTtJQUNGLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDekQsTUFBTSxJQUFJLEdBQUcsSUFBQSw2QkFBVyxHQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBR0QsTUFBTSxLQUFLLEdBQUcsSUFBQSxlQUFPLEVBQUMsR0FBRyxFQUFFO1FBQ3pCLFFBQVEsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLEtBQUssT0FBTztnQkFDVixPQUFPLENBQ0wsNkNBQ0UscURBQVUsU0FBUyxDQUFDLEtBQUssVUFBVyx1QkFDL0IsQ0FDUixDQUFDO1lBQ0osS0FBSyxRQUFRO2dCQUNYLE9BQU8sQ0FDTCw2Q0FDRSxxREFBVSxTQUFTLENBQUMsS0FBSyxVQUFXLHdCQUMvQixDQUNSLENBQUM7WUFDSixLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxDQUNMLDZDQUNHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxlQUNwQixTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFDL0IsQ0FDUixDQUFDO1lBQ0osS0FBSyxhQUFhO2dCQUNoQixPQUFPLENBQ0wsNkNBQ0csU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLGlCQUNwQixTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFDL0IsQ0FDUixDQUFDO1FBQ04sQ0FBQztJQUNILENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFaEIsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO1FBQ3pCLFFBQVEsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLEtBQUssV0FBVztnQkFDZCxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxhQUFhO2dCQUNoQixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1FBQ1YsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHO1FBQ2QsTUFBTSxFQUFFLENBQ04sdUJBQUMsV0FBTSxJQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsSUFBSSx1QkFFN0MsQ0FDVjtRQUNELEtBQUssRUFBRSxDQUNMLHVCQUFDLFdBQU0sSUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLElBQUksc0JBRTVDLENBQ1Y7UUFDRCxNQUFNLEVBQUUsQ0FDTix1QkFBQyxXQUFNLElBQ0wsT0FBTyxFQUFFLGFBQWEsRUFDdEIsT0FBTyxFQUFDLFNBQVMsRUFDakIsSUFBSSxFQUFDLElBQUksRUFDVCxTQUFTLEVBQUMsNEVBQTRFLHVCQUcvRSxDQUNWO0tBQ0YsQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFHO1FBQ2pCLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzFELFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0IsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUN2QixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ3pCLENBQUM7SUFFRixPQUFPLENBQ0wsaUNBQ0UsU0FBUyxFQUFFLElBQUEsVUFBRSxFQUNYLHdIQUF3SCxFQUN4SCxJQUFJLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FDL0QsYUFFQSxLQUFLLE9BQUUsZ0NBQUssU0FBUyxFQUFDLFlBQVksWUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFPLElBQ2xFLENBQ1AsQ0FBQztBQUNKLENBQUMsQ0FBQztBQTdGVyxRQUFBLGtCQUFrQixzQkE2RjdCIn0=