console.log("enemy.js started loading");
import Entity from './entity.js';

export default class Enemy extends Entity {
    constructor(enemyName, enemyProperties) {
        super(enemyName, enemyProperties)
        this.enemyType = enemyProperties.enemytype /// IS THIS NECESSARY (NECESSARY HERE?)
    }

    move() {
        let directionCoords = this.directionToPlayer()
        super.move(directionCoords)
    };

    collidingWithPlayer() {
        let player = this.map.entities.player;
        let pos1 = this.absolutePosition;
        let pos2 = player.absolutePosition;
        let dim1 = this.dimension;
        let dim2 = player.dimension;

        if(
            this.overlapX([pos1[0] - 2, pos1[1] - 2], pos2, dim1, dim2) && this.overlapY([pos1[0] - 2, pos1[1] - 2], pos2, dim1, dim2) ||
            this.overlapX([pos1[0] + 2, pos1[1] - 2], pos2, dim1, dim2) && this.overlapY([pos1[0] + 2, pos1[1] - 2], pos2, dim1, dim2) ||
            this.overlapX([pos1[0] - 2, pos1[1] + 2], pos2, dim1, dim2) && this.overlapY([pos1[0] - 2, pos1[1] + 2], pos2, dim1, dim2) ||
            this.overlapX([pos1[0] + 2, pos1[1] + 2], pos2, dim1, dim2) && this.overlapY([pos1[0] + 2, pos1[1] + 2], pos2, dim1, dim2)
        ) { return true };
    };

    playerCollision() {
        if(this.collidingWithPlayer()) {
            this.map.entities.player.damagePlayerHealth(this.touchDamage);
        };
    };

    damageEnemyHealth(damage) {
        this.currentHealth -= damage;
    };
}

console.log("enemy.js finished loading");