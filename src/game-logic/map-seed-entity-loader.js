//This will import all entities, all entity subclasses
//This will create a seededEntities object (object with entity instances) from a seed
console.log("map-seed-entity-loader.js started loading");
import Entity from './entity.js';
import Enemy from './enemy.js';

export default class mapSeedEntityLoader {
    constructor(seedEntities) {
        this.entities = this.createEntitiesFromSeed(seedEntities);
    };

    createEntitiesFromSeed(seedEntities) {
        let id = 1;
        let entitiesObject = {};

        for(const objectName in seedEntities.objects) {
            let object = new Entity(objectName, seedEntities.objects[objectName]);
            entitiesObject[id] = object;
            id++
        }

        for(const enemyName in seedEntities.enemies) {
            let enemy = new Enemy(enemyName, seedEntities.enemies[enemyName]);
            entitiesObject[id] = enemy;
            id++
        }

        return entitiesObject;
    }
}
console.log("map-seed-entity-loader.js finished loading");