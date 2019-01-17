const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird.png";
bg.scr = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

const fly = new Audio();
const score = new Audio();

fly.src = "";
score.src = "";


const gap = 85;
const constant = pipeNorth.height + gap;

let bX = 10;
let bY = 150;
let gravity = 1.5;
let points = 0;

document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

let pipes = [];

pipes[0] = {
    x : cvs.width,
    y : 0
}
//draw
function draw(){
    ctx.drawImage(bg,0,0);

    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant);
        
        pipes[i].x--;

        if ( pipes[i].x == 125) {
            pipes.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        if ((bX + bird.width >= pipes[i].x && bX <= pipes[i].x + pipeNorth.width)
         && (bY <= pipes[i].y + pipeNorth.height || bY+birdheight >=  pipes[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            location.reload(); // reload the page
        }

        if (pipes[i].x == 5) {
            points++;
            score.play();
        }
    }
    
    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "x000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+points, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

draw();