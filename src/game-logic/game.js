//This will import .json-maps and create a new Map instance to load them
console.log("game.js started loading");
import Map from './map.js';
import TestSeed from './map-seeds/test-map.json'

export default class Game {
    constructor() {
        this.loadMap(TestSeed); // load default test map
        this.frameTimer = setInterval(() => {
            this.update();
        }, 20) // 50 frames per second -- Can be replaced with window.requestAnimationFrame()
        this.update = function(){
            console.log("frame passed");
            //update all positions, statuses, apply physics, etc
            //draw() -- render every object
        };
    };

    loadMap(seed) {
        this.map = new Map(seed)
    }
}





console.log("game.js finished loading");