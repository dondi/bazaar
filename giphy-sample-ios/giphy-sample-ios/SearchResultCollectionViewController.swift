import UIKit

private let REUSE_IDENTIFIER = "gifThumbnailCell"

class SearchResultCollectionViewController: UICollectionViewController {
    // We check for the presence of a "UI-TESTING" argument to see if we are in a test, and if so we
    // instantiate a mock service rather than the real one. In addition, we declare the Api as a var so
    // that we can reassign it in tests or mockups.
    var api: Api = ProcessInfo.processInfo.arguments.contains(TESTING_UI) ?
            MockApiService() : ApiService()

    // Same strategy for the network failure callback function.
    // Yes, we are devoting some extra code here _solely_ to accommodate testing, but it is worth it.
    var failureCallback: ((Error) -> Void)?

    var searchParams = SearchParams(rating: .PG13, query: "")
    var searchResultGifs: [Gif] = []

    var selectedRow = 0

    override func viewDidLoad() {
        super.viewDidLoad()

        // Invoke our query upon loading.
        api.api(host: "http://api.giphy.com/v1/")
        // ^^^^^ This should probably go somewhere else eventually but it will do here for now.
        api.searchGifs(with: searchParams, then: display, fail: failureCallback ?? report)
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let searchResultViewController = segue.destination as? SearchResultViewController {
            searchResultViewController.url = searchResultGifs[selectedRow].images.fixed_width.url
        }
    }

    // MARK: UICollectionViewDataSource
    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return searchResultGifs.count
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) ->
            UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: REUSE_IDENTIFIER, for: indexPath)
            as! SearchResultCollectionViewCell

        cell.remoteImageView.imageURL = searchResultGifs[indexPath.row].images.fixed_width.url

        return cell
    }

    // MARK: UICollectionViewDelegate
    /*
    // Uncomment this method to specify if the specified item should be highlighted during tracking
    override func collectionView(_ collectionView: UICollectionView, shouldHighlightItemAt indexPath: IndexPath) -> Bool {
        return true
    }
    */

    override func collectionView(_ collectionView: UICollectionView, shouldSelectItemAt indexPath: IndexPath) -> Bool {
        selectedRow = indexPath.row
        return true
    }

    /*
    // Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
    override func collectionView(_ collectionView: UICollectionView, shouldShowMenuForItemAt indexPath: IndexPath) -> Bool {
        return false
    }

    override func collectionView(_ collectionView: UICollectionView, canPerformAction action: Selector, forItemAt indexPath: IndexPath, withSender sender: Any?) -> Bool {
        return false
    }

    override func collectionView(_ collectionView: UICollectionView, performAction action: Selector, forItemAt indexPath: IndexPath, withSender sender: Any?) {

    }
    */

    private func display(searchResult: SearchResult) {
        searchResultGifs = searchResult.data
        collectionView.reloadData()
    }

    private func report(error: Error) {
        let alert = UIAlertController(title: "Network Issue",
            message: "Sorry, we seem to have encountered a network problem: \(error.localizedDescription)",
            preferredStyle: .alert)

        alert.addAction(UIAlertAction(title: "Acknowledge", style: .default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
}
