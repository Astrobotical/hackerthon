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
exports.CommandMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const ports_1 = require("../../flow-editor/ports");
const CommandMenuNodeItem_1 = require("./CommandMenuNodeItem");
const useCommandMenuData_1 = require("./useCommandMenuData");
const CommandMenu = ({ open, onOpenChange, onAddNode, onClickCustomNode, }) => {
    const [query, setQuery] = (0, react_1.useState)("");
    const [groups, setGroups] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { getLibraryData } = (0, ports_1.usePorts)();
    (0, react_1.useEffect)(() => {
        setLoading(true);
        getLibraryData()
            .then((data) => {
            setGroups(data.groups);
        })
            .finally(() => {
            setLoading(false);
        });
    }, [getLibraryData]);
    const { nodeMap, filteredGroups, updateRecentlyUsed, } = (0, useCommandMenuData_1.useCommandMenuData)({ groups, query });
    // Handler for selecting a node
    const onSelect = (0, react_1.useCallback)((value) => {
        if (value === "custom") {
            onClickCustomNode();
            setQuery("");
            onOpenChange(false);
            return;
        }
        // Format is now "category:nodeId" but we only need the nodeId part
        const nodeId = value.split(":").pop();
        const node = nodeMap[nodeId];
        if (node) {
            // Update recently used nodes
            updateRecentlyUsed(nodeId);
            onAddNode(node);
        }
        setQuery("");
        onOpenChange(false);
    }, [nodeMap, onAddNode, onClickCustomNode, onOpenChange, updateRecentlyUsed, setQuery]);
    return ((0, jsx_runtime_1.jsx)(ui_1.CommandDialog, { open: open, onOpenChange: onOpenChange, children: (0, jsx_runtime_1.jsxs)(ui_1.Command, { className: "[&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-1 [&_[cmdk-group]]:px-1 [&_[cmdk-item]]:py-1 ", shouldFilter: false, children: [(0, jsx_runtime_1.jsx)(ui_1.CommandInput, { placeholder: "Search nodes...", value: query, onValueChange: setQuery, className: "h-7" }), (0, jsx_runtime_1.jsx)(ui_1.CommandList, { children: loading ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center py-8", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground animate-pulse", children: "Loading..." }) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(filteredGroups.length === 0 || filteredGroups.every(g => g.nodes.length === 0)) && (0, jsx_runtime_1.jsx)(ui_1.CommandEmpty, { children: "No results found." }), filteredGroups.map((group) => {
                                return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(ui_1.CommandGroup, { heading: group.title, className: "pb-0.5", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, ui_2.cn)("grid gap-0", query ? "" : "grid-cols-4"), children: [group.title === "Essentials" &&
                                                        (!query ||
                                                            "Custom Node"
                                                                .toLowerCase()
                                                                .includes(query.toLowerCase())) && ((0, jsx_runtime_1.jsx)(CommandMenuNodeItem_1.CustomNodeButton, { onSelect: onSelect })), group.nodes.map((node) => {
                                                        return ((0, jsx_runtime_1.jsx)(CommandMenuNodeItem_1.NodeItem, { node: node, groupTitle: group.title, onSelect: onSelect }, node.id));
                                                    })] }) }), (0, jsx_runtime_1.jsx)(ui_1.CommandSeparator, { className: "my-0.5" })] }, group.title));
                            })] })) })] }) }));
};
exports.CommandMenu = CommandMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL0NvbW1hbmRNZW51L0NvbW1hbmRNZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdFO0FBQ2hFLGlDQVFrQjtBQUVsQixpQ0FBOEI7QUFDOUIsbURBQW1EO0FBQ25ELCtEQUFtRTtBQUNuRSw2REFBMEQ7QUFTbkQsTUFBTSxXQUFXLEdBQStCLENBQUMsRUFDdEQsSUFBSSxFQUNKLFlBQVksRUFDWixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLEVBQUUsRUFBRTtJQUNILE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFxQixFQUFFLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUc5QyxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsSUFBQSxnQkFBUSxHQUFFLENBQUM7SUFFdEMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixjQUFjLEVBQUU7YUFDYixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDO2FBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNaLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENB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