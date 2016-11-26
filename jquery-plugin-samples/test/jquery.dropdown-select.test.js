describe("Dropdown select jQuery plugin", () => {
    let options = {
        initial: "A",

        options: [
            "A",
            "B",
            $.fn.dropdownSelect.DIVIDER,
            "C"
        ],

        change: () => {
            // No-op; Jasmine spy will check on whether this got called.
        }
    };

    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("jquery.dropdown-select.fixture.html");
    });

    afterEach(() => fixture.cleanup());

    it("should return itself when the plugin is installed", () => {
        let $target = $(".dropdown-select-test");
        let $pluginResult = $target.dropdownSelect(options);

        expect($pluginResult).toBe($target);
    });

    describe("installed behavior", () => {
        beforeEach(() => $(".dropdown-select-test").dropdownSelect(options));

        it("should build the correct elements", () => {
            // Not exhaustive, but should be sufficient.
            expect($(".dropdown-select-test").hasClass("btn-group")).toBe(true);

            expect($(".dropdown-select-test").find("button.dropdown-toggle").length).toBe(1);
            expect($(".dropdown-select-test").find("button.dropdown-toggle > span:first-child").text())
                .toBe(options.initial);

            expect($(".dropdown-select-test").find("ul.dropdown-menu").length).toBe(1);
            expect($(".dropdown-select-test").find("ul.dropdown-menu").children().length).toBe(4);
            expect($(".dropdown-select-test").find("li.divider").length).toBe(1);
        });

        it("should invoke the callback correctly", () => {
            spyOn(options, 'change');

            $(".dropdown-select-test").find("button.dropdown-toggle").click();
            $(".dropdown-select-test").find("li:nth-child(2)").click();
            expect(options.change).toHaveBeenCalledWith(options.initial, options.options[1]);
        });
    });
});
