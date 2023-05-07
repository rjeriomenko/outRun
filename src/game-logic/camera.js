//This will follow the player or other entities around the map
//This will update its own camera coordinates and view coordinates
console.log("camera.js started loading");
export default class Camera {
    constructor(ctx, canvas, map, entityToFollow) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.map = map;
        this.following = entityToFollow;
    }

    currentCameraCoords() {
        let currentTransform = this.ctx.getTransform();
        return [currentTransform.e, currentTransform.f];
    };

    currentViewCoords() {
        let followingCoords = this.following.findEntityCenterCoords(this.following);
        let viewCoords = [
            followingCoords[0] - this.canvas.width / 2, 
            followingCoords[1] - this.canvas.height / 2
        ];

        return viewCoords;
    };
    
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

    followEntity() {
        let entityCenterCoords = this.findEntityCenterCoords(this.following);
        let cameraCoords = this.currentCameraCoords();
        let targetCameraCoords = [      // logic here is modified to account for the fact that the camera "moves" in reverse
            -entityCenterCoords[0] + this.canvas.width / 2,
            -entityCenterCoords[1] + this.canvas.height / 2
        ]
        this.ctx.translate(
            targetCameraCoords[0] - cameraCoords[0],
            targetCameraCoords[1] - cameraCoords[1]
        )
        cameraCoords = this.currentCameraCoords();
    }

    followNewEntity(entity) {
        this.following = entity;
    }

    // collidingWithEntityAtCoord(targetEntity, targetPosition) {
    //     let pos1 = targetPosition;
    //     let pos2 = targetEntity.absolutePosition;
    //     let dim1 = this.dimension;
    //     let dim2 = targetEntity.dimension;

    //     return this.overlapX(pos1, pos2, dim1, dim2) && this.overlapY(pos1, pos2, dim1, dim2);
    // };

    // overlapX(pos1, pos2, dim1, dim2) {
    //     if (pos1[0] + dim1[0] > pos2[0] && pos2[0] + dim2[0] > pos1[0]) {
    //         return true;
    //     };
    // };

    // overlapY(pos1, pos2, dim1, dim2) {
    //     if (pos1[1] + dim1[1] > pos2[1] && pos2[1] + dim2[1] > pos1[1]) {
    //         return true;
    //     };
    // };

    overlapViewEntityXAxis(viewCoords, entity) {
        let viewXStart = viewCoords[0];
        let viewXLimit = viewCoords[0] + this.canvas.width;
        let viewXDimension = viewXLimit - viewXStart;
        let entityXPosition = entity.absolutePosition[0];
        let entityXDimension = entity.dimension[0];

        if (viewXStart + viewXDimension > entityXPosition && 
            entityXPosition + entityXDimension > viewXStart) {
            return true;
        };
    };

    overlapViewEntityYAxis(viewCoords, entity) {
        let viewYStart = viewCoords[1];
        let viewYLimit = viewCoords[1] + this.canvas.height;
        let viewYDimension = viewYLimit - viewYStart;
        let entityYPosition = entity.absolutePosition[1];
        let entityYDimension = entity.dimension[1];

        if (viewYStart + viewYDimension > entityYPosition &&
            entityYPosition + entityYDimension > viewYStart) {
            return true;
        };
    };

    entityInView(entity) {
        let viewCoords = this.currentViewCoords();

        if (
            this.overlapViewEntityXAxis(viewCoords, entity) &&
            this.overlapViewEntityYAxis(viewCoords, entity)
            ) { return true };

        return false;
    }
    
}

console.log("camera.js finished loading");