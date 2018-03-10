class Cell {
    constructor(state) {
        this.previousState = state;
        this.initalState = state;
        this.currentState = state;
        this.col = 255;
    }
    
    setState(newState){
        this.previousState = this.currentState;
        this.currentState = newState;
    }

    setInitialState(newState){
        this.initalState = newState;
        this.previousState = newState;
        this.currentState = newState;
    }
   
}