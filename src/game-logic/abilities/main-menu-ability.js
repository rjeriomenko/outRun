console.log("main-menu-ability.js started loading");
import Ability from './ability.js';

export default class MainMenuAbility extends Ability {
    constructor(player) {
        super(player);
        this.coolDownTimer = 120;
        this.coolDownCounter = 0;
        this.boundBox = this.map.entities[1];
    }
    
    coolDownReady() {
        if (this.coolDownCounter === 0) {
            this.coolDownCounter = this.coolDownTimer;
            return true;
        } else {
            this.coolDownCounter--;
        };
    };

    pickSameAxisCoordBetween(startCoord, endCoord) {
        let smallerCoord = endCoord;
        let largerCoord = startCoord;
        if (endCoord > startCoord) {
            smallerCoord = startCoord;
            largerCoord = endCoord;
        };

        return Math.random() * (largerCoord - smallerCoord) + smallerCoord;
    };

    findTeleportCoords() {
        let boundPositionX = this.boundBox.absolutePosition[0]
        let boundPositionY = this.boundBox.absolutePosition[1]
        let boundDimensionX = this.boundBox.dimension[0]
        let boundDimensionY = this.boundBox.dimension[1]

        let boundXLimit = boundPositionX + boundDimensionX
        let boundYLimit = boundPositionY + boundDimensionY

        let spawnX = this.pickSameAxisCoordBetween(boundPositionX, boundXLimit)
        let spawnY = this.pickSameAxisCoordBetween(boundPositionY, boundYLimit)

        return [spawnX, spawnY];
    };

    activate() {
        if (this.coolDownReady()) {
            let newCoords = this.findTeleportCoords();
            this.entity.absolutePosition = newCoords;
        };
    };

}
console.log("main-menu-ability.js finished loading");