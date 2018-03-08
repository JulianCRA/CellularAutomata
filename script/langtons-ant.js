const _LEFT = -1;
const _RIGHT = 1;

let gridWidth = 160;
let gridHeight = 160;
let ant = {x:60, y:60, direction:0};

let grid = new Grid(gridWidth, gridHeight, 1);

function setup() {
  var cnv = createCanvas(800, 800);
  cnv.parent('gridBoard');
  //noLoop();
}

function draw() {
  //drawGrid(11000);
  drawAnt();
  drawAnt();
  drawAnt();
  drawAnt();
  drawAnt();
  drawAnt();
  drawAnt();
  drawAnt();
  drawAnt();
  drawAnt();
}

function drawAnt(){
  fill(grid.data[ant.x][ant.y].currentState * 255);
  stroke(0);
  rect(ant.x * width / gridWidth, ant.y * height / gridHeight, (width / gridWidth)-1, (height / gridHeight)-1);

  moveAnt();
}

function moveAnt(){
  grid.data[ant.x][ant.y].col >= 2 ? grid.data[ant.x][ant.y].col-=2 : grid.data[ant.x][ant.y].col = 0;
  grid.data[ant.x][ant.y].currentState == 1 ? ant.direction++ : ant.direction--;
  grid.data[ant.x][ant.y].setState( 1 - grid.data[ant.x][ant.y].currentState);

  let newDirection = Math.abs(ant.direction) % 4;
  
  switch(newDirection){
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

function drawGrid(steps){
  for(let q = 0; q < steps; q++){
    moveAnt();
  }

  strokeWeight(1);
  for (let i = 0; i < gridWidth; i++){
    for (let j = 0; j < gridHeight; j++){
      if(grid.data[i][j].currentState == 0/* || grid.data[i][j].previousState == 0*/){
        fill(grid.data[i][j].currentState * 255);
        stroke(0)
        rect(i * width / gridWidth, j * height / gridHeight, (width / gridWidth)-1, (height / gridHeight)-1);
      }
    }
  }
}
