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
                this.instructions();
                break;
            case "gameover":
                this.gameOver();
                break;
            case "levelup":
                //leveluplogic
                break;
            case "levelupchoice1":
            case "levelupchoice2":
            case "levelupchoice3":
                //levelupchoicelogic
                break;
        };
    };

    addEventListeners() {
        let gameContainer = document.querySelector('#game')
        window.addEventListener('keydown', (e) => { this.moveKey(e) }, false); // allow eventHandler to handle kebyoard input
        window.addEventListener('keyup', (e) => { this.removeKey(e) }, false); // make repeat player movement browser-agnostic
        window.addEventListener('mousemove', (e) => { gameContainer.style.cursor = 'auto'} );
        this.addMenuListeners("#main-menu-list");
        this.addMenuListeners("#pause-menu-list");
        this.addMenuListeners("#instructions-menu-list");
        this.addMenuListeners("#game-over-menu-list");
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

    addMenuListeners(menuSelector) {
        let menu = document.querySelector(menuSelector);
        menu.addEventListener('mouseover', (e) => { this.mouseOverSelected(e) });
        menu.addEventListener('mouseout', () => { this.clearListSelected() });
        menu.addEventListener('click', (e) => {
            if (e.target.dataset.trigger) {
                this.triggerEvent(e.target.dataset.trigger);
            };
        });
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
            this.pause();
        };

        if (this.checkEvent("gameover")) {
            this.gameOver();
        };

        this.clearEvents();
        this.game.loadMap("John", "orange", "missile", map, "default");
        this.hideNode(".main-menu");
        this.hideNode(".pause-menu");
        this.hideNode(".game-over-menu");
        this.hideNode(".level-up-menu");
        this.showViewBorder();
    }

    applyChildSelected(selector) {
        let parent = document.querySelector(selector);
        let i = 0
        let child = parent.children[i];
        while(!child.dataset.trigger) {
            i++
            child = parent.children[i]
        }
        child.dataset.selected = true;
        return child;
    }
    
    mainMenu() {
        if (this.checkEvent("pause")) {
            this.pause();
        };

        if (this.checkEvent("gameover")) {
            this.gameOver();
        };

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

    instructions() {
        if (this.checkEvent("instructions")) {
            this.events.splice(this.events.indexOf("instructions"), 1);
            let currentMenu = this.events[0]
            this.clearEvent("instructions");
            this.clearListSelected();
            this.hideNode(".instructions-menu");
            if (currentMenu === "pause") {
                this.applyChildSelected("#pause-menu-list");
                this.showNode(".pause-menu")
            } else {
                this.applyChildSelected("#main-menu-list");
                this.showNode(".main-menu")
            }
        } else {
            this.clearListSelected();
            this.addEvent("instructions");
            this.applyChildSelected("#instructions-menu-list");
            this.hideNode(".pause-menu");
            this.hideNode(".main-menu");
            this.showNode(".instructions-menu");
        }
    }

    gameOver() {
        if (this.checkEvent("gameover")) {
            this.hideNode(".game-over-menu");
            this.clearEvents();
            this.game.newFrameTimer();
        } else {
            clearInterval(this.game.frameTimer);
            this.game.frameQueue.clearQueue();
            this.game.newPauseFrameTimer();
            this.addEvent("gameover");
            this.applyChildSelected("#game-over-menu-list");
            this.showNode(".game-over-menu");
        };
    }
    
    navigateUpList(selectedElement) {
        selectedElement.dataset.selected = false;
        let previousElement = selectedElement.previousElementSibling;

        if (!previousElement || !previousElement.dataset.trigger) {
            previousElement = selectedElement.parentElement.lastElementChild;
        }

        previousElement.dataset.selected = true;
    }
    
    navigateDownList(selectedElement) {
        selectedElement.dataset.selected = false;
        let nextElement = selectedElement.nextElementSibling;

        if (!nextElement || !nextElement.dataset.trigger) {
            let parent = selectedElement.parentElement;
            let i = 0;
            nextElement = parent.children[i];
            while (!nextElement.dataset.trigger) {
                i++;
                nextElement = parent.children[i];
            };
        };

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

        if (this.checkEvent("instructions")) {
            parentMenuList = document.querySelector("#instructions-menu-list");
        } else {
            let currentMenu = this.events[0];
            switch (currentMenu) {
                case "mainmenu":
                    parentMenuList = document.querySelector("#main-menu-list");
                    break;
                case "pause":
                    parentMenuList = document.querySelector("#pause-menu-list");
                    break;
                case "gameover":
                    parentMenuList = document.querySelector("#game-over-menu-list");
                    break;
                case "levelup":
                    parentMenuList = document.querySelector("#level-up-menu-list");
                    break;
            };
        };

        let selectedElement = document.querySelector('[data-selected="true"]');
        if(!selectedElement) {
            selectedElement = this.applyChildSelected(`#${parentMenuList.id}`);
        }

        this.menuKeySelect(keyName, selectedElement);
    }

    move(direction) {
        this.game.player.move(direction);
    };

    moveKey(e) {
        let gameContainer = document.querySelector('#game')
        gameContainer.style.cursor = 'none';  //hides mouse while using keyboard

        let k = e.key;
        let keyName = KeyboardWords[k]
        switch (k) {
            case "ArrowUp":
            case "w":
            case "W":
                if (!e.repeat) {
                    if (this.emptyEvents()){
                        this.game.frameQueue.everyQueuePush(`${keyName}`, () => { this.move([0, -1]) });
                    } else {
                        this.menuKeyPrepareSelect(keyName);
                    }
                }
                break;
            case "ArrowRight":
            case "d":
            case "D":
                if (!e.repeat) {
                    if (this.emptyEvents()) {
                        this.game.frameQueue.everyQueuePush(`${keyName}`, () => { this.move([1, 0]) });
                    } else {
                        this.menuKeyPrepareSelect(keyName);
                    }
                }
                break;
            case "ArrowDown":
            case "s":
            case "S":
                if (!e.repeat) {
                    if (this.emptyEvents()) {
                        this.game.frameQueue.everyQueuePush(`${keyName}`, () => { this.move([0, 1]) });
                    } else {
                        this.menuKeyPrepareSelect(keyName);
                    }
                }
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                if (!e.repeat) {
                    if (this.emptyEvents()) {
                        this.game.frameQueue.everyQueuePush(`${keyName}`, () => { this.move([-1, 0]) });
                    } else {
                        this.menuKeyPrepareSelect(keyName);
                    }
                }
                break;
            case "Escape":
            case "p":
            case "P":
                if (!e.repeat) {
                    this.triggerEvent("pause");
                }
                break;
            case "Enter":
            case " ":
                if (!e.repeat) {
                    this.triggerEvent("enter");
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