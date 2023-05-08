//This will import map seeds and use the mapSeedEntityLoader to populate itself with entities from the seed
console.log("map.js started loading");
import mapSeedEntityLoader from './map-seed-entity-loader.js';
import EntitySpawner from './entity-spawner.js';
import MainMenuSeed from './map-seeds/main-menu-seed.json';
import TestSeed from './map-seeds/test-map.json';


export default class Map {
    constructor (seed) {
        this.seed = Map.pickSeed(seed)
        this.background = seed.background;
        this.difficulty = 1;
        this.seededEntities = new mapSeedEntityLoader(this.seed.entities); // allows player to reset map with seeded entities at any time
        this.addSeededEntities();
        this.entitySpawner = new EntitySpawner(this);
    };

    static pickSeed(seed) {
        switch(seed) {
            case "mainmenu":
                return MainMenuSeed;
            case "test":
                return TestSeed;
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
}
console.log("map.js finished loading");