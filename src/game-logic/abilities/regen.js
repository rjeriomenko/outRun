console.log("regen.js started loading");
import Ability from './ability.js';

export default class Regen extends Ability {
    constructor(player) {
        super(player);
        this.regenAmount = 2.5
        this.coolDownTimer = 30;
        this.coolDownCounter = 0;
        this.regenTotal = 0
    }

    increaseRegen(amount) {
        this.regenAmount += amount;
    }

    activate() {
        debugger
        if (this.coolDownReady()) {
            let possibleHealth = this.entity.currentHealth + this.regenAmount;
            if (possibleHealth >= this.entity.maxHealth) {
                this.regenTotal += this.entity.maxHealth - this.entity.currentHealth;
                this.entity.currentHealth = this.entity.maxHealth;
            } else { 
                this.entity.currentHealth = possibleHealth;
                this.regenTotal += this.regenAmount;
            }
        }
    }

    coolDownReady() {
        if (this.coolDownCounter <= 0) {
            this.coolDownCounter = this.coolDownTimer;
            return true;
        } else {
            this.coolDownCounter--;
        };
    };
}
console.log("regen.js finished loading");