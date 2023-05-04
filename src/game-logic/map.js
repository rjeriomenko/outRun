console.log("map.js started loading");
import mapSeed from './map-seed-loader.js'

export default class Map {
    constructor (seed) {
        this.seed = new mapSeed(seed) // PARSED JSON SEED DATA
    };
}


console.log("map.js finished loading");