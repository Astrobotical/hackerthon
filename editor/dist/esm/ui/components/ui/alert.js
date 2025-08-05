import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7", {
    variants: {
        variant: {
            default: "bg-background text-foreground",
            destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (_jsx("div", { ref: ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props })));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h5", { ref: ref, className: cn("mb-1 font-medium leading-none tracking-tight", className), ...props })));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props })));
AlertDescription.displayName = "AlertDescription";
export { Alert, AlertTitle, AlertDescription };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy91aS9hbGVydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFBO0FBQzlCLE9BQU8sRUFBRSxHQUFHLEVBQXFCLE1BQU0sMEJBQTBCLENBQUE7QUFFakUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXBDLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FDdkIseUtBQXlLLEVBQ3pLO0lBQ0UsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLCtCQUErQjtZQUN4QyxXQUFXLEVBQ1QseUZBQXlGO1NBQzVGO0tBQ0Y7SUFDRCxlQUFlLEVBQUU7UUFDZixPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQ0YsQ0FBQTtBQUVELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBRzVCLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUMzQyxjQUNFLEdBQUcsRUFBRSxHQUFHLEVBQ1IsSUFBSSxFQUFDLE9BQU8sRUFDWixTQUFTLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQ2hELEtBQUssR0FDVCxDQUNILENBQUMsQ0FBQTtBQUNGLEtBQUssQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFBO0FBRTNCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR2pDLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLGFBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLFNBQVMsQ0FBQyxLQUNwRSxLQUFLLEdBQ1QsQ0FDSCxDQUFDLENBQUE7QUFDRixVQUFVLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQTtBQUVyQyxNQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxVQUFVLENBR3ZDLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLGNBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsRUFBRSxDQUFDLCtCQUErQixFQUFFLFNBQVMsQ0FBQyxLQUNyRCxLQUFLLEdBQ1QsQ0FDSCxDQUFDLENBQUE7QUFDRixnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUE7QUFFakQsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQSJ9