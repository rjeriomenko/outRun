console.log("missile.js started loading");
import Ability from './ability.js';
import MissileProjectile from '../entities/missile-projectile.js';

export default class Missile extends Ability {
    constructor(player) {
        super(player);
        this.updateStats();
        this.projectileSpeed = 5;
        this.coolDownTimer = 60 * this.cooldownReduction;
        this.coolDownCounter = 0;
        this.currentProjectileCount = 0;
        this.firedCount = 0;
    }

    updateStats() {
        this.damage = this.entity.damage * 1;
        this.coolDownTimer = 60 * this.entity.cooldownReduction;
        this.maxProjectileCount = this.entity.projectileCount;
        this.onHitEffects = this.entity.onHitEffects;
    }

    randomSign(){
        if (Math.random() > 0.5) {
            return -1;
        } else {
            return 1;
        };
    };

    offsetFireCoords(fireCoords) {
        let offsetX = fireCoords[0] + (Math.random() * 15 * this.randomSign());
        let offsetY = fireCoords[1] + (Math.random() * 15 * this.randomSign());

        return [offsetX, offsetY];
    }

    activate() {
        this.updateStats();
        if(this.coolDownReady()) {
            while (this.currentProjectileCount < this.maxProjectileCount) {
                let fireCoords = this.entity.findEntityCenterCoords(this.entity);
                let offsetFireCoords = this.offsetFireCoords(fireCoords);
                let MissileProperties = {
                    "damage": this.damage,
                    "speed": this.projectileSpeed,
                    "absolutepositionx": offsetFireCoords[0],
                    "absolutepositiony": offsetFireCoords[1],
                    "entity": this.entity,
                    "onhiteffects": this.onHitEffects
                }
                this.map.addEntity(new MissileProjectile(`missile${this.firedCount}`, MissileProperties));
                this.firedCount++;
                this.currentProjectileCount++
            }
            this.currentProjectileCount = 0;
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
console.log("missile.js finished loading");