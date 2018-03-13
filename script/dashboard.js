const _LANGTONS_ANT = 0;
const _CONWAYS_GAME = 1;
const _FOREST_FIRE = 2;

let p5sketch = null;

document.getElementById("lant").onclick = function() {startAutomaton(_LANGTONS_ANT)};
document.getElementById("life").onclick = function() {startAutomaton(_CONWAYS_GAME)};
document.getElementById("fire").onclick = function() {startAutomaton(_FOREST_FIRE)};
function startAutomaton(automaton){
    if(p5sketch!=null)p5sketch.remove();
    
    switch(automaton){
        case _LANGTONS_ANT:
            //start langtons
            document.getElementById("automaton-title").innerHTML = "Langton's Ant";
            p5sketch = new p5(langtonsant, "gridboard");
            p5sketch.initSketch(document.getElementById("gridwidth").value, [{x:24, y:2, direction:3}, {x:2, y:2, direction:1}, {x:10, y:18, direction:9}]);
            break;
        case _CONWAYS_GAME:
            //start conways
            document.getElementById("automaton-title").innerHTML = "Conway's Life";
            p5sketch = new p5(conwayslife, "gridboard");
            
            break;
        case _FOREST_FIRE:
            //start forest fire
            document.getElementById("automaton-title").innerHTML = "Forest Fire";
            p5sketch = new p5(forestfire, "gridboard");
            break;
    }
}


document.getElementById("gridwidth").oninput = function() {
    document.getElementById("slidervalue").innerHTML = this.value;
}