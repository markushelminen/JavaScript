function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    translate(200, 200);

    let hr = hour();
    let mn = minute();
    let sc = second();

     fill(255);
     noStroke();
     text(hr + ':' + mn + ':' + sc, -8, 190);
     rotate(-90);
    
    noFill();
    strokeWeight(8);
    stroke(100, 150, 255);
    ellipse(0, 0 ,300 ,300);

    stroke(150, 250, 100);
    let endhr = map(hr % 12, 0 , 12, 0, 360);
    arc(0, 0, 280, 280, 0, endhr);

    push();
    rotate(endhr);
    line(0, 0, 50, 0);
    pop();

    stroke(100, 250, 200);
    let endmn = map(mn, 0 , 60, 0, 360);
    arc(0, 0, 260, 260, 0, endmn);

    push();
    rotate(endmn);
    line(0, 0, 75, 0);
    pop();

    stroke(250, 100, 150);
    let endsc = map(sc, 0 , 60, 0, 360);
    arc(0, 0, 240, 240, 0, endsc); 

    push();
    rotate(endsc);
    line(0, 0, 100, 0);
    pop();
}