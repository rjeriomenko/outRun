console.log("missile-projectile.js started loading");
import Projectile from './projectile.js';

export default class MissileProjectile extends Projectile {
    constructor(missileName, missileProperties) {
        super(missileName, missileProperties);
        this.damage = missileProperties.damage;
        this.speed = missileProperties.speed;
        this.onHitEffects = missileProperties.onhiteffects
        this.entity = missileProperties.entity;
        this.dimension = [4, 4];
        this.duration = 120;
        this.color = "blue";
        this.collide = false;
        this.currentSplitCount = 0;
        this.projectileType = "missile";
        this.constructorProperties = missileProperties;
        this.sprite = "spriteurl";
    }

    directionToTarget() {  //finds target X and Y (assuming the max either can be is 1)
        let closestEnemy = this.closestEnemy();
        if (closestEnemy === this) { return [0,0] };
        let targetPosition = this.findEntityCenterCoords(closestEnemy);
        let deltaX = targetPosition[0] - this.absolutePosition[0];
        let deltaY = targetPosition[1] - this.absolutePosition[1];

        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
            let biggerSide;
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                biggerSide = Math.abs(deltaX);
            } else {
                biggerSide = Math.abs(deltaY);
            }
            deltaX /= biggerSide;
            deltaY /= biggerSide;
        }

        return [deltaX, deltaY];
    }

    collidingEnemy() {
        let currentPosition = this.absolutePosition;

        for (const entity in this.map.entities) {
            let ent = this.map.entities[entity];
            if (ent.enemyType && this.collidingWithEntityAtCoord(ent, currentPosition)) {
                return ent;
            };
        };
    };

    triggerOnHitEffects(target) {
        for (const effect in this.onHitEffects) {
            let efct = this.onHitEffects[effect]
            this.entity.game.frameQueue.push(() => { efct.activate(this, target) });
        };
    }

    doDamage() {
        let targetEnemy = this.collidingEnemy();
        
        if (targetEnemy && targetEnemy.currentHealth > 0) {
            targetEnemy.damageEnemyHealth(this.damage);
            this.triggerOnHitEffects(targetEnemy);
            this.onDeath();
        };
    };

    projectileCountCheck() {
        let missileCount = 0;
        for (const entity in this.map.entities) {
            if(entity.projectileType === "missile") {
                missileCount++;
            };
        };

        if (missileCount > 20) {
            this.onDeath();
        };
    };
}
console.log("missile-projectile.js finished loading");