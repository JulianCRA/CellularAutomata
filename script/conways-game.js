var conwayslife = function( p ) {

    let gridWidth;
    let gridHeight;

    let grid;
    let evolution;

    p.setup = function() {
        p.initSketch(50, 250);

        // GLIDER
        //p.initSketch(50, [{x:2, y:2},{x:3, y:2},{x:4, y:2},{x:4, y:1},{x:3, y:0}]);

        
        p.createCanvas(600, 600);
    }
    

    p.draw  = function(){
        for (let i = 0; i < gridWidth; i++){
            evolution[i] = new Array(gridHeight);
            for (let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                evolution[i][j] = grid.data[i][j].currentState;

                p.fill(grid.data[i][j].currentState * 255);
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

    p.initSketch = function(size, seed){
        p.clear();
        p.frameRate(15);
        gridWidth = size;
        gridHeight = size;
        evolution = new Array(gridWidth);
        grid = new Grid(gridWidth, gridHeight, 1);
        if(seed.constructor === Array){
            console.log(seed.length);
            for(let i = 0; i < seed.length; i++)
                grid.data[seed[i].x][seed[i].y].setInitialState(0);
        }else{
            grid.preShuffle(seed, 0);
        }
    }

    p.evaluateCell = function(xpos, ypos){
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
}