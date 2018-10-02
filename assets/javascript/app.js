$(document).ready(function () {

$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=Nvi9ZsuaDBYE4HhFrY63AGBljsc7B9pG",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
    // Parse the response.
    // Do other things.
  },
  error: function (xhr, status, err) {
    // This time, we do not end up here!
  }
});


// tracking.js initial color tracker
var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

colors.on('track', function(event) {
  if (event.data.length === 0) {
    // No colors were detected in this frame.
  } else {
    event.data.forEach(function(rect) {
      console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
    });
  }
});

tracking.track('#myVideo', colors, {camera: true});

})