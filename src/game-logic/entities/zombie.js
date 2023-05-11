console.log("zombie.js started loading");
import Enemy from './enemy.js'
export default class Zombie extends Enemy {
    constructor(zombieName, zombieProperties, mapDifficulty = 1) {
        super(zombieName, zombieProperties);
        this.difficulty = mapDifficulty;
        this.dimension = [35, 35]
        this.collide = true;
        this.color = "green";
        this.speed = 2.4 + (mapDifficulty * 0.5);
        this.sprite = "spriteurl";
        this.maxHealth = 8 * mapDifficulty;
        this.currentHealth = this.maxHealth;
        this.experience = 2 * mapDifficulty;
        this.touchDamage = 3 * mapDifficulty;
        this.duration = 1500;

    }

    directionToPlayer() {  // finds target X and Y (assuming the max either can be is 1)
        let playerPosition = this.findEntityCenterCoords(this.map.entities.player)
        let deltaX = playerPosition[0] - this.absolutePosition[0];
        let deltaY = playerPosition[1] - this.absolutePosition[1];

        if(Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
            let biggerSide;
            if(Math.abs(deltaX) > Math.abs(deltaY)) {
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
console.log("zombie.js finished loading");