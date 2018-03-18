class Grid{
    constructor(gwidth, gheight, state = -1, death = -1){
        this.width = gwidth;
        this.height = gheight;
        this.initialState = state;
        this.death = 1;
        
        this.current = new Array(this.width);
        this.next = new Array(this.width);
        for(let i = 0; i < this.width; i++){
            this.current[i] = new Array(this.height);
            this.next[i] = new Array(this.height);
            for(let j = 0; j < this.height; j++){
                this.current[i][j] = this.initialState;
                this.next[i][j] = this.initialState;
            }
        }
    }

    shuffle(amount, state){
        for(let i = 0; i < amount; i++){
            let randx = Math.floor(Math.random()*(this.width));
            let randy = Math.floor(Math.random()*(this.height));
            if(this.current[randx][randy] != state){
                this.current[randx][randy] = state;
            }else{
                i--;
            }
        }
    }

    getNeighborhood(xpos, ypos, radius = 3, toroidal = true, self = false){
        let bound = (radius - 1)/2;
        let hasNeighbors = false;
        let neighbors = new Array();
        let hasEmptySpaces = false;
        let emptySpaces = new Array();
        let deadNeighbors = new Array();

        for(let i = -bound; i <= bound; i++){
            for(let j = -bound; j <= bound; j++){
                if(!self && i == 0 && j == 0){
                    //console.log("break? "+xpos+" - "+ypos);
                }else{
                //if(!self && !(i == 0 && j == 0))
                    let killAfterBounds = false;
                    let xx = xpos + i;
                    let yy = ypos + j;

                    if(toroidal){
                        if(xx == -1) xx = this.width - 1;
                        else if(xx == this.width ) xx = 0;
                        if(yy == -1) yy = this.height - 1;
                        else if(yy == this.height ) yy = 0;
                    }else{
                        if(xx < 0 || xx > this.width - 1 || yy < 0 || yy > this.height - 1){
                            killAfterBounds = true;
                        }
                    }/*else{
                        if(xx < 0) xx = 0;
                        else if(xx > this.width - 1) xx = this.width - 1;
                        if(yy < 0) yy = 0;
                        else if(yy > this.height - 1) yy = this.height - 1;
                    }*/

                    if(!killAfterBounds){
                        if(this.existsCellIn(xx, yy)){
                            hasNeighbors = true;
                            if(this.deadCellIn(xx, yy)){
                                deadNeighbors.push({x:xx, y:yy, state:this.current[xx][yy]});
                            }else{
                                neighbors.push({x:xx, y:yy, state:this.current[xx][yy]});
                            }
                        }else{
                            hasEmptySpaces = true;
                            emptySpaces.push({x:xx, y:yy, state:this.current[xx][yy]});
                        }
                    }
                }
            }
        }
        return {hasEmptySpaces:hasEmptySpaces, emptySpaces:emptySpaces, hasNeighbors:hasNeighbors, neighbors:neighbors};
    }
    deadCellIn(xpos, ypos){
        if(this.current[xpos][ypos] == this.death){
            return true;
        }
        return false;
    }
    existsCellIn(xpos, ypos){
        if(this.current[xpos][ypos] == -1){
            return false;
        }
        return true;
    }

    cellChangedState(xpos, ypos){
        if (this.next[xpos][ypos] != undefined && this.current[xpos][ypos] != this.next[xpos][ypos]){
            return true;
        }
        else{
            return false;
        }
    }

    iterate(xpos, ypos){
        if(this.cellChangedState(xpos, ypos)){
            this.current[xpos][ypos] = this.next[xpos][ypos];
        }
    }

    iterateAll(){
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                this.iterate(i, j);
            }
        }
    }

    switchCells(x1, y1, x2, y2){
        this.next[x2][y2] = this.current[x1][y1];
        this.next[x1][y1] = this.current[x2][y2];
    }
}