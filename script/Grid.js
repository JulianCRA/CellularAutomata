class Grid {
    constructor(w, h, i) {
        this.width = w;
        this.height = h;
        this.initalState = i;

        this.data = new Array(this.width);
        for (let i = 0; i < this.width; i++){
            this.data[i] = new Array(this.height);
            for (let j = 0; j < this.height; j++){
                this.data[i][j] = new Cell(this.initalState);
            }
        }
    }
  
    preShuffle(amount, state){
        for(let i = 0; i < amount; i++){
            this.data[Math.floor(Math.random()*(this.width - 1))][Math.floor(Math.random()*(this.height - 1))].setState(state);
        }
    }
    
}
