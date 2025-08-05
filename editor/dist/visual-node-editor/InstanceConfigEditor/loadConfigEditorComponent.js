"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfigEditorComponent = loadConfigEditorComponent;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const StructuredConfigurableEditorComp_1 = require("./StructuredConfigurableEditorComp");
function loadConfigEditorComponent(instance) {
    const w = window;
    w.React = react_1.default;
    w.ReactDOM = react_dom_1.default;
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
                    return ((0, jsx_runtime_1.jsxs)("span", { children: ["Failed to load configurable node - please check that bundle that ", nodeId, " ", "exposes an editable component to window.", exportId] }));
                };
            }
            w.Comp = comp;
            return comp;
        }
        catch (e) {
            console.error(e);
            return function () {
                return ((0, jsx_runtime_1.jsxs)("span", { children: ["Failed to load configurable node - please check that bundle that ", nodeId, " ", "exposes an editable component to window.", exportId] }));
            };
        }
    }
    else {
        return (0, StructuredConfigurableEditorComp_1.StructuredConfigurableEditorComp)(editorConfig);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZENvbmZpZ0VkaXRvckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvSW5zdGFuY2VDb25maWdFZGl0b3IvbG9hZENvbmZpZ0VkaXRvckNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSw4REErQ0M7O0FBbkRELGtEQUEwQjtBQUMxQiwwREFBaUM7QUFDakMseUZBQXNGO0FBRXRGLFNBQWdCLHlCQUF5QixDQUN2QyxRQUFnQztJQUVoQyxNQUFNLENBQUMsR0FBUSxNQUFNLENBQUM7SUFDdEIsQ0FBQyxDQUFDLEtBQUssR0FBRyxlQUFLLENBQUM7SUFDaEIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxtQkFBUSxDQUFDO0lBRXRCLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDO0lBQ2xDLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixNQUFNLEVBQUUsQ0FBQztJQUMzQyxNQUFNLFlBQVksR0FBSSxJQUFpQyxDQUFDLFlBQVksQ0FBQztJQUVyRSxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDO1lBQ0gsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUVoRCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsTUFBTSxJQUFJLEdBQUcsQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsT0FBTyxLQUFJLFVBQVUsQ0FBQztZQUUvQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1YsT0FBTztvQkFDTCxPQUFPLENBQ0wsa0hBQ29FLE1BQU0sRUFBRSxHQUFHLDhDQUNwQyxRQUFRLElBQzVDLENBQ1IsQ0FBQztnQkFDSixDQUFDLENBQUM7WUFDSixDQUFDO1lBRUQsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFZCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPO2dCQUNMLE9BQU8sQ0FDTCxrSEFDb0UsTUFBTSxFQUFFLEdBQUcsOENBQ3BDLFFBQVEsSUFDNUMsQ0FDUixDQUFDO1lBQ0osQ0FBQyxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxJQUFBLG1FQUFnQyxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hELENBQUM7QUFDSCxDQUFDIn0=