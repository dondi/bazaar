import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var log: UITextView!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    @IBAction func swivelValueChanged(_ sender: Any) {
        if let swivel = sender as? SwivelControl {
            log.text = "Swiveled to: \(swivel.swivelAngle)"
        }
    }
}

