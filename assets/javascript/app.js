// --- firebase -----------------------------------------------------------------------------------------------------------------//
// didi's firebase
// var config = {
//   apiKey: "AIzaSyDHwC2WNJYHYaVe-Qj3sOP-X3GLhgV_0Ps",
//   authDomain: "color-game-chat.firebaseapp.com",
//   databaseURL: "https://color-game-chat.firebaseio.com",
//   projectId: "color-game-chat",
//   storageBucket: "color-game-chat.appspot.com",
//   messagingSenderId: "440942527592"
// };
// firebase.initializeApp(config);

// --- start name box -----------------------------------------------------------------------------------------------------------------//
$("#send_button").on('click', function () {
  var name = $("#msg").val().trim("");
  $("#m").html("Hi, " + name + "!");
  $("#msg").fadeOut();
  $("#send_button").fadeOut();
  $(".name_display").fadeOut();
  $(".play-large").fadeOut();
  $("#play-large").fadeIn(5000);
  

});


//   name_display
//   // alert(mess);

//   firebase.database().ref('chat/' + Date.now()).set({

//     name: name,
//     message: mess
//   });
// });


$(document).ready(function () {
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
  var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow', 'red', 'purple']);

  // --- start game sequence -----------------------------------------------------------------------------------------------------------------//
  var theTimer;
  var counter = 30;
  var colorCounter = 0;
  var correctTally = 0;
  var timeOutTally = 0;
  var timerStatus = "";

  var colorArray = ["magenta", "cyan", "red", "purple", "yellow"];
  var unsplashArray = ["pink", "blue", "red", "purple", "yellow"];
  var correctGifsArray = ["good job", "winning", "great job", "winner", "thumbs up"];
  var wrongGifsArray = ["try again", "crying baby", "sad", "crying baby", "thumbs down"];

  // --- start JS event listeners ----------------------------------------------//
  // start first unsplash api background 
  function generateUnsplash() {
    var queryURL = "https://api.unsplash.com/search/photos?page=1&query=" + unsplashArray[colorCounter] + "&client_id=30259e37b562fe39e3b5bba56d859745082308358092456f9be492a159f8fb81";
    $.ajax({ url: queryURL, method: "GET" })
      .done(function (response) {
        // console.log(response.results);
        $('#unsplash-bg').attr('style', "background-image: url('" + response.results[0].urls.regular + "'); background-repeat: no-repeat; background-size: cover;");
      })
  }
  generateUnsplash();

  // click on start game to enable camera and timer
  $("body").on("click touch", "#enable-camera", function () {
    // starts camera
    tracking.track('#video', colors, { camera: true });
    // hides button
    $("#enable-camera").fadeOut();
    // starts and displays timer
    timerWrapper();
    // starts trackingjs matching color function
    matchColor();
  })

  // trigger functions by clicking reset button
  $("body").on("click touch", "#reset-game", function () {
    resetGame();
  });

  // trigger functions by clicking pause button
  $("body").on("click touch", "#pause-game", function () {
    pauseGame();
  });

  // --- start JS functions ----------------------------------------------//
  // function to set timer to 30 seconds. If timer runs out, generate timeout loss
  function timerWrapper() {
    timerStatus = "on";
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

  var colorID = 0;
  // function to ask camera to find unsplash color and look for match
  function matchColor() {

    // tracking.js on track matching function
    colors.on('track', function (event) {
      colorID++;

      if (event.data.length === 0) {
        // no colors were detected in this frame
      } else if (colorID % 50 === 0) {

        console.log(event.data[0].color);
        if (event.data[0].color === colorArray[colorCounter]) {
          generateWin();
          clearInterval(theTimer);
        }
      }
    });
  }

  // --- WIN or TIMEOUT functions ----------------------------------------------//
  // display winning GIF, hold screen for 3 seconds
  function generateWin() {
    colorID = 0;
    correctTally++;
    console.log(correctTally);
    $("#wins").html(correctTally);
    getCorrectGif();
    // $("#videoBox").append("<canvas class='canvas' width='400' height='300'></canvas>");

    var modal = document.getElementById('myModal');

    modal.style.display = "block";

    $("#img01").attr("src", "https://cdn131.picsart.com/261355432014212.png?r1024x1024");
    $("#img02").attr("src", "http://www.clker.com/cliparts/u/3/t/X/s/s/splash-green.svg");
    $("#img03").attr("src", "https://clip2art.com/images/splatter-clipart-cartoon-14.png");
    $("#img04").attr("src", "http://www.clker.com/cliparts/P/4/r/f/b/g/light-blue-splash-ink-for-graffiti-logo-hi.png");
  }

  // display losing GIF, hold screen for 3 seconds
  function timeOutLoss() {
    colorID = 0;
    timeOutTally++;
    console.log(timeOutTally);
    getWrongGif();
    // $("#videoBox").append("<canvas class='canvas' width='400' height='300'></canvas>");


    var modal = document.getElementById('myModal');

    modal.style.display = "block";

    $("#img01").attr("src", "https://cdn140.picsart.com/252937043020212.png?r240x240");
    $("#img02").attr("src", "https://openclipart.org/image/2400px/svg_to_png/223945/Spot-of-Ink-2015073002.png");
    $("#img03").attr("src", "https://openclipart.org/image/2400px/svg_to_png/223945/Spot-of-Ink-2015073002.png");
    $("#img04").attr("src", "http://www.clker.com/cliparts/h/k/g/c/p/e/black-splash-hi.png");

  }

  // --- API CALL functions ----------------------------------------------//
  // giphy ajax call for correct gifs
  function getCorrectGif() {
    var queryURL2 = "http://api.giphy.com/v1/gifs/search?q=" + correctGifsArray[colorCounter] + "&api_key=T3bTJBKugMxVT3yX9ddzafzVAJTHEZtk&limit=5&rating";

    $.ajax({ url: queryURL2, method: 'GET' })
      .done(function (response) {
        var correctDiv = $('<div>');
        var correctImage = $('<img>');
        correctImage.attr('src', response.data[colorCounter].images.fixed_height.url);
        correctDiv.append(correctImage);
        $("#giphyImage").html(correctDiv);
      }).then(function () {
        setTimeout(wait, 5000);  // 5 second wait
      })
  }

  // giphy ajax call wrong giphy
  function getWrongGif() {
    var queryURL2 = "http://api.giphy.com/v1/gifs/search?q=" + wrongGifsArray[colorCounter] + "&api_key=T3bTJBKugMxVT3yX9ddzafzVAJTHEZtk&limit=5&rating";

    $.ajax({ url: queryURL2, method: 'GET' })
      .done(function (response) {
        var wrongDiv = $('<div>');
        var wrongImage = $('<img>');
        wrongImage.attr('src', response.data[colorCounter].images.fixed_height.url);
        wrongDiv.append(wrongImage);
        $("#giphyImage").html(wrongDiv);
      }).then(function () {
        setTimeout(wait, 5000);  // 5 second wait
      })
  }

  // start unsplash api background 
  function generateUnsplashImg(cb) {
    var queryURL = "https://api.unsplash.com/search/photos?page=1&per_page=1&query=" + unsplashArray[colorCounter] + "&client_id=30259e37b562fe39e3b5bba56d859745082308358092456f9be492a159f8fb81";
    $.ajax({ url: queryURL, method: "GET" })
      .done(function (response) {
        cb(response);
      })
  }

  // function to generate the color to find
  function generateColor() {
    generateUnsplashImg(function (img) {
      $('#unsplash-bg').attr('style', "background-image: url('" + img.results[0].urls.regular + "'); background-repeat: no-repeat; background-size: cover;");
    });
  }

  // function that moves the game forward to the next colors, calls unsplash API
  function wait() {
    if (colorCounter < 4) {
      colorCounter++;
      console.log(colorCounter);
      generateColor();
      // matchColor();
      $("#myModal").hide();
      counter = 30;
      timerWrapper();
    }
    else {
      $("#myModal").hide();
      resetGame();
    }
  }

  // reset the counters and start over game
  function resetGame() {
    clearInterval(theTimer);
    colorCounter = 0;
    correctTally = 0;
    $("#wins").html(correctTally);
    timeOutTally = 0;
    counter = 30;
    generateColor();
    timerWrapper();
  }

  function pauseGame() {
    if (timerStatus === "on") {
      $("#pauseText").text("Play");
      clearInterval(theTimer);
      timerStatus = "off";
      console.log(timerStatus);

    } else if (timerStatus === "off") {
      $("#pauseText").text("Pause");
      setInterval(thirtySeconds, 1000);
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
  }
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

// Instructions pullout tab ------------------------------------------------------------ //
$(function () {
  $('.slide-out-div').tabSlideOut({
    tabHandle: '.handle',                     //class of the element that will become your tab
    pathToTabImage: './assets/images/plus-icon.png', //path to the image for the tab //Optionally can be set using css
    imageHeight: '135px',                     //height of tab image           //Optionally can be set using css
    imageWidth: '25px',                       //width of tab image            //Optionally can be set using css
    tabLocation: 'left',                      //side of screen where tab lives, top, right, bottom, or left
    speed: 300,                               //speed of animation
    action: 'click',                          //options: 'click' or 'hover', action to trigger animation
    topPos: '200px',                          //position from the top/ use if tabLocation is left or right
    leftPos: '20px',                          //position from left/ use if tabLocation is bottom or top
    fixedPosition: true                        //options: true makes it stick(fixed position) on scroll
  });

});

var scrollY = 0;
var distance = 40;
var speed = 24;
function autoScrollTo(el) {
  var currentY = window.pageYOffset;
  var targetY = document.getElementById(el).offsetTop;
  var bodyHeight = document.body.offsetHeight;
  var yPos = currentY + window.innerHeight;
  var animator = setTimeout('autoScrollTo(\'' + el + '\')', 24);
  if (yPos > bodyHeight) {
    clearTimeout(animator);
  } else {
    if (currentY < targetY - distance) {
      scrollY = currentY + distance;
      window.scroll(0, scrollY);
    } else {
      clearTimeout(animator);
    }
  }
}
function resetScroller(el) {
  var currentY = window.pageYOffset;
  var targetY = document.getElementById(el).offsetTop;
  var animator = setTimeout('resetScroller(\'' + el + '\')', speed);
  if (currentY > targetY) {
    scrollY = currentY - distance;
    window.scroll(0, scrollY);
  } else {
    clearTimeout(animator);
  }
}

// Hide and Show buttons
$(document).ready(function () {

  $(".show-btns").click(function () {
    $("#enable-camera").show();
    $("#pause-game").show();
    $("#reset-game").show();
  });
});

  // Reset button
  // $( "button" ).click(function() {
  //   $("#msg").removeAttr(attribute);
  // });