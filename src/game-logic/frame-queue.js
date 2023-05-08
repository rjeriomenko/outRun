console.log("frame-queue.js started loading");

export default class FrameQueue {
    constructor(restoreQueue) {
        this.clearQueue()
        this.restoreQueue(restoreQueue)
    };

    clearQueue() {
        this.queue = [];
        this.everyQueue = {};
    }

    restoreQueue(restoreQueue) {
        if (restoreQueue) {
            this.queue = restoreQueue[0]
            this.Everyqueue = restoreQueue[1]
        }
    }

    push(func) {
        this.queue.push(func)
    }

    everyQueuePush(funcKey, func) {
        this.everyQueue[funcKey] = func
    }

    everyQueueDel(funcKey) {
        delete this.everyQueue[funcKey]
    }

    frameQueueExecute() {
        for (const funcKey in this.everyQueue) {
            this.queue.unshift(this.everyQueue[funcKey])
        };

        while(this.queue.length) {
            (this.queue.shift())()
        }
    };
}

console.log("frame-queue.js finished loading");