//This will import different player seeds and use one to create a player
console.log("player.js started loading");
import DefaultPlayerSeed from '../default-player.json';
import MainMenuPlayerSeed from '../main-menu-player.json';
import Entity from './entity.js';
import LevelPool from '../levelPool.json';
import Missile from '../abilities/missile.js';
import MainMenuAbility from '../abilities/main-menu-ability.js';
import Regen from '../abilities/regen.js';
import ProjectileSplit from '../abilities/projectile-split.js';
import AttackExplosion from '../abilities/attack-explosion.js';
import GroundSlam from '../abilities/ground-slam.js';


export default class Player extends Entity {
    constructor(game, map, seed, name = "John", color = "pink", ability = "missile") {
        super(name, Player.pickSeed(seed));
        this.game = game;
        this.seed = Player.pickSeed(seed);
        this.map = map;
        this.color = this.seed.color || color || "pink";
        this.abilities = {};
        this.newAbility(ability);
        this.onHitEffects = {};
        this.maxHealth = this.seed.health || 300;
        this.currentHealth = this.maxHealth;
        this.damage = 5;
        this.cooldownReduction = 1;
        this.projectileCount = 1;
        this.dodgeChance = 1;
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
        if(Math.random() < this.dodgeChance) {
            this.currentHealth -= damage;
        };
    };

    onDeath() {
        this.game.eventHandler.triggerEvent("gameover")
    };

    gainUpgrade(upgrade) {
        if (this.specialPool[upgrade]) {
            this.specialPool[upgrade].count -= 1
        }

        switch (upgrade) {
            case "max-health": 
                this.maxHealth += 60;
                this.currentHealth += 60;
                break;
            case "health-regen":
                if (!this.abilities[upgrade]) {
                    this.newAbility(upgrade);
                } else {
                    this.abilities[upgrade].increaseRegen(2.5);
                };
                break;
            case "run-speed":
                this.speed += 0.5
                break;
            case "damage":
                this.damage += 3 + (this.map.difficulty / 2)
                break;
            case "ability-cooldown":
                this.cooldownReduction -= 0.1;
                break;
            case "projectile-count":
                this.projectileCount += 1;
                break;
            case "dodge-chance":
                this.dodgeChance -= 0.22;
                break;
            case "projectile-split":
                if (!this.onHitEffects[upgrade]) {
                    this.newOnHitEffect(upgrade);
                } else {
                    this.onHitEffects[upgrade].increaseSplits(1);
                };
                break;
            case "attack-explosion":
                this.newOnHitEffect(upgrade);
                break;
            case "ground-slam":
                this.newAbility(upgrade)
                break;
                
        }
    }

    newAbility(ability) {
        let abilityInstance;
        switch(ability) {
            case "missile":
                abilityInstance = new Missile(this);
                break;
            case "mainmenuability":
                abilityInstance = new MainMenuAbility(this);
                break;
            case "health-regen":
                abilityInstance = new Regen(this);
                break;
            case "ground-slam":
                abilityInstance = new GroundSlam(this)
                break;
        }

        this.abilities[ability] = abilityInstance;
    }

    newOnHitEffect(effect) {
        let onHitInstance;
        switch (effect) {
            case "projectile-split":
                onHitInstance = new ProjectileSplit(this);
                break;
            case "attack-explosion":
                onHitInstance = new AttackExplosion(this);
                break;
        }

        this.onHitEffects[effect] = onHitInstance;
    }

    gainExperience(experience) {
        this.experience = this.experience + experience;
        if(this.experience >= this.experienceToLevelUp) {
            this.experience -= this.experienceToLevelUp;
            this.levelUp();
        };
    };

    levelUp() {
        this.level += 1;
        this.experienceToLevelUp *= 1.25;  //Need to tweak this
        this.game.eventHandler.triggerEvent("levelup");
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
                    choices.push([choice[0], choice[1]]);
                }
            }
            while (choices.length < 3) {
                if (Math.random() < 0.5) {
                    unpushedLength = choices.length;
                    while (choices.length === unpushedLength) {
                        choice = this.pullSpecialColorCount();
                        if (choice[2] !== 0 && !this.checkChoicesDuplicate(choices, choice)) {
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

        return choices;
    }
}
console.log("player.js finished loading");