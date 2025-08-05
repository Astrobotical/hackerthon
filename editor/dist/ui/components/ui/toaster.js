"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toaster = Toaster;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_toast_1 = require("../../hooks/use-toast");
const toast_1 = require("./toast");
function Toaster() {
    const { toasts } = (0, use_toast_1.useToast)();
    return ((0, jsx_runtime_1.jsxs)(toast_1.ToastProvider, { children: [toasts.map(function ({ id, title, description, action, ...props }) {
                return ((0, jsx_runtime_1.jsxs)(toast_1.Toast, { ...props, children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1", children: [title && (0, jsx_runtime_1.jsx)(toast_1.ToastTitle, { children: title }), description && ((0, jsx_runtime_1.jsx)(toast_1.ToastDescription, { children: description }))] }), action, (0, jsx_runtime_1.jsx)(toast_1.ToastClose, {})] }, id));
            }), (0, jsx_runtime_1.jsx)(toast_1.ToastViewport, {})] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL3RvYXN0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsMEJBc0JDOztBQWhDRCxxREFBaUQ7QUFDakQsbUNBT2lCO0FBRWpCLFNBQWdCLE9BQU87SUFDckIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUEsb0JBQVEsR0FBRSxDQUFDO0lBRTlCLE9BQU8sQ0FDTCx3QkFBQyxxQkFBYSxlQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssRUFBRTtnQkFDaEUsT0FBTyxDQUNMLHdCQUFDLGFBQUssT0FBYyxLQUFLLGFBQ3ZCLGlDQUFLLFNBQVMsRUFBQyxZQUFZLGFBQ3hCLEtBQUssSUFBSSx1QkFBQyxrQkFBVSxjQUFFLEtBQUssR0FBYyxFQUN6QyxXQUFXLElBQUksQ0FDZCx1QkFBQyx3QkFBZ0IsY0FBRSxXQUFXLEdBQW9CLENBQ25ELElBQ0csRUFDTCxNQUFNLEVBQ1AsdUJBQUMsa0JBQVUsS0FBRyxLQVJKLEVBQUUsQ0FTTixDQUNULENBQUM7WUFDSixDQUFDLENBQUMsRUFDRix1QkFBQyxxQkFBYSxLQUFHLElBQ0gsQ0FDakIsQ0FBQztBQUNKLENBQUMifQ==