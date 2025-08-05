"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGrid = void 0;
const axios_1 = __importDefault(require("axios"));
exports.SendGrid = {
    id: "SendGrid",
    menuDisplayName: "SendGrid",
    namespace: "email",
    icon: `envelope`,
    displayName: "SendGrid",
    description: "Send emails using SendGrid",
    inputs: {
        apiKey: {
            editorType: "secret",
            editorTypeData: {
                defaultName: "SENDGRID_API_KEY",
            },
            description: "SendGrid API Key",
        },
        from: {
            defaultValue: "",
            editorType: "string",
            description: "Sender email address",
        },
        to: {
            defaultValue: "",
            editorType: "string",
            description: "Recipient email address",
        },
        subject: {
            defaultValue: "",
            editorType: "string",
            description: "Email subject",
        },
        html: {
            defaultValue: "",
            editorType: "longtext",
            description: "HTML content of the email",
        },
        text: {
            defaultValue: "",
            editorType: "longtext",
            description: "Plain text content of the email",
        },
        cc: {
            defaultValue: "",
            editorType: "string",
            description: "CC recipients (comma-separated)",
        },
        bcc: {
            defaultValue: "",
            editorType: "string",
            description: "BCC recipients (comma-separated)",
        },
        replyTo: {
            defaultValue: "",
            editorType: "string",
            description: "Reply-to email address",
        },
        attachments: {
            defaultValue: [],
            editorType: "json",
            description: "Array of attachment objects with content, filename, type, and disposition",
        },
    },
    outputs: {
        success: {
            description: "Email sent successfully",
        },
    },
    run: async (inputs, outputs) => {
        var _a;
        const { apiKey, from, to, subject, html, text, cc, bcc, replyTo, attachments, } = inputs;
        const headers = {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = {
            personalizations: [
                {
                    to: to.split(",").map((email) => ({ email: email.trim() })),
                },
            ],
            from: { email: from },
            subject,
        };
        if (html) {
            data.content = data.content || [];
            data.content.push({
                type: "text/html",
                value: html,
            });
        }
        if (text) {
            data.content = data.content || [];
            data.content.push({
                type: "text/plain",
                value: text,
            });
        }
        if (cc) {
            data.personalizations[0].cc = cc
                .split(",")
                .map((email) => ({ email: email.trim() }));
        }
        if (bcc) {
            data.personalizations[0].bcc = bcc
                .split(",")
                .map((email) => ({ email: email.trim() }));
        }
        if (replyTo) {
            data.reply_to = { email: replyTo };
        }
        if (attachments && attachments.length > 0) {
            data.attachments = attachments;
        }
        try {
            const res = await axios_1.default.post("https://api.sendgrid.com/v3/mail/send", data, {
                headers,
            });
            outputs.success.next(res.data);
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response) {
                const errorData = error.response.data;
                throw new Error(`SendGrid API Error ${error.response.status}: ${((_a = errorData.error) === null || _a === void 0 ? void 0 : _a.message) || error.response.statusText}`);
            }
            throw error;
        }
    },
};
