console.log("bee.js started loading");
import Enemy from './enemy.js'
export default class Bee extends Enemy {
    constructor(beeName, beeProperties){
        super(beeName, beeProperties);
        this.dimension = [25, 25];
        this.collide = false;
        this.color = "yellow";
        this.speed = 4;
        this.sprite = "spriteurl";
        this.maxHealth = 4;
        this.currentHealth = this.maxHealth;
        this.experience = 1;
        this.touchDamage = 1;
    }

    directionToPlayer() {  // finds target X and Y (assuming the min either can be is 1)
        let playerPosition = this.findEntityCenterCoords(this.map.entities.player);
        let deltaX = playerPosition[0] - this.absolutePosition[0];
        let deltaY = playerPosition[1] - this.absolutePosition[1];

        return [1 * Math.sign(deltaX), 1 * Math.sign(deltaY)];
    }

}
console.log("bee.js finished loading");