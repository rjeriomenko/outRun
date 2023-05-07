console.log("projectile.js started loading");
import Entity from './entity.js';

export default class Projectile extends Entity {
    constructor(projectileName, projectileProperties) {
        super(projectileName, projectileProperties);
    };

    move() {
        let directionCoords = this.directionToTarget();
        super.move(directionCoords);
    };
}

console.log("projectile.js finished loading");