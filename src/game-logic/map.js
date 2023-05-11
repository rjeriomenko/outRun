//This will import map seeds and use the mapSeedEntityLoader to populate itself with entities from the seed
console.log("map.js started loading");
import mapSeedEntityLoader from './map-seed-entity-loader.js';
import EntitySpawner from './entity-spawner.js';
import MainMenuSeed from './map-seeds/main-menu-seed.json';
import TestSeed from './map-seeds/test-map.json';
import PrimarySeed from './map-seeds/primary-map.json';


export default class Map {
    constructor (seed) {
        this.seed = Map.pickSeed(seed)
        this.background = seed.background;
        this.difficulty = 1;
        this.difficultyTick = 0;
        this.difficultyTickMax = 15;
        this.seededEntities = new mapSeedEntityLoader(this.seed.entities); // allows player to reset map with seeded entities at any time
        this.addSeededEntities();
        this.entitySpawner = new EntitySpawner(this);
        this.activeTimer = 0;
    };

    static pickSeed(seed) {
        switch(seed) {
            case "mainmenu":
                return MainMenuSeed;
            case "test":
                return TestSeed;
            case "primary":
                return PrimarySeed;
        }
    }

    findHighestId() {
        let highestId = 1;
        for (const entityId in this.entities) {
            if (entityId !== "player" && Number(entityId) >= highestId) {
                highestId = Number(entityId) + 1;
            };
        };
        return highestId;
    };

    addPlayerAndCamera(player, camera) {
        this.entities.player = player;
        player.id = "player";
        this.camera = camera;
        this.entitySpawner.addCamera(camera);
    };

    addSeededEntities() {
        this.entities = this.seededEntities.entities;
        
        for(const entity in this.entities) {
            this.entities[entity].map = this;
        };
    };

    addEntity(entity) {
        let highestId = this.findHighestId()

        this.entities[highestId] = entity;
        entity.id = highestId;
        entity.map = this;
    };

    updateEntitySpawner() {
        if (this.activeTimer !== 0) {
            let newSpawnTimer = this.entitySpawner.spawnTimer = 60 - (this.difficulty * 20);
            if (newSpawnTimer <= 10) {
                this.entitySpawner.spawnTimer = 10  // at most 4 enemies a second can spawn
            } else {
                this.entitySpawner.spawnTimer = newSpawnTimer
            };
        };
    };
}
console.log("map.js finished loading");