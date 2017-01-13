// p5 file

// open the console window of any browser to see console.log() messages,
// like print() messages in Processing
console.log("this is a js comment");

function setup() {
  var myCanvas = createCanvas(800, 250);
  myCanvas.parent('#mySketch');
  background(255);
}

function draw() {
  // statements here
  if(mouseIsPressed) {
      fill(0);
  } else {
      fill(255);
  }
  ellipse(mouseX, mouseY, 50, 50);
}
