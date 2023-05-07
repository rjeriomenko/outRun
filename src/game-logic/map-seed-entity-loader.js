//This will import all entities, all entity subclasses
//This will create a seededEntities object (object with entity instances) from a seed
console.log("map-seed-entity-loader.js started loading");
import Entity from './entities/entity.js';
import Bee from './entities/bee.js';
import Zombie from './entities/zombie.js';

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
            object.id = id;
            id++;
        }

        for(const enemyName in seedEntities.enemies) {
            let enemy = seedEntities.enemies[enemyName]
            let enemyType = enemy.enemytype
            let enemyInstance
            switch (enemyType) {
                case "bee":
                    enemyInstance = new Bee(enemyName, enemy);
                    break;
                case "zombie":
                    enemyInstance = new Zombie(enemyName, enemy);
                    break;
            }
            entitiesObject[id] = enemyInstance;
            enemyInstance.id = id;
            id++;
        }

        return entitiesObject;
    };
}
console.log("map-seed-entity-loader.js finished loading");