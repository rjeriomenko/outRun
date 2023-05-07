//This will import all entities, all entity subclasses
//This will add enemies to the map during gameplay

console.log("entity-spawner.js started loading");
import SpawnPool from './spawn-pool.json';
import Bee from './entities/bee.js';
import Zombie from './entities/zombie.js';
export default class EntitySpawner {
    constructor(map) {
        this.map = map;
        this.boundBox = this.map.entities[1];
        this.spawnTimer = 60;
        this.spawnCounter = 0;
        this.spawnCount = 1;
        this.spawnPool = SpawnPool;
        this.beeCount = 0;
        this.zombieCount = 0;
    }

    prepareSpawnPool() {
        let readySpawnPool = []

        for (const difficulty in this.spawnPool) {
            if (this.map.difficulty >= difficulty) {
                for (const enemy in this.spawnPool[difficulty]) {
                    readySpawnPool.push(enemy);
                };
            };
        };

        return readySpawnPool;
    };

    spawnReady() {
        if (this.spawnCounter === 0) {
            this.spawnCounter = this.spawnTimer;
            return true;
        } else {
            this.spawnCounter--;
        };
    };

    makePositionlessEnemy(enemyType) {
        let enemyInstance

        switch (enemyType) {
            case "bee":
                this.beeCount += 1;
                enemyInstance = new Bee(`bee${this.beeCount}`, { enemytype: "zombie" });
                break;
            case "zombie":
                this.zombieCount += 1;
                enemyInstance = new Zombie(`zombie${this.zombieCount}`, { enemytype: "bee" });
                break;
        };

        return enemyInstance;
    };

    pickSameAxisCoordBetween(startCoord, endCoord) {
        let smallerCoord = endCoord;
        let largerCoord = startCoord;
        if(endCoord > startCoord) {
            smallerCoord = startCoord;
            largerCoord = endCoord;
        };

        return Math.random() * (largerCoord - smallerCoord) + smallerCoord;
    };

    coordsInView(enemy, coords) {
        return false;
    }



    viableSpawnCoords(enemy, coords) {
        enemy.absolutePosition = coords;
        
        if (this.coordsInView(enemy, coords)) {
            return false;
        }
        
        // if (enemy.anyColliding(coords)) { // unhappy with anycolliding
        //     return false;
        // };

        return true;
    }

    findSpawnCoordsForEnemy(enemy) {
        let boundPositionX = this.boundBox.absolutePosition[0]
        let boundPositionY = this.boundBox.absolutePosition[1]
        let boundDimensionX = this.boundBox.dimension[0]
        let boundDimensionY = this.boundBox.dimension[1]

        let boundXLimit = boundPositionX + boundDimensionX
        let boundYLimit = boundPositionY + boundDimensionY

        let spawnX = this.pickSameAxisCoordBetween(boundPositionX, boundXLimit)
        let spawnY = this.pickSameAxisCoordBetween(boundPositionY, boundYLimit)

        if (this.viableSpawnCoords(enemy, [spawnX, spawnY])) {
            // enemy.absolutePosition = [spawnX, spawnY]
        }

        enemy.absolutePosition = [-475, -475]  //testing no-collision spawn
    }

    spawnEnemies() {
        if (this.spawnReady()) {
            let readySpawnPool = this.prepareSpawnPool()

            for(let i = 0; i < this.spawnCount; i++) {
                let randomIndex = Math.floor(Math.random() * readySpawnPool.length);
                let enemyType = readySpawnPool[randomIndex]
                let enemyInstance = this.makePositionlessEnemy(enemyType)

                this.findSpawnCoordsForEnemy(enemyInstance);
                this.map.addEntity(enemyInstance);
            };
        };
    };

}
console.log("entity-spawner.js finished loading");
