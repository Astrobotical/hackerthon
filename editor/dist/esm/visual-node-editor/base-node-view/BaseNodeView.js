import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import classNames from "classnames";
import Draggable from "react-draggable";
import { useDarkMode } from "../../flow-editor/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextMenu, ContextMenuTrigger } from "../../ui";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../ui";
export const BaseNodeIcon = function BaseNodeIcon({ icon }) {
    if (!icon) {
        return _jsx(FontAwesomeIcon, { icon: "code", size: "lg" });
    }
    if (typeof icon === "string" && icon.trim().startsWith("<")) {
        return (_jsx("span", { className: "svg-icon-container flex flex-row items-center justify-center", dangerouslySetInnerHTML: { __html: icon } }));
    }
    else {
        const iconValue = Array.isArray(icon) ? icon[0] : icon;
        if (!iconValue) {
            return _jsx(FontAwesomeIcon, { icon: "code", size: "lg" });
        }
        return _jsx(FontAwesomeIcon, { icon: iconValue, size: "lg" });
    }
};
const HOVER_DELAY = 400;
export const BaseNodeView = function BaseNodeViewInner(props) {
    const { dragged, viewPort, pos, onDragEnd, onDragMove, onDragStart, displayMode, heading, description, icon, leftSide, rightSide, contextMenuContent, selected, onClick, onDoubleClick, overrideNodeBodyHtml, size = "normal", diffStatus, } = props;
    const dark = useDarkMode();
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
    const cm = classNames("base-node-view", props.className, {
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
    const outerCm = classNames("base-node-view-vp-fixer", {
        "display-mode": displayMode,
    });
    const innerCm = classNames("base-node-view-inner", {
        selected,
        dark,
        "no-left-side": !leftSide && !overrideNodeBodyHtml,
        "no-right-side": !rightSide && !overrideNodeBodyHtml,
        "size-wide": size === "wide",
        "bg-green-100/80 border-green-500/30": diffStatus === "added",
        "bg-red-100/80 border-red-500/30": diffStatus === "removed",
        "bg-blue-100/80 border-blue-500/30": diffStatus === "changed",
    });
    const headerCm = classNames("node-header", {
        dark,
        "bg-green-200/80 text-green-900": diffStatus === "added",
        "bg-red-200/80 text-red-900": diffStatus === "removed",
        "bg-blue-200/80 text-blue-900": diffStatus === "changed",
    });
    const bodyCm = classNames("node-body", {
        dark,
        "bg-green-100/80": diffStatus === "added",
        "bg-red-100/80": diffStatus === "removed",
        "bg-blue-100/80": diffStatus === "changed",
    });
    const innerContent = overrideNodeBodyHtml ? (_jsx("div", { className: "node-overridden-body", dangerouslySetInnerHTML: { __html: overrideNodeBodyHtml }, style: props.overrideStyle })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "left-side", children: leftSide }), _jsx("div", { className: classNames("icon-container", { dark }), children: _jsx(BaseNodeIcon, { icon: icon }) }), _jsx("div", { className: "right-side", children: rightSide })] }));
    const content = (_jsxs("div", { className: innerCm, children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { delayDuration: HOVER_DELAY, children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("div", { className: headerCm, children: heading }) }), description && (_jsx(TooltipContent, { side: "top", children: description }))] }) }), _jsx("div", { className: bodyCm, children: innerContent })] }));
    const dragNodeRef = React.useRef(null);
    const draggableContent = (_jsx("span", { className: "base-node-view-wrapper", ref: dragNodeRef, children: _jsx("div", { className: cm, style: zoomFixStyle, id: props.domId, children: _jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { onClick: onClick, onDoubleClick: onDoubleClick, className: classNames({ dark }), children: content }), contextMenuContent] }) }) }));
    return (_jsx("div", { className: outerCm, style: fixerStyle, children: _jsx(Draggable, { onStop: _onDragEnd, onStart: _onDragStart, onDrag: _onDragMove, position: pos, cancel: ".no-drag", nodeRef: dragNodeRef, children: draggableContent }) }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU5vZGVWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9iYXNlLW5vZGUtdmlldy9CYXNlTm9kZVZpZXcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzREFBc0Q7QUFDdEQsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFakUsT0FBTyxFQUFFLFdBQVcsRUFBc0Isa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFL0UsT0FBTyxFQUNMLE9BQU8sRUFDUCxjQUFjLEVBQ2QsZUFBZSxFQUNmLGNBQWMsR0FDZixNQUFNLFVBQVUsQ0FBQztBQXdDbEIsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUN2QixTQUFTLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRTtJQUM1QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPLEtBQUMsZUFBZSxJQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLElBQUksR0FBRyxDQUFDO0lBQ25ELENBQUM7SUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDNUQsT0FBTyxDQUNMLGVBQ0UsU0FBUyxFQUFDLDhEQUE4RCxFQUN4RSx1QkFBdUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FDekMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDTixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxD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