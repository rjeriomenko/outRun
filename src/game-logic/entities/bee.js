console.log("bee.js started loading");
import Enemy from './enemy.js'
export default class Bee extends Enemy {
    constructor(beeName, beeProperties, mapDifficulty = 1){
        super(beeName, beeProperties);
        this.difficulty = mapDifficulty;
        this.dimension = [25, 25];
        this.collide = false;
        this.color = "yellow";
        this.speed = 3.6 + (mapDifficulty * 0.4);
        this.sprite = "spriteurl";
        this.maxHealth = 4 * mapDifficulty;
        this.currentHealth = this.maxHealth;
        this.experience = 1 * mapDifficulty;
        this.touchDamage = 1 * mapDifficulty;
        this.duration = 1500;
    }

    directionToPlayer() {  // finds target X and Y (assuming the min either can be is 1)
        let playerPosition = this.findEntityCenterCoords(this.map.entities.player);
        let deltaX = playerPosition[0] - this.absolutePosition[0];
        let deltaY = playerPosition[1] - this.absolutePosition[1];

        return [1 * Math.sign(deltaX), 1 * Math.sign(deltaY)];
    }

}
console.log("bee.js finished loading");