"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePorts = exports.useConfirm = exports.usePrompt = exports.PortsContext = exports.defaultPorts = void 0;
const react_1 = require("react");
const core_1 = require("@flyde/core");
__exportStar(require("./analytics"), exports);
;
const toastNotImplemented = (method) => async () => {
    console.warn(`${method} Not implemented`);
    alert(`${method} Not implemented`);
};
exports.defaultPorts = {
    prompt: async ({ text, defaultValue }) => prompt(`${text}`, defaultValue),
    openFile: async (path) => {
        // toastMsg(`Open ${path}`);
    },
    confirm: async ({ text }) => confirm(text),
    readFlow: toastNotImplemented("readFlow"),
    setFlow: toastNotImplemented("setFlow"),
    onExternalFlowChange: toastNotImplemented("onExternalFlowChange"),
    onRunFlow: toastNotImplemented("onRunFlow"),
    onStopFlow: toastNotImplemented("onStopFlow"),
    reportEvent: core_1.noop,
    generateNodeFromPrompt: toastNotImplemented("generateNodeFromPrompt"),
    getLibraryData: () => Promise.resolve({ groups: [] }),
    onRequestSiblingNodes: () => Promise.resolve([]),
    onCreateCustomNode: toastNotImplemented("onCreateCustomNode"),
    onRequestNodeSource: () => {
        throw new Error("Not implemented");
    },
    resolveInstance: () => {
        throw new Error("Not implemented");
    },
    getAvailableSecrets: () => Promise.resolve([]),
    addNewSecret: () => Promise.resolve([]),
};
exports.PortsContext = (0, react_1.createContext)(exports.defaultPorts);
const usePrompt = () => {
    const dtoPrompt = (0, react_1.useContext)(exports.PortsContext).prompt;
    return (text, defaultValue) => dtoPrompt({ text, defaultValue });
};
exports.usePrompt = usePrompt;
const useConfirm = () => {
    const dtoPrompt = (0, react_1.useContext)(exports.PortsContext).confirm;
    return (text) => dtoPrompt({ text });
};
exports.useConfirm = useConfirm;
const usePorts = () => {
    return (0, react_1.useContext)(exports.PortsContext);
};
exports.usePorts = usePorts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmxvdy1lZGl0b3IvcG9ydHMvcG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBa0Q7QUFDbEQsc0NBV3FCO0FBR3JCLDhDQUE0QjtBQUkyRSxDQUFDO0FBK0N4RyxNQUFNLG1CQUFtQixHQUFRLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUM5RCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBZ0I7SUFDdkMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsWUFBWSxDQUFDO0lBQ3pFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkIsNEJBQTRCO0lBQzlCLENBQUM7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDMUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztJQUN6QyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDO0lBRXZDLG9CQUFvQixFQUFFLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDO0lBQ2pFLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7SUFDM0MsVUFBVSxFQUFFLG1CQUFtQixDQUFDLFlBQVksQ0FBQztJQUM3QyxXQUFXLEVBQUUsV0FBSTtJQUNqQixzQkFBc0IsRUFBRSxtQkFBbUIsQ0FBQyx3QkFBd0IsQ0FBQztJQUNyRSxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNyRCxxQkFBcUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNoRCxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQztJQUM3RCxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDOUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0NBQ3hDLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRyxJQUFBLHFCQUFhLEVBQWMsb0JBQVksQ0FBQyxDQUFDO0FBRTlELE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRTtJQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFBLGtCQUFVLEVBQUMsb0JBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNsRCxPQUFPLENBQUMsSUFBWSxFQUFFLFlBQXFCLEVBQTBCLEVBQUUsQ0FDckUsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBSlcsUUFBQSxTQUFTLGFBSXBCO0FBRUssTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFO0lBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUEsa0JBQVUsRUFBQyxvQkFBWSxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ25ELE9BQU8sQ0FBQyxJQUFZLEVBQW9CLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2pFLENBQUMsQ0FBQztBQUhXLFFBQUEsVUFBVSxjQUdyQjtBQUlLLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUMzQixPQUFPLElBQUEsa0JBQVUsRUFBQyxvQkFBWSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDO0FBRlcsUUFBQSxRQUFRLFlBRW5CIn0=