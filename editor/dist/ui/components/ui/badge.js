"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeVariants = void 0;
exports.Badge = Badge;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const utils_1 = require("../../lib/utils");
const badgeVariants = (0, class_variance_authority_1.cva)("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
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
exports.badgeVariants = badgeVariants;
function Badge({ className, variant, ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(badgeVariants({ variant }), className), ...props }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy91aS9iYWRnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBbUNTLHNCQUFLOztBQWxDZCx1RUFBaUU7QUFFakUsMkNBQW9DO0FBRXBDLE1BQU0sYUFBYSxHQUFHLElBQUEsOEJBQUcsRUFDdkIsc0tBQXNLLEVBQ3RLO0lBQ0UsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUNMLGtGQUFrRjtZQUNwRixTQUFTLEVBQ1AsaUZBQWlGO1lBQ25GLFdBQVcsRUFDVCw4RkFBOEY7WUFDaEcsT0FBTyxFQUFFLGlCQUFpQjtTQUMzQjtLQUNGO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsT0FBTyxFQUFFLFNBQVM7S0FDbkI7Q0FDRixDQUNGLENBQUE7QUFZZSxzQ0FBYTtBQU43QixTQUFTLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLEVBQWM7SUFDekQsT0FBTyxDQUNMLGdDQUFLLFNBQVMsRUFBRSxJQUFBLFVBQUUsRUFBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFNLEtBQUssR0FBSSxDQUN6RSxDQUFBO0FBQ0gsQ0FBQyJ9