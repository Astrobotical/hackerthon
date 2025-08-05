"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firecrawl = void 0;
const core_1 = require("@flyde/core");
const axios_1 = __importDefault(require("axios"));
exports.Firecrawl = {
    id: "Firecrawl",
    menuDisplayName: "Firecrawl",
    namespace: "webscraping",
    icon: `fire`,
    displayName: "Firecrawl {{action}}",
    description: "Turn websites into LLM-ready data",
    inputs: {
        authentication: {
            group: (0, core_1.createInputGroup)("Authentication", ["apiKey"], {
                collapsible: true,
                defaultCollapsed: true,
            }),
        },
        apiKey: {
            editorType: "secret",
            editorTypeData: {
                defaultName: "FIRECRAWL_API_KEY",
            },
            description: "Firecrawl API Key",
        },
        action: {
            defaultValue: "scrape",
            label: "Action",
            typeConfigurable: true,
            description: "Action to perform with Firecrawl",
            editorType: "select",
            editorTypeData: {
                options: [
                    { label: "Scrape URL", value: "scrape" },
                    { label: "Crawl Website", value: "crawl" },
                    { label: "Extract Structured Data", value: "extractJson" },
                ],
            },
        },
        url: {
            defaultValue: "",
            editorType: "string",
            description: "URL to scrape or crawl",
        },
        maxPages: {
            defaultValue: 10,
            editorType: "number",
            description: "Maximum number of pages to crawl",
            condition: "action === 'crawl'",
        },
        wait: {
            defaultValue: true,
            editorType: "boolean",
            description: "Whether to wait for JavaScript to load",
        },
        extractionPrompt: {
            defaultValue: "",
            editorType: "longtext",
            description: "Prompt for structured data extraction",
            condition: "action === 'extractJson'",
        },
        additionalOptions: {
            group: (0, core_1.createInputGroup)("Additional Options", ["wait", "maxPages", "extractionPrompt"], {
                collapsible: true,
                defaultCollapsed: true,
            }),
        },
    },
    outputs: {
        result: {
            description: "Operation result data",
        },
    },
    run: async (inputs, outputs, adv) => {
        var _a;
        const { apiKey, action, url, maxPages, wait, extractionPrompt } = inputs;
        if (!apiKey) {
            throw new Error("Firecrawl API key is required");
        }
        if (!url) {
            throw new Error("URL is required");
        }
        const headers = {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        };
        const baseUrl = "https://api.firecrawl.dev/v1";
        let endpoint = "";
        const method = "POST";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = { url };
        try {
            switch (action) {
                case "scrape":
                    endpoint = "/scrape";
                    if (wait !== undefined) {
                        data.wait = wait;
                    }
                    break;
                case "crawl":
                    endpoint = "/crawl";
                    if (maxPages) {
                        data.maxPages = maxPages;
                    }
                    if (wait !== undefined) {
                        data.wait = wait;
                    }
                    break;
                case "extractJson":
                    endpoint = "/extract-json";
                    if (extractionPrompt) {
                        data.prompt = extractionPrompt;
                    }
                    if (wait !== undefined) {
                        data.wait = wait;
                    }
                    break;
                default:
                    throw new Error(`Unsupported action: ${action}`);
            }
            const res = await (0, axios_1.default)({
                method,
                url: baseUrl + endpoint,
                headers,
                data,
            });
            outputs.result.next(res.data);
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response) {
                const errorData = error.response.data;
                adv.onError(`Firecrawl API Error ${error.response.status}: ${((_a = errorData.error) === null || _a === void 0 ? void 0 : _a.message) || error.response.statusText}`);
                return;
            }
            adv.onError(`Error: ${error.message}`);
        }
    }
};
