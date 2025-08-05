import * as React from "react";
import { OMap, NodeStyle, CodeNodeDefinition, EditorNodeInstance } from "@flyde/core";
import { DiffStatus } from "../VisualNodeDiffView";
import { ConnectionData, Pos } from "@flyde/core";
import { NodeInstance, PinType } from "@flyde/core";
import { ClosestPinData, VisualNodeEditorProps } from "../VisualNodeEditor";
import { VisualNodeEditorContextType } from "../VisualNodeEditorContext";
export declare const PIECE_HORIZONTAL_PADDING = 25;
export declare const PIECE_CHAR_WIDTH = 11;
export declare const MIN_WIDTH_PER_PIN = 40;
export declare const MAX_INSTANCE_WIDTH = 400;
export declare const getVisibleInputs: (instance: NodeInstance, node: CodeNodeDefinition, connections: ConnectionData[]) => string[];
export declare const getVisibleOutputs: (instance: NodeInstance, node: CodeNodeDefinition, connections: ConnectionData[]) => string[];
export interface InstanceViewProps {
    instance: EditorNodeInstance;
    selected?: boolean;
    dragged?: boolean;
    selectedInput?: string;
    selectedOutput?: string;
    connectionsPerInput: OMap<NodeInstance[]>;
    closestPin?: ClosestPinData;
    connections: ConnectionData[];
    viewPort: {
        pos: Pos;
        zoom: number;
    };
    diffStatus?: DiffStatus;
    queuedInputsData: Record<string, number>;
    ancestorsInsIds?: string;
    onPinClick: (v: NodeInstance, k: string, type: PinType) => void;
    onPinDblClick: (v: NodeInstance, k: string, type: PinType, e: React.MouseEvent) => void;
    onDragEnd: (ins: EditorNodeInstance, ...data: any[]) => void;
    onDragStart: (ins: EditorNodeInstance, ...data: any[]) => void;
    onDragMove: (ins: EditorNodeInstance, ev: React.MouseEvent, pos: Pos) => void;
    onSelect: (ins: EditorNodeInstance, ev: React.MouseEvent) => void;
    onDblClick: (ins: EditorNodeInstance, shiftKey: boolean) => void;
    onToggleSticky: (ins: EditorNodeInstance, pinId: string) => void;
    onTogglePinLog: (insId: string, pinId: string, type: PinType) => void;
    onTogglePinBreakpoint: (insId: string, pinId: string, type: PinType) => void;
    onInspectPin: (insId: string, pin: {
        id: string;
        type: PinType;
    }) => void;
    onUngroup: (ins: EditorNodeInstance) => void;
    onChangeVisibleInputs: (ins: EditorNodeInstance, inputs: string[]) => void;
    onChangeVisibleOutputs: (ins: EditorNodeInstance, outputs: string[]) => void;
    onDeleteInstance: (ins: EditorNodeInstance) => void;
    onSetDisplayName: (ins: EditorNodeInstance, displayName: string) => void;
    onViewForkCode: (ins: EditorNodeInstance) => void;
    displayMode?: true;
    forceShowMinimized?: PinType | "both";
    isConnectedInstanceSelected: boolean;
    increasedPinDropArea?: boolean;
    inlineGroupProps?: VisualNodeEditorProps & VisualNodeEditorContextType;
    onCloseInlineEditor: () => void;
    inlineEditorPortalDomNode: HTMLElement | null;
    onChangeStyle: (instance: EditorNodeInstance, style: NodeStyle) => void;
    onGroupSelected: () => void;
    onPinMouseDown: (ins: EditorNodeInstance, pinId: string, type: PinType) => void;
    onPinMouseUp: (ins: EditorNodeInstance, pinId: string, type: PinType) => void;
    hadError: boolean;
}
export declare const InstanceView: React.FC<InstanceViewProps>;
export declare const InstanceIcon: React.FC<{
    icon?: string;
    className?: string;
}>;
//# sourceMappingURL=InstanceView.d.ts.map