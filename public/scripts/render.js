let bothSignedIn = false;
let spotifySignedIn = false;
let youtubeSignedIn = false;
let searchResults = []
let playlistId = ""

const clearSelection = () => {
  const playlistContainer = document.querySelector('.playlist-container')
  const obtainButton = document.querySelector('#obtain-playlists')
  document.querySelector('#sign-in-or-out-button').innerHTML = `Sign In Youtube <img width="45" src="img/youtube_social_icon_dark.png">`
  obtainButton.classList.add('hidden')
  playlistContainer.innerHTML = ""
}

const insertPlaylist = (videoData, playlistId) => {

  const video = videoData[0]

  videoData.shift();

  addToPlaylist(videoData, video.videoId, playlistId)

}

const handleSearchResults = results => {
  console.log("Handling search results...")
  console.log(results)
  createPlaylist(results);

}

const getPlaylistSongs = (playlistId, accessToken) => {
      // Fetches playlists songs through spotify API
     fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(artists%2C%20name))`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
       },
     })
       .then(response => response.json())
       .then(response => {
         const trackList = response.items.map(track => {
           const trackName = track.track.name
           const trackArtist = track.track.artists[0].name
           return {
             track: trackName,
             artist: trackArtist
           }
         })

         trackList.forEach(track => {
           search(track.track, track.artist)
         })

           handleSearchResults(searchResults);
       })
   }

const addSongsEvents = (accessToken) => {
  const fetchSongsButtons = document.querySelectorAll('.get-songs-button')
  fetchSongsButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault()
      const playlistContainer = document.querySelector('.playlist-container')
      const loadingBar = document.querySelector('.loading-container')
      playlistContainer.classList.add('hidden')
      loadingBar.classList.remove('hidden')
      const playlistId = e.target.dataset.id
      getPlaylistSongs(playlistId, accessToken);
    })
  })
}

const createPlaylistSelection = (playlistData, accessToken) => {
  const playlistContainer = document.querySelector('.playlist-container')
  const playlistAmountLimit = 30
  console.log(playlistData)
  playlistData.items.forEach(playlist => {
    if(playlist.tracks.total <= playlistAmountLimit){
      let playlistElement = `
      <div class="playlist">
      <h4>${playlist.name}</h4>
      <p><i>${playlist.tracks.total} tracks</i></p>
      <img class="margined-item" src="${playlist.images[0].url}" width="50" height="50">
      <a href="${playlist.external_urls.spotify}" target="blank"><img class="margined-item" src="https://image.flaticon.com/icons/svg/889/889134.svg" width="25" height="25" alt="Spotify free icon" title="Spotify free icon"></a>
      <button class="get-songs-button margined-item" data-id="${playlist.id}">Convert Playlist</button>
      </div>
      `

      playlistContainer.innerHTML += playlistElement
    }
  })

  addSongsEvents(accessToken);

}
