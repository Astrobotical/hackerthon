import { useCallback, useMemo } from "react";
import { useLocalStorage } from "../../lib/user-preferences";
const RECENTLY_USED_KEY = "flyde-recently-used-nodes";
const MAX_RECENT_NODES = 8;
export const useCommandMenuData = ({ groups, query }) => {
    const [recentlyUsedIds, setRecentlyUsedIds] = useLocalStorage(RECENTLY_USED_KEY, []);
    // Create a map of all nodes by ID for efficient lookup
    const nodeMap = useMemo(() => {
        const map = {};
        // Add all library nodes to the map
        for (const group of groups) {
            for (const node of group.nodes) {
                map[node.id] = node;
            }
        }
        return map;
    }, [groups]);
    // Build the recently used nodes group
    const recentlyUsedNodes = useMemo(() => {
        return recentlyUsedIds
            .map(id => nodeMap[id])
            .filter(Boolean);
    }, [recentlyUsedIds, nodeMap]);
    // Combine recently used nodes with other groups
    const allGroups = useMemo(() => {
        const result = [...groups];
        if (recentlyUsedNodes.length > 0) {
            result.unshift({
                title: "Recently Used",
                nodes: recentlyUsedNodes
            });
        }
        return result;
    }, [groups, recentlyUsedNodes]);
    const filteredGroups = useMemo(() => {
        var _a;
        if (!query) {
            const essentialsNodes = new Set(((_a = allGroups.find((g) => g.title === "Essentials")) === null || _a === void 0 ? void 0 : _a.nodes.map((n) => n.id)) || []);
            return allGroups.map((group) => {
                if (group.title === "Essentials" || group.title === "Recently Used")
                    return group;
                return {
                    ...group,
                    nodes: group.nodes.filter((node) => !essentialsNodes.has(node.id)),
                };
            });
        }
        const customNodeMatches = "Custom Node"
            .toLowerCase()
            .includes(query.toLowerCase());
        // When searching, ensure nodes don't appear in multiple categories
        const seenNodeIds = new Set();
        const filteredGroups = allGroups.map((group) => {
            // For each group, filter nodes by query and exclude already seen nodes
            const filteredNodes = group.nodes.filter((node) => {
                var _a, _b, _c;
                // Skip if we've already included this node in another category
                if (seenNodeIds.has(node.id))
                    return false;
                const searchContent = [
                    node.id,
                    (_a = node.editorNode) === null || _a === void 0 ? void 0 : _a.menuDisplayName,
                    (_b = node.editorNode) === null || _b === void 0 ? void 0 : _b.description,
                    node.displayName,
                    node.description,
                    (_c = node.aliases) === null || _c === void 0 ? void 0 : _c.join(" ")
                ].filter(Boolean).join(" ");
                const matches = searchContent.toLowerCase().includes(query.toLowerCase());
                // If it matches, mark it as seen
                if (matches) {
                    seenNodeIds.add(node.id);
                }
                return matches;
            });
            return {
                ...group,
                nodes: filteredNodes
            };
        });
        // Then filter out empty groups, but keep Essentials if customNodeMatches
        return filteredGroups.filter((group) => group.nodes.length > 0 ||
            (group.title === "Essentials" && customNodeMatches));
    }, [allGroups, query]);
    // Update recently used nodes
    const updateRecentlyUsed = useCallback((nodeId) => {
        setRecentlyUsedIds([nodeId, ...recentlyUsedIds.filter(id => id !== nodeId)].slice(0, MAX_RECENT_NODES));
    }, [recentlyUsedIds, setRecentlyUsedIds]);
    return {
        nodeMap,
        filteredGroups,
        updateRecentlyUsed
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ29tbWFuZE1lbnVEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9Db21tYW5kTWVudS91c2VDb21tYW5kTWVudURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELE1BQU0saUJBQWlCLEdBQUcsMkJBQTJCLENBQUM7QUFDdEQsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFhM0IsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxFQUMvQixNQUFNLEVBQ04sS0FBSyxFQUNpQixFQUE0QixFQUFFO0lBQ3BELE1BQU0sQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsR0FBRyxlQUFlLENBQ3pELGlCQUFpQixFQUNqQixFQUFFLENBQ0wsQ0FBQztJQUVGLHVEQUF1RDtJQUN2RCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ3pCLE1BQU0sR0FBRyxHQUF5QyxFQUFFLENBQUM7UUFFckQsbUNBQW1DO1FBQ25DLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFLENBQUM7WUFDekIsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRWIsc0NBQXNDO0lBQ3RDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxPQUFPLGVBQWU7YUFDakIsR0FBRyxDQUFDLEVBQUUs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