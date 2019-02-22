## Spotify to Youtube

Web App that converts Spotify playlists to Youtube playlists

The solution currently uses client side authentication to the Youtube API so do not host this as the API keys would be visible.

#### Installation:
1. Clone the repository to your local machine
2. Run `npm install` in the cloned directory
3. Enter your Spotify API credentials in an .env file as showed in the example .env.example file
4. Enter your Youtube API credentials in the youtube.js file in public/scripts folder where the authentication is made
5. Run the server by typing `node app.js` in your terminal
6. The site should now be running on 'localhost:8888'

> _Tip: The Youtube API limits your queries per day so keep the test converts on a smaller scale_


#### To Do:
- Move certain functionality from client side JS to Node
- Fix UI
- Improve documentation and indentation of code
- Improve the function flow for converting videos by using async functions instead of calling functions inside a response
- Much more
- Add user input functionality for Youtube playlist name, Size and more..
- Make user input validation in Node
