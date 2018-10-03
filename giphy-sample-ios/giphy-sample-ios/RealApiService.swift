import Siesta

class RealApiService: Api {

    let API_KEY = "dc6zaTOxFJmzC"

    private var service = Service(
        baseURL: "http://misconfigured.app.com",
        standardTransformers: [.text, .image])

    init() {
        // Bare-bones logging of which network calls Siesta makes:
        SiestaLog.Category.enabled = [.network]

        // For more info about how Siesta decides whether to make a network call,
        // and which state updates it broadcasts to the app:
        //SiestaLog.Category.enabled = SiestaLog.Category.common
        // For the gory details of what Siesta’s up to:
        //SiestaLog.Category.enabled = SiestaLog.Category.all
        // To dump all requests and responses:
        // (Warning: may cause Xcode console overheating)
        //SiestaLog.Category.enabled = SiestaLog.Category.all
    }

    func api(host: String) {
        service = Service(baseURL: host, standardTransformers: [.text, .image])

        let jsonDecoder = JSONDecoder()
        service.configureTransformer("/gifs/search") {
            try jsonDecoder.decode(SearchResult.self, from: $0.content)
        }
    }

    func searchGifs(with params: SearchParams,
            then: ((SearchResult) -> Void)?,
            fail: ((Error) -> Void)?) {
        service.resource("/gifs/search")
            .withParam("api_key", API_KEY)
            .withParam("rating", params.rating.rawValue)
            .withParam("q", params.query)
        .request(.get).onSuccess { result in
            if let searchResult: SearchResult = result.typedContent(),
               let callback = then {
                callback(searchResult)
            }
        }.onFailure { error in
            if let callback = fail {
                callback(error)
            }
        }
    }
}
