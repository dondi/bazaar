describe("Giphy search example", function () {
    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("search.fixture.html");
        window.GiphySearchController.init();
    });

    afterEach(() => {
        fixture.cleanup();
    });

    it("should start with an empty search field", () => {
        var searchField = $("#search-term");
        expect(searchField.val()).toBe("");
    });

    describe("search button", () => {
        it("should be enabled when the search field is not blank", () => {
            var searchField = $("#search-term");
            var searchButton = $("#search-button");

            // Programmatic changes to elements do not trigger events on their own, so in unit tests
            // we need to trigger those programmatically as well.
            searchField.val("i can haz unit tests").trigger("input");
            expect(searchButton.prop("disabled")).toBe(false);
        });

        it("should be disabled when the search field is blank", () => {
            var searchField = $("#search-term");
            var searchButton = $("#search-button");
            searchField.val("").trigger("input");
            expect(searchButton.prop("disabled")).toBe(true);
        });
    });

    it("should trigger a Giphy search when the search button is clicked", () => {
    });

    it("should populate the image container when search results arrive", () => {
    });
});
