var forestfire = function( p ) {

    const _EMPTY = 0;
    const _BURNING = 1;
    const _TREE = 2;

    let gridWidth = 120;
    let gridHeight = 120;

    let f = 0.000005;       // spontaneous combustion probablilty
    let d = 0.2;            // fire resitance
    let pt = 0.005;         // tree birth probability
    let grid = new Grid(gridWidth, gridHeight, 1);
    let evolution = new Array(gridWidth);

    p.setup = function() {
        var cnv = p.createCanvas(600, 600);
    }

    p.draw = function(){
        for (let i = 0; i < gridWidth; i++){
            evolution[i] = new Array(gridHeight);
            for (let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                evolution[i][j] = grid.data[i][j].currentState;

                switch(grid.data[i][j].currentState){
                    case _BURNING:
                        p.fill("red");
                        break;
                    case _EMPTY:
                        p.fill("gray");
                        break;
                    case _TREE:
                        p.fill("green");
                        break;
                }
                
                p.noStroke()
                p.rect(i * p.width / gridWidth, j * p.height / gridHeight, (p.width / gridWidth), (p.height / gridHeight));
                
            }
        }
        for (let i = 0; i < gridWidth; i++){
            for (let j = 0; j < gridHeight; j++){
                grid.data[i][j].setState(evolution[i][j]);
            }
        }
    }

    p.evaluateCell = function(xpos, ypos){
        if(grid.data[xpos][ypos].previousState == _BURNING) grid.data[xpos][ypos].setState(_EMPTY);
        if(grid.data[xpos][ypos].previousState == _EMPTY && Math.random() < pt) grid.data[xpos][ypos].setState(_TREE);
        if(grid.data[xpos][ypos].previousState == _TREE && Math.random() > d){
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

}