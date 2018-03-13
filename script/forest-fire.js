var forestfire = function( p ) {

    const _EMPTY = 0;
    const _BURNING = 1;
    const _TREE = 2;
    const _BURNT = 3;

    let gridWidth;
    let gridHeight;

    let f;       // spontaneous combustion probablilty
    let d;            // fire resitance
    let pt;         // tree germination probability
    let rr;       // soil recovery rate
    let grid;
    let evolution;

    p.setup = function() {
        p.initSketch(120, 0.000005, 0.3, 0.005, 0.000001);
        p.createCanvas(600, 600);
    }

    p.draw = function(){
        for (let i = 0; i < gridWidth; i++){
            evolution[i] = new Array(gridHeight);
            for (let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                evolution[i][j] = grid.data[i][j].currentState;

                switch(grid.data[i][j].currentState){
                    case _BURNING:
                        p.fill("orangered");
                        break;
                    case _EMPTY:
                        p.fill("saddlebrown");
                        break;
                    case _TREE:
                        p.fill("forestgreen");
                        break;
                    case _BURNT:
                        p.fill("black");
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

    p.initSketch = function(size, combustion, resistance, germination, recovery){
        gridWidth = size;
        gridHeight = size;

        f = combustion;
        d = resistance;
        pt = germination;
        rr = recovery;
        grid = new Grid(gridWidth, gridHeight, _TREE);
        evolution = new Array(gridWidth);
    }

    p.evaluateCell = function(xpos, ypos){
        
        if(grid.data[xpos][ypos].previousState == _BURNING){
            grid.data[xpos][ypos].setState(_BURNT);
            grid.data[xpos][ypos].deadtime = rr;
        } 
        else if(grid.data[xpos][ypos].previousState == _BURNT){
            grid.data[xpos][ypos].deadtime+=grid.data[xpos][ypos].deadtime;
            if(Math.random() < grid.data[xpos][ypos].deadtime)
                grid.data[xpos][ypos].setState(_EMPTY);
        }
        else if(grid.data[xpos][ypos].previousState == _EMPTY && Math.random() < pt) grid.data[xpos][ypos].setState(_TREE);
        else if(grid.data[xpos][ypos].previousState == _TREE && Math.random() > d){
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