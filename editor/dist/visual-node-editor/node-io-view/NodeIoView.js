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
exports.NodeIoView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const core_1 = require("@flyde/core");
const base_node_view_1 = require("../base-node-view");
const classnames_1 = __importDefault(require("classnames"));
const ports_1 = require("../../flow-editor/ports");
const helpers_1 = require("../pin-view/helpers");
const DarkModeContext_1 = require("../../flow-editor/DarkModeContext");
const PinView_1 = require("../pin-view/PinView");
const dom_ids_1 = require("../dom-ids");
const ui_1 = require("../../ui");
exports.NodeIoView = React.memo(function NodeIoViewInner(props) {
    const { viewPort, selected, type, id, onDblClick, onRename, onDelete, onChangeInputMode, inputMode, onSelect, closest, onSetDescription, description, onMouseUp, onMouseDown, currentInsId, onDragStart, onDragEnd, pos, } = props;
    const lastDragEndTimeRef = React.useRef(0);
    const _onDragStart = React.useCallback((event, data) => {
        onDragStart(id, event, data);
    }, [id, onDragStart]);
    const _onDragEnd = React.useCallback((event, data) => {
        const currPos = pos;
        const dx = (data.x - currPos.x) / viewPort.zoom;
        const dy = (data.y - currPos.y) / viewPort.zoom;
        const newX = currPos.x + dx;
        const newY = currPos.y + dy;
        const pixelsMoved = Math.abs(dx) + Math.abs(dy);
        onDragEnd(type, id, event, { ...data, x: newX, y: newY });
        if (pixelsMoved > 0) {
            lastDragEndTimeRef.current = Date.now();
        }
    }, [pos, viewPort.zoom, onDragEnd, type, id]);
    const onDragMove = (event, data) => {
        props.onDragMove(type, id, event, { x: data.x, y: data.y });
    };
    const _prompt = (0, ports_1.usePrompt)();
    const _onSetDescription = React.useCallback(async () => {
        const newDescription = await _prompt("Description?", description);
        onSetDescription(type, id, newDescription !== null && newDescription !== void 0 ? newDescription : "");
    }, [_prompt, description, onSetDescription, type, id]);
    const onDeleteInner = React.useCallback(() => {
        if (onDelete) {
            onDelete(type, id);
        }
    }, [type, id, onDelete]);
    const onRenameInner = React.useCallback(() => {
        if (onRename) {
            onRename(type, id);
        }
    }, [type, id, onRename]);
    const onChangeInputModeInner = React.useCallback((mode) => {
        if (onChangeInputMode) {
            onChangeInputMode(id, mode);
        }
    }, [id, onChangeInputMode]);
    const contextMenuItems = React.useCallback(() => {
        return [
            (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuItem, { disabled: true, children: ["Current mode - ", inputMode] }, "mode"),
            (0, jsx_runtime_1.jsx)(ui_1.ContextMenuSeparator, {}, "sep1"),
            (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: () => onChangeInputModeInner("required"), children: "Make required" }, "required"),
            (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: () => onChangeInputModeInner("optional"), children: "Make optional" }, "optional"),
            (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: () => onChangeInputModeInner("required-if-connected"), children: "Make required-if-connected" }, "required-if-connected"),
            (0, jsx_runtime_1.jsx)(ui_1.ContextMenuSeparator, {}, "sep2"),
            (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: _onSetDescription, children: "Set description" }, "description"),
            ...(props.onRename
                ? [
                    (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: onRenameInner, children: "Rename" }, "rename"),
                ]
                : []),
            ...(props.onDelete
                ? [
                    (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { className: "text-red-500", onClick: onDeleteInner, children: "Delete" }, "delete"),
                ]
                : []),
        ];
    }, [
        _onSetDescription,
        inputMode,
        onChangeInputModeInner,
        onDeleteInner,
        onRenameInner,
        props.onDelete,
        props.onRename,
    ]);
    const getContextMenu = React.useCallback(() => {
        return (0, jsx_runtime_1.jsx)(ui_1.ContextMenuContent, { children: contextMenuItems() });
    }, [contextMenuItems]);
    const onDblClickInner = React.useCallback((e) => {
        if (onDblClick) {
            onDblClick(props.id, e);
        }
    }, [onDblClick, props.id]);
    const _onClick = React.useCallback((e) => {
        if (Date.now() - lastDragEndTimeRef.current > 200) {
            onSelect(id, type, e);
        }
    }, [id, type, onSelect]);
    const displayName = type === "input" ? (0, helpers_1.getInputName)(id) : (0, helpers_1.getOutputName)(id);
    const _onMouseUp = React.useCallback((e) => {
        const reversedType = type === "input" ? "output" : "input";
        onMouseUp(id, reversedType, e);
    }, [id, onMouseUp, type]);
    const _onMouseDown = React.useCallback((e) => {
        const reversedType = type === "input" ? "output" : "input";
        onMouseDown(id, reversedType, e);
    }, [id, onMouseDown, type]);
    const dark = (0, DarkModeContext_1.useDarkMode)();
    const pinContent = ((0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)("pin-container", type), children: type === "input" ? ((0, jsx_runtime_1.jsx)(PinView_1.PinView, { type: "output", currentInsId: currentInsId, ancestorsInsIds: props.ancestorInsIds, id: id, connected: props.connected, isClosestToMouse: closest, selected: selected, onClick: (pinId, pinType, e) => onSelect(pinId, pinType, e), onDoubleClick: (pinId, e) => onDblClick && onDblClick(pinId, e), onToggleLogged: core_1.noop, onToggleBreakpoint: core_1.noop, onInspect: core_1.noop, description: description, increasedDropArea: props.increasedDropArea, onMouseUp: (pinId, pinType, e) => {
                e.stopPropagation();
                _onMouseUp(e);
            }, onMouseDown: (pinId, pinType, e) => {
                e.stopPropagation();
                _onMouseDown(e);
            }, isMain: true })) : ((0, jsx_runtime_1.jsx)(PinView_1.PinView, { type: "input", currentInsId: currentInsId, ancestorsInsIds: props.ancestorInsIds, id: id, connected: props.connected, isClosestToMouse: closest, selected: selected, onClick: (pinId, pinType) => onSelect(pinId, pinType), onDoubleClick: (pinId, e) => onDblClick && onDblClick(pinId, e), onToggleLogged: core_1.noop, onToggleBreakpoint: core_1.noop, onInspect: core_1.noop, description: description, increasedDropArea: props.increasedDropArea, onMouseUp: (pinId, pinType, e) => {
                e.stopPropagation();
                _onMouseUp(e);
            }, onMouseDown: (pinId, pinType, e) => {
                e.stopPropagation();
                _onMouseDown(e);
            }, onToggleSticky: core_1.noop, isSticky: false, queuedValues: 0, isMain: true })) }));
    const domId = (0, dom_ids_1.getMainPinDomId)(currentInsId, id, type);
    return ((0, jsx_runtime_1.jsx)(base_node_view_1.BaseNodeView, { className: (0, classnames_1.default)(`node-io-view`, type, { dark }), pos: pos, icon: "arrow-right-long", description: description !== null && description !== void 0 ? description : `Main ${type} pin - ${id}`, onDragEnd: _onDragEnd, onDragStart: _onDragStart, onDragMove: onDragMove, viewPort: viewPort, heading: displayName, leftSide: type === "output" ? pinContent : undefined, rightSide: type === "input" ? pinContent : undefined, contextMenuContent: getContextMenu(), onClick: _onClick, onDoubleClick: onDblClickInner, selected: selected, dark: dark, domId: domId }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZUlvVmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3Ivbm9kZS1pby12aWV3L05vZGVJb1ZpZXcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0Isc0NBQTREO0FBQzVELHNEQUFpRDtBQUNqRCw0REFBb0M7QUFDcEMsbURBQW9EO0FBQ3BELGlEQUFrRTtBQUNsRSx1RUFBZ0U7QUFDaEUsaURBQThDO0FBQzlDLHdDQUE2QztBQUU3QyxpQ0FJa0I7QUFpQ0wsUUFBQSxVQUFVLEdBQThCLEtBQUssQ0FBQyxJQUFJLENBQzdELFNBQVMsZUFBZSxDQUFDLEtBQUs7SUFDNUIsTUFBTSxFQUNKLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxFQUNKLEVBQUUsRUFDRixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsRUFDUixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFFBQVEsRUFDUixPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFlBQVksRUFDWixXQUFXLEVBQ1gsU0FBUyxFQUNULEdBQUcsR0FDSixHQUFHLEtBQUssQ0FBQztJQUVWLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUVuRCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUNwQyxDQUFDLEtBQVUsRUFBRSxJQUFTLEVBQUUsRUFBRTtRQUN4QixXQUFXLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDLEVBQ0QsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQ2xCLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUNsQyxDQUFDLEtBQVUsRUFBRSxJQUFT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