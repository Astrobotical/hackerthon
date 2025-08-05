"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMCondition = void 0;
const axios_1 = __importDefault(require("axios"));
const namespace = "ai";
exports.LLMCondition = {
    id: "LLMCondition",
    menuDisplayName: "LLM Condition",
    namespace,
    icon: "brain",
    displayName: "LLM Condition",
    description: "Evaluates a condition using an LLM and emits the value to true/false outputs",
    inputs: {
        apiKey: {
            editorType: "secret",
            editorTypeData: {
                defaultName: "OPENAI_API_KEY",
            },
            description: "OpenAI API Key",
        },
        model: {
            defaultValue: "gpt-4-turbo-preview",
            description: "The model to use for evaluation",
            editorType: "select",
            editorTypeData: {
                options: ["gpt-4o", "gpt-4", "gpt-3.5"],
            },
        },
        prompt: {
            defaultValue: "Is it a positive number?",
            description: "The condition to evaluate",
            editorType: "longtext",
        },
        value: {
            defaultValue: "{{value}}",
            description: "The value to check against the condition",
            editorType: "json",
        },
    },
    outputs: {
        true: {
            description: "Emits the value when condition is true",
        },
        false: {
            description: "Emits the value when condition is false",
        },
    },
    run: async (inputs, outputs, adv) => {
        const { apiKey, model, prompt, value } = inputs;
        const data = {
            model,
            messages: [
                {
                    role: "system",
                    content: `You are a condition evaluator. You must respond with exactly 'true' or 'false'. You should evaluate the following condition on each user reply and reply with either 'true' or 'false', nothing else. Never.
            CONDITION: ${prompt}
            `,
                },
                { role: "user", content: value },
            ],
            temperature: 0,
        };
        try {
            const res = await axios_1.default.post("https://api.openai.com/v1/chat/completions", data, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            });
            const output = res.data.choices[0].message.content.toLowerCase().trim();
            if (output === "true") {
                outputs.true.next(value);
            }
            else {
                outputs.false.next(value);
            }
        }
        catch (err) {
            const error = err;
            if (axios_1.default.isAxiosError(error) && error.response) {
                adv.onError(`OpenAI API Error ${error.response.status}: ${error.response.statusText}`);
            }
            else {
                adv.onError(`Error: ${error.message}`);
            }
        }
    },
};
