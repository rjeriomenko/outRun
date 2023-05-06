console.log("player.js started loading");
import PlayerSeed from './player.json';
import Entity from './entities/entity.js';

export default class Player extends Entity {
    constructor(name = "John", color = "pink") {
        super(name, PlayerSeed)
        this.color = color
    }
}


console.log("player.js finished loading");