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

export default class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.originCords = [0, 0];
        this.loadMap(); // load default test map with no argument
        this.frameTimer = setInterval(() => { this.update() }, 20) // update every frame at 50 frames per second -- Can be replaced with window.requestAnimationFrame()
    };

    loadMap(seed = TestSeed) {
        this.map = new Map(seed);
    };

    update() {
        //logicStep() -- update all positions, statuses, apply physics, etc
        this.drawFrame(this.ctx, this.map, this.originCords); // draw everything on the map relative to the originCords
        console.log("frame passed");
    };

    drawFrame(ctx, map, originCords) {
        new Render(ctx, map, originCords);
    };
}


console.log("game.js finished loading");