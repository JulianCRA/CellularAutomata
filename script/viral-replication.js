var viralreplication = function (p){

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let canvas;

    let q;

    let k1;     // infection rate
    let k2;     // base rate
    let k3;     // reproduction rate

    let grid;

    p.setup = function(){
        p.initSketch(120, 100, 15, 5000, 25);
    }

    p.initSketch = function(size, states, kk1, kk2, kk3){
        canvas = p.createCanvas(600,600);
        canvas.doubleClicked = function(){p.doubleClicked();}
        p.noStroke();
        //p.noLoop();

        gridWidth = size;
        gridHeight = size;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        k1 = kk1*1;
        k2 = kk2*1;
        k3 = kk3*1;

        q = states * 1;
        p.grid = new Grid(gridWidth, gridHeight, 0);
        p.grid.preShuffle(gridWidth*gridHeight/2, q);
    }

    p.draw = function(){
        p.clear();
        p.grid.iterate();
        for (let i = 0; i < gridWidth; i++){
            for (let j = 0; j < gridHeight; j++){
                let randX = Math.floor(Math.random()*gridWidth);
                let randY = Math.floor(Math.random()*gridHeight);
                p.evaluateCell(randX, randY);
                p.fill(p.grid.data[i][j].currentState*255/q);
                p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
            }
        }
    }

    p.evaluateCell = function(xpos, ypos, radius = 3){
        let bound = (radius - 1)/2;
        let emptyCells = new Array();

        if(p.grid.data[xpos][ypos].currentState > 0){    // If exists
            if(p.grid.data[xpos][ypos].currentState == q){    // If healthy
                if(Math.random() < k2/100000){                  // Should infect?
                    p.grid.nextIteration[xpos][ypos] = q-1;
                }
                else{                                       // Should reproduce, then?
                    for(let i = -bound; i <= bound; i++){
                        for(let j = -bound; j <= bound; j++){
                            let xx = xpos + i;
                            let yy = ypos + j;
            
                            if(xx < 0) xx = gridWidth - 1;
                            else if(xx > gridWidth - 1) xx = 0;
                            if(yy < 0) yy = gridHeight - 1;
                            else if(yy > gridHeight - 1) yy = 0;

                            if(!(xx==xpos&&yy==ypos) && p.grid.data[xx][yy].currentState == 0){
                                emptyCells.push({x:xx, y:yy});
                            }
                        }
                    }
                    if(emptyCells[0]!=undefined && Math.random() < k3/100){   // Yeah, reproduce
                        let newBorn = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                        p.grid.nextIteration[newBorn.x][newBorn.y] = q;
                    }
                }
            }
            else if(p.grid.data[xpos][ypos].currentState != 1){     // if already infected
                p.grid.nextIteration[xpos][ypos] = p.grid.data[xpos][ypos].currentState - 1; 
            }
            else{                                       // If in last stage of infection
                p.grid.nextIteration[xpos][ypos] = 0;

                for(let i = -bound; i <= bound; i++){
                    for(let j = -bound; j <= bound; j++){
                        let xx = xpos + i;
                        let yy = ypos + j;
        
                        if(xx < 0) xx = gridWidth - 1;
                        else if(xx > gridWidth - 1) xx = 0;
                        if(yy < 0) yy = gridHeight - 1;
                        else if(yy > gridHeight - 1) yy = 0;

                        if(!(xx==xpos && yy==ypos) && p.grid.data[xx][yy].currentState>0&& Math.random()<k1/100){
                            p.grid.nextIteration[xx][yy]--;
                        }
                    }
                }
            }
        }
        else{
            p.grid.nextIteration[xpos][ypos] = 0;
        }
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}