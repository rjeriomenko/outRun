console.log("player.js started loading");
import PlayerSeed from '../player.json';
import Entity from './entity.js';
import Missile from '../abilities/missile.js';

export default class Player extends Entity {
    constructor(map, name = "John", color = "pink", ability = "missile") {
        super(name, PlayerSeed);
        this.map = map;
        this.color = color;
        this.abilities = { 
            ability: this.newAbility(ability)
        };
    };

    newAbility(ability) {
        switch(ability) {
            case "missile":
                return new Missile(this);
        }
    }
}
console.log("player.js finished loading");