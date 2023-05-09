console.log("event-handler.js started loading");
import KeyboardWords from './keyboard-words.json';

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
                this.pause()
                break;
            case "play":
                this.loadMap("test");
                break;
            case "enter":
                this.enter();
                break;
            case "instructions":
                //Instructions logic
                break;
            case "gameover":
                //GameOver logic
                break;
        };
    };

    addEventListeners() {
        window.addEventListener('keydown', (e) => { this.moveKey(e) }, false); // allow eventHandler to handle kebyoard input
        window.addEventListener('keyup', (e) => { this.removeKey(e) }, false); // make repeat player movement browser-agnostic
        this.addMainMenuListeners();
        this.addPauseMenuListeners();
    }

    clearListSelected() {
        let listElements = document.querySelectorAll('li')
        for (let i = 0; i < listElements.length; i++) {
            let list = listElements[i];
            list.dataset.selected = false;
        }
    }

    mouseOverSelected(event) {
        let target = event.target
        if(target.dataset.trigger) {
            this.clearListSelected();
            target.dataset.selected = true;
        }
    }

    addMainMenuListeners() {
        let mainMenu = document.querySelector("#main-menu-list");
        mainMenu.addEventListener('click', (e) => { this.triggerEvent(e.target.dataset.trigger) });
        mainMenu.addEventListener('mouseover', (e) => { this.mouseOverSelected(e) });
        mainMenu.addEventListener('mouseout', () => { this.clearListSelected() });
    }

    addPauseMenuListeners() {
        let pauseMenu = document.querySelector("#pause-menu-list");
        pauseMenu.addEventListener('click', (e) => { this.triggerEvent(e.target.dataset.trigger) });
        pauseMenu.addEventListener('mouseover', (e) => { this.mouseOverSelected(e) });
        pauseMenu.addEventListener('mouseout', () => { this.clearListSelected() });
    }

    addEvent(event) {
        this.events.push(event);
    }

    emptyEvents() {
        return this.events.length === 0;
    }

    clearEvent(event) {
        let eventIndex = this.events.indexOf(event);
        if(eventIndex > -1) {
            this.events.splice(eventIndex);
        };
    };

    clearEvents() {
        this.events = [];
    }
    
    checkEvent(event) {
        return this.events.includes(event);
    }

    showNode(node) {
        let Node = document.querySelector(node);
        Node.style.visibility = "visible"
    }

    hideNode(node) {
        let Node = document.querySelector(node);
        Node.style.visibility = "hidden"
    }

    showViewBorder() {
        let view = document.querySelector("#view");
        view.style.border = "double 6px rgb(150, 150, 150)";
    }

    hideViewBorder() {
        let view = document.querySelector("#view");
        view.style.border = "none";

    }
    
    loadMap(map = "test") {
        if (this.checkEvent("pause")) {
            this.pause()
        }
        this.clearEvents();
        this.game.loadMap("John", "orange", "missile", map, "default");
        this.hideNode(".main-menu");
        this.hideNode(".pause-menu");
        this.showViewBorder();
    }

    applyChildSelected(selector) {
        let parent = document.querySelector(selector);
        let child = parent.children[1];
        child.dataset.selected = true;
        return child;
    }
    
    mainMenu() {
        if (this.checkEvent("pause")) {
            this.pause();
        }
        this.clearEvents();
        this.applyChildSelected("#main-menu-list");
        this.game.loadMap("menuplayer", "pink", "mainmenuability");
        this.game.camera.followNewEntity(this.game.map.entities[1]);
        this.addEvent("mainmenu");
        this.showNode(".main-menu");
        this.hideViewBorder();
    };

    restoreFrameQueueAndFrameTimer() {
        clearInterval(this.game.frameTimer);
        this.game.restoreFrameQueueAndFrameTimer([this.storedQueue, this.storedEveryQueue]);
    };

    storeFrameQueueAndFrameTimer() {
        clearInterval(this.game.frameTimer);
        this.storedQueue = this.game.frameQueue.queue;
        this.storedEveryQueue = this.game.frameQueue.everyQueue;
        this.game.frameQueue.clearQueue();
    };
    
    pause() { // clears setInterval and pauses the game
        if (this.checkEvent("pause")) {
            this.clearListSelected();
            this.restoreFrameQueueAndFrameTimer();
            this.clearEvent("pause");
            this.hideNode(".pause-menu");

        } else if (this.emptyEvents()) {
            this.storeFrameQueueAndFrameTimer();
            this.clearListSelected();
            this.applyChildSelected("#pause-menu-list");
            this.game.newPauseFrameTimer(); // allows for setInterval to resume without updating the game
            this.addEvent("pause");
            this.showNode(".pause-menu");
        }
    }

    enter() {
        let element = document.querySelector('[data-selected="true"]');
        if (element) {
            element.dataset.selected = false;
            this.triggerEvent(element.dataset.trigger);
        }
    };
    
    navigateUpList(selectedElement) {
        selectedElement.dataset.selected = false;
        let previousElement = selectedElement.previousElementSibling;
        let firstElement = selectedElement.parentElement.firstElementChild;
        if (!previousElement || previousElement === firstElement) {
            previousElement = selectedElement.parentElement.lastElementChild;
        }
        previousElement.dataset.selected = true;
    }
    
    navigateDownList(selectedElement) {
        selectedElement.dataset.selected = false;
        let nextElement = selectedElement.nextElementSibling;
        if (!nextElement) {
            nextElement = selectedElement.parentElement.children[1];
        }
        nextElement.dataset.selected = true;
    }
    
    menuKeySelect(keyName, selectedElement) {
        switch (keyName) {
            case "up":
            case "left":
                this.navigateUpList(selectedElement);
                break;
            case "down":
            case "right":
                this.navigateDownList(selectedElement);
                break;
        }
    }

    menuKeyPrepareSelect(keyName) {
        let parentMenuList;

        if (this.checkEvent("mainmenu")) {
            parentMenuList = document.querySelector("#main-menu-list");
        } else if (this.checkEvent("pause")) {
            parentMenuList = document.querySelector("#pause-menu-list");
        }

        let selectedElement = document.querySelector('[data-selected="true"]');
        if(!selectedElement) {
            selectedElement = this.applyChildSelected(`#${parentMenuList.id}`);
        }

        this.menuKeySelect(keyName, selectedElement);
    }

    move(direction, keyName) {
        if (this.emptyEvents()) {
            this.game.player.move(direction);
        } else {
            this.menuKeyPrepareSelect(keyName);

        }
    };

    moveKey(e) {
        let k = e.key;
        let keyName = KeyboardWords[k]
        switch (k) {
            case "ArrowUp":
            case "w":
                if (!e.repeat) {
                    this.game.frameQueue.everyQueuePush(`${keyName}`, () => { this.move([0, -1], keyName) }); //SCROLLING MIGHT BE TOO FAST
                }
                break;
            case "ArrowRight":
            case "d":
                if (!e.repeat) {
                    this.game.frameQueue.everyQueuePush(`${keyName}`, () => { this.move([1, 0], keyName) });
                }
                break;
            case "ArrowDown":
            case "s":
                if (!e.repeat) {
                    this.game.frameQueue.everyQueuePush(`${keyName}`, () => { this.move([0, 1], keyName) });
                }
                break;
            case "ArrowLeft":
            case "a":
                if (!e.repeat) {
                    this.game.frameQueue.everyQueuePush(`${keyName}`, () => { this.move([-1, 0], keyName) });
                }
                break;
            case "Escape":
            case "p":
                if (!e.repeat) {
                    this.game.frameQueue.push(() => { this.triggerEvent("pause") });
                }
                break;
            case "Enter":
            case " ":
                if (!e.repeat) {
                    this.game.frameQueue.push(() => { this.triggerEvent("enter") });
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