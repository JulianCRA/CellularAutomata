var belusovzhabotinsky = function( p ) {
    p.grid;

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let n;
    let k1;
    let k2;
    let g;

    let canvas;
    
    p.setup = function(){
        p.initSketch(100, 100, 12, 24, 1, 1, 10);
    }
    
    p.initSketch = function(w, h, seed, states, kk1, kk2, gg){
        canvas = p.createCanvas(600, 600);
        canvas.doubleClicked = function(){p.doubleClicked();};
        //p.noLoop();
        //p.frameRate(12);

        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        n = states / 1;
        k1 = kk1 / 1;
        k2 = kk2 / 1;
        g = gg / 1;

        p.grid = new Grid(gridWidth, gridHeight, 0);
        p.grid.shuffle(seed/1, n);

        p.noStroke();
    }

    p.draw = function(){
        //p.clear();
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                if(p.grid.cellChangedState(i, j)){
                    p.fill(p.color(p.grid.current[i][j]*255/n, 120, 120));
                    p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                    //p.textSize(12);
                    //p.text(p.grid.current[i][j], i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                }
            }
        }
        p.grid.iterateAll();
    }

    p.evaluateCell = function(xpos, ypos){
        let results = p.grid.getNeighborhood(xpos, ypos, 2, false);   // Moore neighbprhood with Tchebychev distance of 2
        let infected = 0;
        let ill = 0;
        let sum = 0;
        let newState;

        for(let i = 0; i < results.neighbors.length; i++){
            if(results.neighbors[i].state == n){
                ill++;
            }
            else if(results.neighbors[i].state > 0 && results.neighbors[i].state < n){
                infected++;
            }
            sum += results.neighbors[i].state;
        }

        if(p.grid.current[xpos][ypos] == 0){                            // if the cell is "healthy"
            newState = Math.floor(infected/k1) + Math.floor(ill/k2);
        }
        else if(p.grid.current[xpos][ypos] == n){                       // if the cell is "ill"
            newState = 0;
        }
        else if(p.grid.current[xpos][ypos] > 0 && p.grid.current[xpos][ypos] < n){ // if the cell is "infected"
            newState = Math.floor(sum/(infected + ill + 1)) + g;
        }
        
        if(newState > n) newState = n;
        p.grid.next[xpos][ypos] = newState;
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}