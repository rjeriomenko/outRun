console.log("src/index.js started loading through dist/main.js");

//get canvas context
// const canvas = document.getElementById("view");
// const ctx = canvas.getContext("2d");
// let originCords = [0, 0];


//Import and run test demo
import * as Test from './test.js'
Test.translateDemo();


console.log("src/index.js finished loading through dist/main.js");