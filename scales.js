const TONE = 2;
const HALFTONE = 1;

const majorFifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
const minorFifths = ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'bb', 'f', 'c', 'g', 'd'];

let scales = new Map();
scales.set("major", {"construction": [TONE, TONE, HALFTONE, TONE, TONE, TONE, HALFTONE],
                     "circleOfFifths": majorFifths});
scales.set("natural minor", {"construction": [TONE, HALFTONE, TONE, TONE, HALFTONE, TONE, TONE],
                             "circleOfFifths": minorFifths});
scales.set("harmonic minor", {"construction": [TONE, HALFTONE, TONE, TONE, HALFTONE, TONE + HALFTONE, HALFTONE],
                              "circleOfFifths": minorFifths});
scales.set("melodic minor", {"construction": [TONE, HALFTONE, TONE, TONE, TONE, TONE, HALFTONE],
                             "circleOfFifths": minorFifths});

function getScaleDegree(scaleType, tonic, degree) {
  let scale = scales.get(scaleType.toLowerCase());
  let note = scale.circleOfFifths.indexOf(tonic.toLowerCase());
  
  for (let i = 0; i < degree - 1; i++)
    note += scale[i % scale.length];
    
  return scale.circleOfFifths[note % 12];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Listeners
window.addEventListener("load", function() {
    let scaleSelect = document.getElementById('scale-select');
    for (let [key, value] of scales) {
      var opt = document.createElement('option');
      opt.appendChild( document.createTextNode(capitalizeFirstLetter(key)) );
      opt.value = key; 

      scaleSelect.appendChild(opt); 
    }
    
    document.getElementById("button").addEventListener("click", function(event) {
      if (event.target.innerHTML === "End") {
        scaleSelect.disabled = false;
        event.target.innerHTML = "Begin";
        event.target.classList.remove("dark");
        event.target.classList.add("light");
        
        document.getElementById("scale-name").innerHTML = "";
        document.getElementById("scale-degree").innerHTML = "";
        
        return;
      }
      
      scaleSelect.disabled = true;
      event.target.innerHTML = "End";
      event.target.classList.remove("light");
      event.target.classList.add("dark");
      
      const startingScale = Math.floor(Math.random() * 12);
      const startingDegree = Math.floor(Math.random() * 8) + 1;
      const scaleName = scales.get(scaleSelect.value).circleOfFifths[startingScale];
      
      document.getElementById("scale-name").innerHTML = scaleName;
      document.getElementById("scale-degree").innerHTML = startingDegree;
    });
});
