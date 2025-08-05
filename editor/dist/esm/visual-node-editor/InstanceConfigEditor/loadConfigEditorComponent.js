import { jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom";
import { StructuredConfigurableEditorComp } from "./StructuredConfigurableEditorComp";
export function loadConfigEditorComponent(instance) {
    const w = window;
    w.React = React;
    w.ReactDOM = ReactDOM;
    const { nodeId, node } = instance;
    const exportId = `__NodeConfig__${nodeId}`;
    const editorConfig = node.editorConfig;
    if (editorConfig.type === "custom") {
        try {
            // eslint-disable-next-line no-eval
            eval(editorConfig.editorComponentBundleContent);
            const compModule = w[exportId];
            const comp = (compModule === null || compModule === void 0 ? void 0 : compModule.default) || compModule;
            if (!comp) {
                return function () {
                    return (_jsxs("span", { children: ["Failed to load configurable node - please check that bundle that ", nodeId, " ", "exposes an editable component to window.", exportId] }));
                };
            }
            w.Comp = comp;
            return comp;
        }
        catch (e) {
            console.error(e);
            return function () {
                return (_jsxs("span", { children: ["Failed to load configurable node - please check that bundle that ", nodeId, " ", "exposes an editable component to window.", exportId] }));
            };
        }
    }
    else {
        return StructuredConfigurableEditorComp(editorConfig);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZENvbmZpZ0VkaXRvckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvSW5zdGFuY2VDb25maWdFZGl0b3IvbG9hZENvbmZpZ0VkaXRvckNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdEYsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxRQUFnQztJQUVoQyxNQUFNLENBQUMsR0FBUSxNQUFNLENBQUM7SUFDdEIsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDaEIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFFdEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUM7SUFDbEMsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLE1BQU0sRUFBRSxDQUFDO0lBQzNDLE1BQU0sWUFBWSxHQUFJLElBQWlDLENBQUMsWUFBWSxDQUFDO0lBRXJFLElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUM7WUFDSCxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBRWhELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksR0FBRyxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxPQUFPLEtBQUksVUFBVSxDQUFDO1lBRS9DLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDVixPQUFPO29CQUNMLE9BQU8sQ0FDTCxnR0FDb0UsTUFBTSxFQUFFLEdBQUcsOENBQ3BDLFFBQVEsSUFDNUMsQ0FDUixDQUFDO2dCQUNKLENBQUMsQ0FBQztZQUNKLENBQUM7WUFFRCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUVkLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU87Z0JBQ0wsT0FBTyxDQUNMLGdHQUNvRSxNQUFNLEVBQUUsR0FBRyw4Q0FDcEMsUUFBUSxJQUM1QyxDQUNSLENBQUM7WUFDSixDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLGdDQUFnQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hELENBQUM7QUFDSCxDQUFDIn0=