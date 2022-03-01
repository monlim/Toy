window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  var ballPos = (gamma/90)*200;
  
  $('.absolute').html(absolute);
  $('.alpha').html(alpha.toFixed(3));
  $('.beta').html(beta.toFixed(3));
  $('.gamma').html(gamma.toFixed(3));
  $('.ball').css('transform','translateX(' + ballPos + 'px)');
  
  
}

window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(event) {
  var acceleration = event.acceleration;
  var interval = event.interval;
  $('.accelerationx').html(acceleration.x.toFixed(3));
  $('.accelerationy').html(acceleration.y.toFixed(3));
  $('.accelerationz').html(acceleration.z.toFixed(3));
  $('.interval').html(interval);
}
