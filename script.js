const accelX = document.getElementById('accelX');
const accelY = document.getElementById('accelY');
const accelZ = document.getElementById('accelZ');

function handleMotionEvent(event) {

    var x = event.accelerationIncludingGravity.x;
    accelX.innerHTML = x;
    var y = event.accelerationIncludingGravity.y;
    accelY.innerHTML = y;
    var z = event.accelerationIncludingGravity.z;
    accelZ.innerHTML = z;

}

window.addEventListener("devicemotion", handleMotionEvent, true);

