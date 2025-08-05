"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommandMenuData = void 0;
const react_1 = require("react");
const user_preferences_1 = require("../../lib/user-preferences");
const RECENTLY_USED_KEY = "flyde-recently-used-nodes";
const MAX_RECENT_NODES = 8;
const useCommandMenuData = ({ groups, query }) => {
    const [recentlyUsedIds, setRecentlyUsedIds] = (0, user_preferences_1.useLocalStorage)(RECENTLY_USED_KEY, []);
    // Create a map of all nodes by ID for efficient lookup
    const nodeMap = (0, react_1.useMemo)(() => {
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
    const recentlyUsedNodes = (0, react_1.useMemo)(() => {
        return recentlyUsedIds
            .map(id => nodeMap[id])
            .filter(Boolean);
    }, [recentlyUsedIds, nodeMap]);
    // Combine recently used nodes with other groups
    const allGroups = (0, react_1.useMemo)(() => {
        const result = [...groups];
        if (recentlyUsedNodes.length > 0) {
            result.unshift({
                title: "Recently Used",
                nodes: recentlyUsedNodes
            });
        }
        return result;
    }, [groups, recentlyUsedNodes]);
    const filteredGroups = (0, react_1.useMemo)(() => {
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
    const updateRecentlyUsed = (0, react_1.useCallback)((nodeId) => {
        setRecentlyUsedIds([nodeId, ...recentlyUsedIds.filter(id => id !== nodeId)].slice(0, MAX_RECENT_NODES));
    }, [recentlyUsedIds, setRecentlyUsedIds]);
    return {
        nodeMap,
        filteredGroups,
        updateRecentlyUsed
    };
};
exports.useCommandMenuData = useCommandMenuData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ29tbWFuZE1lbnVEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9Db21tYW5kTWVudS91c2VDb21tYW5kTWVudURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTZDO0FBRTdDLGlFQUE2RDtBQUU3RCxNQUFNLGlCQUFpQixHQUFHLDJCQUEyQixDQUFDO0FBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBYXBCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxFQUMvQixNQUFNLEVBQ04sS0FBSyxFQUNpQixFQUE0QixFQUFFO0lBQ3BELE1BQU0sQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsR0FBRyxJQUFBLGtDQUFlLEVBQ3pELGlCQUFpQixFQUNqQixFQUFFLENBQ0wsQ0FBQztJQUVGLHVEQUF1RDtJQUN2RCxNQUFNLE9BQU8sR0FBRyxJQUFBLGVBQU8sRUFBQyxHQUFHLEVBQUU7UUFDekIsTUFBTSxHQUFHLEdBQXlDLEVBQUUsQ0FBQztRQUVyRCxtQ0FBbUM7UUFDbkMsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUN6QixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFYixzQ0FBc0M7SUFDdEMsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLGVBQU8sRUFBQyxHQUFHLEVBQUU7UUFDbkMsT0FBTyxlQUFlO2FBQ2pCLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QixNQUFNLENBQUMsT0FBTyxD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