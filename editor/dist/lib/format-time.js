"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimeAgo = formatTimeAgo;
function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
        return `${days}d ago`;
    }
    else if (hours > 0) {
        return `${hours}h ago`;
    }
    else if (minutes > 0) {
        return `${minutes}m ago`;
    }
    else if (seconds > 10) {
        return `${seconds}s ago`;
    }
    else {
        return "just now";
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LXRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2Zvcm1hdC10aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBb0JDO0FBcEJELFNBQWdCLGFBQWEsQ0FBQyxTQUFpQjtJQUM3QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkIsTUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQztJQUU3QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN2QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztJQUVwQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNiLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQztJQUN4QixDQUFDO1NBQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckIsT0FBTyxHQUFHLEtBQUssT0FBTyxDQUFDO0lBQ3pCLENBQUM7U0FBTSxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN2QixPQUFPLEdBQUcsT0FBTyxPQUFPLENBQUM7SUFDM0IsQ0FBQztTQUFNLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxPQUFPLE9BQU8sQ0FBQztJQUMzQixDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7QUFDSCxDQUFDIn0=