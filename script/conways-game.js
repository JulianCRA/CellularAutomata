let gridWidth = 30;
let gridHeight = 30;

let grid = new Grid(gridWidth, gridHeight, 1);
let evolution = new Array(gridWidth);

function setup() {
    var cnv = createCanvas(800, 800);
    cnv.parent('gridBoard2');
    //grid.preShuffle(90, 0);
    
    grid.data[3][3].setInitialState(0);
    grid.data[4][3].setInitialState(0);
    grid.data[5][3].setInitialState(0);
    grid.data[5][2].setInitialState(0);
    grid.data[4][1].setInitialState(0);
      
    frameRate(15);
    //noLoop();
}
  
function draw() {
    //background(120);
    drawGrid();
}

function drawGrid(){
    //strokeWeight(1);
    for (let i = 0; i < gridWidth; i++){
        evolution[i] = new Array(gridHeight);
        for (let j = 0; j < gridHeight; j++){
            evaluateCell(i, j);
            evolution[i][j] = grid.data[i][j].currentState;

            fill(grid.data[i][j].currentState * 255);
            noStroke()
            rect(i * width / gridWidth, j * height / gridHeight, (width / gridWidth), (height / gridHeight));
            
        }
    }
    for (let i = 0; i < gridWidth; i++){
        for (let j = 0; j < gridHeight; j++){
            grid.data[i][j].setState(evolution[i][j]);
        }
    }
}

function evaluateCell(xpos, ypos){
    let aliveNeighbors = 0;
    for (let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            let xx = xpos + i;
            let yy = ypos + j;
            if(xx == -1) xx = gridWidth - 1;
            else if(xx == gridWidth ) xx = 0;
            if(yy == -1) yy = gridHeight - 1;
            else if(yy == gridHeight ) yy = 0;
            if(grid.data[xx][yy].previousState == 0 ) aliveNeighbors++;
        }
    }
    
    if(grid.data[xpos][ypos].previousState == 0){
        aliveNeighbors--;
        if(aliveNeighbors < 2){
            grid.data[xpos][ypos].setState( 1 );
        }
        else if(aliveNeighbors >= 2 && aliveNeighbors <= 3){
            grid.data[xpos][ypos].setState( 0 );
        }
        else if(aliveNeighbors > 3){
            grid.data[xpos][ypos].setState( 1 );
        }
    }else{
        if(aliveNeighbors == 3){
            grid.data[xpos][ypos].setState( 0 );
        }else{
            grid.data[xpos][ypos].setState( 1 );
        }
    }
   
}

function keyPressed() {
    drawGrid();
    return false;
}