import { FlydeFlow, NodeLibraryData, FlowJob, ConfigurableNodeDefinition, NodeOrConfigurableDefinition, NodeInstance, EditorNodeInstance, ImportableEditorNode, EditorVisualNode } from "@flyde/core";
import { ReportEvent } from "./analytics";
export * from "./analytics";
export type CancelFn = () => void;
export interface AiCompletionDto {
    prompt: string;
    nodeId: string;
    insId: string;
    jsonMode?: boolean;
}
export interface EditorPorts {
    prompt: (dto: {
        defaultValue?: string;
        text?: string;
    }) => Promise<string | null>;
    confirm: (dto: {
        text: string;
    }) => Promise<boolean>;
    openFile: (dto: {
        absPath: string;
    }) => Promise<void>;
    readFlow: (dto: {
        absPath: string;
    }) => Promise<FlydeFlow>;
    setFlow: (dto: {
        absPath: string;
        flow: FlydeFlow;
    }) => Promise<void>;
    onExternalFlowChange: (cb: (data: {
        flow: {
            node: EditorVisualNode;
        };
    }) => void) => CancelFn;
    onRunFlow: (inputs: Record<string, any>, executionDelay?: number) => Promise<FlowJob>;
    onStopFlow: () => Promise<void>;
    reportEvent: ReportEvent;
    generateNodeFromPrompt: (dto: {
        prompt: string;
    }) => Promise<{
        importableNode: EditorNodeInstance;
    }>;
    getLibraryData: () => Promise<NodeLibraryData>;
    onRequestSiblingNodes: (dto: {
        node: ConfigurableNodeDefinition<any>;
    }) => Promise<ConfigurableNodeDefinition<any>[]>;
    onRequestNodeSource: (dto: {
        node: NodeOrConfigurableDefinition;
    }) => Promise<string>;
    onCreateCustomNode: (dto: {
        code: string;
    }) => Promise<ImportableEditorNode>;
    createAiCompletion?: (dto: AiCompletionDto) => Promise<string>;
    resolveInstance: (dto: {
        instance: NodeInstance;
    }) => Promise<EditorNodeInstance>;
    getAvailableSecrets: () => Promise<string[]>;
    addNewSecret: (dto: {
        key: string;
        value: string;
    }) => Promise<string[]>;
}
export declare const defaultPorts: EditorPorts;
export declare const PortsContext: import("react").Context<EditorPorts>;
export declare const usePrompt: () => (text: string, defaultValue?: string) => Promise<string | null>;
export declare const useConfirm: () => (text: string) => Promise<boolean>;
export type PromptFn = ReturnType<typeof usePrompt>;
export declare const usePorts: () => EditorPorts;
//# sourceMappingURL=ports.d.ts.map