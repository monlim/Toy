//Reset audio context
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

const Cough1 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Cough1.mp3").toDestination();
const Cough2 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Cough2.mp3").toDestination();
const Cough3 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Cough3.mp3").toDestination();
const Cough4 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Cough4.mp3").toDestination();
const Cough5 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Cough5.mp3").toDestination();
const Ring1 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Ring1.mp3").toDestination();
const Ring2 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Ring2.mp3").toDestination();
const Ring3 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/RingSsh.mp3").toDestination();
const Ring4 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Ring4.mp3").toDestination();
const Ring5 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Ring5.mp3").toDestination();
const Orn1 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Orn1.mp3").toDestination();
const Orn2 = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/Orn2.mp3").toDestination();
const sampler = new Tone.Sampler({
	urls: {
		G4: "G.mp3",
		C5: "C.mp3",
	},
	baseUrl: "https://monlim.github.io/AccelTrial/Audio/",
	}
}).toDestination();
const pitchShift = new Tone.PitchShift(0);
const gain = new Tone.Gain.toDestination();
const GA = new Tone.Player("https://monlim.github.io/AccelTrial/Audio/GA1.mp3");
GA.chain(pitchShift, gain);
GA.loop = true;
/*const gainNode = new Tone.Gain(1).toDestination();
const ToyPiano = new Tone.GrainPlayer("https://monlim.github.io/AccelTrial/Audio/ToyPiano.mp3").connect(gainNode);
ToyPiano.loop = true;*/

const shakeDict1 = {1: Ring1, 2: Ring2, 3: Ring3, 4: Ring5, 5: Cough1, 6: Cough2, 7: Cough3, 8: Cough4, 9: Ring1, 10: Ring1, 11: Ring2, 12: Ring2, 13: Ring4, 14: Ring4, 15: Ring4, 16: Cough1, 17: Cough1, 18: Cough3, 19: Cough3, 20: Cough4, 21: Cough4, 22: Cough1, 23: Ring1, 25: Cough5, 26: Cough5};

const shakeDict2 = {1: Orn1, 2: Orn2, 3: Orn1, 4: Orn2, 5: Orn1, 6: Orn2, 7: Orn1, 8: Orn2, 9: Orn2, 10: Orn2, 11: Orn1, 12: Orn2, 13: Orn1, 14: Orn2, 15: Orn1, 16: Orn2, 17: Orn1, 18: Orn1, 19: Orn1, 20: Orn2, 21: Orn1, 22: Orn1, 23: Orn1, 25: Orn2, 26: Orn2};

let shakeDict = shakeDict1; // default sounds on start

function handleOrientation(event) {
  updateFieldIfNotNull('Orientation_a', event.alpha);
  updateFieldIfNotNull('Orientation_b', event.beta);
  updateFieldIfNotNull('Orientation_g', event.gamma);
  //ToyPiano.grainSize = scaleValue(event.alpha, [-180, 180], [0.1, 1]);
  //pitchShift.pitch = Math.floor(scaleValue(event.beta, [0, 180], [0, 16]));
  if (event.beta < 10) pitchShift.pitch = 0;
  if (10 <= event.beta && event.beta < 30) pitchShift.pitch = 4;
  if (30 <= event.beta && event.beta < 60) pitchShift.pitch = 7;
  if (60 <= event.beta && event.beta < 100) pitchShift.pitch = 12;
  if (event.beta >= 100) pitchShift.pitch = 16;
  if (accel > 2 && event.alpha >= 0 && event.alpha < 30) sampler.triggerAttackRelease(["G4"], 1);
  if (accel > 2 && event.alpha >= 30 && event.alpha < 60) sampler.triggerAttackRelease(["A5"], 1);
  if (accel > 2 && event.alpha >= 60 && event.alpha < 100) sampler.triggerAttackRelease(["B5"], 1);
  if (accel > 2 && event.alpha >= 100 && event.alpha < 180) sampler.triggerAttackRelease(["C5"], 1);
  if (accel > 2 && event.alpha < 0) sampler.triggerAttackRelease(["D5"], 1);
  
  //incrementEventCount();
}

/*function incrementEventCount(){
  let counterElement = document.getElementById("num-observed-events")
  let eventCount = parseInt(counterElement.innerHTML)
  counterElement.innerHTML = eventCount + 1;
}*/

function updateFieldIfNotNull(fieldName, value, precision=10){
  if (value != null)
    document.getElementById(fieldName).innerHTML = value.toFixed(precision);
}

let accel;

function handleMotion(event) {
  updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
  updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
  updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);
  updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
  updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
  updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);
  
  accel = event.acceleration.x**2 + event.acceleration.y**2 + event.acceleration.z**2;
  updateFieldIfNotNull('All', accel);
  GA.volume.value = scaleValue(accel, [0, 6], [-24, 0]);
  
  updateFieldIfNotNull('Accelerometer_i', event.interval, 2);

  updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
  updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
  updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
  //incrementEventCount();
}

let is_running = false;
let demo_button = document.getElementById("start_demo");
demo_button.onclick = function(e) {
  e.preventDefault();
  
  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }
  
  if (is_running){
    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);
    window.removeEventListener('shake', shakeEventDidOccur, false); 
    demo_button.innerHTML = "Start";
    //demo_button.classList.add('btn-success');
    //demo_button.classList.remove('btn-danger');
    myShakeEvent.stop();
    GA.stop();
    shakeDict = shakeDict1;
    //ToyPiano.stop();
    is_running = false;
  }else{
    setTimeout(function(){
      shakeDict = shakeDict2;
    }, 30000);
    setTimeout(function(){
      GA.start();
      sampler.disconnect();
    }, 40000);
    setTimeout(function(){
      gainNode.gain.rampTo(0, 3);
    }, 180000);
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener('shake', shakeEventDidOccur, false); 
    document.getElementById("start_demo").innerHTML = "Stop";
    //demo_button.classList.remove('btn-success');
    //demo_button.classList.add('btn-danger');
    myShakeEvent.start();
    gainNode.gain.rampTo(1, 0.1);
    sampler.toDestination();
    //ToyPiano.start();
    is_running = true;
  }
};

function scaleValue(value, from, to) {
  let scale = (to[1] - to[0]) / (from[1] - from[0]);
  let capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return (capped * scale + to[0]);
}

//exponential scale
let powerScale = d3.scalePow()
  .exponent(1.4).domain([0, 6]).range([0, 1]).clamp(true);

var myShakeEvent = new Shake({
    threshold: 9, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});

//function to call when shake occurs
function shakeEventDidOccur () {
  shakeDict[Math.floor(Math.random() * 27)].start();
  //shakeDict[Math.floor(Math.random() * 27)].playbackRate = (scaleValue(accel, [9, 30], [1.8, 0.7]));
  //alert('shake!');
}
