//This will import all entities, all entity subclasses
//This will parse .json-maps and generate a map that will be exported to create a new Map() instance

import Entity from './entity.js';

export default class MapSeed {
    constructor(seed) {
        this.entities = seed.entities;
        this.background = seed.backgound;
    }
}