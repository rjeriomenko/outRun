console.log("ability.js started loading");
export default class Ability {
    constructor(entity, duration = -1) {
        this.entity = entity;
        this.duration = duration;
        this.map = this.entity.map;
    }
}
console.log("ability.js finished loading");