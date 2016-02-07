Template.facetracking.rendered = function() {

  }
Template.facetracking.helpers({
  imageName: function(){
    return "images/cyclops.jpg"
  }
});

Template.facetracking.events({
  "click #videotracker": function(event, template){
     event.preventDefault();
     var video = document.getElementById('video');
     var canvas = document.getElementById('canvas');
     var context = canvas.getContext('2d');
     var blinkCount = 0;
     $('#blink').html("Blink Count : "+ blinkCount);
     var temp=[];
     var tracker = new tracking.ObjectTracker('eye');
     tracker.setStepSize(1.7);
     var trackingTask = tracking.track('#video', tracker, { camera: true });
     tracker.on('track', function(event) {
           context.clearRect(0, 0, canvas.width, canvas.height);
           if(temp.length >0 && event.data.length ===0)
           {
             blinkCount +=1;
           }
           temp = event.data;
           $('#blink').html("Blink Count : "+ blinkCount);
           event.data.forEach(function(rect) {
             context.strokeStyle = '#a64ceb';
             context.strokeRect(rect.x, rect.y, rect.width, rect.height);
           });
     });

  },
  "click #stopTracker": function(event, template){
    tracking.TrackerTask.prototype.stop();
  }
});
