describe("Swivel jQuery plugin", () => {
    let options = {
        change: () => {
            // No-op; Jasmine spy will check on whether this got called.
        }
    };

    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("jquery.swivel.fixture.html");
    });

    afterEach(() => fixture.cleanup());

    it("should return itself when the plugin is installed", () => {
        let $target = $(".swivel-test");
        let $pluginResult = $target.swivel(options);

        expect($pluginResult).toBe($target);
    });

    describe("installed behavior", () => {
        beforeEach(() => $(".swivel-test").swivel(options));

        it("should update its CSS transform correctly", () => {
            // When synthesizing events, we need only explicitly set the values that the plugin code will
            // actually use.
            let mousedown = $.Event("mousedown", { screenX: 20 });
            $(".swivel-test").trigger(mousedown);

            let mousemove = $.Event("mousemove", { screenX: 10 });
            $(".swivel-test").trigger(mousemove);

            // We check against the style attribute because the CSS property will be the generalized "converted"
            // value of the transform, which is too unwieldy to express manually.
            expect($(".swivel-test").attr('style')).toBe("transform: perspective(500px) rotateY(-10deg);");

            mousemove = $.Event("mousemove", { screenX: 30 });
            $(".swivel-test").trigger(mousemove);
            expect($(".swivel-test").attr('style')).toBe("transform: perspective(500px) rotateY(10deg);");
        });

        it("should update the swivel angle correctly", () => {
            let mousedown = $.Event("mousedown", { screenX: 20 });
            $(".swivel-test").trigger(mousedown);

            let mousemove = $.Event("mousemove", { screenX: 10 });
            $(".swivel-test").trigger(mousemove);
            expect($(".swivel-test").data('swivel-angle')).toBe(-10);

            mousemove = $.Event("mousemove", { screenX: 30 });
            $(".swivel-test").trigger(mousemove);
            expect($(".swivel-test").data('swivel-angle')).toBe(10);
        });

        it("should invoke the callback correctly", () => {
            spyOn(options, 'change');

            let mousedown = $.Event("mousedown", { screenX: 20 });
            $(".swivel-test").trigger(mousedown);

            let mousemove = $.Event("mousemove", { screenX: 10 });
            $(".swivel-test").trigger(mousemove);
            expect(options.change).toHaveBeenCalledWith(0, -10);

            mousemove = $.Event("mousemove", { screenX: 30 });
            $(".swivel-test").trigger(mousemove);
            expect(options.change).toHaveBeenCalledWith(-10, 10);
        });
    });
});
