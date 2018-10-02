// $(document).ready(function () {

//   ticketmaster ajax call
//   $.ajax({
//     type: "GET",
//     url: "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=Nvi9ZsuaDBYE4HhFrY63AGBljsc7B9pG",
//     async: true,
//     dataType: "json",
//     success: function (json) {
//       console.log(json);
//       // Parse the response.
//       // Do other things.
//     },
//     error: function (xhr, status, err) {
//       // This time, we do not end up here!
//     }
//   });

  //Giphy ajax call

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=awesome&api_key=T3bTJBKugMxVT3yX9ddzafzVAJTHEZtk&limit=1&rating";

  $.ajax({ url: queryURL, method: 'GET' })
    .done(function (response) {
      console.log(response);

    });



// tracking.js initial color tracker - tracking seen in console
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