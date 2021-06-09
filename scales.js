const TONE = 2;
const HALFTONE = 1;

const NOTES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

let scales = new Map();
scales.set("major", [TONE, TONE, HALFTONE, TONE, TONE, TONE, HALFTONE]);

function getScaleDegree(scaleType, tonic, degree) {
  let note = NOTES.indexOf(tonic.toLowerCase());
  let scale = scales.get(scaleType.toLowerCase());
  
  for (let i = 0; i < degree - 1; i++)
    note += scale[i % scale.length];
    
  return NOTES[note % 12];
}

//const button = document.getElementById("button");
//button.addEventListener("click", startPractice, false);

function startPractice() {
  let startingScale = Math.floor(Math.random() * 12);
  let startingDegree = Math.floor(Math.random() * 12);
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
});
