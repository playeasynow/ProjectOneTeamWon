fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${userAccessToken}`     
  }
})
.then(response => response.json())
.then(({beats})) => {
  beats.forEach((beat, index) => {
    console.log(`Beat ${index} starts at ${beat.start}`);
  })
}

// Client ID 282f834858e84faab5e1813afb6611ac
// Client Secret 6fc5a6cc2ab64a60a2a6c7723b744d32 
 