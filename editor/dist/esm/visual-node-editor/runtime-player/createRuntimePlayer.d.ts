import { DebuggerEvent } from "@flyde/core";
export interface RuntimePlayer {
    addEvents: (events: Array<DebuggerEvent>) => void;
    start: (dt?: number) => void;
    stop: () => void;
    destroy: () => void;
    clear: () => void;
    status: () => void;
}
export declare const createRuntimePlayer: () => RuntimePlayer;
//# sourceMappingURL=createRuntimePlayer.d.ts.map