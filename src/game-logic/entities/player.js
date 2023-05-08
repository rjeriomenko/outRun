//This will import different player seeds and use one to create a player
console.log("player.js started loading");
import DefaultPlayerSeed from '../default-player.json';
import MainMenuPlayerSeed from '../main-menu-player.json';
import Entity from './entity.js';
import Missile from '../abilities/missile.js';
import MainMenuAbility from '../abilities/main-menu-ability.js';


export default class Player extends Entity {
    constructor(map, seed, name = "John", color = "pink", ability = "missile") {
        super(name, Player.pickSeed(seed));
        this.seed = Player.pickSeed(seed);
        this.map = map;
        this.color = this.seed.color || color || "pink";
        this.abilities = { 
            ability: this.newAbility(ability)
        };
        this.health = this.seed.health || 300;
        this.experience = 0;
        this.level = 1;
        this.experienceToLevelUp = this.seed.experiencetolevelup || 10;
    };

    static pickSeed(seed) {
        switch (seed) {
            case "default":
                return DefaultPlayerSeed;
            case "mainmenu":
                return MainMenuPlayerSeed;
        }
    }

    damagePlayerHealth(damage) {
        this.health -= damage;
    };

    onDeath() {
        debugger
    };

    newAbility(ability) {
        switch(ability) {
            case "missile":
                return new Missile(this);
            case "mainmenuability":
                return new MainMenuAbility(this);
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