import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
            outline: "text-foreground",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
function Badge({ className, variant, ...props }) {
    return (_jsx("div", { className: cn(badgeVariants({ variant }), className), ...props }));
}
export { Badge, badgeVariants };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy91aS9iYWRnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxHQUFHLEVBQXFCLE1BQU0sMEJBQTBCLENBQUE7QUFFakUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXBDLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FDdkIsc0tBQXNLLEVBQ3RLO0lBQ0UsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUNMLGtGQUFrRjtZQUNwRixTQUFTLEVBQ1AsaUZBQWlGO1lBQ25GLFdBQVcsRUFDVCw4RkFBOEY7WUFDaEcsT0FBTyxFQUFFLGlCQUFpQjtTQUMzQjtLQUNGO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsT0FBTyxFQUFFLFNBQVM7S0FDbkI7Q0FDRixDQUNGLENBQUE7QUFNRCxTQUFTLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLEVBQWM7SUFDekQsT0FBTyxDQUNMLGNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFNLEtBQUssR0FBSSxDQUN6RSxDQUFBO0FBQ0gsQ0FBQztBQUVELE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUEifQ==