import * as React from "react";
import { PinType } from "@flyde/core";
export type InputPinViewProps = {
    type: "input";
    onToggleSticky: (id: string) => void;
    isSticky: boolean;
    queueSize?: number;
    queuedValues: number;
};
export type OutputPinViewProps = {
    type: "output";
};
export type PinViewProps = {
    optional?: boolean;
    id: string;
    currentInsId: string;
    ancestorsInsIds?: string;
    selected: boolean;
    connected: boolean;
    increasedDropArea?: boolean;
    onDoubleClick?: (id: string, e: React.MouseEvent) => void;
    onShiftClick?: (id: string, e: React.MouseEvent) => void;
    onClick: (id: string, type: PinType, e: React.MouseEvent) => void;
    isClosestToMouse: boolean;
    description?: string;
    onToggleLogged: (insId: string, pinId: string, type: PinType) => void;
    onToggleBreakpoint: (insId: string, pinId: string, type: PinType) => void;
    onInspect: (insId: string, pin: {
        id: string;
        type: PinType;
    }) => void;
    onMouseUp: (id: string, type: PinType, e: React.MouseEvent) => void;
    onMouseDown: (id: string, type: PinType, e: React.MouseEvent) => void;
    isMain: boolean;
} & (InputPinViewProps | OutputPinViewProps);
export interface OptionalPinViewProps {
    options: string[];
    onSelect: (k: string) => void;
}
export declare const PinView: React.FC<PinViewProps>;
//# sourceMappingURL=PinView.d.ts.map