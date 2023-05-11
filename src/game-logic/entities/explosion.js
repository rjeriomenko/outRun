console.log("explosion.js started loading");
import Projectile from './projectile.js';

export default class Explosion extends Projectile {
    constructor(explosionName, explosionProperties) {
        super(explosionName, explosionProperties);
        this.damage = explosionProperties.damage;
        this.dimension = explosionProperties.dimension;
        this.duration = explosionProperties.duration;
        this.friendly = explosionProperties.friendly;
        this.color = "deeppink";
        this.collide = false;
        this.projectileType = "explosion";
        this.sprite = "spriteurl";
    }

    move() {
        if (this.duration > 0) {
            this.duration--
        } else {
            this.onDeath();
        };
    };

    collidingEntities() {
        let currentPosition = this.absolutePosition;
        let collidingEntities = [];

        for (const entity in this.map.entities) {
            let ent = this.map.entities[entity];
            if (ent.enemyType && this.collidingWithEntityAtCoord(ent, currentPosition) && this.friendly === true) {
                collidingEntities.push(ent);
            } else if (ent.id === "player" && this.collidingWithEntityAtCoord(ent, currentPosition) && this.friendly === false) {
                collidingEntities.push(ent);
            };
        };

        return collidingEntities;
    };

    doDamage() {
        debugger
        let targetEntities = this.collidingEntities();
        

        for (const entity of targetEntities) {
            debugger
            if (entity && entity.currentHealth > 0) {
                debugger
                if (entity.enemyType) {
                    debugger
                    entity.damageEnemyHealth(this.damage);
                } else {
                    entity.damagePlayerHealth(this.damage);
                    debugger
                };
            };
        };

    };
}
console.log("explosion.js finished loading");