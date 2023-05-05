console.log("enemy.js started loading");
import Entity from './entity.js';

export default class Enemy extends Entity {
    constructor(enemyName, enemyProperties) {
        super(enemyName, enemyProperties)
        this.behavior = enemyProperties.behavior
    }

    move() {
        switch(this.behavior) {
            case "follow":
                // console.log("kek")
                break;
        }
    };
}

console.log("enemy.js finished loading");