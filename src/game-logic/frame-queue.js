console.log("frame-queue.js started loading");

export default class FrameQueue {
    constructor() {
        this.queue = [];
        
    };

    frameQueueExecute() {
        while(this.queue.length) {
            (this.shift())()
        }
    };

    push(func) {
        this.queue.push(func)
    }
}

console.log("frame-queue.js finished loading");