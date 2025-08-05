import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => (_jsx(LabelPrimitive.Root, { ref: ref, className: cn(labelVariants(), className), ...props })));
Label.displayName = LabelPrimitive.Root.displayName;
export { Label };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy91aS9sYWJlbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFBO0FBQzlCLE9BQU8sS0FBSyxjQUFjLE1BQU0sdUJBQXVCLENBQUE7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBcUIsTUFBTSwwQkFBMEIsQ0FBQTtBQUVqRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFcEMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUN2Qiw0RkFBNEYsQ0FDN0YsQ0FBQTtBQUVELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBSTVCLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLEtBQUMsY0FBYyxDQUFDLElBQUksSUFDbEIsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsRUFBRSxDQUFDLGFBQWEsRUFBRSxFQUFFLFNBQVMsQ0FBQyxLQUNyQyxLQUFLLEdBQ1QsQ0FDSCxDQUFDLENBQUE7QUFDRixLQUFLLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBO0FBRW5ELE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQSJ9