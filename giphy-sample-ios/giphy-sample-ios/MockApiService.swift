import Foundation

class MockApiService: Api {
    func api(host: String) {
        // No-op in our initial mock version.
    }

    func searchGifs(with params: SearchParams,
            then: ((SearchResult) -> Void)?,
            fail: ((Error) -> Void)?) {
        if let callback = then {
            callback(SearchResult(data: [
                Gif(id: "FiGiRei2ICzzG", source_tld: "tumblr.com", images: Images(
                    fixed_width: FixedWidth(url: "http://media2.giphy.com/media/FiGiRei2ICzzG/200w.gif")
                ))
            ]))
        }
    }
}
