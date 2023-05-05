//When an entity is created, it will be given an absolute pos and (optionally) be given a subclass with subclass properties and added to the current map
//When an entity is destroyed, it will be removed from the current map
console.log("entity.js started loading");
export default class Entity {
    constructor(entityName, entityProperties) {
        this.name = entityName
        this.absolutePosition = this.parseXY(entityProperties)
        this.dimension = this.parseXY(entityProperties, "dim")
        this.sprite = entityProperties.sprite
        this.color = entityProperties.color
    }

    parseXY(entityProperties, attribute = "pos") {
        let x, y
        if(attribute === "pos") {
            x = entityProperties.absolutepositionx;
            y = entityProperties.absolutepositiony;
        }
        if (attribute === "dim") {
            x = entityProperties.dimensionx;
            y = entityProperties.dimensiony;
        }
        return [x, y];
    }

    move(distanceXY) {
        this.absolutePosition = [
        this.absolutePosition[0] + distanceXY[0],
        this.absolutePosition[1] + distanceXY[1]
        ]
    }
    
}



console.log("entity.js finished loading");