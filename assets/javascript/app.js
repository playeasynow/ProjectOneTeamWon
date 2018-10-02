

 // Constructing a queryURL using the animal name
 var queryURL = "https://app.ticketmaster.com/discovery/v2/" +
 "&api_key=Nvi9ZsuaDBYE4HhFrY63AGBljsc7B9pG";

 $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=Nvi9ZsuaDBYE4HhFrY63AGBljsc7B9pG",
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });