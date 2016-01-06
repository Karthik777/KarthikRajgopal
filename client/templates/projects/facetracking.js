Template.facetracking.rendered = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // var tracker = new tracking.ObjectTracker(['eye']);
  // tracker.setInitialScale(4);
  // tracker.setStepSize(1.7);
  // tracker.setEdgesDensity(0.1);
  //
  // tracking.track('#video', tracker, { camera: true });
  //
  // tracker.on('track', function(event) {
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //
  //   event.data.forEach(function(rect) {
  //     context.strokeStyle = '#a64ceb';
  //     context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  //     context.font = '11px Helvetica';
  //     context.fillStyle = "#fff";
  //     context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
  //     context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
  //   });
  // });
  var blinkCount = 0;
  var temp=[];
  var tracker = new tracking.ObjectTracker('eye');
  tracker.setStepSize(1.7);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(temp.length >0 && event.data.length ===0)
    {
      blinkCount +=1;
    }
    temp = event.data;
    $('#blink').html("Blink Count : "+ blinkCount);
    // event.data.forEach(function(rect) {
    //   context.strokeStyle = '#a64ceb';
    //   context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    // });
  });
  var gui = new dat.GUI();
  gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
  gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
  gui.add(tracker, 'stepSize', 1, 5).step(0.1);
};
