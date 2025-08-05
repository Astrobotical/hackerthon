import { loader } from "@monaco-editor/react";
import { logger } from "./logger";
let preloaded = false;
export const preloadMonaco = () => {
    if (preloaded) {
        return;
    }
    loader.init().then(() => {
        logger("monaco preloaded");
        preloaded = true;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC1tb25hY28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3ByZWxvYWQtbW9uYWNvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWxDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN0QixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO0lBQ2hDLElBQUksU0FBUyxFQUFFLENBQUM7UUFDZCxPQUFPO0lBQ1QsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNCLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==