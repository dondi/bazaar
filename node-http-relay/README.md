How to Use This Super Simple HTTP Relay Server
----------------------------------------------

1. `npm install express`
2. `npm install request`
3. Edit the file so that `API_HOST` is the true host of your selected API.
4. `node node-http-relay.js`
5. Send your requests to as instructed by the API, but replacing the API host with `http://localhost:3000`.

e.g., If you are relaying to the Steam API, set:

    var API_HOST = "http://api.steampowered.com";

Then, instead of:

    http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=YOUR_STEAM_API_KEY&steamids=12345_ACTUAL_STEAM_ID_12345

...use:

    http://localhost:3000/ISteamUser/GetPlayerSummaries/v0002/?key=YOUR_STEAM_API_KEY&steamids=12345_ACTUAL_STEAM_ID_12345
