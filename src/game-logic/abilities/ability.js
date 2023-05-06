console.log("ability.js started loading");
export default class Ability {
    constructor(player, duration = -1) {
        this.player = player;
        this.duration = duration;
        this.map = this.player.map;
    }
}
console.log("ability.js finished loading");