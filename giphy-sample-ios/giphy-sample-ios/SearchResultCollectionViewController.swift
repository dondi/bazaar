import UIKit

private let REUSE_IDENTIFIER = "gifThumbnailCell"

class SearchResultCollectionViewController: UICollectionViewController {

    let api = ApiService()

    var searchParams = SearchParams(rating: .PG13, query: "")
    var searchResultGifs: [Gif] = []

    override func viewDidLoad() {
        super.viewDidLoad()

        // Invoke our query upon loading.
        api.api(host: "http://api.giphy.com/v1/")
        // ^^^^^ This should probably go somewhere else eventually but it will do here for now.
        api.searchGifs(with: searchParams, then: display, fail: report)
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

    /*
    // Uncomment this method to specify if the specified item should be selected
    override func collectionView(_ collectionView: UICollectionView, shouldSelectItemAt indexPath: IndexPath) -> Bool {
        return true
    }
    */

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
