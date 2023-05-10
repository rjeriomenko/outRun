//This will import different player seeds and use one to create a player
console.log("player.js started loading");
import DefaultPlayerSeed from '../default-player.json';
import MainMenuPlayerSeed from '../main-menu-player.json';
import Entity from './entity.js';
import Missile from '../abilities/missile.js';
import MainMenuAbility from '../abilities/main-menu-ability.js';
import LevelPool from '../levelPool.json';


export default class Player extends Entity {
    constructor(game, map, seed, name = "John", color = "pink", ability = "missile") {
        super(name, Player.pickSeed(seed));
        this.game = game;
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
        this.levelPool = LevelPool;
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
        this.game.eventHandler.triggerEvent("gameover")
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
        this.experienceToLevelUp *= 2;  //Need to tweak this
        this.game.eventHandler.triggerEvent("levelup")
    };

    rollForPick(weighing) {
        return weighing > Math.random();
    }

    pickWithWeighing(pool) {
        let chosenPick;

        while(!chosenPick) {
            let poolKeys = Object.keys(pool);
            let randomIndex = Math.floor(Math.random() * poolKeys.length);
            let unrolledPick = poolKeys[randomIndex];
            let weighing = pool[unrolledPick];
            if(this.rollForPick(weighing)) {
                chosenPick = unrolledPick;
            }
        }

        return chosenPick;
    };

    pullStat() {
        let stats = this.levelPool.stats;
        return this.pickWithWeighing(stats);
    };

    pullChoicesFromLevelPool() {   //pull from levelpool via weighing and amount allowed;
        let choices = [];
        let choice;

        if (this.level % 3 === 0) {
            //special leveling logic
            // choice =
        } else {
            while (choices.length < 3) {  //normal leveling logic
                choice = this.pullStat();
                if(!choices.includes(choice)) {
                    choices.push(choice);
                };
            };
        };

        return choices;
    }
}
console.log("player.js finished loading");