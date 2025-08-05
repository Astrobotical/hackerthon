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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const React = __importStar(require("react"));
const __1 = require("../..");
const ConnectionViewPath_1 = require("./ConnectionViewPath/ConnectionViewPath");
const SingleConnectionView_1 = require("./SingleConnectionView");
const calc_pin_position_1 = require("./calc-pin-position");
const ConnectionView = (props) => {
    var _a;
    const { viewPort, futureConnection, selectedInstances, draggedSource, selectedConnections, onSelectConnection, removeConnection, } = props;
    const [renderTrigger, setRenderTrigger] = React.useState(0);
    const requestRerender = React.useCallback((count) => {
        return requestAnimationFrame(() => {
            setRenderTrigger((r) => (r + 1) % 9);
            if (count > 0) {
                requestRerender(count - 1);
            }
        });
    }, []);
    React.useEffect(() => {
        // re-render 10 times and then stop
        // this is a very ugly hack to make connections render smoothly
        // but for some reason, if this is always on (As in no limit), when the playground
        // is scrolled, connections are rendered wrong
        const t = requestRerender(10);
        return () => {
            cancelAnimationFrame(t);
        };
    }, [requestRerender]);
    React.useEffect(() => {
        const handler = () => {
            requestRerender(3);
        };
        window.addEventListener("scroll", handler);
        window.addEventListener("resize", handler);
        return () => {
            window.removeEventListener("scroll", handler);
            window.removeEventListener("resize", handler);
        };
    }, [requestRerender, renderTrigger]);
    const connectionPaths = props.connections.map((conn) => {
        const connectionId = (0, __1.getConnectionId)(conn);
        const parentSelected = selectedInstances.includes(conn.from.insId) ||
            selectedInstances.includes(conn.to.insId);
        return ((0, react_1.createElement)(SingleConnectionView_1.SingleConnectionView, { ...props, connection: conn, connectionType: "regular", parentSelected: parentSelected, onSelectConnection: onSelectConnection, isConnectionSelected: selectedConnections.includes(connectionId), key: connectionId, onDelete: removeConnection }));
    });
    if (futureConnection) {
        connectionPaths.push((0, react_1.createElement)(SingleConnectionView_1.SingleConnectionView, { ...props, connection: futureConnection.connection, connectionType: futureConnection.type, parentSelected: false, onSelectConnection: onSelectConnection, key: "future" }));
    }
    if (draggedSource) {
        const fn = draggedSource.from ? calc_pin_position_1.calcStartPos : calc_pin_position_1.calcTargetPos;
        const pos = fn({
            connectionNode: (_a = draggedSource.from) !== null && _a !== void 0 ? _a : draggedSource.to,
            viewPort,
            boardPos: props.boardPos,
            ancestorsInsIds: props.ancestorsInsIds,
            currentInsId: props.currentInsId,
        });
        connectionPaths.push((0, jsx_runtime_1.jsx)(ConnectionViewPath_1.ConnectionViewPath, { className: "dragged", from: pos, to: (0, __1.logicalPosToRenderedPos)(props.lastMousePos, viewPort), zoom: viewPort.zoom, dashed: true }, "dragged"));
    }
    return (0, jsx_runtime_1.jsx)("svg", { className: "connections-view", children: connectionPaths });
};
exports.ConnectionView = ConnectionView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2Nvbm5lY3Rpb24tdmlldy9Db25uZWN0aW9uVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFTL0IsNkJBQTJFO0FBQzNFLGdGQUE2RTtBQUM3RSxpRUFBOEQ7QUFDOUQsMkRBQWtFO0FBbUMzRCxNQUFNLGNBQWMsR0FBa0MsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7SUFDckUsTUFBTSxFQUNKLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLGdCQUFnQixHQUNqQixHQUFHLEtBQUssQ0FBQztJQUVWLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVELE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMxRCxPQUFPLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtZQUNoQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNuQixtQ0FBbUM7UUFDbkMsK0RBQStEO1FBQy9ELGtGQUFrRjtRQUNsRiw4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