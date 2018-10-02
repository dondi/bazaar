import XCTest

class SearchFormUITests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    // Use recording to get started writing UI tests.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    func testAppShouldStartWithAnEmptySearchField() {
        let app = XCUIApplication()
        let searchTextField = app.textFields["searchTextField"]
        XCTAssertEqual(searchTextField.value as? String ?? "", "")
    }

    func testAppShouldStartWithADisabledSearchButton() {
        let app = XCUIApplication()
        let searchButton = app.buttons["searchButton"]
        XCTAssert(!searchButton.isEnabled)
    }

    func testSearchButtonShouldBeEnabledWhenTheSearchFieldIsNotBlank() {
        let app = XCUIApplication()
        let searchTextField = app.textFields["searchTextField"]
        searchTextField.tap()
        searchTextField.typeText("i can haz unit tests")

        let searchButton = app.buttons["searchButton"]
        XCTAssert(searchButton.isEnabled)
    }

    func testSearchButtonShouldBeDisabledWhenTheSearchFieldIsBlank() {
        testSearchButtonShouldBeEnabledWhenTheSearchFieldIsNotBlank()

        let app = XCUIApplication()
        let searchTextField = app.textFields["searchTextField"]
        // Search text field is tapped at this point.

        let searchText = searchTextField.value as? String ?? ""

        // Yes, this is the Delete key repeated for the number of characters that we entered!
        let deleteString = String(repeating: XCUIKeyboardKey.delete.rawValue, count: searchText.count)
        searchTextField.typeText(deleteString)

        let searchButton = app.buttons["searchButton"]
        XCTAssert(!searchButton.isEnabled)
    }
}
