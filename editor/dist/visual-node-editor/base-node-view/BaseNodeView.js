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
exports.BaseNodeView = exports.BaseNodeIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable @typescript-eslint/no-unused-vars */
const React = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const react_draggable_1 = __importDefault(require("react-draggable"));
const DarkModeContext_1 = require("../../flow-editor/DarkModeContext");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const BaseNodeIcon = function BaseNodeIcon({ icon }) {
    if (!icon) {
        return (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: "code", size: "lg" });
    }
    if (typeof icon === "string" && icon.trim().startsWith("<")) {
        return ((0, jsx_runtime_1.jsx)("span", { className: "svg-icon-container flex flex-row items-center justify-center", dangerouslySetInnerHTML: { __html: icon } }));
    }
    else {
        const iconValue = Array.isArray(icon) ? icon[0] : icon;
        if (!iconValue) {
            return (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: "code", size: "lg" });
        }
        return (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: iconValue, size: "lg" });
    }
};
exports.BaseNodeIcon = BaseNodeIcon;
const HOVER_DELAY = 400;
const BaseNodeView = function BaseNodeViewInner(props) {
    const { dragged, viewPort, pos, onDragEnd, onDragMove, onDragStart, displayMode, heading, description, icon, leftSide, rightSide, contextMenuContent, selected, onClick, onDoubleClick, overrideNodeBodyHtml, size = "normal", diffStatus, } = props;
    const dark = (0, DarkModeContext_1.useDarkMode)();
    const _onDragStart = React.useCallback((event, data) => {
        onDragStart(event, data);
    }, [onDragStart]);
    const _onDragEnd = React.useCallback((event, data) => {
        const currPos = pos;
        const dx = (data.x - currPos.x) / viewPort.zoom;
        const dy = (data.y - currPos.y) / viewPort.zoom;
        const newX = currPos.x + dx;
        const newY = currPos.y + dy;
        onDragEnd(event, { ...data, x: newX, y: newY });
    }, [pos, onDragEnd, viewPort]);
    const _onDragMove = React.useCallback((event, { x, y }) => {
        onDragMove(event, { x, y });
    }, [onDragMove]);
    const zoomFixStyle = {
        transform: `scale(${viewPort.zoom})`,
    };
    const cm = (0, classnames_1.default)("base-node-view", props.className, {
        dragged,
        dark,
        "display-mode": displayMode,
        "bg-green-50/50 dark:bg-green-900/20": diffStatus === "added",
        "bg-red-50/50 dark:bg-red-900/20": diffStatus === "removed",
        "bg-blue-50/50 dark:bg-blue-900/20": diffStatus === "changed",
    });
    const correctX = pos.x * viewPort.zoom - viewPort.pos.x * viewPort.zoom;
    const correctY = pos.y * viewPort.zoom - viewPort.pos.y * viewPort.zoom;
    const dx = correctX - pos.x;
    const dy = correctY - pos.y;
    const fixerStyle = {
        transform: `translate(${dx}px, ${dy}px)`,
    };
    const outerCm = (0, classnames_1.default)("base-node-view-vp-fixer", {
        "display-mode": displayMode,
    });
    const innerCm = (0, classnames_1.default)("base-node-view-inner", {
        selected,
        dark,
        "no-left-side": !leftSide && !overrideNodeBodyHtml,
        "no-right-side": !rightSide && !overrideNodeBodyHtml,
        "size-wide": size === "wide",
        "bg-green-100/80 border-green-500/30": diffStatus === "added",
        "bg-red-100/80 border-red-500/30": diffStatus === "removed",
        "bg-blue-100/80 border-blue-500/30": diffStatus === "changed",
    });
    const headerCm = (0, classnames_1.default)("node-header", {
        dark,
        "bg-green-200/80 text-green-900": diffStatus === "added",
        "bg-red-200/80 text-red-900": diffStatus === "removed",
        "bg-blue-200/80 text-blue-900": diffStatus === "changed",
    });
    const bodyCm = (0, classnames_1.default)("node-body", {
        dark,
        "bg-green-100/80": diffStatus === "added",
        "bg-red-100/80": diffStatus === "removed",
        "bg-blue-100/80": diffStatus === "changed",
    });
    const innerContent = overrideNodeBodyHtml ? ((0, jsx_runtime_1.jsx)("div", { className: "node-overridden-body", dangerouslySetInnerHTML: { __html: overrideNodeBodyHtml }, style: props.overrideStyle })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "left-side", children: leftSide }), (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)("icon-container", { dark }), children: (0, jsx_runtime_1.jsx)(exports.BaseNodeIcon, { icon: icon }) }), (0, jsx_runtime_1.jsx)("div", { className: "right-side", children: rightSide })] }));
    const content = ((0, jsx_runtime_1.jsxs)("div", { className: innerCm, children: [(0, jsx_runtime_1.jsx)(ui_2.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(ui_2.Tooltip, { delayDuration: HOVER_DELAY, children: [(0, jsx_runtime_1.jsx)(ui_2.TooltipTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)("div", { className: headerCm, children: heading }) }), description && ((0, jsx_runtime_1.jsx)(ui_2.TooltipContent, { side: "top", children: description }))] }) }), (0, jsx_runtime_1.jsx)("div", { className: bodyCm, children: innerContent })] }));
    const dragNodeRef = React.useRef(null);
    const draggableContent = ((0, jsx_runtime_1.jsx)("span", { className: "base-node-view-wrapper", ref: dragNodeRef, children: (0, jsx_runtime_1.jsx)("div", { className: cm, style: zoomFixStyle, id: props.domId, children: (0, jsx_runtime_1.jsxs)(ui_1.ContextMenu, { children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuTrigger, { onClick: onClick, onDoubleClick: onDoubleClick, className: (0, classnames_1.default)({ dark }), children: content }), contextMenuContent] }) }) }));
    return ((0, jsx_runtime_1.jsx)("div", { className: outerCm, style: fixerStyle, children: (0, jsx_runtime_1.jsx)(react_draggable_1.default, { onStop: _onDragEnd, onStart: _onDragStart, onDrag: _onDragMove, position: pos, cancel: ".no-drag", nodeRef: dragNodeRef, children: draggableContent }) }));
};
exports.BaseNodeView = BaseNodeView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU5vZGVWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9iYXNlLW5vZGUtdmlldy9CYXNlTm9kZVZpZXcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBc0Q7QUFDdEQsNkNBQStCO0FBQy9CLDREQUFvQztBQUNwQyxzRUFBd0M7QUFFeEMsdUVBQWdFO0FBQ2hFLHNFQUFpRTtBQUVqRSxpQ0FBK0U7QUFFL0UsaUNBS2tCO0FBd0NYLE1BQU0sWUFBWSxHQUN2QixTQUFTLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRTtJQUM1QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPLHVCQUFDLG1DQUFlLElBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsSUFBSSxHQUFHLENBQUM7SUFDbkQsQ0FBQztJQUNELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUM1RCxPQUFPLENBQ0wsaUNBQ0UsU0FBUyxFQUFDLDhEQUE4RCxFQUN4RSx1QkFBdUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FDekMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDTixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixPQUFPLHVCQUFDLG1DQUFlLElBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsSUFBSSxHQUFHLENBQUM7UUFDbkQsQ0FBQztRQUNE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