class SnakeGame {
    constructor(size){
        this.size = size;
        this.snakeThickness = 20;
        this.headValues = [2];
        this.food = [2];
        this.cnv = createCanvas(size, size);
        background(0);
        frameRate(15);
        this.makeSnake();
    }
    makeSnake(){
        this.map = [];
        this.gameOver = false;
        this.dir = 0;
        this.foodCount = 0;
        //to make a Scale
        this.map[0] = [];
        this.map[0][0] = 400 + this.snakeThickness;
        this.map[0][1] = 400;
        square(this.map[0][0], this.map[0][1], this.snakeThickness);
        this.headValues = this.map[0];
        //to repeat 3 more times
        this.count = 0;
        for (let i = 1; i < 4;i++){
            this.map[i] = [];
            this.map[i][0] = 400 - this.count;
            this.map[i][1] = 400;
            square(this.map[i][0], this.map[i][1], this.snakeThickness);
            this.count += this.snakeThickness;
        }
        this.placeFood();
    }
    play() {
        if(this.dir == 0){//arrow up
            this.decide(0, -this.snakeThickness);
        }if(this.dir == 1){//arrow down
            this.decide(0, this.snakeThickness);
        }if(this.dir == 2){//arrow left
            this.decide(-this.snakeThickness,0);
        }if(this.dir == 3){//arrow right
            this.decide(this.snakeThickness,0);
        }
    }
    decide(adj,adj2){
        //if head collids with food
        if(this.hasCollidedF(this.headValues[0] + adj, this.headValues[1] + adj2)){
            this.addValue();
            this.foodCount++;
        }else
            this.rotato();
  
        //make new head
        this.headValues[0] += adj;
        this.headValues[1] += adj2;
        this.map[0][0] = this.headValues[0];
        this.map[0][1] = this.headValues[1];
  
        //if head collids with self
        for(let i = 1; i  < this.map.length;i++)
            if(this.hasCollided(this.map[i][0],this.map[i][1]))
            this.gameOver = true;
        //if head gone out of bounds
        if(this.map[0][0] >= width ||this.map[0][1] >= height)
            this.gameOver = true;
        //if gone underbounds
        if( 0 > this.map[0][0] || 0 > this.map[0][1])
            this.gameOver = true;
    }
    placeFood(){
        this.food[0] = int(random(0,width/20))*20;
        this.food[1] = int(random(0,height/20))*20;
        for(let i = 0; 0 < this.map.lenth;i++)
            if (this.hasCollidedF(this.map[i][0],this.map[i][0]))//if Food is placed on snake
            this.placeFood();
    }
    hasCollidedF(x,y){
        if (this.food[0] == x && this.food[1] == y)
            return true;
        else
            return false;
    }
    hasCollided(x,y){
        if (this.map[0][0] == x && this.map[0][1] == y)
            return true;
        else
            return false;
    }
    addValue(){
        //keeps tail value and increases list size
        this.map[this.map.length] = [];
        this.map[this.map.length-1][0] = this.map[this.map.length-2][0];
        this.map[this.map.length-1][1] = this.map[this.map.length-2][1];
        for (let i = this.map.length-1;i > 0;i--){// to rotate values
            this.map[i][0] = this.map[i-1][0];
            this.map[i][1] = this.map[i-1][1];
            }
        this.placeFood();
    }
    rotato(){
        for (let i = this.map.length-1;i > 0;i--){// to rotate values
            this.map[i][0] = this.map[i-1][0];
            this.map[i][1] = this.map[i-1][1];
        }
    }
    endGame(){
        background(255,0,0);
        textSize(100);
        text("Game Over!",width/8,height/2);
        textSize(50);
        text("Score: "+this.foodCount,width/3,height/4);
    }
    drawUI(){
        textSize(20);
        text(this.foodCount,20,20);
    }
    drawSnake(){
        background(0);
        fill(255);
        for(let i = 0; i < this.map.length;i++)
            square(this.map[i][0], this.map[i][1], this.snakeThickness);
    }
    drawFood(){
        fill(0,255,0);
        square(this.food[0],this.food[1],this.snakeThickness);
    }
}