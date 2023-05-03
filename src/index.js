console.log("src/index.js loaded through dist/main.js");

//get canvas context
const canvas = document.getElementById("view");
const ctx = canvas.getContext("2d");



//test and guideline squares
//midline vertical
ctx.fillStyle = "black";
ctx.fillRect(250, 0, 1, 500)

//midline horizontal
ctx.fillStyle = "black";
ctx.fillRect(0, 250, 500, 1)

//first quarter square
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 250, 250);

//simple test squares in center
ctx.fillStyle = "black";
ctx.fillRect(225, 225, 50, 50);

ctx.fillStyle = "red";
ctx.fillRect(250, 250, 10, 10);