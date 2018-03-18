var diffusionlimitedaggregation = function (p){

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let canvas;

    let q;

    let k1;     // infection rate
    let k2;     // base rate
    
    let grid;
    let mobility;

    p.setup = function(){
        p.initSketch(10, 3, 40, 10);
    }

    p.initSketch = function(size, states, kk1, kk2){
        canvas = p.createCanvas(600,600);
        canvas.doubleClicked = function(){p.doubleClicked();}
        p.noStroke();
        p.noLoop();

        gridWidth = size;
        gridHeight = size;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        k1 = kk1*1;
        k2 = kk2*1;
        q = states * 1;

        mobility = new Array(gridWidth);
        for(let i = 0; i < gridWidth; i++)
            mobility[i] = new Array(gridHeight);

        p.grid = new Grid(gridWidth, gridHeight, 0);
        p.grid.data[5][5].setInitialState(q);
        mobility[5][5] = false;
        // Set seed cells
        /*for(let i = 0; i < k2; i++){
            let randX = Math.floor(Math.random()*gridWidth);
            let randY = Math.floor(Math.random()*gridHeight);
            if(p.grid.data[randX][randY].currentState == 0){
                p.grid.data[randX][randY].setInitialState(q);
                p.grid.data[randX][randY].fixed = true;
            }else{
                i--;
            }
        }*/
        // Set "other" cells
        let bound = Math.floor(gridWidth * gridHeight * k1 / 100);
        for(let i = 0; i < bound; i++){
            let randX = Math.floor(Math.random()*gridWidth);
            let randY = Math.floor(Math.random()*gridHeight);
            if(p.grid.data[randX][randY].currentState == 0){
                p.grid.data[randX][randY].setInitialState(1);
                mobility[randX][randY] = true;
            }else{
                i--;
            }
        }
    }

    p.draw = function(){
        p.clear();
        //p.grid.iterate();
        for (let i = 0; i < gridWidth; i++){
            for (let j = 0; j < gridHeight; j++){
                let randX = Math.floor(Math.random()*gridWidth);
                let randY = Math.floor(Math.random()*gridHeight);
                p.evaluateCell(randX, randY);
                //if(p.grid.data[i][j].fixed!=undefined){
                switch(p.grid.data[i][j].currentState){
                    case 0:
                        p.fill("black");
                        break;
                    case 1:
                        p.fill("blue");
                        break;
                    case 2:
                        p.fill("yellow");
                        break;
                    case 3:
                        p.fill("white");
                        break;
                }
                //p.fill(p.grid.data[i][j].currentState*255/q);
                p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                //}
            }
        }
        p.grid.iterate();
    }

    p.evaluateCell = function(xpos, ypos, radius = 3){
        if(mobility[xpos][ypos] != undefined){
            if(mobility[xpos][ypos] == true){
                let neighborhood = p.checkNeighborhood(xpos, ypos);
                if(neighborhood.hasFixedNeighbors){
                    console.log("x:"+xpos+" y:"+ypos+" hasfixed");
                    //let newState = Math.ceil(p.random(1, q));
                    let newState = q;
                    p.grid.nextIteration[xpos][ypos] = newState;
                    mobility[xpos][ypos] == false;
                }else{
                    
                    let freeSpot = neighborhood.emptyNeighbors[Math.floor(Math.random() * neighborhood.emptyNeighbors.length-1)];
                    if(freeSpot != undefined){
                        console.log("Move");
                        let tempMob = mobility[xpos][ypos];
                        mobility[xpos][ypos] = mobility[freeSpot.x][freeSpot.y];
                        mobility[freeSpot.x][freeSpot.y] = tempMob;

                        let tempState = p.grid.nextIteration[xpos][ypos];
                        p.grid.nextIteration[xpos][ypos] = p.grid.nextIteration[freeSpot.x][freeSpot.y];
                        p.grid.nextIteration[freeSpot.x][freeSpot.y] = tempState;
                    }
                }
            }
        }
    }

    p.checkNeighborhood = function(xpos, ypos, radius = 3){
        let bound = (radius - 1)/2;
        let hasFixedNeighbors = false;
        let emptyNeighbors = new Array();

        for(let i = -bound; i <= bound; i++){
            for(let j = -bound; j <= bound; j++){
                let xx = xpos + i;
                let yy = ypos + j;

                if(xx < 0) xx = 0;
                else if(xx > gridWidth - 1) xx = gridWidth - 1;
                if(yy < 0) yy = 0;
                else if(yy > gridHeight - 1) yy = gridHeight - 1;

                if(xx!=xpos && yy!=ypos){
                    if(mobility[xx][yy] != undefined){
                        if(mobility[xx][yy] == false){
                            hasFixedNeighbors = true;
                        }
                    }else{
                        emptyNeighbors.push({x:xx, y:yy});
                    }
                }
            }
        }
        return {hasFixedNeighbors:hasFixedNeighbors, emptyNeighbors:emptyNeighbors};
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}