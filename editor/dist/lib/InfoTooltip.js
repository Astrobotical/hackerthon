"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoTooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("../ui/icons");
const ui_1 = require("../ui");
const InfoTooltip = (props) => {
    const { content } = props;
    return ((0, jsx_runtime_1.jsx)(ui_1.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(ui_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(ui_1.TooltipTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(icons_1.Info, { className: "h-4 w-4 text-primary cursor-help" }) }), (0, jsx_runtime_1.jsx)(ui_1.TooltipContent, { children: content })] }) }));
};
exports.InfoTooltip = InfoTooltip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mb1Rvb2x0aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL0luZm9Ub29sdGlwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsdUNBQW1DO0FBQ25DLDhCQUtlO0FBTVIsTUFBTSxXQUFXLEdBQStCLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDL0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUMxQixPQUFPLENBQ0wsdUJBQUMsb0JBQWUsY0FDZCx3QkFBQyxZQUFPLGVBQ04sdUJBQUMsbUJBQWMsSUFBQyxPQUFPLGtCQUNyQix1QkFBQyxZQUFJLElBQUMsU0FBUyxFQUFDLGtDQUFrQyxHQUFHLEdBQ3RDLEVBQ2pCLHVCQUFDLG1CQUFjLGNBQUUsT0FBTyxHQUFrQixJQUNsQyxHQUNNLENBQ25CLENBQUM7QUFDSixDQUFDLENBQUM7QUFaVyxRQUFBLFdBQVcsZUFZdEIifQ==