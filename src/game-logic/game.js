//This will handle all frame game logic, including updating and rendering the map between every frame
//This will update the map as more entities are created or destroyed
//This will allow the user to change maps
//When an entity is created, it will be given an absolute pos and (optionally) be given a subclass with subclass properties and added to the current map
//When an entity is destroyed, it will be removed from the current map
console.log("game.js started loading");
import Map from './map.js';
import Render from './render.js';
import Camera from './camera.js';
import Player from './entities/player.js';
import FrameQueue from './frame-queue.js';
import EventHandler from './event-handler.js';

export default class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.eventHandler = new EventHandler(this); // create evenHandler, which will load main menu map with main menu "player"
        this.frameQueue = new FrameQueue();
        this.newFrameTimer() // update every frame at 60 frames per second -- Can be replaced with window.requestAnimationFrame()
        this.eventHandler.addEventListeners()
    };

    newFrameTimer() {
        if(this.frameTimer) {
            clearInterval(this.frameTimer);
        };

        this.frameTimer = setInterval(() => { this.update() }, (1000 / 60));
    }

    loadMap(playerName, playerColor, playerAbility, seed = "mainmenu", player = "mainmenu") {
        if (this.frameQueue) { this.frameQueue.clearQueue() }
        this.map = new Map(seed);
        this.player = new Player(this, this.map, player, playerName, playerColor, playerAbility);
        this.camera = new Camera(this.ctx, this.canvas, this.map, this.player);
        this.map.addPlayerAndCamera(this.player, this.camera);
    };

    newPauseFrameTimer() {
        this.frameTimer = setInterval(() => { this.updateWhilePaused() }, (1000 / 60));
    }

    updateWhilePaused() {
        this.frameQueue.frameQueueExecute();
        this.drawFrame(this.ctx, this.canvas, this.map);
    }

    restoreFrameQueueAndFrameTimer(restoreQueue) {
        this.frameQueue = new FrameQueue(restoreQueue);
        this.newFrameTimer()
    }

    advanceMapActiveTimer() {
        if (this.eventHandler.emptyEvents()) {
            this.map.activeTimer++;
        }
    }

    advanceMapDifficulty() {
        this.map.difficultyTick = this.map.activeTimer / 60;

        if (this.map.difficultyTick === this.map.difficultyTickMax) {
            this.map.difficulty += 0.25;
            this.map.difficultyTickMax += 15;
        }

        this.map.updateEntitySpawner();
    }

    update() {
        this.logicStep(); // update camera, all positions, statuses, etc
        this.drawFrame(this.ctx, this.canvas, this.map); // draw everything on the map
        console.log("frame passed");
    };

    spawnEnemies() {
        this.map.entitySpawner.spawnEnemies();
    }

    activateAbilities() {
        for(const ability in this.player.abilities) {
            let abt = this.player.abilities[ability]
            this.frameQueue.push(() => { abt.activate() });
        };
    }
    
    moveEnemies() {
        for(const entity in this.map.entities) {
            let ent = this.map.entities[entity];
            if(ent.enemyType) {
                this.frameQueue.push(() => { ent.move() });
            };
        };
    };
    
    moveProjectiles() {
        for (const entity in this.map.entities) {
            let ent = this.map.entities[entity];
            if (ent.projectileType) {
                this.frameQueue.push(() => { ent.move() });
            };
        };
    }

    applyProjectileDamage() { // iterates through player and enemy projectiles. All close range attacks are also projectiles
        for (const entity in this.map.entities) {
            let ent = this.map.entities[entity];
            if (ent.projectileType) {
                this.frameQueue.push(() => { ent.doDamage() });
            };
        };
    };

    applyEnemyCollision() {
        for (const entity in this.map.entities) {
            let ent = this.map.entities[entity];
            if (ent.enemyType) {
                this.frameQueue.push(() => { ent.playerCollision() });
            };
        };
    };

    applyDeath() {
        for (const entity in this.map.entities) {
            let ent = this.map.entities[entity];
            if (typeof ent.currentHealth === "number" && ent.currentHealth <= 0) {
                this.frameQueue.push(() => { ent.onDeath() });
            };
        };
    };

    inflictDamage() {
        this.applyProjectileDamage();
        this.applyEnemyCollision();
        this.applyDeath();
    };

    checkLevelUp() {
        this.player.gainExperience(0);
    }

    logicStep() {
        this.spawnEnemies();
        this.activateAbilities();
        this.moveEnemies();
        this.moveProjectiles();
        this.inflictDamage();
        this.checkLevelUp();
        this.frameQueue.frameQueueExecute();
        this.advanceMapActiveTimer();
        this.advanceMapDifficulty();
        this.camera.followEntity(); // update camera to new follow coordinates
    };

    drawFrame() {
        new Render(this.ctx, this.canvas, this.map, this.camera);
    };
}


console.log("game.js finished loading");