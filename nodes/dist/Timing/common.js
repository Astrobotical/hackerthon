"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMING_NAMESPACE = void 0;
exports.timeToString = timeToString;
exports.TIMING_NAMESPACE = "Timing";
function timeToString(timeMs) {
    if (timeMs < 1000) {
        return `${timeMs}ms`;
    }
    else {
        return `${timeMs / 1000}s`;
    }
}
