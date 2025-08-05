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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualNodeDiffView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const React = __importStar(require("react"));
const core_1 = require("@flyde/core");
const InstanceView_1 = require("./instance-view/InstanceView");
const ConnectionView_1 = require("./connection-view/ConnectionView");
const utils_1 = require("../utils");
const rooks_1 = require("rooks");
const ui_1 = require("../ui");
const utils_2 = require("./utils");
const node_io_view_1 = require("./node-io-view");
const layout_debugger_1 = require("./layout-debugger");
const DarkModeContext_1 = require("../flow-editor/DarkModeContext");
const classnames_1 = __importDefault(require("classnames"));
const component_size_1 = __importDefault(require("@rehooks/component-size"));
const defaultViewPort = {
    pos: { x: 0, y: 0 },
    zoom: 1,
};
// Create a single instance of common props to avoid recreating functions
const nodeIoViewNoopProps = {
    onDragStart: core_1.noop,
    onDragEnd: core_1.noop,
    onDragMove: core_1.noop,
    onSelect: core_1.noop,
    onMouseUp: core_1.noop,
    onMouseDown: core_1.noop,
    onSetDescription: core_1.noop,
    closest: false,
    connected: false,
    selected: false,
};
const instanceViewNoopProps = {
    onUngroup: core_1.noop,
    onPinClick: core_1.noop,
    onPinDblClick: core_1.noop,
    onDragStart: core_1.noop,
    onDragEnd: core_1.noop,
    onDragMove: core_1.noop,
    onDblClick: core_1.noop,
    onSelect: core_1.noop,
    onToggleSticky: core_1.noop,
    onInspectPin: core_1.noop,
    onTogglePinBreakpoint: core_1.noop,
    onTogglePinLog: core_1.noop,
    onChangeVisibleInputs: core_1.noop,
    onChangeVisibleOutputs: core_1.noop,
    onSetDisplayName: core_1.noop,
    onDeleteInstance: core_1.noop,
    onCloseInlineEditor: core_1.noop,
    onChangeStyle: core_1.noop,
    onGroupSelected: core_1.noop,
    onPinMouseDown: core_1.noop,
    onPinMouseUp: core_1.noop,
    onViewForkCode: core_1.noop,
    selected: false,
    dragged: false,
    isConnectedInstanceSelected: false,
    hadError: false,
    inlineEditorPortalDomNode: null,
};
const connectionViewNoopProps = {
    onDblClick: core_1.noop,
    toggleHidden: core_1.noop,
    removeConnection: core_1.noop,
    onSelectConnection: core_1.noop,
    selectedInstances: [],
    selectedConnections: [],
    draggedSource: null,
};
// const calculateInstanceDiff = (
//   instance: NodeInstance,
//   node: VisualNode,
//   comparisonNode?: VisualNode,
//   isFromComparison?: boolean
// ): DiffStatus => {
//   if (!comparisonNode) {
//     return undefined;
//   }
//   const currentInstance = isFromComparison ? instance : instance;
//   const otherInstance = (
//     isFromComparison ? node : comparisonNode
//   ).instances.find((i) => i.id === instance.id);
//   // Check if instance exists in both nodes
//   if (!otherInstance) {
//     return isFromComparison ? "added" : "removed";
//   }
//   // Compare relevant properties to detect changes
//   const relevantPropsToCompare = {
//     pos: currentInstance.pos,
//     inputConfig: currentInstance.inputConfig,
//     style: currentInstance.style,
//     displayName: currentInstance.displayName,
//     visibleInputs: currentInstance.visibleInputs,
//     visibleOutputs: currentInstance.visibleOutputs,
//   };
//   const otherRelevantProps = {
//     pos: otherInstance.pos,
//     inputConfig: otherInstance.inputConfig,
//     style: otherInstance.style,
//     displayName: otherInstance.displayName,
//     visibleInputs: otherInstance.visibleInputs,
//     visibleOutputs: otherInstance.visibleOutputs,
//   };
//   if (
//     JSON.stringify(relevantPropsToCompare) !==
//     JSON.stringify(otherRelevantProps)
//   ) {
//     return "changed";
//   }
//   return undefined;
// };
// const calculateConnectionDiff = (
//   connection: ConnectionData,
//   node: VisualNode,
//   comparisonNode?: VisualNode,
//   isFromComparison?: boolean
// ): DiffStatus => {
//   if (!comparisonNode) {
//     return undefined;
//   }
//   const currentConnection = isFromComparison ? connection : connection;
//   const otherConnections = isFromComparison
//     ? node.connections
//     : comparisonNode.connections;
//   const existsInOther = otherConnections.some(
//     (conn) =>
//       conn.from.insId === currentConnection.from.insId &&
//       conn.from.pinId === currentConnection.from.pinId &&
//       conn.to.insId === currentConnection.to.insId &&
//       conn.to.pinId === currentConnection.to.pinId
//   );
//   if (!existsInOther) {
//     return isFromComparison ? "added" : "removed";
//   }
//   return undefined;
// };
const VisualNodeDiffView = (props) => {
    const { node, comparisonNode, currentInsId, className, initialPadding } = props;
    const darkMode = (0, DarkModeContext_1.useDarkMode)();
    const [viewPort, setViewPort] = React.useState(defaultViewPort);
    const [didCenterInitially, setDidCenterInitially] = React.useState(false);
    const boardRef = React.useRef(null);
    const vpSize = (0, component_size_1.default)(boardRef);
    const boardPos = (0, rooks_1.useBoundingclientrect)(boardRef) || { x: 0, y: 0 };
    const { instances, connections } = node;
    const { inputs, outputs, inputsPosition, outputsPosition } = comparisonNode;
    const backgroundStyle = {
        backgroundPositionX: (0, utils_2.roundNumber)(-viewPort.pos.x * viewPort.zoom),
        backgroundPositionY: (0, utils_2.roundNumber)(-viewPort.pos.y * viewPort.zoom),
        backgroundSize: (0, utils_2.roundNumber)(25 * viewPort.zoom) + "px",
    };
    const fitToScreen = React.useCallback(() => {
        const vp = (0, utils_2.fitViewPortToNode)(node, vpSize);
        (0, utils_2.animateViewPort)(viewPort, vp, 500, (vp) => {
            setViewPort(vp);
        });
    }, [node, vpSize, viewPort]);
    const onZoom = React.useCallback((newZoom) => {
        setViewPort({ ...viewPort, zoom: newZoom });
    }, [viewPort]);
    React.useEffect(() => {
        if (!didCenterInitially && vpSize.width) {
            const vp = (0, utils_2.fitViewPortToNode)(comparisonNode, vpSize, initialPadding);
            setViewPort(vp);
            setDidCenterInitially(true);
        }
    }, [comparisonNode, initialPadding, vpSize, didCenterInitially]);
    const renderMainPins = (type) => {
        const pins = type === "input" ? inputs : outputs;
        const positionMap = type === "input" ? inputsPosition : outputsPosition;
        return (0, utils_1.entries)(pins).map(([k, v]) => {
            var _a;
            return ((0, react_1.createElement)(node_io_view_1.NodeIoView, { ...nodeIoViewNoopProps, currentInsId: currentInsId, ancestorInsIds: '', type: type, pos: positionMap[k] || { x: 0, y: 0 }, id: k, key: k, viewPort: viewPort, description: (_a = v.description) !== null && _a !== void 0 ? _a : '' }));
        });
    };
    const allInstancesToRender = React.useMemo(() => {
        // Start with all instances from the comparison node
        return comparisonNode.instances
            .map((compIns) => {
            // Find matching instance in current node
            const currentInstance = instances.find((ins) => ins.id === compIns.id);
            if (!currentInstance) {
                // Instance exists in comparison but not in current - it was added
                return {
                    ...compIns,
                    diffStatus: "added",
                };
            }
            // Instance exists in both, check if it changed
            if (JSON.stringify({
                inputConfig: currentInstance.inputConfig,
                style: currentInstance.style,
                displayName: currentInstance.displayName,
                visibleInputs: currentInstance.visibleInputs,
                visibleOutputs: currentInstance.visibleOutputs,
            }) !==
                JSON.stringify({
                    inputConfig: compIns.inputConfig,
                    style: compIns.style,
                    displayName: compIns.displayName,
                    visibleInputs: compIns.visibleInputs,
                    visibleOutputs: compIns.visibleOutputs,
                })) {
                return {
                    ...compIns, // Use comparison node's position
                    inputConfig: currentInstance.inputConfig,
                    style: currentInstance.style,
                    displayName: currentInstance.displayName,
                    visibleInputs: currentInstance.visibleInputs,
                    visibleOutputs: currentInstance.visibleOutputs,
                    diffStatus: "changed",
                };
            }
            return { ...compIns };
        })
            .concat(
        // Add instances that only exist in current node (they were removed)
        instances
            .filter((ins) => !comparisonNode.instances.find((compIns) => compIns.id === ins.id))
            .map((ins) => ({
            ...ins,
            diffStatus: "removed",
        })));
    }, [instances, comparisonNode]);
    const connectionsToRender = React.useMemo(() => {
        // Start with all connections from comparison node
        const baseConnections = comparisonNode.connections.map((compConn) => {
            // Check if connection exists in current node
            const exists = connections.some((conn) => conn.from.insId === compConn.from.insId &&
                conn.from.pinId === compConn.from.pinId &&
                conn.to.insId === compConn.to.insId &&
                conn.to.pinId === compConn.to.pinId);
            // If it doesn't exist in current node, it was added
            return {
                ...compConn,
                diffStatus: exists ? undefined : "added",
            };
        });
        // Add connections that only exist in current node (they were removed)
        const removedConnections = connections
            .filter((conn) => !comparisonNode.connections.some((compConn) => compConn.from.insId === conn.from.insId &&
            compConn.from.pinId === conn.from.pinId &&
            compConn.to.insId === conn.to.insId &&
            compConn.to.pinId === conn.to.pinId))
            .map((conn) => ({ ...conn, diffStatus: "removed" }));
        return [...baseConnections, ...removedConnections];
    }, [connections, comparisonNode]);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)("visual-node-editor", "diff-view", className, {
            dark: darkMode,
        }), "data-id": node.id, children: (0, jsx_runtime_1.jsxs)("main", { className: "board-editor-inner", ref: boardRef, style: backgroundStyle, children: [(0, jsx_runtime_1.jsx)(React.Fragment, { children: (0, jsx_runtime_1.jsx)(layout_debugger_1.LayoutDebugger, { vp: viewPort, node: node, extraDebug: utils_2.emptyList, mousePos: { x: 0, y: 0 } }) }), (0, jsx_runtime_1.jsx)(ConnectionView_1.ConnectionView, { ...connectionViewNoopProps, currentInsId: currentInsId, ancestorsInsIds: undefined, size: vpSize, node: node, boardPos: boardPos, instances: allInstancesToRender, connections: connectionsToRender, viewPort: viewPort, parentVp: defaultViewPort, lastMousePos: { x: 0, y: 0 } }), renderMainPins("input"), allInstancesToRender.map((ins, idx) => ((0, react_1.createElement)(InstanceView_1.InstanceView, { ...instanceViewNoopProps, connectionsPerInput: utils_2.emptyObj, ancestorsInsIds: (0, core_1.fullInsIdPath)(currentInsId, props.ancestorsInsIds), queuedInputsData: utils_2.emptyObj, instance: ins, connections: connections, viewPort: viewPort, key: ins.id, diffStatus: ins.diffStatus }))), renderMainPins("output"), (0, jsx_runtime_1.jsxs)("div", { className: "viewport-controls-and-help", children: [(0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "ghost", size: "sm", onClick: fitToScreen, children: "Center" }), (0, jsx_runtime_1.jsx)(ui_1.Slider, { min: 0.15, max: 3, step: 0.05, className: "w-[100px]", value: [viewPort.zoom], onValueChange: ([value]) => onZoom(value !== null && value !== void 0 ? value : 0) })] })] }) }));
};
exports.VisualNodeDiffView = VisualNodeDiffView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzdWFsTm9kZURpZmZWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9WaXN1YWxOb2RlRGlmZlZpZXcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBQy9CLHNDQVNxQjtBQUVyQiwrREFBNEQ7QUFDNUQscUVBQWtFO0FBQ2xFLG9DQUF5QztBQUN6QyxpQ0FBOEM7QUFDOUMsOEJBQXVDO0FBRXZDLG1DQU9pQjtBQUVqQixpREFBNEM7QUFDNUMsdURBQW1EO0FBQ25ELG9FQUE2RDtBQUM3RCw0REFBb0M7QUFDcEMsNkVBQXVEO0FBR3ZELE1BQU0sZUFBZSxHQUFhO0lBQ2hDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNuQixJQUFJLEVBQUUsQ0FBQztDQUNSLENBQUM7QUFFRix5RUFBeUU7QUFDekUsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixXQUFXLEVBQUUsV0FBSTtJQUNqQixTQUFTLEVBQUUsV0FBSTtJQUNmLFVBQVUsRUFBRSxXQUFJO0lBQ2hCLFFBQVEsRUFBRSxXQUFJO0lBQ2QsU0FBUyxFQUFFLFdBQUk7SUFDZixXQUFXLEVBQUUsV0FBSTtJQUNqQixnQkFBZ0IsRUFBRSxXQUFJO0lBQ3RCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsU0FBUyxFQUFFLEtBQUs7SUFDaEIsUUFBUSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQztBQUVGLE1BQU0scUJBQXFCLEdBQUc7SUFDNUIsU0FBUyxFQUFFLFdBQUk7SUFDZixVQUFVLEVBQUUsV0FBSTtJQUNoQixhQUFhLEVBQUUsV0FBSTtJQUNuQixXQUFXLEVBQUUsV0FBSTtJQUNqQixTQUFTLEVBQUUsV0FBSTtJQUNmLFVBQVUsRUFBRSxXQUFJO0lBQ2hCLFVBQVUsRUFBRSxXQUFJO0lBQ2hCLFFB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