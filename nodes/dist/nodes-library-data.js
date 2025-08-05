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
exports.getBaseNodesLibraryData = getBaseNodesLibraryData;
const all_browser_1 = require("./all-browser");
const Switch_flyde_1 = require("./ControlFlow/Switch.flyde");
const Collect_flyde_1 = require("./Lists/Collect/Collect.flyde");
const Note_flyde_1 = require("./Note/Note.flyde");
const Lists = __importStar(require("./Lists"));
const Objects = __importStar(require("./Objects"));
const core_1 = require("@flyde/core");
const server_1 = require("./ThirdParty/server");
const openai_responses_flyde_1 = require("./ThirdParty/openai-responses.flyde");
const googlesheets_flyde_1 = require("./ThirdParty/googlesheets.flyde");
const nodesSource = {
    type: "package",
    data: "@flyde/nodes",
};
function getBaseNodesLibraryData() {
    return {
        groups: [
            {
                title: "Essentials",
                nodes: [
                    all_browser_1.InlineValue,
                    all_browser_1.CodeExpression,
                    all_browser_1.GetAttribute,
                    all_browser_1.Http,
                    all_browser_1.Conditional,
                    Switch_flyde_1.Switch,
                    Note_flyde_1.Note,
                    all_browser_1.MathNode,
                    all_browser_1.StringOps
                ].map((node) => (0, core_1.codeNodeToImportableEditorNode)(node, nodesSource)),
            },
            {
                title: 'Integrations',
                nodes: [
                    server_1.Airtable,
                    server_1.Anthropic,
                    server_1.DiscordMessage,
                    server_1.Firecrawl,
                    googlesheets_flyde_1.GoogleSheets,
                    server_1.LLMCondition,
                    server_1.Notion,
                    openai_responses_flyde_1.OpenAIResponsesAPI,
                    server_1.Resend,
                    server_1.ScrapingBee,
                    server_1.SendGrid,
                    server_1.Slack,
                    server_1.Supabase,
                    server_1.Tavily,
                ].map((node) => (0, core_1.codeNodeToImportableEditorNode)(node, nodesSource)),
            },
            {
                title: "Lists",
                nodes: [
                    all_browser_1.LoopList,
                    all_browser_1.SpreadList,
                    Collect_flyde_1.Collect,
                    Lists.GetListElement,
                    Lists.Append,
                    Lists.Reverse,
                ].map((node) => (0, core_1.codeNodeToImportableEditorNode)(node, nodesSource)),
            },
            {
                title: "Control Flow",
                nodes: [
                    all_browser_1.Delay,
                    all_browser_1.Throttle,
                    all_browser_1.Debounce,
                    all_browser_1.Conditional,
                    all_browser_1.Interval,
                    all_browser_1.RoundRobin,
                    Switch_flyde_1.Switch,
                    all_browser_1.Publish,
                    all_browser_1.Subscribe,
                ].map((node) => (0, core_1.codeNodeToImportableEditorNode)(node, nodesSource)),
            },
            {
                title: "Objects",
                nodes: [
                    Objects.GetAttribute,
                    Objects.SetAttribute,
                    Objects.DeleteAttribute,
                    Objects.JSONParse,
                    Objects.JSONStringify,
                    Objects.ObjectEntries,
                ].map((node) => (0, core_1.codeNodeToImportableEditorNode)(node, nodesSource)),
            },
            {
                title: "State",
                nodes: [all_browser_1.GetGlobalState, all_browser_1.SetGlobalState].map((node) => (0, core_1.codeNodeToImportableEditorNode)(node, nodesSource)),
            },
            {
                title: "Timing",
                nodes: [all_browser_1.Delay, all_browser_1.Throttle, all_browser_1.Debounce, all_browser_1.Interval, all_browser_1.RoundRobin].map((node) => (0, core_1.codeNodeToImportableEditorNode)(node, nodesSource)),
            },
        ],
    };
}
