var diffusionlimitedaggregation = function (p){

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let canvas;

    let q;

    let k1;
    let k2;
    
    p.grid;
    let mobility;
    let firstDraw = true;
    let center;

    p.setup = function(){
        p.initSketch(200, 200, 64, 20, 1);
    }

    p.initSketch = function(w, h, states, kk1, kk2){
        canvas = p.createCanvas(600,600);
        canvas.doubleClicked = function(){p.doubleClicked();}
        p.noStroke();
        //p.noLoop();
        p.frameRate(60);

        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        k1 = kk1 / 1;
        k2 = kk2 / 1;
        q = states / 1;

        mobility = new Array(gridWidth);
        markForUpdate = new Array(gridWidth);
        for(let i = 0; i < gridWidth; i++){
            mobility[i] = new Array(gridHeight);
            markForUpdate[i] = new Array(gridHeight);
        }


        p.grid = new Grid(gridWidth, gridHeight);
        /*let seedCells = p.grid.shuffle(k2, q);
        for(let i = 0; i < seedCells.length; i++){
            mobility[seedCells[i].x][seedCells[i].y] = false;
        }*/
        center = Math.floor(gridWidth/2);
        p.grid.next[center][center] = q;
        mobility[center][center] = false;
        let otherCells = p.grid.shuffle(Math.floor(gridWidth*gridHeight*kk1/100), 1, q);
        for(let i = 0; i < otherCells.length; i++){
            mobility[otherCells[i].x][otherCells[i].y] = true;
        }
        p.firstDraw();
    }

    p.draw = function(){
        let randX;
        let randY;
        
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                randX = Math.floor(Math.random()*gridWidth);
                randY = Math.floor(Math.random()*gridHeight);
                p.evaluateCell(randX, randY);
            }
        }
        p.background(0);
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                if(markForUpdate[i][j]){
                    let distance = p.dist(center, center, i, j);
                    if(distance <= center && p.grid.current[i][j] == q){
                        p.fill(p.color('rgba(255, 255, 154,'+ (1-(distance/(2*center))) +')'));
                        p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                    }
                }
            }
        }
    }

    p.firstDraw = function(){
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                p.fill(p.grid.current[i][j]*255/q);
                p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
            }
        }
    }
    p.evaluateCell = function(xpos, ypos){
        if(mobility[xpos][ypos] == true){
            let n = p.grid.getNeighborhood(xpos, ypos, 1, false);
            let hasFixedNeighbor = false;
            for(let i = 0; i < n.neighborhood.length; i++){
                if(mobility[n.neighborhood[i].x][n.neighborhood[i].y] == false){
                    hasFixedNeighbor = true;
                    break;
                }
            }

            if(hasFixedNeighbor){
                p.grid.current[xpos][ypos] = q;
                mobility[xpos][ypos] = false;
            }
            else{
                if(n.hasEmptySpaces){
                    let newPos = n.emptySpaces[Math.floor(Math.random() * n.emptySpaces.length)];
                    p.grid.current[newPos.x][newPos.y] = p.grid.current[xpos][ypos];
                    mobility[newPos.x][newPos.y] = true;
                    markForUpdate[newPos.x][newPos.y] = true;
                    p.grid.current[xpos][ypos] = -1;
                    mobility[xpos][ypos] = undefined;
                }
            }
            markForUpdate[xpos][ypos] = true;
        }
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}