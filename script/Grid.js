class Grid {
    constructor(w, h, i) {
        this.width = w;
        this.height = h;
        this.initalState = i;
        
        this.data = new Array(this.width);
        this.nextIteration = new Array(this.width);
        for (let i = 0; i < this.width; i++){
            this.data[i] = new Array(this.height);
            this.nextIteration[i] = new Array(this.height);
            for (let j = 0; j < this.height; j++){
                this.data[i][j] = new Cell(this.initalState);
            }
        }
    }

    iterate(){
        //if(this.nextIteration[0][0]!=undefined)
            for(let i = 0; i < this.width; i++)
                for(let j = 0; j < this.height; j++)
                    if(this.nextIteration[i][j] != undefined && this.hasChanged(i, j))
                        this.data[i][j].setState(this.nextIteration[i][j]);
        //else
        //    console.log("WTF");
    }
  
    preShuffle(amount, state){
        for(let i = 0; i < amount; i++){
            this.data[Math.floor(Math.random()*(this.width))][Math.floor(Math.random()*(this.height))].setInitialState(state);
        }
    }

    hasChanged(xpos, ypos){
        if (this.data[xpos][ypos].currentState != this.nextIteration[xpos][ypos])
            return true;
        else
            return false;
    }
    
}
