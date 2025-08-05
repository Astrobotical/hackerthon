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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheets = exports.PostgreSQL = void 0;
__exportStar(require("./browser"), exports);
var postgres_flyde_1 = require("./postgres.flyde");
Object.defineProperty(exports, "PostgreSQL", { enumerable: true, get: function () { return postgres_flyde_1.PostgreSQL; } });
var googlesheets_flyde_1 = require("./googlesheets.flyde");
Object.defineProperty(exports, "GoogleSheets", { enumerable: true, get: function () { return googlesheets_flyde_1.GoogleSheets; } });
