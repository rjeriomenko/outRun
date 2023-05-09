console.log("render.js started loading");
export default class Render {
    constructor(ctx, canvas, map, camera) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.map = map;
        this.camera = camera
        this.drawMap();
    }

    originCoords() {
        let currentTransform = this.ctx.getTransform();
        return [currentTransform.e, currentTransform.f];
    };
    
    clearMap() {
        let [originCoordX, originCoordY] = this.originCoords();
        this.ctx.clearRect(-originCoordX, -originCoordY, this.canvas.width, this.canvas.height);
    };

    drawBackground(map) {
        const background = new Image();
        background.src = map.background.src;
        background.dataset.posX = map.background.absolutepositionx;
        background.dataset.posY = map.background.absolutepositiony;
        this.background = background;
        this.background.onload = () => {
            this.ctx.drawImage(this.background, this.background.dataset.posX, this.background.dataset.posY);
        };
    };

    getEntityPositionAndDimension(entity) {
        let posX, posY, dimX, dimY;
        return [posX, posY, dimX, dimY] = [
            entity.absolutePosition[0],
            entity.absolutePosition[1],
            entity.dimension[0],
            entity.dimension[1],
        ];
    }

    resetdrawStyle() {
        this.ctx.strokeStyle = "rgb(0, 0, 0)";
        this.ctx.fillStyle = "rgb(0, 0, 0)";
        this.ctx.lineWidth = 1;
        this.ctx.shadowColor = "rgba(0, 0, 0, 0)";
        this.ctx.shadowBlur = 0;
    };
    
    drawClassicStyle(posX, posY, dimX, dimY, entity) {
        this.resetdrawStyle();
        this.ctx.fillStyle = entity.color;
        this.ctx.fillRect(posX, posY, dimX, dimY);
    };

    drawLineStyle(posX, posY, dimX, dimY, entity) {
        this.resetdrawStyle();
        this.ctx.strokeStyle = entity.color;
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.rect(posX, posY, dimX, dimY);
        this.ctx.stroke();
    };

    drawLineBlurShadowStyle(posX, posY, dimX, dimY, entity) {
        this.resetdrawStyle();
        this.ctx.shadowColor = entity.color;
        this.ctx.shadowBlur = 15;
        this.ctx.strokeStyle = entity.color;
        this.ctx.lineWidth = 4.5;
        this.ctx.beginPath();
        this.ctx.rect(posX, posY, dimX, dimY);
        this.ctx.stroke();
    };

    drawFollowingCRTLines() {
        this.resetdrawStyle();
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
        const crtLineWidth = 2.5;
        const crtLineSpacing = 5;

        let x = this.camera.currentViewCoords()[0];
        let yMin = this.camera.currentViewCoords()[1];
        let yMax = yMin + this.canvas.height;

        for (let y = yMin; y <= yMax; y += crtLineSpacing) {
            this.ctx.fillRect(x, y, this.canvas.width, crtLineWidth);
        }
    };

    drawStaticCRTLines() {
        this.resetdrawStyle();
        const crtLineWidth = 2.5;
        const crtLineSpacing = 5;
        let x = -1500
        let yMin = -1500
        let yMax = yMin + this.canvas.height;

        this.ctx.fillStyle = "rgba(20, 20, 20, 0.5)"

        for (let y = yMin; y <= 6000; y += crtLineSpacing) {
            this.ctx.fillRect(x, y, 4000, crtLineWidth);
        }
    };

    drawFloatingObject(xOffset, yOffset, xDim, yDim) {   ///xOffset and yOffset will offset along canvas grid
        this.resetdrawStyle();
        this.ctx.fillStyle = "white";
        let xCoords = this.originCoords()[0] + xOffset;
        let yCoords = this.originCoords()[0] + yOffset;

        this.ctx.fillRect(xCoords, yCoords, xDim, yDim)
    } ;


    drawMap() {
        let map = this.map
        let entityPosAndDim
        this.clearMap();
        // this.drawBackground(map); //Uncomment this line to see a flashing grass png
        for(let entityId in map.entities) {
            const entity = map.entities[entityId];
            entityPosAndDim = this.getEntityPositionAndDimension(entity);
            
            if(entityId === "1") {  // render boundbox (background)
                this.drawClassicStyle(...entityPosAndDim, entity);
            } else if (entityId !== "player" && entityId !== "1" && !entity.enemyType) {  //render background objects
                // this.drawClassicStyle(...entityPosAndDim, entity);
                // this.drawLineStyle(...entityPosAndDim, entity);
                this.drawLineBlurShadowStyle(...entityPosAndDim, entity);
            } else if(entity.enemyType) {   // render enemies;
                this.drawLineBlurShadowStyle(...entityPosAndDim, entity);
                // this.drawLineStyle(...entityPosAndDim, entity);
            };
        }

        let player = map.entities.player
        entityPosAndDim = this.getEntityPositionAndDimension(player);
        this.drawLineBlurShadowStyle(...entityPosAndDim, player); // render player after rendering background/enemies
        // this.drawClassicStyle(...entityPosAndDim, player);
        // this.drawLineStyle(...entityPosAndDim, player);

        // this.drawFloatingObject(150, 150, 100, 100);
        // this.drawFloatingObject(-250, 75, 100, 100);
        // this.drawStaticCRTLines();
        this.drawFollowingCRTLines();
    };

}
console.log("render.js finished loading");