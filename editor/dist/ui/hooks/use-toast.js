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
exports.reducer = void 0;
exports.useToast = useToast;
exports.toast = toast;
// Inspired by react-hot-toast library
const React = __importStar(require("react"));
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId) => {
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId,
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t),
            };
        case "DISMISS_TOAST": {
            const { toastId } = action;
            // ! Side effects ! - This could be extracted into a dismissToast() action,
            // but I'll keep it here for simplicity
            if (toastId) {
                addToRemoveQueue(toastId);
            }
            else {
                state.toasts.forEach((toast) => {
                    addToRemoveQueue(toast.id);
                });
            }
            return {
                ...state,
                toasts: state.toasts.map((t) => t.id === toastId || toastId === undefined
                    ? {
                        ...t,
                        open: false,
                    }
                    : t),
            };
        }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            };
    }
};
exports.reducer = reducer;
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
    memoryState = (0, exports.reducer)(memoryState, action);
    listeners.forEach((listener) => {
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props) => dispatch({
        type: "UPDATE_TOAST",
        toast: { ...props, id },
    });
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open) => {
                if (!open)
                    dismiss();
            },
        },
    });
    return {
        id: id,
        dismiss,
        update,
    };
}
function useToast() {
    const [state, setState] = React.useState(memoryState);
    React.useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);
    return {
        ...state,
        toast,
        dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXRvYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3VpL2hvb2tzL3VzZS10b2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpTUgsNEJBQVE7QUFBRSxzQkFBSztBQS9MeEIsc0NBQXNDO0FBQ3RDLDZDQUE4QjtBQU85QixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUE7QUFDckIsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUE7QUFTbEMsTUFBTSxXQUFXLEdBQUc7SUFDbEIsU0FBUyxFQUFFLFdBQVc7SUFDdEIsWUFBWSxFQUFFLGNBQWM7SUFDNUIsYUFBYSxFQUFFLGVBQWU7SUFDOUIsWUFBWSxFQUFFLGNBQWM7Q0FDcEIsQ0FBQTtBQUVWLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtBQUViLFNBQVMsS0FBSztJQUNaLEtBQUssR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUE7SUFDN0MsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDekIsQ0FBQztBQTBCRCxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBeUMsQ0FBQTtBQUV0RSxNQUFNLGdCQUFnQixHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7SUFDM0MsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDL0IsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQzlCLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDN0IsUUFBUSxDQUFDO1lBQ1AsSUFBSSxFQUFFLGNBQWM7WUFDcEIsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxFQUFFLGtCQUFrQixDQUFD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