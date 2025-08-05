import { PinType, HistoryPayload } from "@flyde/core";
import { EditorDebuggerClient } from "../debugger";
export interface DebuggerContextData {
    onRequestHistory: (insId: string, pinId: string, type: PinType) => Promise<HistoryPayload>;
    debuggerClient?: Pick<EditorDebuggerClient, "onBatchedEvents">;
}
export declare const DebuggerContextProvider: import("react").Provider<DebuggerContextData>;
export declare const useDebuggerContext: () => DebuggerContextData;
//# sourceMappingURL=DebuggerContext.d.ts.map