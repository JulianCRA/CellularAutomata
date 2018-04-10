const _LANGTONS_ANT = 0;
const _CONWAYS_GAME = 1;
const _FOREST_FIRE = 2;
const _BELUSOV_ZH = 3;
const _VIRAL_REP = 4;
const _DIFF_LIM = 5;
const _BELUSOV_ZH2 = 6;
const _FLOOD_FILL = 7;

let p5sketch = null;

document.getElementById("lant").onclick = function() {startAutomaton(_LANGTONS_ANT)};
document.getElementById("life").onclick = function() {startAutomaton(_CONWAYS_GAME)};
document.getElementById("fire").onclick = function() {startAutomaton(_FOREST_FIRE)};
document.getElementById("blzh").onclick = function() {startAutomaton(_BELUSOV_ZH)};
document.getElementById("bzpix").onclick = function() {startAutomaton(_BELUSOV_ZH2)};
document.getElementById("vrep").onclick = function() {startAutomaton(_VIRAL_REP)};
document.getElementById("dlag").onclick = function() {startAutomaton(_DIFF_LIM)};
document.getElementById("fill").onclick = function() {startAutomaton(_FLOOD_FILL)};
function startAutomaton(automaton){
    if(p5sketch!=null){
        p5sketch.remove();
        p5sketch = null;
        delete p5sketch;
    }
    
    switch(automaton){
        case _LANGTONS_ANT:
            //start langtons
            document.getElementById("automaton-title").innerHTML = "Langton's Ant";
            p5sketch = new p5(langtonsant, "gridboard");
            //p5sketch.initSketch(document.getElementById("gridwidth").value, document.getElementById("gridwidth").value, [{x:24, y:2, direction:3}, {x:2, y:2, direction:1}, {x:10, y:18, direction:9}]);
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
        case _BELUSOV_ZH:
            //start BZ
            document.getElementById("automaton-title").innerHTML = "Belusov-Zhabotinsky's Reaction";
            p5sketch = new p5(belusovzhabotinsky, "gridboard");
            break;
        case _BELUSOV_ZH2:
            //start BZ
            document.getElementById("automaton-title").innerHTML = "Belusov-Zhabotinsky's Reaction";
            //p5sketch = new p5(belusovzhabotinsky, "gridboard");
            p5sketch = new p5(bzp, "gridboard");
            break;
        case _VIRAL_REP:
            //start viral replication
            document.getElementById("automaton-title").innerHTML = "Viral Replication";
            p5sketch = new p5(viralreplication, "gridboard");
            break;
        case _DIFF_LIM:
            //start diffusion limited aggregation
            document.getElementById("automaton-title").innerHTML = "Diffusion-Limited Aggregation";
            p5sketch = new p5(diffusionlimitedaggregation, "gridboard");
            break;
        case _FLOOD_FILL:
            //start diffusion limited aggregation
            document.getElementById("automaton-title").innerHTML = "Flood Fill";
            p5sketch = new p5(floodfill, "gridboard");
            break;
    }
}


document.getElementById("gridwidth").oninput = function() {upd();}
document.getElementById("seed").oninput = function() {upd();}
document.getElementById("nstates").oninput = function() {upd();}
document.getElementById("k1").oninput = function() {upd();}
document.getElementById("k2").oninput = function() {upd();}
document.getElementById("g").oninput = function() {upd();}

function upd(){
    if(p5sketch!=null)p5sketch.remove();
    p5sketch = new p5(bzp, "gridboard");
    document.getElementById("sliderwidth").innerHTML = document.getElementById("gridwidth").value;
    document.getElementById("sliderseed").innerHTML = document.getElementById("seed").value;
    document.getElementById("slidernstates").innerHTML = document.getElementById("nstates").value;
    document.getElementById("sliderk1").innerHTML = document.getElementById("k1").value;
    document.getElementById("sliderk2").innerHTML = document.getElementById("k2").value;
    document.getElementById("sliderg").innerHTML = document.getElementById("g").value;
    p5sketch.initSketch(document.getElementById("gridwidth").value,
                        document.getElementById("gridwidth").value,
                        document.getElementById("seed").value,
                        document.getElementById("nstates").value,
                        document.getElementById("k1").value,
                        document.getElementById("k2").value,
                        document.getElementById("g").value);
    
}