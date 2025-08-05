import { ImportableEditorNode, NodeLibraryGroup } from "@flyde/core";
interface UseCommandMenuDataProps {
    groups: NodeLibraryGroup[];
    query: string;
}
interface UseCommandMenuDataResult {
    nodeMap: Record<string, ImportableEditorNode>;
    filteredGroups: NodeLibraryGroup[];
    updateRecentlyUsed: (nodeId: string) => void;
}
export declare const useCommandMenuData: ({ groups, query }: UseCommandMenuDataProps) => UseCommandMenuDataResult;
export {};
//# sourceMappingURL=useCommandMenuData.d.ts.map