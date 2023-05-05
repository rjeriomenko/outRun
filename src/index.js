console.log("src/index.js started loading through dist/main.js");
import Game from './game-logic/game.js';

//Get canvas and context
const canvas = document.getElementById("view");
const ctx = canvas.getContext("2d");

//Start game
let game = new Game(ctx, canvas);
console.log(game);





//Import and run test demo
// import * as Demo from './game-logic/testing/demo.js'
// Demo.translateDemo();


console.log("src/index.js finished loading through dist/main.js");