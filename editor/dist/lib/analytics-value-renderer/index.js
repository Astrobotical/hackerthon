"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsValueRenderer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@flyde/core");
const BrowserJsonView_1 = require("./BrowserJsonView");
const AnalyticsValueRenderer = ({ val }) => {
    // const [isOpen, setIsOpen] = React.useState(false);
    // const toggle = React.useCallback(() => setIsOpen(o => !o), [setIsOpen]);
    try {
        const obj = JSON.parse(val);
        const obj2 = typeof obj === "object" ? obj : { value: obj };
        const isJsx = obj && [obj.type, obj.key, obj.props, obj.ref].every(core_1.isDefined);
        const obj3 = isJsx ? { jsxValue: obj } : obj2;
        return ((0, jsx_runtime_1.jsx)(BrowserJsonView_1.BrowserOnlyReactJson, { src: obj3, collapseStringsAfterLength: 50, 
            // groupArraysAfterLength={5}
            collapsed: isJsx }));
    }
    catch (e) {
        return ((0, jsx_runtime_1.jsx)(BrowserJsonView_1.BrowserOnlyReactJson, { src: { value: val }, collapseStringsAfterLength: 50 }));
    }
};
exports.AnalyticsValueRenderer = AnalyticsValueRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2FuYWx5dGljcy12YWx1ZS1yZW5kZXJlci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHNDQUF3QztBQUN4Qyx1REFBeUQ7QUFFbEQsTUFBTSxzQkFBc0IsR0FBMkIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDeEUscURBQXFEO0lBRXJELDJFQUEyRTtJQUUzRSxJQUFJLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sSUFBSSxHQUFHLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUU1RCxNQUFNLEtBQUssR0FDVCxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFTLENBQUMsQ0FBQztRQUVsRSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFOUMsT0FBTyxDQUNMLHVCQUFDLHNDQUFvQixJQUNuQixHQUFHLEVBQUUsSUFBSSxFQUNULDBCQUEwQixFQUFFLEVBQUU7WUFDOUIsNkJBQTZCO1lBQzdCLFNBQVMsRUFBRSxLQUFLLEdBQ2hCLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsT0FBTyxDQUNMLHVCQUFDLHNDQUFvQixJQUNuQixHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQ25CLDBCQUEwQixFQUFFLEVBQUUsR0FDOUIsQ0FDSCxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQztBQS9CVyxRQUFBLHNCQUFzQiwwQkErQmpDIn0=