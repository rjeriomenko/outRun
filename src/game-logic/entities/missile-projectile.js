console.log("missile-projectile.js started loading");
import Projectile from './projectile.js';

export default class MissileProjectile extends Projectile {
    constructor(missileName, missileProperties) {
        super(missileName, missileProperties);
        this.damage = missileProperties.damage;
        this.speed = missileProperties.speed;
        this.dimension = [4, 4];
        this.color = "blue";
        this.collide = false;
        this.sprite = "spriteurl";
        this.projectileType = "missile";
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

    doDamage() {
        let targetEnemy = this.collidingEnemy();
        
        if (targetEnemy) {
            targetEnemy.health -= this.damage;
            this.onDeath();
        };
    };
}
console.log("missle-projectile.js finished loading");