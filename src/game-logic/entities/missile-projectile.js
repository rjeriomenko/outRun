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

    directionToEnemy() {  //finds target X and Y (assuming the max either can be is 1)
        let closestEnemy = this.closestEnemy();
        let targetPosition = closestEnemy.absolutePosition;
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

}
console.log("missle-projectile.js finished loading");