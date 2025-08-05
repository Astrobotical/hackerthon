import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from "../ui/icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../ui";
export const InfoTooltip = (props) => {
    const { content } = props;
    return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Info, { className: "h-4 w-4 text-primary cursor-help" }) }), _jsx(TooltipContent, { children: content })] }) }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mb1Rvb2x0aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0luZm9Ub29sdGlwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsT0FBTyxFQUNQLGNBQWMsRUFDZCxlQUFlLEVBQ2YsY0FBYyxHQUNmLE1BQU0sT0FBTyxDQUFDO0FBTWYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUErQixDQUFDLEtBQUssRUFBRSxFQUFFO0lBQy9ELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDMUIsT0FBTyxDQUNMLEtBQUMsZUFBZSxjQUNkLE1BQUMsT0FBTyxlQUNOLEtBQUMsY0FBYyxJQUFDLE9BQU8sa0JBQ3JCLEtBQUMsSUFBSSxJQUFDLFNBQVMsRUFBQyxrQ0FBa0MsR0FBRyxHQUN0QyxFQUNqQixLQUFDLGNBQWMsY0FBRSxPQUFPLEdBQWtCLElBQ2xDLEdBQ00sQ0FDbkIsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9