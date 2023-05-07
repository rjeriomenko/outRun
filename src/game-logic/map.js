//This will populate a map with a seed
console.log("map.js started loading");
import mapSeedEntityLoader from './map-seed-entity-loader.js';
import EntitySpawner from './entity-spawner.js';

export default class Map {
    constructor (seed) {
        this.background = seed.background;
        this.difficulty = 1;
        this.seededEntities = new mapSeedEntityLoader(seed.entities); // allows player to reset map with seeded entities at any time
        this.addSeededEntities();
        this.entitySpawner = new EntitySpawner(this);
    };

    findHighestId() {
        let highestId = 1;
        for (const entityId in this.entities) {
            if (entityId !== "player" && Number(entityId) >= highestId) {
                highestId = Number(entityId) + 1;
            };
        };
        return highestId;
    };

    addPlayer(player) {
        this.entities.player = player;
        player.id = "player"
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