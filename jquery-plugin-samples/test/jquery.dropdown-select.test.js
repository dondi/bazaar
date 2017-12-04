describe("Dropdown select jQuery plugin", () => {
    const dropdownOptions = [
        "A",
        "B",
        $.fn.dropdownSelect.DIVIDER,
        "C"
    ];

    const initialOption = "A";

    const options = {
        initial: initialOption,
        options: dropdownOptions,

        change: () => {
            // No-op; Jasmine spy will check on whether this got called.
        }
    };

    const optionsWithoutCallback = {
        initial: initialOption,
        options: dropdownOptions
    };

    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("jquery.dropdown-select.fixture.html");
    });

    afterEach(() => fixture.cleanup());

    it("should return itself when the plugin is installed", () => {
        const $target = $(".dropdown-select-test");
        const $pluginResult = $target.dropdownSelect(options);

        expect($pluginResult).toBe($target);
    });

    let elementBuildingTest = () => {
        // Not exhaustive, but should be sufficient.
        expect($(".dropdown-select-test").hasClass("btn-group")).toBe(true);

        expect($(".dropdown-select-test").find("button.dropdown-toggle").length).toBe(1);
        expect($(".dropdown-select-test").find("button.dropdown-toggle > span:first-child").text())
            .toBe(options.initial);

        expect($(".dropdown-select-test").find("ul.dropdown-menu").length).toBe(1);
        expect($(".dropdown-select-test").find("ul.dropdown-menu").children().length).toBe(4);
        expect($(".dropdown-select-test").find("li.divider").length).toBe(1);
    };

    let optionSelectionTest = () => {
        $(".dropdown-select-test").find("button.dropdown-toggle").click();
        $(".dropdown-select-test").find("li:nth-child(2)").click();
        expect($(".dropdown-select-test").find("span:first-child").text()).toBe(dropdownOptions[1]);
    };

    describe("installed behavior with callback", () => {
        beforeEach(() => $(".dropdown-select-test").dropdownSelect(options));

        it("should build the correct elements", elementBuildingTest);
        it("should update the selection correctly", optionSelectionTest);

        it("should invoke the callback correctly", () => {
            spyOn(options, 'change');
            optionSelectionTest();
            expect(options.change).toHaveBeenCalledWith(options.initial, options.options[1]);
        });
    });

    describe("installed behavior without callback", () => {
        beforeEach(() => $(".dropdown-select-test").dropdownSelect(optionsWithoutCallback));

        it("should build the correct elements", elementBuildingTest);
        it("should update the selection correctly", optionSelectionTest);
    });
});
