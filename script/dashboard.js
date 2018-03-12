const _LANGTONS_ANT = 0;
const _CONWAYS_GAME = 1;
const _FOREST_FIRE = 2;



document.getElementById("lant").onclick = function() {startAutomaton(_LANGTONS_ANT)};
document.getElementById("life").onclick = function() {startAutomaton(_CONWAYS_GAME)};
document.getElementById("fire").onclick = function() {startAutomaton(_FOREST_FIRE)};
function startAutomaton(automaton){
    document.getElementById("gridBoard").innerHTML = "";
    
    let p5sketch = null;
    switch(automaton){
        case _LANGTONS_ANT:
            //start langtons
            document.getElementById("automaton-title").innerHTML = "Langton's Ant";
            p5sketch = new p5(langtonsant, "gridBoard");
            break;
        case _CONWAYS_GAME:
            //start conways
            document.getElementById("automaton-title").innerHTML = "Conway's Life";
            p5sketch = new p5(conwayslife, "gridBoard");
            break;
        case _FOREST_FIRE:
            //start forest fire
            document.getElementById("automaton-title").innerHTML = "Forest Fire";
            p5sketch = new p5(forestfire, "gridBoard");
            break;
    }
}