let classifier;
let label = "Attendi...";
let snake = [{x: 200, y: 200}];
let direction = {x: 20, y: 0};
let food = {x: 100, y: 100};
let w = 20, h = 20;

function preload() {
  let options = { probabilityThreshold: 0.85 };
  classifier = ml5.soundClassifier('SpeechCommands18w', options);
}

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  classifier.classify(gotResult);
}

function draw() {
  background(0);

  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(label, width / 2, height - 20);

  let head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {x: floor(random(width / w)) * w, y: floor(random(height / h)) * h};
  } else {
    snake.pop();
  }

  if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) noLoop();
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) noLoop();
  }

  fill(0, 255, 0);
  for (let s of snake) rect(s.x, s.y, w, h);

  fill(255, 0, 0);
  rect(food.x, food.y, w, h);
}

function gotResult(error, results) {
  if (error) return console.error(error);
  label = results[0].label;
  changeDirection(label);
}

function keyPressed() {
  if (keyCode === UP_ARROW) changeDirection("up");
  if (keyCode === DOWN_ARROW) changeDirection("down");
  if (keyCode === LEFT_ARROW) changeDirection("left");
  if (keyCode === RIGHT_ARROW) changeDirection("right");
}

function changeDirection(cmd) {
  if (cmd === "up" && direction.y === 0) direction = {x: 0, y: -20};
  if (cmd === "down" && direction.y === 0) direction = {x: 0, y: 20};
  if (cmd === "left" && direction.x === 0) direction = {x: -20, y: 0};
  if (cmd === "right" && direction.x === 0) direction = {x: 20, y: 0};
}

function startGame() {
  snake = [{x: 200, y: 200}];
  direction = {x: 20, y: 0};
  food = {x: 100, y: 100};
  label = "Attendi...";
  loop(); // fa ripartire draw()
}

function stopGame() {
  noLoop(); // ferma draw()
}

