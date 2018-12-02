import XCTest
@testable import ios_direct_manipulation_samples

class swivelTests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testSwivelControlStartsWithCorrectInitialValues() {
        let swivel = SwivelControl()
        XCTAssertNil(swivel.currentTouch, "There should be mo curreent touch")
        XCTAssertEqual(swivel.anchorX, 0, "Initial anchor should be zero")
        XCTAssertEqual(swivel.swivelAngle, 0, "Initial value should be zero")
        XCTAssertNotNil(swivel.swivelLayer, "Control should have its own layer")
    }

    func testSwivelControlUpdatesEditablePropertiesCorrectly() {
        let swivel = SwivelControl()

        swivel.swivelBackgroundColor = .red
        XCTAssertEqual(swivel.swivelLayer.backgroundColor, UIColor.red.cgColor, "Background color should go to layer")

        swivel.swivelBorderColor = .yellow
        XCTAssertEqual(swivel.swivelLayer.borderColor, UIColor.yellow.cgColor, "Border color should go to layer")

        swivel.swivelBorderWidth = 100
        XCTAssertEqual(swivel.swivelLayer.borderWidth, 100, "Border width should go to layer")
    }

    func testSwivelControlStopsTrackingWhenTouchChanges() {
        let swivel = SwivelControl()

        // SwivelControl doesn't use the event argument so we can skip it.
        XCTAssertTrue(swivel.beginTracking(
            MockTouch(withMockLocation: CGPoint(x: 20, y: 0)), with: nil), "Initial track should return true")

        XCTAssertFalse(swivel.continueTracking(
            MockTouch(withMockLocation: CGPoint(x: 10, y: 0)), with: nil), "Track movement should return true")
    }

    func testSwivelControlUpdatesSwivelAngleCorrectly() {
        let swivel = SwivelControl()
        let touch = MockTouch(withMockLocation: CGPoint(x: 20, y: 0))

        XCTAssertTrue(swivel.beginTracking(touch, with: nil), "Initial track should return true")

        touch.mockLocation.x = 10
        XCTAssertTrue(swivel.continueTracking(touch, with: nil), "Track movement should return true")
        XCTAssertEqual(swivel.swivelAngle, -10, "Swivel angle should correspond to movement")

        touch.mockLocation.x = 30
        XCTAssertTrue(swivel.continueTracking(touch, with: nil), "Track movement should return true")
        XCTAssertEqual(swivel.swivelAngle, 10, "Swivel angle should correspond to movement")

        swivel.endTracking(touch, with: nil)
    }
}

class MockTouch: UITouch {
    var mockLocation: CGPoint = CGPoint(x: 0, y: 0)

    init(withMockLocation location: CGPoint) {
        mockLocation = location
    }

    override func location(in view: UIView?) -> CGPoint {
        return mockLocation
    }
}
