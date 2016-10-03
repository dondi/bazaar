# Web Front End Sample

This folder contains a very simple web front end sample that uses the [Giphy API](https://api.giphy.com) to search for then display matching animated GIFs.

To simply run the web app, just run a web server at this folder’s location. Python’s `SimpleHTTPServer` does the job just fine, for example:

    $ cd bazaar/giphy-sample
    $ python -m SimpleHTTPServer

To perform development tasks such as testing and linting, you need to have [Node.js](https://nodejs.org) installed. In order to get going, run `npm install`:

    $ cd bazaar/giphy-sample
    $ npm install

The test suite can be run with `npm test`.
