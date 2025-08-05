"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "../../icons";
import { cn } from "../../lib/utils";
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(SheetPrimitive.Overlay, { className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className), ...props, ref: ref })));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
    variants: {
        side: {
            top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        },
    },
    defaultVariants: {
        side: "right",
    },
});
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (_jsxs(SheetPortal, { children: [_jsx(SheetOverlay, {}), _jsxs(SheetPrimitive.Content, { ref: ref, className: cn(sheetVariants({ side }), className), ...props, children: [_jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [_jsx(X, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Close" })] }), children] })] })));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props }));
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props }));
SheetFooter.displayName = "SheetFooter";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(SheetPrimitive.Title, { ref: ref, className: cn("text-lg font-semibold text-foreground", className), ...props })));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(SheetPrimitive.Description, { ref: ref, className: cn("text-sm text-muted-foreground", className), ...props })));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy91aS9zaGVldC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxjQUFjLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBcUIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWhDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVyQyxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO0FBRWxDLE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7QUFFNUMsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztBQUV4QyxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0FBRTFDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR25DLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLEtBQUMsY0FBYyxDQUFDLE9BQU8sSUFDckIsU0FBUyxFQUFFLEVBQUUsQ0FDWCx5SkFBeUosRUFDekosU0FBUyxDQUNWLEtBQ0csS0FBSyxFQUNULEdBQUcsRUFBRSxHQUFHLEdBQ1IsQ0FDSCxDQUFDLENBQUM7QUFDSCxZQUFZLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0FBRTlELE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FDdkIsa01BQWtNLEVBQ2xNO0lBQ0UsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFO1lBQ0osR0FBRyxFQUFFLG1HQUFtRztZQUN4RyxNQUFN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