class Cell {
    constructor(state) {
        this.previousState = null;
        this.initalState = state;
        this.currentState = state;
        this.col = {r:255*Math.random(), g:255*Math.random(), b:255*Math.random()};
    }
    
    setState(newState){
        this.previousState = this.currentState;
        this.currentState = newState;
    }
   
}