class Cell {
    constructor(state) {
        this.previousState = null;
        this.initalState = state;
        this.currentState = state;
        this.col = 255;
    }
    
    setState(newState){
        this.previousState = this.currentState;
        this.currentState = newState;
    }
   
}