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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteEditor = void 0;
const react_1 = __importStar(require("react"));
const editor_1 = require("@flyde/editor");
const NoteEditor = ({ value, onChange, }) => {
    const [content, setContent] = (0, react_1.useState)(value.content);
    (0, react_1.useEffect)(() => {
        onChange({ content });
    }, [content, onChange]);
    return (react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px" } },
        react_1.default.createElement(editor_1.Textarea, { value: content, onChange: (e) => setContent(e.target.value), placeholder: "Enter your note here (A subset of Markdown is supported)", rows: 10, style: { width: "100%", padding: "8px 6px", minHeight: "200px" } }),
        react_1.default.createElement(editor_1.Alert, null,
            react_1.default.createElement(editor_1.AlertDescription, null, "A subset of markdown is supported"))));
};
exports.NoteEditor = NoteEditor;
exports.default = exports.NoteEditor;
