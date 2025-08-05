import { DebuggerEvent, PinType, RemoteDebuggerCallback, RemoteDebuggerCancelFn, HistoryPayload } from "@flyde/core";
export type GetPinHistoryDto = {
    id?: string;
};
export type GetHistoryDto = {
    pinId?: string;
    type?: PinType;
    insId: string;
    limit?: number;
    executionId: string;
};
export type EditorDebuggerClient = {
    emitChange: (data: {}) => void;
    emitBreakpointsChange: (insIdsAndPins: string[]) => void;
    onBatchedEvents: (cb: RemoteDebuggerCallback<DebuggerEvent[]>) => RemoteDebuggerCancelFn;
    onRuntimeReady: (cb: RemoteDebuggerCallback<void>) => RemoteDebuggerCancelFn;
    interceptInput: (value: DebuggerEvent) => void;
    interceptOutput: (value: DebuggerEvent) => void;
    onChangeAwk: (cb: RemoteDebuggerCallback<{
        hash: string;
    }>) => RemoteDebuggerCancelFn;
    onChangeError: (cb: (error: any) => void) => RemoteDebuggerCancelFn;
    onIsAlive: (cb: RemoteDebuggerCallback<{
        time: number;
    }>) => RemoteDebuggerCancelFn;
    emitInputValue: (pinId: string, value: any) => void;
    destroy: () => void;
    onDisconnect: (cb: () => void) => void;
    debugInfo(): string;
    requestState: () => Promise<any>;
    getHistory: (dto: GetHistoryDto) => Promise<HistoryPayload>;
    clearHistory: () => Promise<void>;
    triggerNode: (nodeId: string, inputs: Record<string, any>) => void;
};
export declare const createEditorClient: (url: string, executionId: string) => EditorDebuggerClient;
//# sourceMappingURL=editor-client.d.ts.map