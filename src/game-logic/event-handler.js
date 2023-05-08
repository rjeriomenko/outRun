console.log("event-handler.js started loading");
import KeyboardWords from './keyboard-words.json'; //Should consider adding a keyboard class

export default class EventHandler {
    constructor(game) {
        this.game = game;
        this.events = [];
        this.triggerEvent();
    };

    triggerEvent(event = "mainmenu") {
        switch(event) {
            case "mainmenu":
                this.mainMenu()
                break;
            case "pause":
                //pause
                break;
            case "test":
                this.test();
                break;

        };
    };

    mainMenu() {
        this.game.loadMap("menuplayer", "pink", "mainmenuability");
        this.game.camera.followNewEntity(this.game.map.entities[1])
    }

    test() {
        this.game.loadMap("John", "orange", "missile", "test", "default")
    }

    pause() {

    }

    moveKey(e) {
        let k = e.key;
        switch (k) {
            case "ArrowUp":
            case "w":
                if (!e.repeat) {
                    this.game.frameQueue.everyQueuePush(`${KeyboardWords[k]}`, () => { this.game.player.move([0, -1]) });
                }
                break;
            case "ArrowRight":
            case "d":
                if (!e.repeat) {
                    this.game.frameQueue.everyQueuePush(`${KeyboardWords[k]}`, () => { this.game.player.move([1, 0]) });
                }
                break;
            case "ArrowDown":
            case "s":
                if (!e.repeat) {
                    this.game.frameQueue.everyQueuePush(`${KeyboardWords[k]}`, () => { this.game.player.move([0, 1]) });
                }
                break;
            case "ArrowLeft":
            case "a":
                if (!e.repeat) {
                    this.game.frameQueue.everyQueuePush(`${KeyboardWords[k]}`, () => { this.game.player.move([-1, 0]) });
                }
                break;
            case "Escape":
            case "p":
                if (!e.repeat) {
                    this.game.frameQueue.push(() => { this.triggerEvent("test") });
                }
                break;
        }
    }

    removeKey(e) {
        let k = e.key;
        this.game.frameQueue.everyQueueDel(`${KeyboardWords[k]}`);
    };
}
console.log("event-handler.js finished loading");