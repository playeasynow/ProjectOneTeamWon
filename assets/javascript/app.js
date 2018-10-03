$(document).ready(function () {
  
  // didi's firebase
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
  var name = "";

  firebase.database().ref('chat/').on('child_added',
    function (snapshot) {
      var data = "<div id ='m'><p class ='name'>" +
        snapshot.child('name').val() + "</p><p class ='message'>" +
        snapshot.child('message').val() + "</p><div>";

      $("#messages").html($("#messages").html() + data);
    });


  $("#name_submit").on("click", function () {
    name = $("#name").val();
    // alert(name)
    $("#name_prompt_parent").fadeOut();

  });

  $("#send_button").on('click', function () {
    var mess = $("#msg").val();
    // alert(mess);

    firebase.database().ref('chat/' + Date.now()).set({
      name: name,
      message: mess


    });

  });


  // giphy ajax call
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=awesome&api_key=T3bTJBKugMxVT3yX9ddzafzVAJTHEZtk&limit=1&rating";

  $.ajax({ url: queryURL, method: 'GET' })
    .done(function (response) {
      console.log(response);

    });

  // unsplash ajax call
  var queryURL2 = "https://api.unsplash.com/photos/?client_id=30259e37b562fe39e3b5bba56d859745082308358092456f9be492a159f8fb81";

  $.ajax({
    url: queryURL2,
    method: 'GET'
  })
    .done(function (response) {
      console.log(response);
    });


  // tracking.js initial color tracker - tracking seen in console
  var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

  colors.on('track', function (event) {
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
      event.data.forEach(function (rect) {
        console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
      });
    }
  });

  tracking.track('#myVideo', colors, { camera: true });

})


// HTML styles for Pushpin
$('.pushpin-demo-nav').each(function() {
  var $this = $(this);
  var $target = $('#' + $(this).attr('data-target'));
  $this.pushpin({
    top: $target.offset().top,
    bottom: $target.offset().top + $target.outerHeight() - $this.height()
  });
});

// menu bar style
$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.modal-trigger').leanModal();
  $('#push,secton').pushpin({ top:$('#push').height() });