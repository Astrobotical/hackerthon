"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofType = void 0;
exports.Tree = Tree;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("../../icons");
const utils_1 = require("../../lib/utils");
function Tree({ contents, onNodeClick, onNodeCollapse, onNodeExpand, className, }) {
    const renderNode = (node) => {
        const hasChildren = node.childNodes && node.childNodes.length > 0;
        const isExpanded = node.isExpanded && hasChildren;
        const handleClick = () => {
            if (onNodeClick) {
                onNodeClick(node);
            }
        };
        const handleExpandToggle = (e) => {
            e.stopPropagation();
            if (hasChildren) {
                if (isExpanded) {
                    onNodeCollapse === null || onNodeCollapse === void 0 ? void 0 : onNodeCollapse(node);
                }
                else {
                    onNodeExpand === null || onNodeExpand === void 0 ? void 0 : onNodeExpand(node);
                }
            }
        };
        return ((0, jsx_runtime_1.jsxs)("div", { className: "select-none", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-accent/50", node.isSelected && "bg-accent"), onClick: handleClick, children: [node.hasCaret && ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 mr-1 flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground", onClick: handleExpandToggle, children: hasChildren &&
                                (isExpanded ? ((0, jsx_runtime_1.jsx)(icons_1.ChevronDown, { className: "h-4 w-4" })) : ((0, jsx_runtime_1.jsx)(icons_1.ChevronRight, { className: "h-4 w-4" }))) })), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: node.label })] }), isExpanded && node.childNodes && ((0, jsx_runtime_1.jsx)("div", { className: "ml-4", children: node.childNodes.map((childNode) => renderNode(childNode)) }))] }, node.id));
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("text-sm", className), children: contents.map((node) => renderNode(node)) }));
}
const ofType = () => Tree;
exports.ofType = ofType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL3RyZWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXNCQSxvQkFrRUM7O0FBdkZELHVDQUF3RDtBQUN4RCwyQ0FBcUM7QUFvQnJDLFNBQWdCLElBQUksQ0FBSSxFQUN0QixRQUFRLEVBQ1IsV0FBVyxFQUNYLGNBQWMsRUFDZCxZQUFZLEVBQ1osU0FBUyxHQUNJO0lBQ2IsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFxQixFQUFFLEVBQUU7UUFDM0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxXQUFXLENBQUM7UUFFbEQsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ2hCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLENBQW1CLEVBQUUsRUFBRTtZQUNqRCxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDcEIsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFDZixjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7cUJBQU0sQ0FBQztvQkFDTixZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsT0FBTyxDQUNMLGlDQUFtQixTQUFTLEVBQUMsYUFBYSxhQUN4QyxpQ0FDRSxTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQ1gsMEVBQTBFLEVBQzFFLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxDQUMvQixFQUNELE9BQU8sRUFBRSxXQUFXLGFBRW5CLElBQUksQ0FBQyxRQUFRLElBQUksQ0FDaEIsZ0NBQ0UsU0FBUyxFQUFDLDBHQUEwRyxFQUNwSCxPQUFPLEVBQUUsa0JBQWtCLFlBRTFCLFdBQVc7Z0NBQ1YsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQ1osdUJBQUMsbUJBQVcsSUFBQyxTQUFTLEVBQUMsU0FBUyxHQUFHLENBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQ0YsdUJBQUMsb0JBQVksSUFBQyxTQUFTLEVBQUMsU0FBUyxHQUFHLENBQ3JDLENBQUMsR0FDQSxDQUNQLEVBQ0QsZ0NBQUssU0FBUyxFQUFDLFFBQVEsWUFBRSxJQUFJLENBQUMsS0FBSyxHQUFPLElBQ3RDLEVBQ0wsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FDaEMsZ0NBQUssU0FBUyxFQUFDLE1BQU0sWUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUN0RCxDQUNQLEtBM0JPLElBQUksQ0FBQyxFQUFFLENBNEJYLENBQ1AsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGLE9BQU8sQ0FDTCxnQ0FBSyxTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxZQUNyQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FDckMsQ0FDUCxDQUFDO0FBQ0osQ0FBQztBQUVNLE1BQU0sTUFBTSxHQUFHLEdBQWlCLEVBQUUsQ0FBQyxJQUFPLENBQUM7QUFBckMsUUFBQSxNQUFNLFVBQStCIn0=