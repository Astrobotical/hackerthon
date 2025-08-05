import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import * as React from "react";
import { getConnectionId, logicalPosToRenderedPos } from "../..";
import { ConnectionViewPath } from "./ConnectionViewPath/ConnectionViewPath";
import { SingleConnectionView } from "./SingleConnectionView";
import { calcStartPos, calcTargetPos } from "./calc-pin-position";
export const ConnectionView = (props) => {
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
        const connectionId = getConnectionId(conn);
        const parentSelected = selectedInstances.includes(conn.from.insId) ||
            selectedInstances.includes(conn.to.insId);
        return (_createElement(SingleConnectionView, { ...props, connection: conn, connectionType: "regular", parentSelected: parentSelected, onSelectConnection: onSelectConnection, isConnectionSelected: selectedConnections.includes(connectionId), key: connectionId, onDelete: removeConnection }));
    });
    if (futureConnection) {
        connectionPaths.push(_createElement(SingleConnectionView, { ...props, connection: futureConnection.connection, connectionType: futureConnection.type, parentSelected: false, onSelectConnection: onSelectConnection, key: "future" }));
    }
    if (draggedSource) {
        const fn = draggedSource.from ? calcStartPos : calcTargetPos;
        const pos = fn({
            connectionNode: (_a = draggedSource.from) !== null && _a !== void 0 ? _a : draggedSource.to,
            viewPort,
            boardPos: props.boardPos,
            ancestorsInsIds: props.ancestorsInsIds,
            currentInsId: props.currentInsId,
        });
        connectionPaths.push(_jsx(ConnectionViewPath, { className: "dragged", from: pos, to: logicalPosToRenderedPos(props.lastMousePos, viewPort), zoom: viewPort.zoom, dashed: true }, "dragged"));
    }
    return _jsx("svg", { className: "connections-view", children: connectionPaths });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2Nvbm5lY3Rpb24tdmlldy9Db25uZWN0aW9uVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQVMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFZLE1BQU0sT0FBTyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFtQ2xFLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBa0MsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7SUFDckUsTUFBTSxFQUNKLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLGdCQUFnQixHQUNqQixHQUFHLEtBQUssQ0FBQztJQUVWLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVELE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMxRCxPQUFPLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtZQUNoQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FB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