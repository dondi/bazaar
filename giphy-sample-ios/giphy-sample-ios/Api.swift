import Foundation

protocol Api {
    func api(host: String)
    func searchGifs(with params: SearchParams,
            then: ((SearchResult) -> Void)?,
            fail: ((Error) -> Void)?) // catch is a reserved word so we can't use that.
}

class ApiService: Api {
    func api(host: String) {
        // No-op in our initial mock version.
    }

    func searchGifs(with params: SearchParams,
            then: ((SearchResult) -> Void)?,
            fail: ((Error) -> Void)?) {
        if let callback = then {
            callback(SearchResult(data: [
                Gif(id: "26BRBupa6nRXMGBP2", source_tld: "", images: Images(
                    fixed_width: FixedWidth(url: "https://media2.giphy.com/media/26BRBupa6nRXMGBP2/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5")
                )),

                Gif(id: "hklv9aNS7Gcda", source_tld: "", images: Images(
                    fixed_width: FixedWidth(url: "https://media2.giphy.com/media/hklv9aNS7Gcda/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5")
                )),

                Gif(id: "YJBNjrvG5Ctmo", source_tld: "", images: Images(
                    fixed_width: FixedWidth(url: "https://media0.giphy.com/media/YJBNjrvG5Ctmo/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5")
                ))
            ]))
        }
    }
}
