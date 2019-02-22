(function() {

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  const getHashParams = () => {
    var hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  let params = getHashParams();

  let access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;

  const token = access_token
  let userId = ""

  if (error) {
    alert('There was an error during the authentication');
  } else {
    if (access_token) {
      // If shit worked in Spotify authentication
      $.ajax({
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: (response) => {
            userId = response.id
            document.querySelector('#login').style.display = 'hidden'
            document.querySelector('#loggedin').style.display = 'block'
            // $('#login').hide()
            // $('#loggedin').show()

          }
      });

     setTimeout(() => {
       document.querySelector('#obtain-playlists').addEventListener('click', e => {
          document.querySelector('.playlist-container').innerHTML = "";
          fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${access_token}`
            },
          })
            .then(response => response.json())
            .then(response => {createPlaylistSelection(response, access_token)})
        })
     }, 2000)

     spotifySignedIn = true;
     youtubeSignedIn && spotifySignedIn ? bothSignedIn = true : ""
     bothSignedIn ? document.querySelector('.media').classList.add('hidden') : ""
     bothSignedIn ? document.querySelector('#obtain-playlists').classList.remove('hidden') : ""
     bothSignedIn ? document.querySelector('#do-youtube').classList.remove('hidden') : ""
    } else {
        // render initial screen
        document.querySelector('#login').style.display = 'block'
        document.querySelector('#loggedin').style.display = 'hidden'
    }
  }
})();
