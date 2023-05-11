console.log("projectile.js started loading");
import Entity from './entity.js';

export default class Projectile extends Entity {
    constructor(projectileName, projectileProperties) {
        super(projectileName, projectileProperties);
    };

    move() {
        if (this.duration > 0) {
            this.duration--
            let directionCoords = this.directionToTarget();
            super.move(directionCoords);
        } else {
            this.onDeath();
        };
    };
}

console.log("projectile.js finished loading");