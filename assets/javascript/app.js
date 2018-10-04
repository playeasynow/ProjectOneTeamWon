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

  // --- start tracking.js new colors -----------------------------------------------------------------------------------------------------------------//
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

  // --- start game sequence -----------------------------------------------------------------------------------------------------------------//
  var theTimer;
  var counter = 30;
  var colorCounter = 0;
  var correctTally = 0;
  var timeOutTally = 0;

  var colorArray = ["magenta", "yellow", "green", "red", "purple", "cyan"];
  var unsplashArray = ["pink", "yellow", "green", "red", "purple", "blue"];
  var correctGifsArray = ["good job", "winning", "great job", "winner", "thumbs up", "awesome"];
  var wrongGifsArray = ["try again", "crying baby", "sad", "crying baby", "thumbs down", "crying adult"];

  var trackingJSColor = colorArray[colorCounter];
  var unsplashColor = unsplashArray[colorCounter];

  // giphy ajax call for correct gifs
  function getCorrectGif() {
    var queryURL2 = "http://api.giphy.com/v1/gifs/search?q=" + correctGifsArray[colorCounter] + "awesome&api_key=T3bTJBKugMxVT3yX9ddzafzVAJTHEZtk&limit=1&rating";

    $.ajax({ url: queryURL2, method: 'GET' })
      .done(function (response) {
        console.log(response);
        // Display response.url on HTML
      });
  }

  // giphy ajax call for wrong gifs
  function getWrongGif() {
    var queryURL2 = "http://api.giphy.com/v1/gifs/search?q=awesome&api_key=T3bTJBKugMxVT3yX9ddzafzVAJTHEZtk&limit=1&rating";

    $.ajax({ url: queryURL2, method: 'GET' })
      .done(function (response) {
        console.log(response);
        wrongGifsArray[colorCounter];
      });
  }

  //unsplash Didi api key 5ace9ae75b4aa61e764fad786dfcbd3cfdb1f398ad35b93828b8f12157b2de77
  //unsplash ezequiel api 30259e37b562fe39e3b5bba56d859745082308358092456f9be492a159f8fb81

  // start unsplash api background 
  function generateUnsplashImg() {

    var queryURL = "https://api.unsplash.com/search/photos?page=1&query=" + unsplashArray[colorCounter] + "&client_id=30259e37b562fe39e3b5bba56d859745082308358092456f9be492a159f8fb81";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        console.log(response);
      })
  }

  // click on start game to enable camera and timer
  $("body").on("click", "#enable-camera", function () {
    // starts camera
    tracking.track('#myVideo', colors, { camera: true });
    // hides button
    $("#enable-camera").fadeOut();
    // starts and displays timer
    timerWrapper();
    matchColor();
  })

  // trigger functions by clicking reset button
  $("body").on("click", ".reset-button", function (event) {
    resetGame();
  });

  // function to generate the color to find
  function generateColor() {
    $("#unsplash-bg").changeBackgroundImage(function () {
      // run the unsplash API and get image
      // use unsplashArray
      // display on HTML
    });
  }

  generateColor();

  // function to ask camera to find unsplash color and look for match
  function matchColor() {
    // tracking.js on track matching function
    colors.on('track', function (event) {
      if (event.data.length === 0) {
        // no colors were detected in this frame
      } else {
        event.data.forEach(function (rect) {
          console.log(rect.x, rect.y, rect.height, rect.width, rect.color);

          // if camera finds matching color, generate win
          if (rect.color === trackingJSColor) {
            clearInterval(theTimer);
            generateWin();
          }
        });
      }
    });
  }

  // function to set timer to 30 seconds. If timer runs out, generate timeout loss
  function timerWrapper() {
    theTimer = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
      if (counter === 0) {
        clearInterval(theTimer);
        timeOutLoss();
      }
      if (counter > 0) {
        counter--;
      }
      $("#timer").html("<span class='timer'>" + counter + "</span>");
    }
  }

  // display winning GIF, hold screen for 3 seconds
  function generateWin() {
    correctTally++;
    console.log(correctTally);
    getCorrectGif();
    // call right GIF function
    // display right GIF on HTML
    setTimeout(wait, 3000);  //  3 second wait
  }

  // display losing GIF, hold screen for 3 seconds
  function timeOutLoss() {
    timeOutTally++;
    // call wrong GIF function
    // display wrong GIF on HTML
    setTimeout(wait, 3000);  //  3 second wait
  }

  // function that moves the game forward to the next colors, calls unsplash API
  function wait() {
    if (colorCounter < 4) {
      colorCounter++;
      generateColor();
      counter = 30;
      timerWrapper();
    }
    else {
      finalScreen();
    }
  }

  // replace gameHTML with new HTML element containing all-done text and reset button
  function finalScreen() {
    // hold winning GIF or display new GIF to say you went through all colors
    // create reset button
    // display on HTML
  }

  // reset the counters and start over game
  function resetGame() {
    colorCounter = 0;
    correctTally = 0;
    timeOutTally = 0;
    counter = 30;
    generateColor();
    timerWrapper();
  }

  // find RANDOM i through math.Random 
  // tell tracking.js to look for colorArray[i]
  // search for unsplashArray[i] on unsplash and display on #unsplash-bg
  // IF 30 seconds left
  // IF colorArray[i] === true
  // then display correctGifsArray[i] in modal
  // wait 3 seconds and then go to next position in colorArray
  // ELSE
  // then display wrongGifsArray[i] in modal
  // wait 3 seconds and then go to next position in colorArray
  // ELSE if time runs out
  // then display wrongGifsArray[i] in modal
  // wait 3 seconds and then go to next position in colorArray




// closing tags of (document).ready below
});


// Inner links 
if ($('#navbarSupportedContent').length > 0 || $('.navbar-scroll-top').length > 0 || $('.nav-top-scroll').length > 0) {
  $('.inner-link').smoothScroll({
    speed: 900,
    offset: 0
  });
} else {
  $('.inner-link').smoothScroll({
    speed: 900,
    offset: -59
  });
}

$('.section-link').smoothScroll({
  speed: 900,
  offset: 1
});

$(".nav-item li").on("click", function () {
  $(".nav-item li").removeClass("active");
  $(this).addClass("active");
});

 // Animations initialization
//  new WOW().init();