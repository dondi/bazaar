# iOS Front End Sample

This folder contains a very simple iOS front end sample that uses the [Giphy API](https://api.giphy.com) to search for then display matching animated GIFs. The project was bootstrapped by Xcode as a Single-View App.

## Setup

This project uses the [Siesta](http://bustoutsolutions.github.io/siesta/) library to facilitate network connections as well as some user interface components. To minimize overhead in getting started with this code, the library is integrated as a _git submodule_.

Make sure to do this _before opening the Xcode project for the first time_:

1. From a fresh clone, copy this entire subdirectory to the destination `git` repository where you plan to work on it.
2. Follow **Step 1 only** of the [Git Submodule](http://bustoutsolutions.github.io/siesta/#git-submodule) installation instructions in the Siesta website, substituting `Third-Party` instead of `Libraries`:

        git submodule add https://github.com/bustoutsolutions/siesta.git Third-Party/Siesta

3. There is no change to the `git submodule update --init` instruction: do that as indicated.

After doing this, you may then open the Xcode project and work as usual.

## Execution

Use the _Project > Run_ command to execute the app within the selected device (simulator or plugged-in hardware).

## Tests

Use the _Project > Test_ command to run the test suite.

## Build/Deploy

Deployment instructions (i.e., App Store upload) are rather involved; please refer to the [Apple developer site](https://developer.apple.com) for documentation on this process.

## Style/Component Libraries

If your front end design involves a large amount of form fill-in, you might find the [Eureka framework](https://github.com/xmartlabs/Eureka) useful; like Siesta, it can be installed in a variety of ways, but for this project, the [git submodule](https://github.com/xmartlabs/Eureka#manually-as-embedded-framework) approach will suffice.
