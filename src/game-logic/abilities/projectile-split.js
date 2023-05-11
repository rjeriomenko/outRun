console.log("projectile-split.js started loading");
import Ability from './ability.js';

export default class ProjectileSplit extends Ability {
    constructor(player) {
        super(player);
        this.maxSplits = 1;
        this.splitCount = 0;
    }

    randomSign() {
        if (Math.random() > 0.5) {
            return -1;
        } else {
            return 1;
        };
    };

    offsetFireCoords(fireCoords) {
        let offsetX = fireCoords[0] + (Math.random() * 30 * this.randomSign());
        let offsetY = fireCoords[1] + (Math.random() * 30 * this.randomSign());

        return [offsetX, offsetY];
    }

    increaseSplits(amount = 1) {
        this.maxSplits += amount;
    }

    activate(sourceEntity, targetEntity) {
        if (sourceEntity.currentSplitCount < this.maxSplits) {
            let instance1 = new sourceEntity.constructor(`${sourceEntity.name}-split1`, sourceEntity.constructorProperties);
            let instance2 = new sourceEntity.constructor(`${sourceEntity.name}-split2`, sourceEntity.constructorProperties);
    
            instance1.absolutePosition = this.offsetFireCoords(sourceEntity.absolutePosition);
            instance2.absolutePosition = this.offsetFireCoords(sourceEntity.absolutePosition);
    
            instance1.currentSplitCount += 1;
            instance2.currentSplitCount += 1;
            this.entity.map.addEntity(instance1);
            this.entity.map.addEntity(instance2);

            instance1.projectileCountCheck();
            instance2.projectileCountCheck();

            this.splitCount++;
        }
    }
}
console.log("projectile-split.js finished loading");