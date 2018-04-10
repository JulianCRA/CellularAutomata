var floodfill = function (p){

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let canvas;

    let colorList;
    let regions

    p.grid;
    let colors;
    let seed
    let pixStack;
    
    p.setup = function(){
        p.initSketch(300, 300, 600, 2);
    }

    p.initSketch = function(w, h, r, c){
        canvas = p.createCanvas(600,600);
        canvas.doubleClicked = function(){p.doubleClicked();}
        canvas.mouseClicked(fFill);
        p.noLoop();
        p.noStroke();
        
        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        regions = r / 1;
        colorList = new Array(c / 1);
        colors = new Array(gridWidth);
        p.grid = new Grid(gridWidth, gridHeight);
        seed = new Array();
        pixStack = new Array();

        for(let i = 0; i < colorList.length; i++){
            colorList[i] = p.color(p.random(255),p.random(255),p.random(255));
        }
       
        for(let i = 0; i < regions; i++){
            let rColor = Math.floor(Math.random()*colorList.length);
            let xpos = Math.floor(Math.random()*gridWidth);
            let ypos = Math.floor(Math.random()*gridHeight);
            seed.push({x:xpos, y:ypos, c:colorList[rColor]});
            p.grid.next[xpos][ypos] = rColor + 1;
        }
        p.grid.iterateAll();
        p.voronoi(seed, false);
    }

    fFill = function(){
        let startX = Math.floor(p.mouseX/cellWidth);
        let startY = Math.floor(p.mouseY/cellHeight);
        pixStack.push({x:startX, y:startY});
        console.log(startX, startY);
    }

    p.draw = function(){
        p.background(0);
        
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                p.fill(colors[i][j]);
                p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
            }
        }
        /*p.fill(255);
        for(let i = 0; i < seed.length; i++){
            p.ellipse(seed[i].x*cellWidth, seed[i].y*cellHeight, 10, 10);
        }*/
    }

    p.voronoi = function(origin, euclidean = true){
        for(let i = 0; i < gridWidth; i++){
            colors[i] = new Array(gridHeight);
            for(let j = 0; j < gridHeight; j++){
                let closest;
                let distance = gridWidth * gridHeight;
                for(let k = 0; k < origin.length; k++){
                    let dd = 0;
                    if(euclidean){
                        dd = p.dist(origin[k].x, origin[k].y, i, j);
                    }
                    else{
                        dd = Math.abs(origin[k].x - i) + Math.abs(origin[k].y - j)
                    }
                    
                    if(dd < distance){
                        closest = origin[k];
                        distance = dd;
                    }
                }
                colors[i][j] = closest.c;
            }
        }
    }

    p.doubleClicked = function(){
        //p.redraw();
        console.log("DOBKE");
    }
}