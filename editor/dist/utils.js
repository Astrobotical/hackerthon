"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preventDefaultAnd = exports.isLocal = exports.fullTime = exports.timeAgoFromDt = exports.timeAgo = exports.toString = exports.isDefined = exports.set = exports.createOmap = exports.toOmap = exports.values = exports.keys = exports.entries = void 0;
const utils_1 = require("./visual-node-editor/utils");
const moment_1 = __importDefault(require("moment"));
// tslint:disable-next-line:one-variable-per-declaration
const entries = (map) => {
    return Object.keys(map).map((k) => {
        return [k, map[k]];
    });
};
exports.entries = entries;
const keys = (map) => {
    return Object.keys(map);
};
exports.keys = keys;
const values = (map) => {
    return Object.keys(map).map((k) => map[k]);
};
exports.values = values;
const toOmap = (map) => {
    return Array.from(map.entries()).reduce((p, [k, v]) => ({
        ...p,
        [k]: v,
    }), {});
};
exports.toOmap = toOmap;
const createOmap = (entr = []) => {
    return entr.reduce((p, c) => {
        return { ...p, [c[0]]: c[1] };
    }, {});
};
exports.createOmap = createOmap;
const set = (map, k, v) => {
    map[k] = v;
};
exports.set = set;
const isDefined = (o) => {
    return typeof o !== "undefined";
};
exports.isDefined = isDefined;
const toString = (v) => {
    const type = typeof v;
    if (v === "") {
        return "(empty string)";
    }
    if ((0, utils_1.isJsxValue)(v)) {
        return "JSX Value";
    }
    switch (type) {
        case "object":
            try {
                const str = JSON.stringify(v);
                return str === "{}" ? "Empty object" : str;
            }
            catch (e) {
                return `Object (cannot stringify)`;
            }
        default:
            return `${v}`;
    }
};
exports.toString = toString;
const timeAgo = (d) => {
    return (0, moment_1.default)(new Date(d)).fromNow();
};
exports.timeAgo = timeAgo;
const timeAgoFromDt = (dt) => {
    return (0, moment_1.default)(Date.now() - dt).fromNow();
};
exports.timeAgoFromDt = timeAgoFromDt;
const fullTime = (d) => {
    return (0, moment_1.default)(new Date(d)).toString();
};
exports.fullTime = fullTime;
const isLocal = () => {
    return location.href.includes(":300"); // hacky way because we're forcing env for react to perform faster
};
exports.isLocal = isLocal;
const preventDefaultAnd = (fn) => (e) => {
    e.preventDefault();
    fn(e);
};
exports.preventDefaultAnd = preventDefaultAnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQXdEO0FBRXhELG9EQUE0QjtBQVM1Qix3REFBd0Q7QUFDakQsTUFBTSxPQUFPLEdBQUcsQ0FBSSxHQUFpQixFQUFjLEVBQUU7SUFDMUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFnQixDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBSlcsUUFBQSxPQUFPLFdBSWxCO0FBRUssTUFBTSxJQUFJLEdBQUcsQ0FBSSxHQUFpQixFQUFZLEVBQUU7SUFDckQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUZXLFFBQUEsSUFBSSxRQUVmO0FBRUssTUFBTSxNQUFNLEdBQUcsQ0FBSSxHQUFpQixFQUFPLEVBQUU7SUFDbEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFDO0FBRlcsUUFBQSxNQUFNLFVBRWpCO0FBRUssTUFBTSxNQUFNLEdBQUcsQ0FBSSxHQUFtQixFQUFtQixFQUFFO0lBQ2hFLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQ3JDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUMsRUFB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