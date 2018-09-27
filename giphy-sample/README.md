# Web Front End Sample

This folder contains a very simple web front end sample that uses the [Giphy API](https://api.giphy.com) to search for then display matching animated GIFs.

To perform development tasks such as testing and linting, you need to have [Node.js](https://nodejs.org) installed. In order to get going, run `npm install`:

    $ cd bazaar/giphy-sample
    $ npm install

The installation allows you to run the web app locally. At this folder’s location, just type `npm start`:

    $ cd bazaar/giphy-sample
    $ npm start

Python’s `SimpleHTTPServer` also does the job just fine, for example:

    $ cd bazaar/giphy-sample
    $ python -m SimpleHTTPServer

The test suite can be run with `npm test`. This includes a _linting_ step which will _not_ run the unit tests if your code has formatting issues. This is intentional, meant to make you fix linting errors before you move on to additional testing.

## Possible Add-Ons

You might consider adding [Font Awesome](https://fontawesome.com) to this application. It’s a convenient and powerful collection of icons and glyphs, and they have a free set which anyone may use.
