console.log("ground-slam.js started loading");
import Ability from './ability.js';
import SlamExplosion from '../entities/slam-explosion.js';

export default class GroundSlam extends Ability {
    constructor(player) {
        super(player);
        this.updateStats();
        this.coolDownTimer = 45 * this.cooldownReduction;
        this.coolDownCounter = 0;
        this.currentSlamCount = 0;
        this.duration = 12;
        this.slammedCount = 0;
    }

    updateStats() {
        this.damage = this.entity.damage / 10;
        this.coolDownTimer = 180 * this.entity.cooldownReduction;
        this.maxSlamCount = this.entity.projectileCount;
        this.onHitEffects = this.entity.onHitEffects;
    }

    activate() {
        this.updateStats();
        if (this.coolDownReady()) {
            if (this.currentSlamCount < this.maxSlamCount) { 
                let fireCoords = this.entity.findEntityCenterCoords(this.entity);
                let correctedX = fireCoords[0] - 60;
                let correctedY = fireCoords[1] - 60;
                let SlamProperties = {
                    "damage": this.damage,
                    "absolutepositionx": correctedX,
                    "absolutepositiony": correctedY,
                    "entity": this.entity,
                    "onhiteffects": this.onHitEffects,
                    "duration": this.duration,
                    "friendly": true,
                    "dimension": [120, 120],
                }
                this.map.addEntity(new SlamExplosion(`slam${this.slammedCount}`, SlamProperties));
                this.slammedCount++;
                this.currentSlamCount++

                if (this.currentSlamCount < this.maxSlamCount) { 
                    this.coolDownTimer = 10;
                    this.currentSlamCount++;
                }
            }
            if (this.currentSlamCount === this.maxSlamCount) {
                this.currentSlamCount = 0;
            };
        };
    };

    coolDownReady() {
        if (this.coolDownCounter <= 0) {
            this.coolDownCounter = this.coolDownTimer;
            return true;
        } else {
            this.coolDownCounter--;
        };
    };
}
console.log("ground-slam.js finished loading");