console.log("frame-queue.js started loading");

export default class FrameQueue {
    constructor() {
        this.queue = [];
        this.everyQueue = {};
        
    };

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