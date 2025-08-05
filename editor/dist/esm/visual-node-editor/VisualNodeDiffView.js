import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import * as React from "react";
import { noop, fullInsIdPath, } from "@flyde/core";
import { InstanceView } from "./instance-view/InstanceView";
import { ConnectionView } from "./connection-view/ConnectionView";
import { entries } from "../utils";
import { useBoundingclientrect } from "rooks";
import { Button, Slider } from "../ui";
import { emptyObj, roundNumber, fitViewPortToNode, emptyList, animateViewPort, } from "./utils";
import { NodeIoView } from "./node-io-view";
import { LayoutDebugger } from "./layout-debugger";
import { useDarkMode } from "../flow-editor/DarkModeContext";
import classNames from "classnames";
import useComponentSize from "@rehooks/component-size";
const defaultViewPort = {
    pos: { x: 0, y: 0 },
    zoom: 1,
};
// Create a single instance of common props to avoid recreating functions
const nodeIoViewNoopProps = {
    onDragStart: noop,
    onDragEnd: noop,
    onDragMove: noop,
    onSelect: noop,
    onMouseUp: noop,
    onMouseDown: noop,
    onSetDescription: noop,
    closest: false,
    connected: false,
    selected: false,
};
const instanceViewNoopProps = {
    onUngroup: noop,
    onPinClick: noop,
    onPinDblClick: noop,
    onDragStart: noop,
    onDragEnd: noop,
    onDragMove: noop,
    onDblClick: noop,
    onSelect: noop,
    onToggleSticky: noop,
    onInspectPin: noop,
    onTogglePinBreakpoint: noop,
    onTogglePinLog: noop,
    onChangeVisibleInputs: noop,
    onChangeVisibleOutputs: noop,
    onSetDisplayName: noop,
    onDeleteInstance: noop,
    onCloseInlineEditor: noop,
    onChangeStyle: noop,
    onGroupSelected: noop,
    onPinMouseDown: noop,
    onPinMouseUp: noop,
    onViewForkCode: noop,
    selected: false,
    dragged: false,
    isConnectedInstanceSelected: false,
    hadError: false,
    inlineEditorPortalDomNode: null,
};
const connectionViewNoopProps = {
    onDblClick: noop,
    toggleHidden: noop,
    removeConnection: noop,
    onSelectConnection: noop,
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
export const VisualNodeDiffView = (props) => {
    const { node, comparisonNode, currentInsId, className, initialPadding } = props;
    const darkMode = useDarkMode();
    const [viewPort, setViewPort] = React.useState(defaultViewPort);
    const [didCenterInitially, setDidCenterInitially] = React.useState(false);
    const boardRef = React.useRef(null);
    const vpSize = useComponentSize(boardRef);
    const boardPos = useBoundingclientrect(boardRef) || { x: 0, y: 0 };
    const { instances, connections } = node;
    const { inputs, outputs, inputsPosition, outputsPosition } = comparisonNode;
    const backgroundStyle = {
        backgroundPositionX: roundNumber(-viewPort.pos.x * viewPort.zoom),
        backgroundPositionY: roundNumber(-viewPort.pos.y * viewPort.zoom),
        backgroundSize: roundNumber(25 * viewPort.zoom) + "px",
    };
    const fitToScreen = React.useCallback(() => {
        const vp = fitViewPortToNode(node, vpSize);
        animateViewPort(viewPort, vp, 500, (vp) => {
            setViewPort(vp);
        });
    }, [node, vpSize, viewPort]);
    const onZoom = React.useCallback((newZoom) => {
        setViewPort({ ...viewPort, zoom: newZoom });
    }, [viewPort]);
    React.useEffect(() => {
        if (!didCenterInitially && vpSize.width) {
            const vp = fitViewPortToNode(comparisonNode, vpSize, initialPadding);
            setViewPort(vp);
            setDidCenterInitially(true);
        }
    }, [comparisonNode, initialPadding, vpSize, didCenterInitially]);
    const renderMainPins = (type) => {
        const pins = type === "input" ? inputs : outputs;
        const positionMap = type === "input" ? inputsPosition : outputsPosition;
        return entries(pins).map(([k, v]) => {
            var _a;
            return (_createElement(NodeIoView, { ...nodeIoViewNoopProps, currentInsId: currentInsId, ancestorInsIds: '', type: type, pos: positionMap[k] || { x: 0, y: 0 }, id: k, key: k, viewPort: viewPort, description: (_a = v.description) !== null && _a !== void 0 ? _a : '' }));
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
    return (_jsx("div", { className: classNames("visual-node-editor", "diff-view", className, {
            dark: darkMode,
        }), "data-id": node.id, children: _jsxs("main", { className: "board-editor-inner", ref: boardRef, style: backgroundStyle, children: [_jsx(React.Fragment, { children: _jsx(LayoutDebugger, { vp: viewPort, node: node, extraDebug: emptyList, mousePos: { x: 0, y: 0 } }) }), _jsx(ConnectionView, { ...connectionViewNoopProps, currentInsId: currentInsId, ancestorsInsIds: undefined, size: vpSize, node: node, boardPos: boardPos, instances: allInstancesToRender, connections: connectionsToRender, viewPort: viewPort, parentVp: defaultViewPort, lastMousePos: { x: 0, y: 0 } }), renderMainPins("input"), allInstancesToRender.map((ins, idx) => (_createElement(InstanceView, { ...instanceViewNoopProps, connectionsPerInput: emptyObj, ancestorsInsIds: fullInsIdPath(currentInsId, props.ancestorsInsIds), queuedInputsData: emptyObj, instance: ins, connections: connections, viewPort: viewPort, key: ins.id, diffStatus: ins.diffStatus }))), renderMainPins("output"), _jsxs("div", { className: "viewport-controls-and-help", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: fitToScreen, children: "Center" }), _jsx(Slider, { min: 0.15, max: 3, step: 0.05, className: "w-[100px]", value: [viewPort.zoom], onValueChange: ([value]) => onZoom(value !== null && value !== void 0 ? value : 0) })] })] }) }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzdWFsTm9kZURpZmZWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9WaXN1YWxOb2RlRGlmZlZpZXcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUtMLElBQUksRUFDSixhQUFhLEdBR2QsTUFBTSxhQUFhLENBQUM7QUFFckIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUV2QyxPQUFPLEVBQ0wsUUFBUSxFQUVSLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsR0FDaEIsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sZ0JBQWdCLE1BQU0seUJBQXlCLENBQUM7QUFHdkQsTUFBTSxlQUFlLEdBQWE7SUFDaEMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ25CLElBQUksRUFBRSxDQUFDO0NBQ1IsQ0FBQztBQUVGLHlFQUF5RTtBQUN6RSxNQUFNLG1CQUFtQixHQUFHO0lBQzFCLFdBQVcs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