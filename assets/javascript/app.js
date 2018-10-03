$(document).ready(function () {

  // --- firebase -----------------------------------------------------------------------------------------------------------------//
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

  // --- start chat box -----------------------------------------------------------------------------------------------------------------//
  var name = "";

  firebase.database().ref('chat/').on('child_added',
    function (snapshot) {
      var data = "<div id='m'><p class ='name'>" +
        snapshot.child('name').val() + "</p><p class='message'>" +
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
  // var queryURL2 = "http://api.giphy.com/v1/gifs/search?q=awesome&api_key=T3bTJBKugMxVT3yX9ddzafzVAJTHEZtk&limit=1&rating";

  // $.ajax({ url: queryURL2, method: 'GET' })
  //   .done(function (response) {
  //     console.log(response);

  //   });

  // unsplash ajax call
  // var queryURL = "https://api.unsplash.com/search/photos?page=1&query=yellow&client_id=30259e37b562fe39e3b5bba56d859745082308358092456f9be492a159f8fb81";

  // $.ajax({
  //   url: queryURL,
  //   method: 'GET'
  // })
  //   .done(function (response) {
  //     console.log(response);
  //   });

  // --- start unsplash api and button -----------------------------------------------------------------------------------------------------------------//
  $('button').on('click', function () {
    var x = $(this).data("splashy");
    console.log (x);
    var queryURL = "https://api.unsplash.com/search/photos?page=1&query="+x+"&client_id=30259e37b562fe39e3b5bba56d859745082308358092456f9be492a159f8fb81";

    $.ajax({ url: queryURL, method: "GET" })
      .done(function (response) {
        console.log(response);
        for (var i = 0; i < response.results.length; i++) {
          var splashyDiv = $('<div>');
          var splashyImage = $('<img>');
          splashyImage.attr('src', response.results[i].urls.small);
          splashyDiv.append(splashyImage);
          $('#unsplashGoHere').append(splashyDiv);
        }
      })
  })

  //unsplash Didi api key 5ace9ae75b4aa61e764fad786dfcbd3cfdb1f398ad35b93828b8f12157b2de77
  //unsplash ezequiel api 30259e37b562fe39e3b5bba56d859745082308358092456f9be492a159f8fb81

  $.getJSON('');

  // --- start tracking.js -----------------------------------------------------------------------------------------------------------------//
  tracking.ColorTracker.registerColor('purple', function (r, g, b) {
    var dx = r - 120;
    var dy = g - 60;
    var dz = b - 210;
    if ((b - g) >= 100 && (r - g) >= 60) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 3500;
  });

  tracking.ColorTracker.registerColor('red', function (r, g, b) {
    if (r > 200 && g < 100 && b < 100) {
      return true;
    }
    return false;
  });

  tracking.ColorTracker.registerColor('green', function (r, g, b) {
    if (r < 50 && g > 200 && b < 50) {
      return true;
    }
    return false;
  });


  // tracking.js initial color tracker - tracking seen in console
  var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow', 'red', 'purple', 'green']);

  colors.on('track', function (event) {
    if (event.data.length === 0) {
      // no colors were detected in this frame
    } else {
      event.data.forEach(function (rect) {
        console.log(rect.x, rect.y, rect.height, rect.width, rect.color);

        if (rect.color === 'red') {
          console.log("it's red!");
          
        }
      });
    }
  });
  tracking.track('#myVideo', colors, { camera: true });

  // --- start HTML styling -----------------------------------------------------------------------------------------------------------------//
  // HTML styles for Pushpin
  $('.pushpin-demo-nav').each(function () {
    var $this = $(this);
    var $target = $('#' + $(this).attr('data-target'));
    $this.pushpin({
      top: $target.offset().top,
      bottom: $target.offset().top + $target.outerHeight() - $this.height()
    });
  });

  $(".button-collapse").sideNav();
  // $('.modal-trigger').leanModal();
  $('#push,secton').pushpin({
    top: $('#push').height()
  });

})


// // HTML styles for Pushpin
// $('.pushpin-demo-nav').each(function () {
//   var $this = $(this);
//   var $target = $('#' + $(this).attr('data-target'));
//   $this.pushpin({
//     top: $target.offset().top,
//     bottom: $target.offset().top + $target.outerHeight() - $this.height()
//   });
// });

// // menu bar style
// $(document).ready(function(){
//   $(".button-collapse").sideNav();
//   $('.modal-trigger').leanModal();
//   $('#push,secton').pushpin({ top:$('#push').height() });
// });
