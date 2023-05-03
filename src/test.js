//testing
const canvas = document.getElementById("view");
const ctx = canvas.getContext("2d");
let originCords = [0, 0];

function drawGuidelines() {
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
    ctx.fillRect(245, 245, 10, 10);

    //out of view square
    ctx.fillStyle = "blue";
    ctx.fillRect(-125, -125, 50, 50)
}

function drawFrame(x = 50, y = 50) {
    clearView();
    translateOrigin(x, y);
    drawGuidelines();
}

function clearView() {
    let x = -originCords[0];
    let y = -originCords[1];
    ctx.clearRect(x, y, 500, 500);
}

function translateOrigin(x, y) {
    ctx.translate(x, y);
    originCords[0] = originCords[0] + x;
    originCords[1] = originCords[1] + y;
}

//translate testing
export function translateDemo() {
    drawGuidelines();

    let j = 2000;
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            console.log("timeout complete");
            drawFrame();
        }, j)
        j += 1000;
    };

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            console.log("timeout complete");
            drawFrame(-50, -50);
        }, j)
        j += 1000;
    };
}