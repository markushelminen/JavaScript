const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const framesPerSecond = 50;

// control the user paddle
canvas.addEventListener("mousemove", movePaddle);
function movePaddle(evt){
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}

// render the game
function render(){
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    // draw the net
    drawNet();
    // draw user and computer paddles
    drawRect( user.x, user.y, user.width, user.height, user.color);
    drawRect( com.x, com.y, com.width, com.height, com.color);
    // draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    // draw the scores
    drawText(user.score, canvas.width/4, canvas.height/5, "WHITE");
    drawText(com.score, 3*canvas.width/4, canvas.height/5, "WHITE");
}

// collision detection
function collision(b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

// update the game logic, physics etc.
function update(){
    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    }else if(ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    }

    // simple AI to control the com paddle
    let computerLevel = 0.1;
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY *= (-1);        
    }

    let player = ( ball.x < canvas.width/2 ) ? user : com;
    
    if (collision(ball, player)) {
        let collidePont = ball.y - (player.y + player.height/2);
        collidePont = collidePont / (player.height/2);    
        let angleRad = collidePont * (Math.PI/4);

        let direction = (ball.x < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.2;
    }
}

// game init
function game(){
    update();
    render();
}
// loop
setInterval(game, 1000/framesPerSecond);

const user = {
    x : 0,
    y : canvas.height/2 - 50,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

const com = {
    x : canvas.width - 10,
    y : canvas.height/2 - 50,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

const net = {
    x : canvas.width/2 - 1,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE"
}

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    speed : 5,
    velocityX : 5,
    velocityY : 5,
    color : "WHITE"
}

function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}

function drawText(text, x, y, color){
    ctx.fillStyle = color;
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);

    }
}