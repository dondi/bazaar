describe("In-place editor jQuery plugin", () => {
    const options = {
        change: () => {
            // No-op; Jasmine spy will check on whether this got called.
        }
    };

    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("jquery.in-place-editor.fixture.html");
    });

    afterEach(() => fixture.cleanup());

    it("should return itself when the plugin is installed", () => {
        const $target = $(".in-place-editor-test");
        const $pluginResult = $target.inPlaceEditor(options);

        expect($pluginResult).toBe($target);
    });

    describe("installed behavior", () => {
        beforeEach(() => $(".in-place-editor-test").inPlaceEditor(options));

        it("should add an input element when clicked", () => {
            $(".in-place-editor-test").click();
            expect($(".editor-overlay > input").length).toBe(1);
        });

        /*
           Unfortunately, due to divergent behavior between Chrome and Firefox in the way that the blur
           event handler is invoked in the Karma environment, the editing aspect of this plugin cannot be
           unit-tested. The code below indicates the expected behavior _if_ blur implementations were more
           consistent, and instead can be used as a guide for performing manual testing (sigh).

           http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node
        */

        xit("should update the original element's text", () => {
            $(".in-place-editor-test").click();
            $(".editor-overlay > input").val("Zing!").blur();
            expect($(".in-place-editor-test").text()).toBe("Zing!");
        });

        xit("should invoke the callback correctly", () => {
            spyOn(options, 'change');
            $(".in-place-editor-test").click();
            $(".editor-overlay > input").val("Zoom!").blur();
            expect(options.change).toHaveBeenCalled();
        });
    });
});
