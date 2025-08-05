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
exports.SingleConnectionView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const core_1 = require("@flyde/core");
const usehooks_ts_1 = require("usehooks-ts");
const calc_pin_position_1 = require("./calc-pin-position");
const physics_1 = require("../../physics");
const ConnectionViewPath_1 = require("./ConnectionViewPath/ConnectionViewPath");
const SingleConnectionView = (props) => {
    var _a;
    const { isBrowser } = (0, usehooks_ts_1.useSsr)();
    const { node, connection, instances, connectionType, viewPort, parentSelected, onSelectConnection, isConnectionSelected, onDelete, toggleHidden, selectedInstances, } = props;
    const [isHovered, setIsHovered] = React.useState(false);
    const { from, to } = connection;
    const fromInstance = (0, core_1.isInternalConnectionNode)(from) ?
        instances.find((i) => i.id === from.insId) :
        undefined;
    const toInstance = (0, core_1.isInternalConnectionNode)(to) && instances.find((i) => i.id === to.insId);
    const handleDelete = React.useCallback(() => {
        if (onDelete) {
            onDelete(connection);
        }
    }, [connection, onDelete]);
    const handleToggleHidden = React.useCallback(() => {
        toggleHidden(connection);
    }, [connection, toggleHidden]);
    if (!fromInstance && (0, core_1.isInternalConnectionNode)(from)) {
        console.warn(`Could not find instance ${from.insId} for connection`, from);
        return null;
    }
    const fromNode = (_a = fromInstance === null || fromInstance === void 0 ? void 0 : fromInstance.node) !== null && _a !== void 0 ? _a : node;
    const sourcePin = fromNode.outputs[from.pinId];
    const delayed = sourcePin && sourcePin.delayed;
    const startPos = isBrowser
        ? (0, calc_pin_position_1.calcStartPos)({ ...props, connectionNode: from })
        : { x: 0, y: 0 };
    const endPos = isBrowser
        ? (0, calc_pin_position_1.calcTargetPos)({ ...props, connectionNode: connection.to })
        : { x: 0, y: 0 };
    if (startPos.x === calc_pin_position_1.unfoundPinPos.x && startPos.y === calc_pin_position_1.unfoundPinPos.y) {
        console.warn(`Could not find pin ${from.pinId} on instance ${from.insId} for connection`, from);
        return null;
    }
    if (endPos.x === calc_pin_position_1.unfoundPinPos.x && endPos.y === calc_pin_position_1.unfoundPinPos.y) {
        console.warn(`Could not find pin ${to.pinId} on instance ${to.insId} for connection`, to);
        return null;
    }
    const { x: x1, y: y1 } = (0, physics_1.vDiv)(startPos, props.parentVp.zoom);
    const { x: x2, y: y2 } = (0, physics_1.vDiv)(endPos, props.parentVp.zoom);
    const isInstanceSelected = (fromInstance && selectedInstances.includes(fromInstance.id)) ||
        (toInstance && selectedInstances.includes(toInstance.id));
    const connectionClassName = (0, classnames_1.default)({
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
    return ((0, jsx_runtime_1.jsx)(ConnectionViewPath_1.ConnectionViewPath, { className: connectionClassName, from: { x: x1, y: y1 }, to: { x: x2, y: y2 }, dashed: connectionType !== "regular" ||
            (connection.hidden && isInstanceSelected), zoom: viewPort.zoom, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onClick: handleConnectionPathClick, onDelete: handleDelete, onToggleHidden: handleToggleHidden }));
};
exports.SingleConnectionView = SingleConnectionView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlQ29ubmVjdGlvblZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2Nvbm5lY3Rpb24tdmlldy9TaW5nbGVDb25uZWN0aW9uVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQjtBQUMvQiw0REFBb0M7QUFDcEMsc0NBQXVFO0FBQ3ZFLDZDQUFxQztBQUNyQywyREFJNkI7QUFDN0IsMkNBQXFDO0FBQ3JDLGdGQUE2RTtBQWtCdEUsTUFBTSxvQkFBb0IsR0FBd0MsQ0FDdkUsS0FBSyxFQUNMLEVBQUU7O0lBQ0YsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUEsb0JBQU0sR0FBRSxDQUFDO0lBRS9CLE1BQU0sRUFDSixJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxjQUFjLEVBQ2QsUUFBUSxFQUNSLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLFFBQVEsRUFDUixZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLEdBQUcsS0FBSyxDQUFDO0lBRVYsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXhELE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBRWhDLE1BQU0sWUFBWSxHQUNoQixJQUFBLCtCQUF3QixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM1QyxTQUFTLENBQUM7SUFFWixNQUFNLFVBQVUsR0FDZCxJQUFBLCtCQUF3QixFQUFDLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNFLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQzFDLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRTNCLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDaEQsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNCLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBRS9CLElBQUksQ0FBQyxZQUFZLElBQUksSUFBQSwrQkFBd0IsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLElBQUksQ0FBQyxLQUFLLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNFLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sUUFBUSxHQUFHLE1BQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLElBQUksbUNBQUksSUFBSSxDQUFDO0lBRTVDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLE1BQU0sT0FBTyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDO0lBRS9DLE1BQU0sUUFBUSxHQUFHLFNBQVM7UUFDeEIsQ0FBQyxDQUFDLElBQUEsZ0NBQVksRUFBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNsRCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNuQixNQUFNLE1BQU0sR0FBRyxTQUFTO1FBQ3RCLENBQUMsQ0FBQyxJQUFBLGlDQUFhLEVBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzVELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBRW5CLElBQUksUUFBUSxDQUFDLENBQUMsS0FBSyxpQ0FBYSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxLQUFLLGlDQUFhLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDckUsT0FBTyxDQUFDLElBQUksQ0FDVixzQkFBc0IsSUFBSSxDQUFDLEtBQUssZ0JBQWdCLElBQUksQ0FBQyxLQUFLLGlCQUFpQixFQUMzRSxJQUFJLENBQ0wsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLENBQUMsS0FBSyxpQ0FBYSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxLQUFLLGlDQUFhLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakUsT0FBTyxDQUFDLElBQUksQ0FDVixzQkFBc0IsRUFBRSxDQUFDLEtBQUssZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLGlCQUFpQixFQUN2RSxFQUFFLENBQ0gsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFBLGNBQUksRUFBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBQSxjQUFJLEVBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0QsTUFBTSxrQkFBa0IsR0FDdEIsQ0FBQyxZQUFZLElBQUksaUJBQWlCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RCxDQUFDLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFNUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLG9CQUFVLEVBQ3BDO1FBQ0UsT0FBTztRQUNQLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCO1FBQ2hELGlCQUFpQixFQUFFLGNBQWM7UUFDakMsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixtQkFBbUIsRUFBRSxDQUFDLG9CQUFvQixJQUFJLFNBQVM7UUFDdkQsS0FBSyxFQUFHLFVBQWtCLENBQUMsVUFBVSxLQUFLLE9BQU87UUFDakQsT0FBTyxFQUFHLFVBQWtCLENBQUMsVUFBVSxLQUFLLFNBQVM7UUFDckQsT0FBTyxFQUFHLFVBQWtCLENBQUMsVUFBVSxLQUFLLFNBQVM7S0FDdEQsRUFDRCxjQUFjLENBQ2YsQ0FBQztJQUVGLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxDQUFtQixFQUFFLEVBQUU7UUFDeEQsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLE9BQU8sQ0FDTCx1QkFBQyx1Q0FBa0IsSUFDakIsU0FBUyxFQUFFLG1CQUFtQixFQUM5QixJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFDdEIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQ3BCLE1BQU0sRUFDSixjQUFjLEtBQUssU0FBUztZQUM1QixDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsRUFFM0MsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQ25CLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQ3RDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQ3ZDLE9BQU8sRUFBRSx5QkFBeUIsRUFDbEMsUUFBUSxFQUFFLFlBQVksRUFDdEIsY0FBYyxFQUFFLGtCQUFrQixHQUNsQyxDQUNILENBQUM7QUFDSixDQUFDLENBQUM7QUFwSFcsUUFBQSxvQkFBb0Isd0JBb0gvQiJ9