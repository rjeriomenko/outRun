console.log("render.js started loading");
export default class Render {
    constructor(ctx, map, originCords) {
        this.ctx = ctx;
        this.map = map;
        this.originCords = originCords;
        this.drawMap(map);
    }

    drawMap(map) {
        for(const entityId in map.entities) {
            const entityProperties = map.entities[entityId]
            let posX, posY, dimX, dimY
            [posX, posY, dimX, dimY] = [
                entityProperties.absolutePosition[0],
                entityProperties.absolutePosition[1],
                entityProperties.dimension[0],
                entityProperties.dimension[1],
            ]

            this.ctx.fillStyle = entityProperties.color;
            this.ctx.fillRect(posX, posY, dimX, dimY);
        }
    }
}
console.log("render.js finished loading");