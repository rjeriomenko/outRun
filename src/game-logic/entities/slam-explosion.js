console.log("slam-explosion.js started loading");
import Explosion from './explosion.js';

export default class SlamExplosion extends Explosion {
    constructor(explosionName, explosionProperties) {
        super(explosionName, explosionProperties);
        this.onHitEffects = explosionProperties.onhiteffects
        this.friendly = explosionProperties.friendly;
        this.color = "blue";
        this.currentSplitCount = 0;
        this.projectileType = "slam-explosion";
        this.constructorProperties = explosionProperties;
        this.entity = explosionProperties.entity;
        this.sprite = "spriteurl";
    }

    triggerOnHitEffects(target) {
        for (const effect in this.onHitEffects) {
            let efct = this.onHitEffects[effect]
            this.entity.game.frameQueue.push(() => { efct.activate(this, target) });
        };
    }

    doDamage() {
        let targetEntities = this.collidingEntities();

        for (const entity of targetEntities) {
            if (entity && entity.currentHealth > 0) {
                if (entity.enemyType) {
                    entity.damageEnemyHealth(this.damage);
                    this.triggerOnHitEffects(entity);
                } else {
                    entity.damagePlayerHealth(this.damage);
                };
            };
        };
    };

    projectileCountCheck() {
        let slamCount = 0;
        for (const entity in this.map.entities) {
            if (entity.projectileType === "slam") {
                slamCount++;
            };
        };

        if (slamCount > 20) {
            this.onDeath();
        };
    };

}
console.log("slam-explosion.js finished loading");