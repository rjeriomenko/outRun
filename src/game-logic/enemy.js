console.log("enemy.js started loading");
import Entity from './entity.js';

export default class Enemy extends Entity {
    constructor(entityName, entityProperties) {
        super(entityName, entityProperties)
        this.behavior = entityProperties.behavior
    }

    move() {
        switch(this.behavior) {
            case "follow":
                console.log("kek")
                break;
        }
    };
}

console.log("enemy.js finished loading");