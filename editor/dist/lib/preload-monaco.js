"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadMonaco = void 0;
const react_1 = require("@monaco-editor/react");
const logger_1 = require("./logger");
let preloaded = false;
const preloadMonaco = () => {
    if (preloaded) {
        return;
    }
    react_1.loader.init().then(() => {
        (0, logger_1.logger)("monaco preloaded");
        preloaded = true;
    });
};
exports.preloadMonaco = preloadMonaco;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC1tb25hY28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3ByZWxvYWQtbW9uYWNvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQUE4QztBQUM5QyxxQ0FBa0M7QUFFbEMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQ2YsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO0lBQ2hDLElBQUksU0FBUyxFQUFFLENBQUM7UUFDZCxPQUFPO0lBQ1QsQ0FBQztJQUNELGNBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ3RCLElBQUEsZUFBTSxFQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0IsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQVJXLFFBQUEsYUFBYSxpQkFReEIifQ==