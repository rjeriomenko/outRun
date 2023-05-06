console.log("enemy.js started loading");
import Entity from './entity.js';

export default class Enemy extends Entity {
    constructor(enemyName, enemyProperties) {
        super(enemyName, enemyProperties)
        this.enemyType = enemyProperties.enemytype /// IS THIS NECESSARY
    }

    move() {
        let directionCoords = this.directionToPlayer()
        super.move(directionCoords)
    };
}

console.log("enemy.js finished loading");