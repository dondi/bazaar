enum Rating: String {
    case Y = "y"
    case G = "g"
    case PG = "pg"
    case PG13 = "pg-13"
    case R = "r"
}

// For now, this is just a subset of what's available:
//     https://developers.giphy.com/docs/#operation--gifs-search-get
struct SearchParams {
    let rating: Rating
    let query: String
}

// Similarly, this is a subset of everything that comes back.
struct SearchResult {
    let data: [Gif]
}

// You know the drill: another subset.
//     https://developers.giphy.com/docs/#gif-object
struct Gif {
    let id: String
    let source_tld: String
    let images: Images
}

// https://developers.giphy.com/docs/#images-object
struct Images {
    let fixed_width: FixedWidth
}

struct FixedWidth {
    let url: String
}
