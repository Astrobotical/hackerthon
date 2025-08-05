import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useToast } from "../../hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, } from "./toast";
export function Toaster() {
    const { toasts } = useToast();
    return (_jsxs(ToastProvider, { children: [toasts.map(function ({ id, title, description, action, ...props }) {
                return (_jsxs(Toast, { ...props, children: [_jsxs("div", { className: "grid gap-1", children: [title && _jsx(ToastTitle, { children: title }), description && (_jsx(ToastDescription, { children: description }))] }), action, _jsx(ToastClose, {})] }, id));
            }), _jsx(ToastViewport, {})] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL3RvYXN0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixVQUFVLEVBQ1YsYUFBYSxHQUNkLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE1BQU0sVUFBVSxPQUFPO0lBQ3JCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUU5QixPQUFPLENBQ0wsTUFBQyxhQUFhLGVBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxFQUFFO2dCQUNoRSxPQUFPLENBQ0wsTUFBQyxLQUFLLE9BQWMsS0FBSyxhQUN2QixlQUFLLFNBQVMsRUFBQyxZQUFZLGFBQ3hCLEtBQUssSUFBSSxLQUFDLFVBQVUsY0FBRSxLQUFLLEdBQWMsRUFDekMsV0FBVyxJQUFJLENBQ2QsS0FBQyxnQkFBZ0IsY0FBRSxXQUFXLEdBQW9CLENBQ25ELElBQ0csRUFDTCxNQUFNLEVBQ1AsS0FBQyxVQUFVLEtBQUcsS0FSSixFQUFFLENBU04sQ0FDVCxDQUFDO1lBQ0osQ0FBQyxDQUFDLEVBQ0YsS0FBQyxhQUFhLEtBQUcsSUFDSCxDQUNqQixDQUFDO0FBQ0osQ0FBQyJ9