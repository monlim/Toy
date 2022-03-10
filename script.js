<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="appstyle.css">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Phone Sensor</title>
    <!-- <style>
      #demo-div {color: lightgrey; border-radius: 0.3rem;}
      #demo-div span, #demo-div #num-observed-events {color: black;}
      h1 {margin-top: 0.5rem;}
      h4 {margin-top: 0.66rem; font-size:1.33rem;}
      #demo-div li {line-height: 21px;}
      #demo-div ul {margin-bottom: 0.66rem;}
    </style>-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.31/Tone.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/6.2.0/d3.min.js"></script>
  <script type="text/javascript" src="shake.js"></script>
</head>
<body>
  <body>
  <main role="main" class="container">

    <div id="demo-div">
    <a id="start_demo" role="button">START</a>
      <div id="circle" class="circle"></div>

<!--
    <h4 style="margin-top:0.75rem;">Orientation</h4>
    <ul>
      <li>X-axis (&beta;): <span id="Orientation_b">0</span><span>&deg;</span></li>
      <li>Y-axis (&gamma;): <span id="Orientation_g">0</span><span>&deg;</span></li>
      <li>Z-axis (&alpha;): <span id="Orientation_a">0</span><span>&deg;</span></li>
    </ul>

    <h4>Accelerometer</h4>
    <ul>
      <li>X-axis: <span id="Accelerometer_x">0</span><span> m/s<sup>2</sup></span></li>
      <li>Y-axis: <span id="Accelerometer_y">0</span><span> m/s<sup>2</sup></span></li>
      <li>Z-axis: <span id="Accelerometer_z">0</span><span> m/s<sup>2</sup></span></li>
      <li>All: <span id="All">0</span><span> m/s<sup>2</sup></span></li>
      <li>Data Interval: <span id="Accelerometer_i">0</span><span> ms</span></li>
    </ul>

    <h4>Accelerometer including gravity</h4>

    <ul>
      <li>X-axis: <span id="Accelerometer_gx">0</span><span> m/s<sup>2</sup></span></li>
      <li>Y-axis: <span id="Accelerometer_gy">0</span><span> m/s<sup>2</sup></span></li>
      <li>Z-axis: <span id="Accelerometer_gz">0</span><span> m/s<sup>2</sup></span></li>
    </ul>

    <h4>Gyroscope</h4>
    <ul>
      <li>X-axis: <span id="Gyroscope_x">0</span><span>&deg;/s</span></li>
      <li>Y-axis: <span id="Gyroscope_y">0</span><span>&deg;/s</span></li>
      <li>Z-axis: <span id="Gyroscope_z">0</span><span>&deg;/s</span></li>
    </ul>
-->
    </div>
  </main>
  <script type="text/javascript" src="script.js"></script>
  <script type="text/javascript" src="https://cdn.rawgit.com/alexgibson/shake.js/master/shake.js"></script>
</body>
</html>
