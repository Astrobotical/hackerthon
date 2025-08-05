import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useCallback, useEffect, useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandSeparator, } from "../../ui";
import { cn } from "../../ui";
import { usePorts } from "../../flow-editor/ports";
import { NodeItem, CustomNodeButton } from "./CommandMenuNodeItem";
import { useCommandMenuData } from "./useCommandMenuData";
export const CommandMenu = ({ open, onOpenChange, onAddNode, onClickCustomNode, }) => {
    const [query, setQuery] = useState("");
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getLibraryData } = usePorts();
    useEffect(() => {
        setLoading(true);
        getLibraryData()
            .then((data) => {
            setGroups(data.groups);
        })
            .finally(() => {
            setLoading(false);
        });
    }, [getLibraryData]);
    const { nodeMap, filteredGroups, updateRecentlyUsed, } = useCommandMenuData({ groups, query });
    // Handler for selecting a node
    const onSelect = useCallback((value) => {
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
    return (_jsx(CommandDialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(Command, { className: "[&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-1 [&_[cmdk-group]]:px-1 [&_[cmdk-item]]:py-1 ", shouldFilter: false, children: [_jsx(CommandInput, { placeholder: "Search nodes...", value: query, onValueChange: setQuery, className: "h-7" }), _jsx(CommandList, { children: loading ? (_jsx("div", { className: "flex justify-center items-center py-8", children: _jsx("div", { className: "text-sm text-muted-foreground animate-pulse", children: "Loading..." }) })) : (_jsxs(_Fragment, { children: [(filteredGroups.length === 0 || filteredGroups.every(g => g.nodes.length === 0)) && _jsx(CommandEmpty, { children: "No results found." }), filteredGroups.map((group) => {
                                return (_jsxs(React.Fragment, { children: [_jsx(CommandGroup, { heading: group.title, className: "pb-0.5", children: _jsxs("div", { className: cn("grid gap-0", query ? "" : "grid-cols-4"), children: [group.title === "Essentials" &&
                                                        (!query ||
                                                            "Custom Node"
                                                                .toLowerCase()
                                                                .includes(query.toLowerCase())) && (_jsx(CustomNodeButton, { onSelect: onSelect })), group.nodes.map((node) => {
                                                        return (_jsx(NodeItem, { node: node, groupTitle: group.title, onSelect: onSelect }, node.id));
                                                    })] }) }), _jsx(CommandSeparator, { className: "my-0.5" })] }, group.title));
                            })] })) })] }) }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL0NvbW1hbmRNZW51L0NvbW1hbmRNZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNoRSxPQUFPLEVBQ0wsT0FBTyxFQUNQLGFBQWEsRUFDYixZQUFZLEVBQ1osWUFBWSxFQUNaLFlBQVksRUFDWixXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVMxRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQStCLENBQUMsRUFDdEQsSUFBSSxFQUNKLFlBQVksRUFDWixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLEVBQUUsRUFBRTtJQUNILE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFxQixFQUFFLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUc5QyxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFFdEMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLFVBQVUsQ0FBQyxJQUFJLENB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