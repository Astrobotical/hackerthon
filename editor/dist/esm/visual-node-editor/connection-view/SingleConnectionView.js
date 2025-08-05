import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import classNames from "classnames";
import { isInternalConnectionNode } from "@flyde/core";
import { useSsr } from "usehooks-ts";
import { calcStartPos, calcTargetPos, unfoundPinPos, } from "./calc-pin-position";
import { vDiv } from "../../physics";
import { ConnectionViewPath } from "./ConnectionViewPath/ConnectionViewPath";
export const SingleConnectionView = (props) => {
    var _a;
    const { isBrowser } = useSsr();
    const { node, connection, instances, connectionType, viewPort, parentSelected, onSelectConnection, isConnectionSelected, onDelete, toggleHidden, selectedInstances, } = props;
    const [isHovered, setIsHovered] = React.useState(false);
    const { from, to } = connection;
    const fromInstance = isInternalConnectionNode(from) ?
        instances.find((i) => i.id === from.insId) :
        undefined;
    const toInstance = isInternalConnectionNode(to) && instances.find((i) => i.id === to.insId);
    const handleDelete = React.useCallback(() => {
        if (onDelete) {
            onDelete(connection);
        }
    }, [connection, onDelete]);
    const handleToggleHidden = React.useCallback(() => {
        toggleHidden(connection);
    }, [connection, toggleHidden]);
    if (!fromInstance && isInternalConnectionNode(from)) {
        console.warn(`Could not find instance ${from.insId} for connection`, from);
        return null;
    }
    const fromNode = (_a = fromInstance === null || fromInstance === void 0 ? void 0 : fromInstance.node) !== null && _a !== void 0 ? _a : node;
    const sourcePin = fromNode.outputs[from.pinId];
    const delayed = sourcePin && sourcePin.delayed;
    const startPos = isBrowser
        ? calcStartPos({ ...props, connectionNode: from })
        : { x: 0, y: 0 };
    const endPos = isBrowser
        ? calcTargetPos({ ...props, connectionNode: connection.to })
        : { x: 0, y: 0 };
    if (startPos.x === unfoundPinPos.x && startPos.y === unfoundPinPos.y) {
        console.warn(`Could not find pin ${from.pinId} on instance ${from.insId} for connection`, from);
        return null;
    }
    if (endPos.x === unfoundPinPos.x && endPos.y === unfoundPinPos.y) {
        console.warn(`Could not find pin ${to.pinId} on instance ${to.insId} for connection`, to);
        return null;
    }
    const { x: x1, y: y1 } = vDiv(startPos, props.parentVp.zoom);
    const { x: x2, y: y2 } = vDiv(endPos, props.parentVp.zoom);
    const isInstanceSelected = (fromInstance && selectedInstances.includes(fromInstance.id)) ||
        (toInstance && selectedInstances.includes(toInstance.id));
    const connectionClassName = classNames({
        delayed,
        hidden: connection.hidden && !isInstanceSelected,
        "parent-selected": parentSelected,
        selected: isConnectionSelected,
        "pending-selection": !isConnectionSelected && isHovered,
        added: connection.diffStatus === "added",
        removed: connection.diffStatus === "removed",
        changed: connection.diffStatus === "changed",
    }, connectionType);
    const handleConnectionPathClick = (e) => {
        onSelectConnection(connection, e);
    };
    return (_jsx(ConnectionViewPath, { className: connectionClassName, from: { x: x1, y: y1 }, to: { x: x2, y: y2 }, dashed: connectionType !== "regular" ||
            (connection.hidden && isInstanceSelected), zoom: viewPort.zoom, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onClick: handleConnectionPathClick, onDelete: handleDelete, onToggleHidden: handleToggleHidden }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlQ29ubmVjdGlvblZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2Nvbm5lY3Rpb24tdmlldy9TaW5nbGVDb25uZWN0aW9uVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsd0JBQXdCLEVBQWtCLE1BQU0sYUFBYSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUNMLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxHQUNkLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQWtCN0UsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQXdDLENBQ3ZFLEtBQUssRUFDTCxFQUFFOztJQUNGLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUUvQixNQUFNLEVBQ0osSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsY0FBYyxFQUNkLFFBQVEsRUFDUixjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixRQUFRLEVBQ1IsWUFBWSxFQUNaLGlCQUFpQixHQUNsQixHQUFHLEtBQUssQ0FBQztJQUVWLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV4RCxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQztJQUVoQyxNQUFNLFlBQVksR0FDaEIsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENB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