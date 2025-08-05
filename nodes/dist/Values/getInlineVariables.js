"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVariables = void 0;
const getVariables = (code) => {
    return (code.match(/inputs\.([a-zA-Z]\w*)/g) || []).map((v) => v.replace(/inputs\./, ""));
};
exports.getVariables = getVariables;
