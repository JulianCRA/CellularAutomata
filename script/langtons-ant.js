var langtonsant = function( p ) {

  const _LEFT = -1;
  const _RIGHT = 1;

  let gridWidth = 120;
  let gridHeight = 120;
  let antA = {x:30, y:30, direction:0};
  let antB = {x:90, y:90, direction:2};

  let grid = new Grid(gridWidth, gridHeight, 1);

  p.setup = function(){
    let cnv = p.createCanvas(600, 600);
    //noLoop();
  }

  p.draw = function(){
    p.drawAnt(antA);
    p.drawAnt(antB);
    p.drawAnt(antA);
    p.drawAnt(antB);
    p.drawAnt(antA);
    p.drawAnt(antB);
    p.drawAnt(antA);
    p.drawAnt(antB);
    p.drawAnt(antA);
    p.drawAnt(antB);
    p.drawAnt(antA);
    p.drawAnt(antB);
    p.drawAnt(antA);
    p.drawAnt(antB);
    p.drawAnt(antA);
    p.drawAnt(antB);
    p.drawAnt(antA);
    p.drawAnt(antB);
  }

  p.drawAnt = function(ant){
    p.fill(grid.data[ant.x][ant.y].currentState * 255);
    //stroke(grid.data[ant.x][ant.y].currentState * 255);
    p.noStroke();
    p.rect(ant.x * p.width / gridWidth, ant.y * p.height / gridHeight, (p.width / gridWidth)-1, (p.height / gridHeight)-1);

    p.moveAnt(ant);
  }

  p.moveAnt = function(ant){
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

  p.drawGrid = function(steps){
    for(let q = 0; q < steps; q++){
      p.moveAnt(antA);
    }

    strokeWeight(1);
    for (let i = 0; i < gridWidth; i++){
      for (let j = 0; j < gridHeight; j++){
        if(grid.data[i][j].currentState == 0/* || grid.data[i][j].previousState == 0*/){
          p.fill(grid.data[i][j].currentState * 255);
          p.stroke(0)
          p.rect(i * p.width / gridWidth, j * p.height / gridHeight, (p.width / gridWidth)-1, (p.height / gridHeight)-1);
        }
      }
    }
  }

}