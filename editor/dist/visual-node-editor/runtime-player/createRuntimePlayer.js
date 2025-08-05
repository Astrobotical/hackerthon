"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRuntimePlayer = void 0;
const core_1 = require("@flyde/core");
const play_event_1 = require("./play-event");
const debug = (0, core_1.debugLogger)("runtime-player");
const createRuntimePlayer = () => {
    let currDt = 0;
    let queue = [];
    const playEvents = (fromDt, untilDt) => {
        // assumes sorting order
        const toPlay = queue; // .filter((e) => e.dt < untilDt);
        queue = []; // queue.filter((e) => e.dt >= untilDt);
        if (toPlay.length) {
            debug(`Playing ${toPlay.length} events from`, fromDt, untilDt);
        }
        toPlay.forEach((e) => {
            debug(`Playing event`, e);
            (0, play_event_1.playEvent)(e);
        });
    };
    let running = false;
    let last = Date.now();
    let lastDt = currDt;
    const step = () => requestAnimationFrame(() => {
        const n = Date.now();
        lastDt = currDt;
        currDt += n - last;
        last = n;
        playEvents(lastDt, currDt);
        if (running) {
            step();
        }
    });
    const stop = () => {
        running = false;
    };
    const clear = () => {
        document.querySelectorAll("[data-runtime]").forEach((elem) => {
            console.log("removing data-runtime #1c", elem);
            elem.removeAttribute("data-runtime");
        });
        document.querySelectorAll("[data-runtime-queue]").forEach((elem) => {
            elem.removeAttribute("data-runtime-queue");
        });
        queue = [];
    };
    return {
        stop,
        start: (dt = 0) => {
            clear();
            running = true;
            currDt = dt;
            last = Date.now();
            step();
        },
        addEvents: (events) => {
            queue.push(...events);
        },
        destroy: () => {
            stop();
            clear();
        },
        clear,
        status: () => {
            return {
                running,
                currDt,
                lastDt,
                queue,
                last,
            };
        },
    };
};
exports.createRuntimePlayer = createRuntimePlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUnVudGltZVBsYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvcnVudGltZS1wbGF5ZXIvY3JlYXRlUnVudGltZVBsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FLcUI7QUFDckIsNkNBQXlDO0FBRXpDLE1BQU0sS0FBSyxHQUFHLElBQUEsa0JBQVcsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBV3JDLE1BQU0sbUJBQW1CLEdBQUcsR0FBa0IsRUFBRTtJQUNyRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLEtBQUssR0FBb0IsRUFBRSxDQUFDO0lBRWhDLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBYyxFQUFFLE9BQWUsRUFBRSxFQUFFO1FBQ3JELHdCQUF3QjtRQUN4QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxrQ0FBa0M7UUFDeEQsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHdDQUF3QztRQUVwRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixLQUFLLENBQUMsV0FBVyxNQUFNLENBQUMsTUFBTSxjQUFjLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFBLHNCQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFdEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBRXBCLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUNoQixxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7UUFDekIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDaEIsTUFBTSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUVULFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFM0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUwsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ2hCLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssR0FBRyxFQUFFLENBQUM7SUFDYixDQUFDLENBQUM7SUFFRixPQUFPO1FBQ0wsSUFBSTtRQUNKLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRTtZQUNoQixLQUFLLEVBQUUsQ0FBQztZQUNSLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7UUFDRCxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNELE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDWixJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxDQUFDO1FBQ1YsQ0FBQztRQUNELEtBQUs7UUFDTCxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQ1gsT0FBTztnQkFDTCxPQUFPO2dCQUNQLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixLQUFLO2dCQUNMLElBQUk7YUFDTCxDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDLENBQUM7QUFqRlcsUUFBQSxtQkFBbUIsdUJBaUY5QiJ9