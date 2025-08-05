"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormField = exports.FormMessage = exports.FormDescription = exports.FormControl = exports.FormLabel = exports.FormItem = exports.Form = exports.useFormField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_slot_1 = require("@radix-ui/react-slot");
const react_hook_form_1 = require("react-hook-form");
const utils_1 = require("../../lib/utils");
const label_1 = require("./label");
const Form = react_hook_form_1.FormProvider;
exports.Form = Form;
const FormFieldContext = React.createContext({});
const FormField = ({ ...props }) => {
    return ((0, jsx_runtime_1.jsx)(FormFieldContext.Provider, { value: { name: props.name }, children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { ...props }) }));
};
exports.FormField = FormField;
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = (0, react_hook_form_1.useFormContext)();
    const fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};
exports.useFormField = useFormField;
const FormItemContext = React.createContext({});
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
    const id = React.useId();
    return ((0, jsx_runtime_1.jsx)(FormItemContext.Provider, { value: { id }, children: (0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("space-y-2", className), ...props }) }));
});
exports.FormItem = FormItem;
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    return ((0, jsx_runtime_1.jsx)(label_1.Label, { ref: ref, className: (0, utils_1.cn)(error && "text-destructive", className), htmlFor: formItemId, ...props }));
});
exports.FormLabel = FormLabel;
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return ((0, jsx_runtime_1.jsx)(react_slot_1.Slot, { ref: ref, id: formItemId, "aria-describedby": !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`, "aria-invalid": !!error, ...props }));
});
exports.FormControl = FormControl;
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return ((0, jsx_runtime_1.jsx)("p", { ref: ref, id: formDescriptionId, className: (0, utils_1.cn)("text-[0.8rem] text-muted-foreground", className), ...props }));
});
exports.FormDescription = FormDescription;
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error === null || error === void 0 ? void 0 : error.message) : children;
    if (!body) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("p", { ref: ref, id: formMessageId, className: (0, utils_1.cn)("text-[0.8rem] font-medium text-destructive", className), ...props, children: body }));
});
exports.FormMessage = FormMessage;
FormMessage.displayName = "FormMessage";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL2Zvcm0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxZQUFZLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiw2Q0FBOEI7QUFFOUIscURBQTJDO0FBQzNDLHFEQU93QjtBQUV4QiwyQ0FBb0M7QUFDcEMsbUNBQStCO0FBRS9CLE1BQU0sSUFBSSxHQUFHLDhCQUFZLENBQUE7QUF5SnZCLG9CQUFJO0FBaEpOLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FDMUMsRUFBMkIsQ0FDNUIsQ0FBQTtBQUVELE1BQU0sU0FBUyxHQUFHLENBR2hCLEVBQ0EsR0FBRyxLQUFLLEVBQzZCLEVBQUUsRUFBRTtJQUN6QyxPQUFPLENBQ0wsdUJBQUMsZ0JBQWdCLENBQUMsUUFBUSxJQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLFlBQ3BELHVCQUFDLDRCQUFVLE9BQUssS0FBSyxHQUFJLEdBQ0MsQ0FDN0IsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXVJQyw4QkFBUztBQXJJWCxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDeEIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3ZELE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDckQsTUFBTSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFBLGdDQUFjLEdBQUUsQ0FBQTtJQUVyRCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUU5RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFFRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsV0FBVyxDQUFBO0lBRTFCLE9BQU87UUFDTCxFQUFFO1FBQ0YsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO1FBQ3ZCLFVBQVUsRUFBRSxHQUFHLEVBQUUsWUFBWTtRQUM3QixpQkFBaUIsRUFBRSxHQUFHLEVBQUUsd0JBQXdCO1FBQ2hELGFBQWEsRUFBRSxHQUFHLEVBQUUsb0JBQW9CO1FBQ3hDLEdBQUcsVUFBVTtLQUNkLENBQUE7QUFDSCxDQUFDLENBQUE7QUF5R0Msb0NBQVk7QUFuR2QsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FDekMsRUFBMEIsQ0FDM0IsQ0FBQTtBQUVELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBRy9CLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNqQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUE7SUFFeEIsT0FBTyxDQUNMLHVCQUFDLGVBQWUsQ0FBQyxRQUFRLElBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLFlBQ3JDLGdDQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUEsVUFBRSxFQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsS0FBTSxLQUFLLEdBQUksR0FDMUMsQ0FDNUIsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBO0FBc0ZBLDRCQUFRO0FBckZWLFFBQVEsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFBO0FBRWpDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR2hDLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNqQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLFlBQVksRUFBRSxDQUFBO0lBRTVDLE9BQU8sQ0FDTCx1QkFBQyxhQUFLLElBQ0osR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQUMsS0FBSyxJQUFJLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxFQUNyRCxPQUFPLEVBQUUsVUFBVSxLQUNmLEtBQUssR0FDVCxDQUNILENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQTtBQXNFQSw4QkFBUztBQXJFWCxTQUFTLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQTtBQUVuQyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUdsQyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUN0QixNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsR0FBRyxZQUFZLEVBQUUsQ0FBQTtJQUU5RSxPQUFPLENBQ0wsdUJBQUMsaUJBQUksSUFDSCxHQUFHLEVBQUUsR0FBRyxFQUNSLEVBQUUsRUFBRSxVQUFVLHNCQUVaLENBQUMsS0FBSztZQUNKLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixFQUFFO1lBQ3hCLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixJQUFJLGFBQWEsRUFBRSxrQkFFL0IsQ0FBQyxDQUFDLEtBQUssS0FDakIsS0FBSyxHQUNULENBQ0gsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBO0FBaURBLGtDQUFXO0FBaERiLFdBQVcsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFBO0FBRXZDLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR3RDLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNqQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxZQUFZLEVBQUUsQ0FBQTtJQUU1QyxPQUFPLENBQ0wsOEJBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixFQUFFLEVBQUUsaUJBQWlCLEVBQ3JCLFNBQVMsRUFBRSxJQUFBLFVBQUUsRUFBQyxxQ0FBcUMsRUFBRSxTQUFTLENBQUMsS0FDM0QsS0FBSyxHQUNULENBQ0gsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBO0FBaUNBLDBDQUFlO0FBaENqQixlQUFlLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFBO0FBRS9DLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR2xDLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDM0MsTUFBTSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsR0FBRyxZQUFZLEVBQUUsQ0FBQTtJQUMvQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtJQUV0RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFRCxPQUFPLENBQ0wsOEJBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixFQUFFLEVBQUUsYUFBYSxFQUNqQixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQUMsNENBQTRDLEVBQUUsU0FBUyxDQUFDLEtBQ2xFLEtBQUssWUFFUixJQUFJLEdBQ0gsQ0FDTCxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUE7QUFVQSxrQ0FBVztBQVRiLFdBQVcsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFBIn0=