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
        this.health = 1;
        this.experience = 0;
        this.level = 1;
        this.experienceToLevelUp = 10;
    };

    newAbility(ability) {
        switch(ability) {
            case "missile":
                return new Missile(this);
        }
    }

    gainExperience(experience) {
        this.experience = this.experience + experience;
        if(this.experience > this.experienceToLevelUp) {
            this.experience -= this.experienceToLevelUp;
            this.levelUp();
        };
    };

    levelUp() {
        this.level += 1;
        this.experienceToLevelUp *= 2;      
    };
}
console.log("player.js finished loading");