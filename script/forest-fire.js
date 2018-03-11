const _EMPTY = 0;
const _BURNING = 1;
const _TREE = 2;

let gridWidth = 200;
let gridHeight = 200;

let f = 0.000005;
let p = 0.005;
let grid = new Grid(gridWidth, gridHeight, 1);
let evolution = new Array(gridWidth);

function setup() {
    var cnv = createCanvas(800, 800);
    cnv.parent('gridBoard2');
    //frameRate(3);
    //noLoop();
}

function draw(){
    for (let i = 0; i < gridWidth; i++){
        evolution[i] = new Array(gridHeight);
        for (let j = 0; j < gridHeight; j++){
            evaluateCell(i, j);
            evolution[i][j] = grid.data[i][j].currentState;

            switch(grid.data[i][j].currentState){
                case _BURNING:
                    fill("red");
                    break;
                case _EMPTY:
                    fill("gray");
                    break;
                case _TREE:
                    fill("green");
                    break;
            }
            
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
    if(grid.data[xpos][ypos].previousState == _BURNING) grid.data[xpos][ypos].setState(_EMPTY);
    if(grid.data[xpos][ypos].previousState == _EMPTY && Math.random() < p) grid.data[xpos][ypos].setState(_TREE);
    if(grid.data[xpos][ypos].previousState == _TREE){
        if( grid.data[xpos][ypos-1 > 0? ypos-1:gridHeight-1].previousState == _BURNING ||
            grid.data[xpos-1 > 0? xpos-1:gridWidth-1][ypos].previousState == _BURNING ||
            grid.data[xpos+1 > gridWidth-1? 0:xpos+1][ypos].previousState == _BURNING ||
            grid.data[xpos][ypos+1 > gridHeight-1? 0:ypos+1].previousState == _BURNING ){
                grid.data[xpos][ypos].setState(_BURNING);
        }else if(Math.random() < f){
            grid.data[xpos][ypos].setState(_BURNING);
        }
    }
}
