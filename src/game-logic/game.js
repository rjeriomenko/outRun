//This will handle all game logic, including updating and rendering the map between every frame
//This will import .json map-seeds and create new Map instances from them
//This will update the map as more entities are created or destroyed
//This will allow the user to change maps
//When an entity is created, it will be given an absolute pos and (optionally) be given a subclass with subclass properties and added to the current map
//When an entity is destroyed, it will be removed from the current map
console.log("game.js started loading");
import Map from './map.js';
import Render from './render.js';
import TestSeed from './map-seeds/test-map.json';
import Camera from './camera.js';
import Player from './player.js';
import FrameQueue from './frame-queue.js'
import KeyboardWords from './keyboard-words.json'

export default class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.player = new Player();
        this.loadMap(this.player); // load default test map with default player
        this.camera = new Camera(ctx, canvas, this.player);
        this.frameQueue = new FrameQueue
        this.frameTimer = setInterval(() => { this.update() }, (1000/60)); // update every frame at 60 frames per second -- Can be replaced with window.requestAnimationFrame()
        window.addEventListener('keydown', (e) => { this.moveKey(e) }, false)
        window.addEventListener('keyup', (e) => { this.removeKey(e) }, false)
    };

    loadMap(player, seed = TestSeed) {
        this.map = new Map(player, seed);
    };

    update() {
        this.logicStep(); //update camera, all positions, statuses, apply physics, etc
        this.drawFrame(this.ctx, this.canvas, this.map); // draw everything on the map
        console.log("frame passed");
    };

    logicStep() {
        this.frameQueue.frameQueueExecute()
        this.camera.followEntity(); // update camera to new follow coordinates
    }

    drawFrame(ctx, canvas, map) {
        new Render(ctx, canvas, map);
    };

    moveKey(e) {
        let k = e.key;
        switch (k) {
            case "ArrowUp":
            case "w":
                if(!e.repeat) {
                this.frameQueue.everyQueuePush(`${KeyboardWords[k]}`, () => {this.player.move([0, -1])});
                }
                break;
            case "ArrowRight":
            case "d":
                if (!e.repeat) {
                    this.frameQueue.everyQueuePush(`${KeyboardWords[k]}`, () => { this.player.move([1, 0]) });
                }
                break;
            case "ArrowDown":
            case "s":
                if (!e.repeat) {
                    this.frameQueue.everyQueuePush(`${KeyboardWords[k]}`, () => { this.player.move([0, 1]) });
                }
                break;
            case "ArrowLeft":
            case "a":
                if (!e.repeat) {
                    this.frameQueue.everyQueuePush(`${KeyboardWords[k]}`, () => { this.player.move([-1, 0]) });
                }
                break;
        }
    }

    removeKey(e) {
        let k = e.key;
        this.frameQueue.everyQueueDel(`${KeyboardWords[k]}`);
    }
}


console.log("game.js finished loading");