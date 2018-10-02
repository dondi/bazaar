import UIKit

class SearchFormViewController: UIViewController {

    @IBOutlet weak var searchTextField: UITextField!
    @IBOutlet weak var searchButton: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        updateViews()
    }

   override public func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.isNavigationBarHidden = true
    }

    override public func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        navigationController?.isNavigationBarHidden = false
    }

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
        if let searchResultCollectionViewController = segue.destination as? SearchResultCollectionViewController,
           let query = searchTextField.text {
            // We _should_ have a query, since we disallow clicking the search button until the search field contains
            // a value.
            searchResultCollectionViewController.searchParams = SearchParams(rating: .PG13, query: query)
        }
    }

    @IBAction func textFieldChanged(_ sender: Any) {
        updateViews()
    }

    private func updateViews() {
        searchButton.isEnabled = (searchTextField.text ?? "").count > 0
    }
}
