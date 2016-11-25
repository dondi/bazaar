describe("Giphy search example", () => {
    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("search.fixture.html");
        window.GiphySearchController.init();
    });

    afterEach(() => {
        fixture.cleanup();
    });

    it("should start with an empty search field", () => {
        expect($("#search-term").val()).toBe("");
    });

    it("should start with a disabled search button", () => {
        expect($("#search-button").prop("disabled")).toBe(true);
    });

    describe("search button", () => {
        var searchTerm;
        var searchButton;

        beforeEach(() => {
            searchTerm = $("#search-term");
            searchButton = $("#search-button");
        });

        it("should be enabled when the search field is not blank", () => {
            // Programmatic changes to elements do not trigger events on their own, so in unit tests
            // we need to trigger those programmatically as well.
            searchTerm.val("i can haz unit tests").trigger("input");
            expect(searchButton.prop("disabled")).toBe(false);
        });

        it("should be disabled when the search field is blank", () => {
            searchTerm.val("").trigger("input");
            expect(searchButton.prop("disabled")).toBe(true);
        });
    });

    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#search-term").val("hello");
            $("#search-button").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a Giphy search when the search button is clicked", () => {
            expect(request.url).toBe("http://api.giphy.com/v1/gifs/search?rating=pg-13&q=hello&api_key=dc6zaTOxFJmzC");
        });

        it("should populate the image container when search results arrive", () => {
            expect($(".image-result-container").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "tumblr.com",
                        images: {
                            fixed_width: {
                                url: "http://media2.giphy.com/media/FiGiRei2ICzzG/200w.gif"
                            }
                        }
                    }]
                })
            });

            expect($(".image-result-container").children().length).toBe(1);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });
});
