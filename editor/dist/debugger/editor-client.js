"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEditorClient = void 0;
const core_1 = require("@flyde/core");
const axios_1 = __importDefault(require("axios"));
const socket_io_client_1 = require("socket.io-client");
const debug = (0, core_1.debugLogger)("remote-debugger:editor-client");
const createEditorClient = (url, executionId) => {
    const urlNodes = new URL(url);
    const socket = (0, socket_io_client_1.io)(urlNodes.origin, {
        path: `${urlNodes.pathname === "/" ? "" : urlNodes.pathname}/socket.io/editor`,
        timeout: 30000,
    });
    socket.emit("join-room-editor", executionId);
    return {
        emitChange: (data) => {
            socket.emit(core_1.DebuggerServerEventType.CHANGE_EVENT_NAME, data);
        },
        emitBreakpointsChange: (data) => {
            socket.emit(core_1.DebuggerServerEventType.UPDATE_BREAKPOINTS, data);
        },
        interceptInput: (data) => {
            socket.emit(core_1.DebuggerServerEventType.INPUT_VALUE_OVERRIDE, data);
        },
        interceptOutput: (data) => {
            socket.emit(core_1.DebuggerServerEventType.OUTPUT_VALUE_OVERRIDE, data);
        },
        onRuntimeReady: (cb) => {
            socket.on(core_1.DebuggerServerEventType.RUNTIME_READY, cb);
            return () => socket.off(core_1.DebuggerServerEventType.RUNTIME_READY, cb);
        },
        onChangeAwk: (cb) => {
            socket.on(core_1.DebuggerServerEventType.CHANGE_AWK, cb);
            return () => socket.off(core_1.DebuggerServerEventType.CHANGE_AWK, cb);
        },
        onChangeError: (cb) => {
            socket.on(core_1.DebuggerServerEventType.CHANGE_ERROR, cb);
            return () => socket.off(core_1.DebuggerServerEventType.CHANGE_ERROR, cb);
        },
        onIsAlive: (cb) => {
            socket.on(core_1.DebuggerServerEventType.IS_ALIVE, cb);
            return () => socket.off(core_1.DebuggerServerEventType.IS_ALIVE, cb);
        },
        emitInputValue: (pinId, value) => {
            debug(`Emitting push input value to ${pinId} %o`, value);
            socket.emit(core_1.DebuggerServerEventType.PUSH_INPUT_VALUE, { pinId, value });
        },
        destroy: () => {
            socket.disconnect();
            (0, core_1.enumToArray)(core_1.DebuggerServerEventType).forEach((type) => socket.off(type));
        },
        onDisconnect: (cb) => {
            socket.on("disconnect", cb);
            return () => socket.off("disconnect", cb);
        },
        debugInfo: () => {
            return `Remote debugger for ${url}`;
        },
        onBatchedEvents: (cb) => {
            socket.on(core_1.DebuggerServerEventType.EVENTS_BATCH, cb);
            return () => socket.off(core_1.DebuggerServerEventType.EVENTS_BATCH, cb);
        },
        requestState: () => {
            return axios_1.default.get(`${url}/state`).then((r) => r.data.state);
        },
        getHistory: (dto) => {
            return axios_1.default
                .get(`${url}/history`, {
                params: {
                    insId: dto.insId,
                    pinId: dto.pinId,
                    limit: dto.limit,
                    executionId,
                },
            })
                .then((r) => r.data);
        },
        clearHistory: () => {
            return axios_1.default.delete(`${url}/history`).then(() => { });
        },
        triggerNode: (nodeId, inputs) => {
            return axios_1.default
                .post(`${url}/trigger`, { nodeId, inputs })
                .then((r) => r.data);
        },
    };
};
exports.createEditorClient = createEditorClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWJ1Z2dlci9lZGl0b3ItY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNDQVNxQjtBQUVyQixrREFBeUM7QUFFekMsdURBQTZDO0FBRTdDLE1BQU0sS0FBSyxHQUFHLElBQUEsa0JBQVcsRUFBQywrQkFBK0IsQ0FBQyxDQUFDO0FBOENwRCxNQUFNLGtCQUFrQixHQUFHLENBQ2hDLEdBQVcsRUFDWCxXQUFtQixFQUNHLEVBQUU7SUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFOUIsTUFBTSxNQUFNLEdBQUcsSUFBQSxxQkFBRyxFQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDbEMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQ2pELG1CQUFtQjtRQUNyQixPQUFPLEVBQUUsS0FBSztLQUNmLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFN0MsT0FBTztRQUNMLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQXVCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELHFCQUFxQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyw4QkFBdUIsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQ0QsY0FBYyxFQUFFLENBQUMsSUFBbUIsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQXVCLENBQUMsb0JBQW9CLEVB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