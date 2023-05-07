console.log("zombie.js started loading");
import Enemy from './enemy.js'
export default class Zombie extends Enemy {
    constructor(zombieName, zombieProperties) {
        super(zombieName, zombieProperties);
        this.dimension = [35, 35]
        this.collide = true;
        this.color = "green";
        this.speed = 2.5;
        this.sprite = "spriteurl";
        this.health = 6;
        this.experience = 2;
    }

    directionToPlayer() {  //finds target X and Y (assuming the max either can be is 1)
        let playerPosition = this.findEntityCenterCoords(this.map.entities.player)
        let deltaX = playerPosition[0] - this.absolutePosition[0]
        let deltaY = playerPosition[1] - this.absolutePosition[1]

        if(Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
            let biggerSide
            if(Math.abs(deltaX) > Math.abs(deltaY)) {
                biggerSide = Math.abs(deltaX)
            } else {
                biggerSide = Math.abs(deltaY)
            }
            deltaX /= biggerSide
            deltaY /= biggerSide
        }

        return [deltaX, deltaY]
    }
}
console.log("zombie.js finished loading");