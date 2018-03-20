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

    p.grid;
    let firstDraw = true;

    p.setup = function(){
        p.initSketch(200, 200, 50, 15, 5000, 25);
    }

    p.initSketch = function(w, h, states, kk1, kk2, kk3){
        canvas = p.createCanvas(600,600);
        canvas.doubleClicked = function(){p.doubleClicked();}
        p.noStroke();
        p.textSize(12);
                
        //p.noLoop();
        p.frameRate(10);

        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        k1 = kk1 / 1;
        k2 = kk2 / 1;
        k3 = kk3 / 1;

        q = states / 1;
        p.grid = new Grid(gridWidth, gridHeight, -1, 0);
        p.fill("black");
        p.rect(0,0,p.width,p.height);
        p.grid.shuffle(gridWidth*gridHeight/2, q);
    }

    p.draw = function(){
        //p.clear();
        p.grid.iterateAll();
        for (let i = 0; i < gridWidth; i++){
            for (let j = 0; j < gridHeight; j++){
                let randX = Math.floor(Math.random()*gridWidth);
                let randY = Math.floor(Math.random()*gridHeight);
                p.evaluateCell(randX, randY);
                if(p.grid.cellChangedState(randX, randY) || firstDraw){
                    p.fill(p.grid.next[randX][randY]*255/q);
                    p.rect(randX*cellWidth, randY*cellHeight, cellWidth, cellHeight);
                    //p.fill("red");
                    //p.text(p.grid.next[i][j], i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                }
            }
        }
        firstDraw = false;
    }

    p.evaluateCell = function(xpos, ypos){
        let results = p.grid.getNeighborhood(xpos, ypos, 1, false);   // Moore neighbprhood with Tchebychev distance of 1
        
        if(p.grid.existsCellIn(xpos, ypos)){    // If exists
            if(p.grid.current[xpos][ypos] == q){    // If healthy
                if(Math.random() < k2/100000){                  // Should infect?
                    p.grid.next[xpos][ypos] = q-1;
                }
                else{                                       // Should reproduce, then?
                    if(results.hasEmptySpaces && Math.random() < k3/100){   // Yeah, reproduce
                        let newBorn = results.emptySpaces[Math.floor(Math.random() * results.emptySpaces.length)];
                        p.grid.next[newBorn.x][newBorn.y] = q;
                    }
                }
            }
            else if(p.grid.current[xpos][ypos] == 0){                                       // If in last stage of infection
                p.grid.removeCellAt(xpos,ypos);
                if(results.hasNeighbors && Math.random()<k1/100){
                    for(let i = 0; i < results.neighbors.length; i++){
                        if( p.grid.next[results.neighbors[i].x][results.neighbors[i].y] > 1)
                            p.grid.next[results.neighbors[i].x][results.neighbors[i].y]--;
                    }
                }
            }
            else {     // if already infected
                p.grid.next[xpos][ypos] = p.grid.current[xpos][ypos] - 1; 
            }
        }else{
            p.grid.removeCellAt(xpos,ypos);
        }
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}