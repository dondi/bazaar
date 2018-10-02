import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var searchTextField: UITextField!
    @IBOutlet weak var searchButton: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        updateViews()
    }

    @IBAction func textFieldChanged(_ sender: Any) {
        updateViews()
    }

    private func updateViews() {
        searchButton.isEnabled = (searchTextField.text ?? "").count > 0
    }
}
