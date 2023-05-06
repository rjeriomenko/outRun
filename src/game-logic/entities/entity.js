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
            while (this.anyColliding(targetPosition)) {
                const buffer = 1 // Smallest space possible between two colliding objects
                let deltaX = targetPosition[0] - this.absolutePosition[0];
                let deltaY = targetPosition[1] - this.absolutePosition[1];
                if (Math.abs(deltaX) < buffer && Math.abs(deltaY) < buffer) {
                    targetPosition = this.absolutePosition;
                    break;
                } else {
                    targetPosition = [
                        this.absolutePosition[0] + deltaX * 0.9,
                        this.absolutePosition[1] + deltaY * 0.9
                    ];
                };
            };
        };

        this.absolutePosition = targetPosition;
    }

    anyColliding(targetPosition){
        for (const entity in this.map.entities) {
            let ent = this.map.entities[entity];
            if (this !== ent && ent.collide && this.collidingWithEntityAtCoord(ent, targetPosition)) {
                return true;
            };
        };
    };

    collidingWithEntityAtCoord(targetEntity, targetPosition) {
        let pos1 = targetPosition;
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

    closestEnemy() {
        let entities = this.map.entities;
        let enemyExist = false;
        let shortestDistance = 0;
        let enemy = this; //If no enemies exist, return self

        for(const entity in entities) {
            let ent = entities[entity];
            if(ent.enemyType) {
                enemyExist = true;
                let distance = this.distanceToEnemy(ent);
                if(distance < shortestDistance || !shortestDistance) {
                    shortestDistance = distance;
                    enemy = ent;
                }
            }
        }

        return enemy;
    }

    distanceToEnemy(enemy) {
        let position = this.absolutePosition;
        let enemyPosition = this.findEntityCenterCoords(enemy);
        let deltaX = enemyPosition[0] - position[0];
        let deltaY = enemyPosition[1] - position[1];

        return Math.sqrt(deltaX ** 2 + deltaY ** 2);
    }
}
console.log("entity.js finished loading");