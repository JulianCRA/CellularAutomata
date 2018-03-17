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
    p.cycles = 0;
    
    p.setup = function(){
        
        p.initSketch(60, 5, 50, 1, 1, 10);
        //p.initSketch(18, 5, 50, 1, 1, 10);
        //p.noLoop();
    }
    p.isf = function(size, seed, states, kk1, kk2, gg){
        console.log(size+" - "+seed+" - "+states+" - "+kk1+" - "+kk2+" - "+gg);
    }
    p.initSketch = function(size, seed, states, kk1, kk2, gg){
        canvas = p.createCanvas(600, 600);
        canvas.doubleClicked = function(){p.doubleClicked();}
        //p.frameRate(12);

        gridWidth = size*1;
        gridHeight = size*1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        n = states*1;
        k1 = kk1*1;
        k2 = kk2*1;
        g = gg*1;

        p.grid = new Grid(gridWidth, gridHeight, 0);
        p.grid.preShuffle(seed*1, n);


        p.noStroke();
    }

    p.draw = function(){
        p.clear();
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                p.fill(p.color(p.grid.data[i][j].currentState*255/n, 120, 120));
                p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                //p.textSize(12);
                //p.text(p.grid.data[i][j].currentState, i*cellWidth, j*cellHeight, cellWidth, cellHeight);
            }
        }
        p.grid.iterate();
        p.cycles++;
    }

    p.evaluateCell = function(xpos, ypos){
        let results = p.checkNeighborhood(xpos, ypos);
        let newState;

        if(p.grid.data[xpos][ypos].currentState == 0){
            newState = Math.floor(results.infected/k1) + Math.floor(results.ill/k2);
        }
        else if(p.grid.data[xpos][ypos].currentState == n){
            newState = 0;
        }
        else if(p.grid.data[xpos][ypos].currentState > 0 && p.grid.data[xpos][ypos].currentState < n){
            newState = Math.floor(results.sum/(results.infected+results.ill+1)) + g;
        }
        else{
            console.log("WTF??!!!! - evaluation");
        }
        if(newState > n) newState = n;
        p.grid.nextIteration[xpos][ypos] = newState;
    }

    p.checkNeighborhood = function(xpos, ypos, radius = 7){
        let bound = (radius - 1)/2;
        let healthy = 0;
        let infected = 0;
        let ill = 0;
        let sum = 0;

        for(let i = -bound; i <= bound; i++){
            for(let j = -bound; j <= bound; j++){
                let xx = xpos + i;
                let yy = ypos + j;

                if(xx < 0) xx = 0;
                else if(xx > gridWidth - 1) xx = gridWidth - 1;
                if(yy < 0) yy = 0;
                else if(yy > gridHeight - 1) yy = gridHeight - 1;

                sum += p.grid.data[xx][yy].currentState*1;
                if(p.grid.data[xx][yy].currentState == 0){
                    healthy++;
                }
                else if(p.grid.data[xx][yy].currentState == n){
                    ill++;
                }
                else if(p.grid.data[xx][yy].currentState > 0 && p.grid.data[xx][yy].currentState < n){
                    infected++;
                }
                else{
                    console.log("WTF??!!!! - Neighborhood");
                }

                //console.log("x:"+xx+" y:"+yy+" s: "+p.grid.data[xx][yy].currentState);
            }
        }

        return{healthy:healthy, infected:infected, ill:ill, sum:sum}
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}