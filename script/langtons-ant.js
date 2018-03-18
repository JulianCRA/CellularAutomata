var langtonsant = function(p) {

    const _ROTATE_LEFT = -1;
    const _ROTATE_RIGHT = 1;

    let ants;
  
    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;
  
    p.grid;
    let canvas;
  
    p.setup = function(){
        p.initSketch(90, 90);
    }
   
    p.initSketch = function(w, h, antsArray=[{x:40, y:40, direction:1}]){
        canvas = p.createCanvas(600, 600);
        canvas.doubleClicked = function(){p.doubleClicked();};
        p.noStroke();
        
        ants = antsArray;

        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;
        
        p.grid = new Grid(gridWidth, gridHeight, 0);
    }

    p.draw = function(){
        for(let i = 0; i < ants.length; i++){
            p.drawAnt(ants[i]);
        }
    }

    p.moveAnt = function(ant){
        p.grid.current[ant.x][ant.y] == 1 ? ant.direction += _ROTATE_RIGHT : ant.direction += _ROTATE_LEFT;
        p.grid.current[ant.x][ant.y] = 1 - p.grid.current[ant.x][ant.y];
    
        let newDirection = Math.abs(ant.direction) % 4;
        
        switch(newDirection){
            case 0:
                ant.x == 0 ? ant.x = gridWidth-1 : ant.x--;
                break;
            case 1:
                ant.y == 0 ? ant.y = gridHeight-1 : ant.y--;
                break;
            case 2:
                ant.x == gridWidth-1 ? ant.x = 0 : ant.x++;
                break;
            case 3:
                ant.y == gridHeight-1 ? ant.y = 0 : ant.y++;
                break;
        }
    }

    p.drawAnt = function(ant){
        let i = ant.x;
        let j = ant.y;
        p.fill(p.grid.current[i][j] * 255);
        p.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight, cellWidth*0.3, cellWidth*0.3, cellWidth*0.3, cellWidth*0.3);
        p.moveAnt(ant);
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}