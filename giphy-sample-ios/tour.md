# iOS/Xcode/Swift Overview and Tour

[Start here](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/) to start learning about these technologies.

You will likely need to get the hang of Swift, and [here is one good place to start](https://docs.swift.org/swift-book/GuidedTour/GuidedTour.html).

## Code Entry Points
* Main app entry: _AppDelegate.swift_
* Application entry: two-fold in iOS—the visual part and the behavior part
    * Visual can be found in _Main.storyboard_
    * Behavior can be found in Swift files, and the opening _view controller_ is _SearchFormViewController.swift_

General principle: views are drawn in the storyboard (or other files), then connected to a view controller that is defined in a Swift file. Xcode allows for visual connections between view elements and variables in the view controller class.
