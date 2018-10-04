import XCTest
@testable import giphy_sample_ios

class SearchResultCollectionViewControllerTests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testShouldTriggerGiphySearchWhenSearchResultCollectionViewControllerLoads() {
        guard let searchResultCollectionViewController = UIStoryboard(name: "Main", bundle: nil)
                .instantiateViewController(withIdentifier: "SearchResultCollectionViewController")
                as? SearchResultCollectionViewController else {
            XCTFail()
            return
        }

        searchResultCollectionViewController.api = TestApiService()
        searchResultCollectionViewController.searchParams = SearchParams(rating: .PG13, query: "hello")
        searchResultCollectionViewController.viewDidLoad()
        // Asserts are in the TestApiService implementation, see below.
    }

    func testShouldDisplayAlertWhenAPICallFails() {
        guard let searchResultCollectionViewController = UIStoryboard(name: "Main", bundle: nil)
                .instantiateViewController(withIdentifier: "SearchResultCollectionViewController")
                as? SearchResultCollectionViewController else {
            XCTFail()
            return
        }

        var failureCallbackWasCalled = false
        searchResultCollectionViewController.failureCallback = { _ in failureCallbackWasCalled = true }

        searchResultCollectionViewController.api = FailingApiService()
        searchResultCollectionViewController.searchParams = SearchParams(rating: .PG13, query: "hello")
        searchResultCollectionViewController.viewDidLoad()

        XCTAssert(failureCallbackWasCalled)
    }
}

class TestApiService: Api {
    func api(host: String) {
    }

    func searchGifs(with params: SearchParams,
            then: ((SearchResult) -> Void)?,
            fail: ((Error) -> Void)?) {
        // For this test, we don't call the callback because we just want to make sure the right parameters were sent.
        XCTAssertEqual(params.rating, .PG13)
        XCTAssertEqual(params.query, "hello")
    }
}

class FailingApiService: Api {
    func api(host: String) {
    }

    func searchGifs(with params: SearchParams,
            then: ((SearchResult) -> Void)?,
            fail: ((Error) -> Void)?) {
        // For this test, we call the fail function unconditionally because we want to test the error.
        if let callback = fail {
            callback(NSError(domain: "test", code: 0, userInfo: nil))
        }
    }
}
