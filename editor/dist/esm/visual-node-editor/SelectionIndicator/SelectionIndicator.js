import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../ui";
import { useMemo } from "react";
import { useDarkMode } from "../../flow-editor/DarkModeContext";
import { cn } from "../../lib/utils";
export const SelectionIndicator = (props) => {
    const { selection, onCenter, onGroup, onDelete } = props;
    const dark = useDarkMode();
    if (!selection) {
        return null;
    }
    const inner = useMemo(() => {
        switch (selection.type) {
            case "input":
                return (_jsxs("span", { children: [_jsxs("strong", { children: ["\"", selection.pinId, "\""] }), " input selected"] }));
            case "output":
                return (_jsxs("span", { children: [_jsxs("strong", { children: ["\"", selection.pinId, "\""] }), " output selected"] }));
            case "instances":
                return (_jsxs("span", { children: [selection.ids.length, " instance", selection.ids.length > 1 ? "s" : "", " selected"] }));
            case "connections":
                return (_jsxs("span", { children: [selection.ids.length, " connection", selection.ids.length > 1 ? "s" : "", " selected"] }));
        }
    }, [selection]);
    const onDeleteClick = () => {
        switch (selection.type) {
            case "instances":
                onDelete(selection.ids);
                break;
            case "connections":
                onDelete(selection.ids);
                break;
        }
    };
    const actions = {
        center: (_jsx(Button, { onClick: onCenter, variant: "outline", size: "sm", children: "Center" })),
        group: (_jsx(Button, { onClick: onGroup, variant: "outline", size: "sm", children: "Group" })),
        delete: (_jsx(Button, { onClick: onDeleteClick, variant: "outline", size: "sm", className: "text-destructive hover:bg-destructive/90 hover:text-destructive-foreground", children: "Delete" })),
    };
    const actionsMap = {
        instances: [actions.center, actions.group, actions.delete],
        connections: [actions.delete],
        input: [actions.center],
        output: [actions.center],
    };
    return (_jsxs("div", { className: cn("flex items-center gap-2 p-2 rounded-md border absolute bottom-[10px] left-1/2 -translate-x-1/2 text-xs z-1 select-none", dark ? "bg-background border-border" : "bg-white border-input"), children: [inner, " ", _jsx("div", { className: "flex gap-2", children: actionsMap[selection.type] })] }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0aW9uSW5kaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9TZWxlY3Rpb25JbmRpY2F0b3IvU2VsZWN0aW9uSW5kaWNhdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFjLEVBQUUsT0FBTyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFtQ3JDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFzQyxDQUNuRSxLQUFLLEVBQ0wsRUFBRTtJQUNGLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDekQsTUFBTSxJQUFJLEdBQUcsV0FBVyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBR0QsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUN6QixRQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixLQUFLLE9BQU87Z0JBQ1YsT0FBTyxDQUNMLDJCQUNFLG1DQUFVLFNBQVMsQ0FBQyxLQUFLLFVBQVcsdUJBQy9CLENBQ1IsQ0FBQztZQUNKLEtBQUssUUFBUTtnQkFDWCxPQUFPLENBQ0wsMkJBQ0UsbUNBQVUsU0FBUyxDQUFDLEtBQUssVUFBVyx3QkFDL0IsQ0FDUixDQUFDO1lBQ0osS0FBSyxXQUFXO2dCQUNkLE9BQU8sQ0FDTCwyQkFDRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sZUFDcEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQy9CLENBQ1IsQ0FBQztZQUNKLEtBQUssYUFBYTtnQkFDaEIsT0FBTyxDQUNMLDJCQUNHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxpQkFDcEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQy9CLENBQ1IsQ0FBQztRQUNOLENBQUM7SUFDSCxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRWhCLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRTtRQUN6QixRQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixLQUFLLFdBQVc7Z0JBQ2QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtRQUNWLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRztRQUNkLE1BQU0sRUFBRSxDQUNOLEtBQUMsTUFBTSxJQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsSUFBSSx1QkFFN0MsQ0FDVjtRQUNELEtBQUssRUFBRSxDQUNMLEtBQUMsTUFBTSxJQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsSUFBSSxzQkFFNUMsQ0FDVjtRQUNELE1BQU0sRUFBRSxDQUNOLEtBQUMsTUFBTSxJQUNMLE9BQU8sRUFBRSxhQUFhLEVBQ3RCLE9BQU8sRUFBQyxTQUFTLEVBQ2pCLElBQUksRUFBQyxJQUFJLEVBQ1QsU0FBUyxFQUFDLDRFQUE0RSx1QkFHL0UsQ0FDVjtLQUNGLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRztRQUNqQixTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMxRCxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDdkIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0lBRUYsT0FBTyxDQUNMLGVBQ0UsU0FBUyxFQUFFLEVBQUUsQ0FDWCx3SEFBd0gsRUFDeEgsSUFBSSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQy9ELGFBRUEsS0FBSyxPQUFFLGNBQUssU0FBUyxFQUFDLFlBQVksWUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFPLElBQ2xFLENBQ1AsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9