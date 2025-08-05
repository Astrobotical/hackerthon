import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Button, } from "../..";
export function SecretSelector({ value, onChange, ports, typeEditorData, }) {
    const [secrets, setSecrets] = useState([]);
    const [isAddingSecret, setIsAddingSecret] = useState(false);
    const [newSecretKey, setNewSecretKey] = useState("");
    const [newSecretValue, setNewSecretValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
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
        return (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Secret key", value: newSecretKey, size: 12, onChange: (e) => setNewSecretKey(e.target.value) }), _jsx(Input, { placeholder: "Secret value", type: "password", size: 12, value: newSecretValue, onChange: (e) => setNewSecretValue(e.target.value) })] }), _jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsAddingSecret(false), children: "Cancel" }), _jsx(Button, { variant: "default", size: "sm", onClick: handleAddSecret, children: "Add" })] })] }));
    }
    if (!isLoading && secrets.length === 0) {
        return (_jsxs("div", { className: "flex flex-col gap-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900", children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "No secrets available." }), _jsx(Button, { variant: "outline", size: "sm", onClick: startAddingSecret, children: "Create a new secret" })] }));
    }
    return (_jsxs(Select, { value: value, onValueChange: handleValueChange, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select or create a secret" }) }), _jsx(SelectContent, { children: secrets.length > 0 ? (_jsxs(_Fragment, { children: [secrets.map((secret) => (_jsx(SelectItem, { value: secret, children: secret }, secret))), _jsx(SelectItem, { value: "__add_new_secret", children: "+ Add new secret" })] })) : (_jsx(SelectItem, { value: "__add_new_secret", children: "+ Create your first secret" })) })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjcmV0U2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvbm9kZS1jb25maWcvQ29uZmlndXJhYmxlRmllbGRFZGl0b3IvU2VjcmV0U2VsZWN0b3IudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFjLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNuRCxPQUFPLEVBQ0gsTUFBTSxFQUNOLGFBQWEsRUFDYixVQUFVLEVBQ1YsYUFBYSxFQUNiLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxHQUNULE1BQU0sT0FBTyxDQUFDO0FBU2YsTUFBTSxVQUFVLGNBQWMsQ0FBQyxFQUMzQixLQUFLLEVBQ0wsUUFBUSxFQUNSLEtBQUssRUFDTCxjQUFjLEdBTWpCO0lBQ0csTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxRQUFRLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDckQsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxNQUFNLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpELFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDWCxNQUFNLFlBQVksR0FBRyxLQUFLLElBQUksRUFBRTtZQUM1QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDO2dCQUNELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDM0QsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRCxDQUFDO29CQUFTLENBQUM7Z0JBQ1AsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUM7UUFDRixZQUFZLEVBQUUsQ0FBQztJQUNuQixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRVosTUFBTSxlQUFlLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDL0IsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25DLE9BQU87UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDO1lBQ0QsTUFBTSxjQUFjLEdBQUcsTUFBTSxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUM1QyxHQUFHLEVBQUUsWUFBWTtnQkFDakIsS0FBSyxFQUFFLGNBQWM7YUFDeEIsQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzNCLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEIsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixNQUFNLGlCQUFpQixHQUFHLEdBQUcsRUFBRTtRQUMzQixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxXQUFXLEVBQUUsQ0FBQztZQUM5QixlQUFlLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixNQUFNLGlCQUFpQixHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO1FBQzNDLElBQUksUUFBUSxLQUFLLGtCQUFrQixFQUFFLENBQUM7WUFDbEMsaUJBQWlCLEVBQUUsQ0FBQztRQUN4QixDQUFDO2FBQU0sQ0FBQztZQUNKLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNqQixPQUFPLENBQ0gsZUFBSyxTQUFTLEVBQUMscUJBQXFCLGFBQ2hDLGVBQUssU0FBUyxFQUFDLFlBQVksYUFDdkIsS0FBQyxLQUFLLElBQ0YsV0FBVyxFQUFDLFlBQVksRUFDeEIsS0FBSyxFQUFFLFlBQVksRUFDbkIsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUNsRCxFQUNGLEtBQUMsS0FBSyxJQUNGLFdBQVcsRUFBQyxjQUFjLEVBQzFCLElBQUksRUFBQyxVQUFVLEVBQ2YsSUFBSSxFQUFFLEVBQUUsRUFDUixLQUFLLEVBQUUsY0FBYyxFQUNyQixRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQ3BELElBQ0EsRUFDTixlQUFLLFNBQVMsRUFBQyx3QkFBd0IsYUFDbkMsS0FBQyxNQUFNLElBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsdUJBRWhFLEVBQ1QsS0FBQyxNQUFNLElBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBRSxlQUFlLG9CQUVuRCxJQUNQLElBQ0osQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxPQUFPLENBQ0gsZUFBSyxTQUFTLEVBQUMsdUVBQXVFLGFBQ2xGLFlBQUcsU0FBUyxFQUFDLDBDQUEwQyxzQ0FBMEIsRUFDakYsS0FBQyxNQUFNLElBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsb0NBRXJELElBQ1AsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU8sQ0FDSCxNQUFDLE1BQU0sSUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsYUFDbEQsS0FBQyxhQUFhLElBQUMsU0FBUyxFQUFDLFFBQVEsWUFDN0IsS0FBQyxXQUFXLElBQUMsV0FBVyxFQUFDLDJCQUEyQixHQUFHLEdBQzNDLEVBQ2hCLEtBQUMsYUFBYSxjQUNULE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsQiw4QkFDSyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUNyQixLQUFDLFVBQVUsSUFBYyxLQUFLLEVBQUUsTUFBTSxZQUNqQyxNQUFNLElBRE0sTUFBTSxDQUVWLENBQ2hCLENBQUMsRUFDRixLQUFDLFVBQVUsSUFBQyxLQUFLLEVBQUMsa0JBQWtCLGlDQUV2QixJQUNkLENBQ04sQ0FBQyxDQUFDLENBQUMsQ0FDQSxLQUFDLFVBQVUsSUFBQyxLQUFLLEVBQUMsa0JBQWtCLDJDQUV2QixDQUNoQixHQUNXLElBQ1gsQ0FDWixDQUFDO0FBQ04sQ0FBQyJ9