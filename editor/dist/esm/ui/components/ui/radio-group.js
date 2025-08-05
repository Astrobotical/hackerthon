import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "../../icons";
import { cn } from "../../lib/utils";
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx(RadioGroupPrimitive.Root, { className: cn("grid gap-2", className), ...props, ref: ref }));
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx(RadioGroupPrimitive.Item, { ref: ref, className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className), ...props, children: _jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: _jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" }) }) }));
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
export { RadioGroup, RadioGroupItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy91aS9yYWRpby1ncm91cC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxtQkFBbUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVyQyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUdqQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDakMsT0FBTyxDQUNMLEtBQUMsbUJBQW1CLENBQUMsSUFBSSxJQUN2QixTQUFTLEVBQUUsRUFBRSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsS0FDbEMsS0FBSyxFQUNULEdBQUcsRUFBRSxHQUFHLEdBQ1IsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsV0FBVyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7QUFFOUQsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FHckMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ2pDLE9BQU8sQ0FDTCxLQUFDLG1CQUFtQixDQUFDLElBQUksSUFDdkIsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsRUFBRSxDQUNYLDhMQUE4TCxFQUM5TCxTQUFTLENBQ1YsS0FDRyxLQUFLLFlBRVQsS0FBQyxtQkFBbUIsQ0FBQyxTQUFTLElBQUMsU0FBUyxFQUFDLGtDQUFrQyxZQUN6RSxLQUFDLE1BQU0sSUFBQyxTQUFTLEVBQUMsMEJBQTBCLEdBQUcsR0FDakIsR0FDUCxDQUM1QixDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFjLENBQUMsV0FBVyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7QUFFbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsQ0FBQyJ9