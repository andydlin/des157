// p5 file

// testing js log
console.log("this is a js comment");

// set global values
// circle values
var circleX = 0;
var circleY = 0;
var circleDiameter = 50;
// score, missed
var score = 0;
var missed = 0;
// timer for circle
var time = 0;
var waitTime = 750;
// pause / play
var paused = true;
var statusTime = 0;
var tx = 0;
// coundown timer
var startTime = 0;
var timeLimit = 10000; // 30 sec = 1000*10

// setup canvas
function setup() {
    var myCanvas = createCanvas(800, 250);
    myCanvas.parent('#mySketch');
    textSize(14);
    updateCircle(); // update circle location
}

// draw stuff
function draw() {
    background(255); // clear out old frames
    updateMenu(); // update score
    if(onText()) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
    // check if game is paused
    if(paused) {
        return; // return to beginning, don't draw anything
    }
    ellipse(circleX, circleY, 50, 50); // place ellipse
    if(onCircle()) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
    //check the difference between now and the previously stored time if it's greater than the wait interval
    if((millis() - time) >= waitTime){
        missed += 1;
        updateCircle();
    }
}

// when mouse is pressed
function mousePressed() {
    if(onText()) {
        paused = !paused;
        startTime = millis(); // set start time after user clicks 'play'
        time = millis(); // store current time
        score = 0; // reset values
        missed = 0;
        updateMenu();
    }
    if(!paused) {
        if(onCircle()) {
            updateCircle();
            score += 1;
        }
    }
}

// randomize circle location, range is determined by radius of circle and canvas size
function updateCircle() {
    circleX = random(25, 750);
    circleY = random(25, 200);
    time = millis(); // update time for new circle
}

// update score
function updateMenu() {
    fill(125);
    text('Score: ' + score, 20, 30); // place score
    text('Missed: ' + missed, 100, 30);
    fill(0);
    if(paused) {
        var t = 'PLAY';
    } else {
        var currTime = millis();
        var t = timeLimit - (currTime - startTime);
        t = int(t/1000);
        if(t == 0) {
            paused = !paused;
        }
        t += ' sec';
    }
    tx = width - (textWidth(t) + 15);
    text(t, width - (textWidth(t) + 30), 30);
}

// check if cursor is on circle
function onCircle() {
    var d = dist(mouseX, mouseY, circleX, circleY); // calculate distance between the cursor and circle
    if(d < (circleDiameter / 2)) { // if click is inside  circle, update circle and score
        return true;
    } else {
        return false;
    }
}

// check if cursor is on 'play' text
function onText() {
    var d = dist(mouseX, mouseY, tx, 25); // calculate distance between the cursor and text
    if(d < 20) { // if click is inside  circle, update circle and score
        return true;
    } else {
        return false;
    }
}
