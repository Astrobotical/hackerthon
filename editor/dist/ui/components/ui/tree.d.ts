import * as React from "react";
export interface TreeNodeInfo<T = {}> {
    id: string | number;
    label: React.ReactNode;
    childNodes?: Array<TreeNodeInfo<T>>;
    isExpanded?: boolean;
    isSelected?: boolean;
    hasCaret?: boolean;
    nodeData?: T;
}
export interface TreeProps<T> {
    contents: Array<TreeNodeInfo<T>>;
    onNodeClick?: (node: TreeNodeInfo<T>) => void;
    onNodeCollapse?: (node: TreeNodeInfo<T>) => void;
    onNodeExpand?: (node: TreeNodeInfo<T>) => void;
    className?: string;
}
export declare function Tree<T>({ contents, onNodeClick, onNodeCollapse, onNodeExpand, className, }: TreeProps<T>): import("react/jsx-runtime").JSX.Element;
export declare const ofType: <T extends {}>() => ({ contents, onNodeClick, onNodeCollapse, onNodeExpand, className, }: TreeProps<T>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tree.d.ts.map