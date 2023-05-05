//When an entity is created, it will be given an absolute pos and (optionally) be given a subclass with subclass properties and added to the current map
//When an entity is destroyed, it will be removed from the current map
console.log("entity.js started loading");
export default class Entity {
    constructor(entityName, entityProperties) {
        this.name = entityName;
        this.absolutePosition = this.parseXY(entityProperties);
        this.dimension = this.parseXY(entityProperties, "dim");
        this.sprite = entityProperties.sprite;
        this.color = entityProperties.color;
        this.speed = entityProperties.speed;
        this.collide = entityProperties.collide;
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

    findEntityCenterCoords(entity) {
        let [dimensionCenterX, dimensionCenterY, absoluteX, absoluteY] = [
            entity.dimension[0] / 2,
            entity.dimension[1] / 2,
            entity.absolutePosition[0],
            entity.absolutePosition[1]
        ];
        return [
            absoluteX + dimensionCenterX,
            absoluteY + dimensionCenterY
        ];
    }

    coordDistanceBetweenEntities(startEntity, targetEntity) {
        let startCenter = this.findEntityCenterCoords(startEntity);
        let targetCenter = this.findEntityCenterCoords(targetEntity);

        return [
            startCenter[0] - targetCenter[0],
            startCenter[1] - targetCenter[1]
        ];
    };

    move(distanceXY) {
        let targetPosition = [
            this.absolutePosition[0] + (distanceXY[0] * this.speed),
            this.absolutePosition[1] + (distanceXY[1] * this.speed)
        ];

        if (this.collide) {
            //collide logic
            // console.log("kek")
            while (this.anyColliding(targetPosition)) {
                //move at 0.9 distance or so
            };
        };

        this.absolutePosition = targetPosition;
    }

    anyColliding(targetPosition){
        // console.log("kek")
        for (const entity in this.map.entities) {
            let ent = this.map.entities[entity]
            if(this !== ent && ent.collide && this.colliding(ent)) {
                console.log("kek")
                debugger
                return true;
            };
        };
    };

    colliding(targetEntity) {
        let pos1 = this.absolutePosition;
        let pos2 = targetEntity.absolutePosition;
        let dim1 = this.dimension;
        let dim2 = targetEntity.dimension;

        return this.overlapX(pos1, pos2, dim1, dim2) && this.overlapY(pos1, pos2, dim1, dim2);
    };

    overlapX(pos1, pos2, dim1, dim2) {
        if(pos1[0] + dim1[0] > pos2[0] && pos2[0] + dim2[0] > pos1[0]) {
            return true;
        };
    };

    overlapY(pos1, pos2, dim1, dim2) {
        if (pos1[1] + dim1[1] > pos2[1] && pos2[1] + dim2[1] > pos1[1]) {
            return true;
        };
    };
    
}



console.log("entity.js finished loading");