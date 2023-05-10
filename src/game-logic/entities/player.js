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
        this.specialPool = LevelPool.special;
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
        this.experienceToLevelUp *= 0.0001;  //Need to tweak this
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
            let weighing = pool[unrolledPick].weighing;
            if(this.rollForPick(weighing)) {
                chosenPick = unrolledPick;
            }
        }

        return chosenPick;
    };

    pullStatAndColor() {
        let stats = LevelPool.stats;
        let pickedStat = this.pickWithWeighing(stats);
        let color = stats[pickedStat].color

        return [pickedStat, color];
    };

    pullSpecialColorCount() {
        let pickedSpecial = this.pickWithWeighing(this.specialPool);
        let color = this.specialPool[pickedSpecial].color;
        let count = this.specialPool[pickedSpecial].count;

        return [pickedSpecial, color, count];
    };

    checkChoicesDuplicate(chosenArray, newChoice) {
        for(let i = 0; i < chosenArray.length; i++) {
            if(newChoice[0] === chosenArray[i][0]) {
                return true;
            };
        };

        return false;
    }

    pullChoicesFromLevelPool() {   //pull from levelpool via weighing and amount allowed;
        let choices = [];
        let choice;

        if (this.level % 3 === 0) { //special level-up
            let unpushedLength = choices.length;
            while (choices.length === unpushedLength) {
                choice = this.pullSpecialColorCount();
                if (choice[2] !== 0) {
                    // this.specialPool[choice[0]].count -= 1; //NEEEEED PLAYER CHOSEN COUNT LOGIC
                    choices.push([choice[0], choice[1]]);
                }
            }
            while (choices.length < 3) {
                if (Math.random() < 0.5) {
                    unpushedLength = choices.length;
                    while (choices.length === unpushedLength) {
                        choice = this.pullSpecialColorCount();
                        if (choice[2] !== 0 && !this.checkChoicesDuplicate(choices, choice)) {
                            // this.specialPool[choice[0]].count -= 1;  //NEEEEED PLAYER CHOSEN COUNT LOGIC
                            choices.push([choice[0], choice[1]]);
                        };
                    };
                } else {
                    choice = this.pullStatAndColor();
                    if (!this.checkChoicesDuplicate(choices, choice)) {
                        choices.push(choice);
                    };
                };
            };

        } else {
            while (choices.length < 3) {  // regular level-up
                choice = this.pullStatAndColor();
                if (!this.checkChoicesDuplicate(choices, choice)) {
                    choices.push(choice);
                };
            };
        };

        console.log(choices);
        return choices;
    }
}
console.log("player.js finished loading");