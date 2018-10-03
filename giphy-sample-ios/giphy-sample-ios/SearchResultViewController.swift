import UIKit
import WebKit

// Displaying an animated GIF natively can be tricky (see StackOverflow!) so we take advantage of the availability
// of a web view component and use _that_ component's inherent GIF animation capability to display the GIF.
class SearchResultViewController: UIViewController {

    @IBOutlet weak var webView: WKWebView!

    var url: String? {
        didSet {
            if self.isViewLoaded {
                self.refreshWebView()
            }
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        refreshWebView()
    }

    private func refreshWebView() {
        guard let urlString = url else {
            // No-op if we don't have a URL.
            return
        }

        let html = """
            <!doctype html>
            <html>
              <head>
                <title>Image</title>
                <meta charset="utf-8" />
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                  }

                  img {
                    width: 100vw;
                  }
                </style>
              </head>
              <body>
                <img src="\(urlString)" alt="image" />
              </body>
            </html>
            """

        // TODO Some feedback while the HTML is loading would be nice.
        webView.loadHTMLString(html, baseURL: nil)
    }
}
