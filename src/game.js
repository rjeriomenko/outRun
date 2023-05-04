console.log("game.js started loading");
import Map from './map.js'

export default class Game {
    constructor() {
        this.map = new Map()
        this.frameTimer = setInterval(() => {
            this.update()
        }, 20) // 50 frames per second
        this.update = function(){
            console.log("frame passed")
            //update all positions, statuses, apply physics, etc
            //draw() -- render every object
        }
    }
}





console.log("game.js finished loading");