/*
 * Unit tests for our vector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var v = new Vector(5, 6, 3);

        equal(v.dimensions(), 3, "Vector size");
        equal(v.elements[0], 5, "First element by index");
        equal(v.elements[1], 6, "Second element by index");
        equal(v.elements[2], 3, "Third element by index");
        equal(v.x(), 5, "First element by coordinate");
        equal(v.y(), 6, "Second element by coordinate");
        equal(v.z(), 3, "Third element by coordinate");

        v = new Vector(300, 200);

        equal(v.dimensions(), 2, "Vector size");
        equal(v.elements[0], 300, "First element by index");
        equal(v.elements[1], 200, "Second element by index");
        equal(v.x(), 300, "First element by coordinate");
        equal(v.y(), 200, "Second element by coordinate");

        v = new Vector(3, 2, 1, 2);

        equal(v.dimensions(), 4, "Vector size");
        equal(v.elements[0], 3, "First element by index");
        equal(v.elements[1], 2, "Second element by index");
        equal(v.elements[2], 1, "Third element by index");
        equal(v.elements[3], 2, "Fourth element by index");
        equal(v.x(), 3, "First element by coordinate");
        equal(v.y(), 2, "Second element by coordinate");
        equal(v.z(), 1, "Third element by coordinate");
        equal(v.w(), 2, "Fourth element by coordinate");

        v = new Vector();
        equal(v.dimensions(), 0, "Empty vector (boundary case)");
    });

    test("Addition and Subtraction", function () {
        var v1 = new Vector(4, 5),
            v2 = new Vector(-10, 4),
            vresult = v1.add(v2);

        equal(vresult.dimensions(), 2, "Vector sum size check");
        equal(vresult.x(), -6, "Vector sum first element");
        equal(vresult.y(), 9, "Vector sum second element");

        v1 = new Vector(0, -2, 3, 5);
        v2 = new Vector(-2, 1, 0, 7);
        vresult = v1.subtract(v2);
        equal(vresult.dimensions(), 4, "Vector difference size check");
        equal(vresult.x(), 2, "Vector difference first element");
        equal(vresult.y(), -3, "Vector difference second element");
        equal(vresult.z(), 3, "Vector difference third element");
        equal(vresult.w(), -2, "Vector difference fourth element");

        // Check for errors.
        v1 = new Vector(5, 8, 10, 2);
        v2 = new Vector(1, 2, 2);
        // We can actually check for a *specific* exception, but
        // we won't go that far for now.
        raises(
            function () {
                return v1.add(v2);
            },
            "Check for vectors of different sizes"
        );
    });

    test("Scalar Multiplication and Division", function () {
    });

    test("Dot Product", function () {
    });

    test("Cross Product", function () {
    });

    test("Length and Normalization", function () {
    });

    test("Projection", function () {
    });

});
