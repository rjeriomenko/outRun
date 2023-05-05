//This will follow the player or other entities around the map
//This will have functions that update its own camera coordinates
console.log("camera.js started loading");
export default class Camera {
    constructor(ctx, canvas, entityToFollow) {
        this.ctx = ctx
        this.canvas = canvas
        this.following = entityToFollow
    }

    currentCameraCoords() {
        let currentTransform = this.ctx.getTransform()
        return [currentTransform.e, currentTransform.f];
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
        let cameraCoords = this.currentCameraCoords()
        let targetCameraCoords = [      //Needed to modify logic here to account for the fact that the camera "moves" in reverse
            -entityCenterCoords[0] + this.canvas.width / 2,
            -entityCenterCoords[1] + this.canvas.height / 2
        ]
        this.ctx.translate(
            targetCameraCoords[0] - cameraCoords[0],
            targetCameraCoords[1] - cameraCoords[1]
        )
        cameraCoords = this.currentCameraCoords()
    }

    followNewEntity(entity) {
        this.following = entity
    }
    
}

console.log("camera.js finished loading");