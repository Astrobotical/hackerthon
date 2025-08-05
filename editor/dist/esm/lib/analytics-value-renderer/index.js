import { jsx as _jsx } from "react/jsx-runtime";
import { isDefined } from "@flyde/core";
import { BrowserOnlyReactJson } from "./BrowserJsonView";
export const AnalyticsValueRenderer = ({ val }) => {
    // const [isOpen, setIsOpen] = React.useState(false);
    // const toggle = React.useCallback(() => setIsOpen(o => !o), [setIsOpen]);
    try {
        const obj = JSON.parse(val);
        const obj2 = typeof obj === "object" ? obj : { value: obj };
        const isJsx = obj && [obj.type, obj.key, obj.props, obj.ref].every(isDefined);
        const obj3 = isJsx ? { jsxValue: obj } : obj2;
        return (_jsx(BrowserOnlyReactJson, { src: obj3, collapseStringsAfterLength: 50, 
            // groupArraysAfterLength={5}
            collapsed: isJsx }));
    }
    catch (e) {
        return (_jsx(BrowserOnlyReactJson, { src: { value: val }, collapseStringsAfterLength: 50 }));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2FuYWx5dGljcy12YWx1ZS1yZW5kZXJlci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQTJCLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3hFLHFEQUFxRDtJQUVyRCwyRUFBMkU7SUFFM0UsSUFBSSxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QixNQUFNLElBQUksR0FBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFNUQsTUFBTSxLQUFLLEdBQ1QsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsRSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFOUMsT0FBTyxDQUNMLEtBQUMsb0JBQW9CLElBQ25CLEdBQUcsRUFBRSxJQUFJLEVBQ1QsMEJBQTBCLEVBQUUsRUFBRTtZQUM5Qiw2QkFBNkI7WUFDN0IsU0FBUyxFQUFFLEtBQUssR0FDaEIsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxPQUFPLENBQ0wsS0FBQyxvQkFBb0IsSUFDbkIsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUNuQiwwQkFBMEIsRUFBRSxFQUFFLEdBQzlCLENBQ0gsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDLENBQUMifQ==