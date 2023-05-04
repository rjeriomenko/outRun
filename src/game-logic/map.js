//This will populate a map with a seed

console.log("map.js started loading");
import mapSeedEntityLoader from './map-seed-entity-loader.js';

export default class Map {
    constructor (seed) {
        this.background = seed.background;
        this.seededEntities = new mapSeedEntityLoader(seed.entities); // allows player to reset map with seeded entities at any time
        this.entities = this.seededEntities.entities;
    };
}


console.log("map.js finished loading");