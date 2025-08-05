"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretSelector = SecretSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const __1 = require("../..");
function SecretSelector({ value, onChange, ports, typeEditorData, }) {
    const [secrets, setSecrets] = (0, react_1.useState)([]);
    const [isAddingSecret, setIsAddingSecret] = (0, react_1.useState)(false);
    const [newSecretKey, setNewSecretKey] = (0, react_1.useState)("");
    const [newSecretValue, setNewSecretValue] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchSecrets = async () => {
            setIsLoading(true);
            try {
                const availableSecrets = await ports.getAvailableSecrets();
                setSecrets(availableSecrets);
            }
            catch (error) {
                console.error("Failed to fetch secrets:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchSecrets();
    }, [ports]);
    const handleAddSecret = async () => {
        if (!newSecretKey || !newSecretValue) {
            return;
        }
        try {
            const updatedSecrets = await ports.addNewSecret({
                key: newSecretKey,
                value: newSecretValue,
            });
            setSecrets(updatedSecrets);
            onChange(newSecretKey);
            setIsAddingSecret(false);
            setNewSecretKey("");
            setNewSecretValue("");
        }
        catch (error) {
            console.error("Failed to add secret:", error);
        }
    };
    const startAddingSecret = () => {
        setIsAddingSecret(true);
        if (typeEditorData === null || typeEditorData === void 0 ? void 0 : typeEditorData.defaultName) {
            setNewSecretKey(typeEditorData.defaultName);
        }
    };
    const handleValueChange = (newValue) => {
        if (newValue === "__add_new_secret") {
            startAddingSecret();
        }
        else {
            onChange(newValue);
        }
    };
    if (isAddingSecret) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(__1.Input, { placeholder: "Secret key", value: newSecretKey, size: 12, onChange: (e) => setNewSecretKey(e.target.value) }), (0, jsx_runtime_1.jsx)(__1.Input, { placeholder: "Secret value", type: "password", size: 12, value: newSecretValue, onChange: (e) => setNewSecretValue(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 justify-end", children: [(0, jsx_runtime_1.jsx)(__1.Button, { variant: "ghost", size: "sm", onClick: () => setIsAddingSecret(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(__1.Button, { variant: "default", size: "sm", onClick: handleAddSecret, children: "Add" })] })] }));
    }
    if (!isLoading && secrets.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "No secrets available." }), (0, jsx_runtime_1.jsx)(__1.Button, { variant: "outline", size: "sm", onClick: startAddingSecret, children: "Create a new secret" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(__1.Select, { value: value, onValueChange: handleValueChange, children: [(0, jsx_runtime_1.jsx)(__1.SelectTrigger, { className: "w-full", children: (0, jsx_runtime_1.jsx)(__1.SelectValue, { placeholder: "Select or create a secret" }) }), (0, jsx_runtime_1.jsx)(__1.SelectContent, { children: secrets.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [secrets.map((secret) => ((0, jsx_runtime_1.jsx)(__1.SelectItem, { value: secret, children: secret }, secret))), (0, jsx_runtime_1.jsx)(__1.SelectItem, { value: "__add_new_secret", children: "+ Add new secret" })] })) : ((0, jsx_runtime_1.jsx)(__1.SelectItem, { value: "__add_new_secret", children: "+ Create your first secret" })) })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjcmV0U2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdWkvbm9kZS1jb25maWcvQ29uZmlndXJhYmxlRmllbGRFZGl0b3IvU2VjcmV0U2VsZWN0b3IudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBa0JBLHdDQXFJQzs7QUF2SkQsaUNBQW1EO0FBQ25ELDZCQVFlO0FBU2YsU0FBZ0IsY0FBYyxDQUFDLEVBQzNCLEtBQUssRUFDTCxRQUFRLEVBQ1IsS0FBSyxFQUNMLGNBQWMsR0FNakI7SUFDRyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBVyxFQUFFLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFDekQsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFFakQsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNYLE1BQU0sWUFBWSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzVCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMzRCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxD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