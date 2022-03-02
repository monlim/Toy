//Reset audio context
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

//const osc = new Tone.Oscillator(440, "sine").toDestination();

const synth = new Tone.MonoSynth({
	oscillator: {
		type: "square"
	},
	envelope: {
		attack: 0.1
	}
}).toDestination();

function handleOrientation(event) {
  updateFieldIfNotNull('Orientation_a', event.alpha);
  updateFieldIfNotNull('Orientation_b', event.beta);
  updateFieldIfNotNull('Orientation_g', event.gamma);
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

function handleMotion(event) {
  updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
  updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
  updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);

  updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
  /*if (event.acceleration.x > 1){
    osc.start()
  } else {
    osc.stop()
  };*/
  updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
  updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);

  updateFieldIfNotNull('Accelerometer_i', event.interval, 2);

  updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
  updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
  updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
  incrementEventCount();
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
    demo_button.innerHTML = "Start";
    //demo_button.classList.add('btn-success');
    //demo_button.classList.remove('btn-danger');
    is_running = false;
  }else{
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
    document.getElementById("start_demo").innerHTML = "Stop";
    //demo_button.classList.remove('btn-success');
    //demo_button.classList.add('btn-danger');
    is_running = true;
  }
};

var myShakeEvent = new Shake({
    threshold: 10, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});

// Start listening to device motion
myShakeEvent.start(); 

// Register a shake event listener on window with your callback
window.addEventListener('shake', shakeEventDidOccur, false); 

//function to call when shake occurs
function shakeEventDidOccur () {
  synth.triggerAttackRelease("C4", "8n");
  //alert('shake!');
}
