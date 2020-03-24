
let snakeThickness = 20;
let map;//two dimension
let headValues = [2], food = [2];//single dimension
let foodCount, count, dir, gameOver;
function setup() {
  createCanvas(800, 800);
  background(0);
  frameRate(15);
  makeSnake();
}
function makeSnake(){
  map = [];
  gameOver = false;
  dir = 0;
  foodCount = 0;
  //to make a Scale
  map[0] = [];
  map[0][0] = 400 + snakeThickness;
  map[0][1] = 400;
  square(map[0][0], map[0][1], snakeThickness);
  headValues = map[0];
  //to repeat 3 more times
  count = 0;
  for (let i = 1; i < 4;i++){
    map[i] = [];
    map[i][0] = 400 - count;
    map[i][1] = 400;
    square(map[i][0], map[i][1], snakeThickness);
    count += snakeThickness;
  }
  placeFood();
}
function play() {
  if(dir == 0){//arrow up
    decide(0, -snakeThickness);
  }if(dir == 1){//arrow down
    decide(0, snakeThickness);
  }if(dir == 2){//arrow left
    decide(-snakeThickness,0);
  }if(dir == 3){//arrow right
    decide(snakeThickness,0);
  }
}
function keyPressed() {
  if(keyCode == 38 && dir != 1){//arrow up
    dir = 0;
  }if(keyCode == 40 && dir != 0){//arrow down
    dir = 1;
  }if(keyCode == 37 && dir != 3){//arrow left
    dir = 2;
  }if(keyCode == 39 && dir != 2){//arrow right
    dir = 3;
  }if(keyCode == 82){//restart game
    makeSnake();
  }
}
function decide(adj,adj2){
  
  //if head collids with food
  if(hasCollidedF(headValues[0] + adj, headValues[1] + adj2)){
    addValue();
    foodCount++;
  }else
    rotato();
  
  //make new head
  headValues[0] += adj;
  headValues[1] += adj2;
  map[0][0] = headValues[0];
  map[0][1] = headValues[1];
  
  //if head collids with self
  for(let i = 1; i  < map.length;i++)
    if(hasCollided(map[i][0],map[i][1]))
      gameOver = true;
  //if head gone out of bounds
  if(map[0][0] >= width ||map[0][1] >= height)
    gameOver = true;
  //if gone underbounds
  if( 0 > map[0][0] || 0 > map[0][1])
      gameOver = true;
}
function placeFood(){
  food[0] = int(random(0,width/20))*20;
  food[1] = int(random(0,height/20))*20;
  for(let i = 0; 0 < map.lenth;i++)
    if (hasCollidedF(map[i][0],map[i][0]))//if Food is placed on snake
      placeFood();
}
function hasCollidedF(x,y){
  if (food[0] == x && food[1] == y)
    return true;
  else
    return false;
}
function hasCollided(x,y){
  if (map[0][0] == x && map[0][1] == y)
    return true;
  else
    return false;
}
function addValue(){
  //keeps tail value and increases list size
  map[map.length] = [];
  map[map.length-1][0] = map[map.length-2][0];
  map[map.length-1][1] = map[map.length-2][1];
  for (let i = map.length-1;i > 0;i--){// to rotate values
      map[i][0] = map[i-1][0];
      map[i][1] = map[i-1][1];
    }
  placeFood();
}
function rotato(){
  for (let i = map.length-1;i > 0;i--){// to rotate values
      map[i][0] = map[i-1][0];
      map[i][1] = map[i-1][1];
    }
}
function endGame(){
  background(255,0,0);
  textSize(100);
  text("Game Over!",width/8,height/2);
  textSize(50);
  text("Score: "+foodCount,width/3,height/4);
}
function draw() {
  if(!gameOver){
    play();
    drawSnake();
    drawFood();
    drawUI();
  }else
    endGame();
} 
function drawUI(){
  text(foodCount,10,10);
}
function drawSnake(){
    background(0);
    fill(255);
    for(let i = 0; i < map.length;i++)
      square(map[i][0], map[i][1], snakeThickness);
}
function drawFood(){
  fill(0,255,0);
  square(food[0],food[1],snakeThickness);
}