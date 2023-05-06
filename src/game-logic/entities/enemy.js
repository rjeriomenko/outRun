console.log("enemy.js started loading");
import Entity from './entity.js';

export default class Enemy extends Entity {
    constructor(enemyName, enemyProperties) {
        super(enemyName, enemyProperties)
        this.enemyType = enemyProperties.enemytype
    }

    move() {
        let directionCoords
        switch(this.enemyType) {
            case "bee":
                directionCoords = this.directionToPlayer()
                super.move(directionCoords)
                break;
            case "zombie":
                directionCoords = this.directionToPlayer()
                super.move(directionCoords)
                break;
        }
    };
}

console.log("enemy.js finished loading");