console.log("render.js started loading");
export default class Render {
    constructor(ctx, canvas, map) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.map = map;
        this.drawMap(map);
    }

    originCoords() {
        let currentTransform = this.ctx.getTransform()
        return [currentTransform.e, currentTransform.f];
    };
    
    clearMap() {
        let [originCoordX, originCoordY] = this.originCoords()
        this.ctx.clearRect(-originCoordX, -originCoordY, this.canvas.width, this.canvas.height);
    }

    drawMap(map) {
        this.clearMap()
        for(const entityId in map.entities) {
            const entityProperties = map.entities[entityId]
            let posX, posY, dimX, dimY
            [posX, posY, dimX, dimY] = [
                entityProperties.absolutePosition[0],
                entityProperties.absolutePosition[1],
                entityProperties.dimension[0],
                entityProperties.dimension[1],
            ]
            if(entityId !== "player") {
                this.ctx.fillStyle = entityProperties.color;
                this.ctx.fillRect(posX, posY, dimX, dimY);
            }

            this.ctx.fillStyle = entityProperties.color; //Making sure the player renders last
            this.ctx.fillRect(posX, posY, dimX, dimY);
        }
    }

}
console.log("render.js finished loading");