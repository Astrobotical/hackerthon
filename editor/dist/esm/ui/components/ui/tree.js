import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronRight } from "../../icons";
import { cn } from "../../lib/utils";
export function Tree({ contents, onNodeClick, onNodeCollapse, onNodeExpand, className, }) {
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
        return (_jsxs("div", { className: "select-none", children: [_jsxs("div", { className: cn("flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-accent/50", node.isSelected && "bg-accent"), onClick: handleClick, children: [node.hasCaret && (_jsx("div", { className: "w-4 h-4 mr-1 flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground", onClick: handleExpandToggle, children: hasChildren &&
                                (isExpanded ? (_jsx(ChevronDown, { className: "h-4 w-4" })) : (_jsx(ChevronRight, { className: "h-4 w-4" }))) })), _jsx("div", { className: "flex-1", children: node.label })] }), isExpanded && node.childNodes && (_jsx("div", { className: "ml-4", children: node.childNodes.map((childNode) => renderNode(childNode)) }))] }, node.id));
    };
    return (_jsx("div", { className: cn("text-sm", className), children: contents.map((node) => renderNode(node)) }));
}
export const ofType = () => Tree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL3RyZWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFvQnJDLE1BQU0sVUFBVSxJQUFJLENBQUksRUFDdEIsUUFBUSxFQUNSLFdBQVcsRUFDWCxjQUFjLEVBQ2QsWUFBWSxFQUNaLFNBQVMsR0FDSTtJQUNiLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBcUIsRUFBRSxFQUFFO1FBQzNDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDO1FBRWxELE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtZQUN2QixJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUNoQixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFtQixFQUFFLEVBQUU7WUFDakQsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3BCLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksVUFBVSxFQUFFLENBQUM7b0JBQ2YsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN6QixDQUFDO3FCQUFNLENBQUM7b0JBQ04sWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLE9BQU8sQ0FDTCxlQUFtQixTQUFTLEVBQUMsYUFBYSxhQUN4QyxlQUNFLFNBQVMsRUFBRSxFQUFFLENBQ1gsMEVBQTBFLEVBQzFFLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxDQUMvQixFQUNELE9BQU8sRUFBRSxXQUFXLGFBRW5CLElBQUksQ0FBQyxRQUFRLElBQUksQ0FDaEIsY0FDRSxTQUFTLEVBQUMsMEdBQTBHLEVBQ3BILE9BQU8sRUFBRSxrQkFBa0IsWUFFMUIsV0FBVztnQ0FDVixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FDWixLQUFDLFdBQVcsSUFBQyxTQUFTLEVBQUMsU0FBUyxHQUFHLENBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQ0YsS0FBQyxZQUFZLElBQUMsU0FBUyxFQUFDLFNBQVMsR0FBRyxDQUNyQyxDQUFDLEdBQ0EsQ0FDUCxFQUNELGNBQUssU0FBUyxFQUFDLFFBQVEsWUFBRSxJQUFJLENBQUMsS0FBSyxHQUFPLElBQ3RDLEVBQ0wsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FDaEMsY0FBSyxTQUFTLEVBQUMsTUFBTSxZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQ3RELENBQ1AsS0EzQk8sSUFBSSxDQUFDLEVBQUUsQ0E0QlgsQ0FDUCxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsT0FBTyxDQUNMLGNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFlBQ3JDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUNyQyxDQUNQLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLEdBQWlCLEVBQUUsQ0FBQyxJQUFPLENBQUMifQ==