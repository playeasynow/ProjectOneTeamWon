$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyDHwC2WNJYHYaVe-Qj3sOP-X3GLhgV_0Ps",
    authDomain: "color-game-chat.firebaseapp.com",
    databaseURL: "https://color-game-chat.firebaseio.com",
    projectId: "color-game-chat",
    storageBucket: "color-game-chat.appspot.com",
    messagingSenderId: "440942527592"
  };
  firebase.initializeApp(config);
  
  
  // new chat box
  
  $(document).ready(function () {
  
      var name = "";
  
      firebase.database().ref('chat/').on('child_added',
      function(snapshot){
          var data = "<div id ='m'><p class ='name'>" +
          snapshot.child('name').val() + "</p><p class ='message'>" +
          snapshot.child('message').val() +"</p><div>";
  
          $("#messages").html($("#messages").html()+ data);
      });
  
  
      $("#name_submit").on("click", function () {
          name = $("#name").val();
          // alert(name)
          $("#name_prompt_parent").fadeOut();
          
      });
  
      $("#send_button").on('click', function(){
          var mess = $("#msg").val();
          // alert(mess);
  
          firebase.database().ref('chat/'+ Date.now()).set({
              name: name,
              message: mess
  
  
          });
      
      });
  
  });

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

//Chat box 

