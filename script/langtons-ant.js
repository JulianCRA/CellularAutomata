const _LEFT = -1;
const _RIGHT = 1;

let gridWidth = 80;
let gridHeight = 80;
let ant = {x:35, y:35, direction:0};

let grid = new Array(gridWidth);
for (let i = 0; i < grid.length; i++){
  grid[i] = new Array(gridHeight).fill(1);
}

function setup() {
  createCanvas(800, 800);
  //noLoop();
}

function draw() {
  
  //for(let q = 0; q < 11000; q++){
    if(grid[ant.x][ant.y] == 1){
      grid[ant.x][ant.y] = 0;
      moveAnt(_RIGHT);
    }else{
      grid[ant.x][ant.y] = 1;
      moveAnt(_LEFT);
    } 
  //}

  background(120);
  strokeWeight(1);
  for (let i = 0; i < gridWidth; i++){
    for (let j = 0; j < gridHeight; j++){
      fill(grid[i][j] * 255);
      stroke(0);
      rect(i * width / gridWidth, j * height / gridHeight, (width / gridWidth)-1, (height / gridHeight)-1);
    }
  }
  
  
}

function moveAnt(direction){
  ant.direction += direction;
  if (ant.direction == 4) ant.direction = 0;
  if (ant.direction == -1) ant.direction = 3;
  switch(ant.direction){
    case 0:
      ant.x == 0 ? ant.x = gridWidth-1 : ant.x--;
      break;
    case 1:
      ant.y == 0 ? ant.y = gridHeight-1 : ant.y--;
      break;
    case 2:
      ant.x == gridWidth-1 ? ant.x = 0 : ant.x++;
      break;
    case 3:
      ant.y == gridHeight-1 ? ant.y = 0 : ant.y++;
      break;
  }
}