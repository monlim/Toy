const accelX = document.getElementById('accelX');
const accelY = document.getElementById('accelY');
const accelZ = document.getElementById('accelZ');

function handleMotionEvent(event) {

    var x = event.accelerationIncludingGravity.x;
    accelX.innerHTML = 1;
    var y = event.accelerationIncludingGravity.y;
    accelY.innerHTML = 2;
    var z = event.accelerationIncludingGravity.z;
    accelZ.innerHTML = 3;

}

window.addEventListener("devicemotion", handleMotionEvent, true);

