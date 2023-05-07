console.log("missile.js started loading");
import Ability from './ability.js';
import MissileProjectile from '../entities/missile-projectile.js';

export default class Missile extends Ability {
    constructor(player) {
        super(player);
        this.damage = 5;
        this.projectileSpeed = 5;
        this.coolDownTimer = 60;
        this.coolDownCounter = 0;
        this.firedCount = 0;
    }

    activate() {
        if(this.coolDownReady()) {
            let fireCoords = this.entity.findEntityCenterCoords(this.entity);
            this.firedCount++;
            let MissileProperties = {
                "damage": this.damage,
                "speed": this.projectileSpeed,
                "absolutepositionx": fireCoords[0],
                "absolutepositiony": fireCoords[1]
            }
            this.map.addEntity(new MissileProjectile(`missile${this.firedCount}`, MissileProperties));
        }
    }

    coolDownReady() {
        if (this.coolDownCounter === 0) {
            this.coolDownCounter = this.coolDownTimer;
            return true;
        } else {
            this.coolDownCounter--;
        };
    };
}
console.log("missile.js finished loading");