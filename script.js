//Reset audio context
document.documentElement.addEventListener("mousedown", () => {
  if (Tone.context.state !== "running") Tone.context.resume();
});

const Cough1 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Cough1.mp3"
).toDestination();
const Cough2 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Cough2.mp3"
).toDestination();
const Cough4 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Cough4.mp3"
).toDestination();
const Ring1 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Ring1.mp3"
).toDestination();
const Ring2 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Ring2.mp3"
).toDestination();
const Ring3 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Ring3.mp3"
).toDestination();
const Ring5 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Ring5.mp3"
).toDestination();
const Orn1 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Orn1.mp3"
).toDestination();
const Orn2 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Orn2.mp3"
).toDestination();
const Orn5 = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/Orn5.mp3"
).toDestination();
const gainNode = new Tone.Gain(0).toDestination();
const pitchShift = new Tone.PitchShift(0).connect(gainNode);
const GA = new Tone.Player(
  "https://monlim.github.io/AccelTrial/Audio/GA1.mp3"
).connect(pitchShift);
GA.loop = true;
const sampler = new Tone.Sampler({
  urls: {
    G4: "G4.mp3",
    C5: "C5.mp3",
    G5: "G5.mp3",
    D6: "D6.mp3",
  },
  baseUrl: "https://monlim.github.io/AccelTrial/Audio/",
}).toDestination();

const shakeDict1 = {
  1: Ring1,
  2: Ring2,
  3: Ring3,
  4: Ring5,
  5: Cough1,
  6: Cough2,
  7: Cough4,
  8: Ring1,
  9: Ring2,
  10: Ring5,
  11: Cough1,
  12: Cough4,
  13: Ring1,
  14: Ring2,
  15: Cough1,
  16: Cough4,
  17: Ring1,
  18: Ring2,
  19: Ring3,
  20: Ring5,
  21: Cough1,
  22: Cough2,
  23: Ring3,
  25: Cough1,
  26: Cough2,
};

const shakeDict2 = {
  1: Orn1,
  2: Orn2,
  3: Orn5,
  4: Orn1,
  5: Orn2,
  6: Orn5,
  7: Orn1,
  8: Orn2,
  9: Orn5,
  10: Orn1,
  11: Orn2,
  12: Orn5,
  13: Orn1,
  14: Orn5,
  15: Orn1,
  16: Orn1,
  17: Orn5,
  18: Orn1,
  19: Orn2,
  20: Orn5,
  21: Orn1,
  22: Orn2,
  23: Orn5,
  25: Orn1,
  26: Orn5,
};

let shakeDict = shakeDict2; // default sounds on start
let noteDict = ["G4", "A4", "B4", "C5", "D5", "G5", "A5", "B5", "C6", "D6"];

let t1on = false;
let accelActivate = 2;
let accelDeactivate = 0.2;
function triggerSampler(accel) {
  if (accel >= accelActivate) {
    if (t1on) return;
    t1on = true;
    sampler.triggerAttackRelease([noteDict[Math.floor(Math.random() * 11)]], 2);
  }
  if (accel < accelDeactivate) {
    t1on = false;
  }
}

function handleOrientation(event) {
  // updateFieldIfNotNull('Orientation_a', event.alpha);
  // updateFieldIfNotNull('Orientation_b', event.beta);
  // updateFieldIfNotNull('Orientation_g', event.gamma);
  if (event.beta < 10) pitchShift.pitch = 0;
  if (10 <= event.beta && event.beta < 30) pitchShift.pitch = 4;
  if (30 <= event.beta && event.beta < 60) pitchShift.pitch = 7;
  if (60 <= event.beta && event.beta < 100) pitchShift.pitch = 12;
  if (event.beta >= 100) pitchShift.pitch = 16;

  //incrementEventCount();
}

/*function incrementEventCount(){
  let counterElement = document.getElementById("num-observed-events")
  let eventCount = parseInt(counterElement.innerHTML)
  counterElement.innerHTML = eventCount + 1;
}*/

// function updateFieldIfNotNull(fieldName, value, precision=10){
//   if (value != null)
//     document.getElementById(fieldName).innerHTML = value.toFixed(precision);
// }

let accel;
function handleMotion(event) {
  // updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
  // updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
  // updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);
  // updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
  // updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
  // updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);

  accel =
    event.acceleration.x ** 2 +
    event.acceleration.y ** 2 +
    event.acceleration.z ** 2;
  // updateFieldIfNotNull('All', accel);
  GA.volume.value = scaleValue(accel, [0, 10], [-24, 0]);
  triggerSampler(accel);

  // updateFieldIfNotNull('Accelerometer_i', event.interval, 2);
  // updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
  // updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
  // updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
  //incrementEventCount();
}

let is_running = false;
let demo_button = document.getElementById("start_demo");
demo_button.onclick = function (e) {
  e.preventDefault();

  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }

  if (is_running) {
    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);
    window.removeEventListener("shake", shakeEventDidOccur, false);
    demo_button.innerHTML = "START";
    document.getElementById("circle").style.background = "green";
    myShakeEvent.stop();
    Tone.Transport.stop();
    gainNode.gain.rampTo(0, 0.1);
    GA.stop();
    shakeDict = shakeDict2;
    is_running = false;
  } else {
    setTimeout(function () {
      shakeDict = shakeDict1;
    }, 30000);
    setTimeout(function () {
      GA.start();
      gainNode.gain.rampTo(1, 1);
    }, 40000);
    setTimeout(function () {
      gainNode.gain.rampTo(0, 3);
    }, 180000);
    //GA.start();
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("shake", shakeEventDidOccur, false);
    document.getElementById("start_demo").innerHTML = "STOP";
    document.getElementById("circle").style.background = "red";
    myShakeEvent.start();
    Tone.Transport.start();
    //gainNode.gain.rampTo(1, 0.1);
    is_running = true;
  }
};

function scaleValue(value, from, to) {
  let scale = (to[1] - to[0]) / (from[1] - from[0]);
  let capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return capped * scale + to[0];
}

// //exponential scale
// let powerScale = d3
//   .scalePow()
//   .exponent(1.4)
//   .domain([0, 6])
//   .range([0, 1])
//   .clamp(true);

var myShakeEvent = new Shake({
  threshold: 10, // optional shake strength threshold
  timeout: 1000, // optional, determines the frequency of event generation
});

//function to call when shake occurs
function shakeEventDidOccur() {
  shakeDict[Math.floor(Math.random() * 27)].start();
  //alert('shake!');
}
