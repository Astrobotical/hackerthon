"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionBox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../utils");
const SelectionBox = ({ selectionBox, viewPort, }) => {
    if (!selectionBox)
        return null;
    const { from, to } = selectionBox;
    const realFrom = (0, utils_1.logicalPosToRenderedPos)(from, viewPort);
    const realTo = (0, utils_1.logicalPosToRenderedPos)(to, viewPort);
    const { x, y, w, h } = (0, utils_1.getSelectionBoxRect)(realFrom, realTo);
    return ((0, jsx_runtime_1.jsx)("div", { className: "selection-box", style: { top: y, left: x, width: w, height: h } }));
};
exports.SelectionBox = SelectionBox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0aW9uQm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9TZWxlY3Rpb25Cb3gvU2VsZWN0aW9uQm94LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsb0NBQXdFO0FBUWpFLE1BQU0sWUFBWSxHQUFnQyxDQUFDLEVBQ3hELFlBQVksRUFDWixRQUFRLEdBQ1QsRUFBRSxFQUFFO0lBQ0gsSUFBSSxDQUFDLFlBQVk7UUFBRSxPQUFPLElBQUksQ0FBQztJQUUvQixNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLFlBQVksQ0FBQztJQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFBLCtCQUF1QixFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RCxNQUFNLE1BQU0sR0FBRyxJQUFBLCtCQUF1QixFQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFN0QsT0FBTyxDQUNMLGdDQUNFLFNBQVMsRUFBQyxlQUFlLEVBQ3pCLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FDL0MsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBakJXLFFBQUEsWUFBWSxnQkFpQnZCIn0=