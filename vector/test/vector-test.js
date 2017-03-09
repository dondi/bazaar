describe("Vector implementation", () => {
    let Vector = window.Vector;

    describe("creation and data access", () => {
        it("should instantiate and access 3D vectors properly", () => {
            let v = new Vector(5, 6, 3);

            expect(v.dimensions).toBe(3);
            expect(v.elements[0]).toBe(5);
            expect(v.elements[1]).toBe(6);
            expect(v.elements[2]).toBe(3);
            expect(v.x).toBe(5);
            expect(v.y).toBe(6);
            expect(v.z).toBe(3);
        });

        it("should instantiate and access 2D vectors properly", () => {
            let v = new Vector(300, 200);

            expect(v.dimensions).toBe(2);
            expect(v.elements[0]).toBe(300);
            expect(v.elements[1]).toBe(200);
            expect(v.x).toBe(300);
            expect(v.y).toBe(200);
        });

        it("should instantiate and access 4D vectors properly", () => {
            let v = new Vector(3, 2, 1, 2);

            expect(v.dimensions).toBe(4);
            expect(v.elements[0]).toBe(3);
            expect(v.elements[1]).toBe(2);
            expect(v.elements[2]).toBe(1);
            expect(v.elements[3]).toBe(2);
            expect(v.x).toBe(3);
            expect(v.y).toBe(2);
            expect(v.z).toBe(1);
            expect(v.w).toBe(2);
        });

        it("should instantiate and access an empty vector properly", () => {
            let v = new Vector();
            expect(v.dimensions).toBe(0);
        });
    });

    describe("addition and subtraction", () => {
        it("should perform addition correctly", () => {
            let v1 = new Vector(4, 5);
            let v2 = new Vector(-10, 4);
            let vresult = v1.add(v2);

            expect(vresult.dimensions).toBe(2);
            expect(vresult.x).toBe(-6);
            expect(vresult.y).toBe(9);
        });

        it("should perform subtraction correctly", () => {
            let v1 = new Vector(0, -2, 3, 5);
            let v2 = new Vector(-2, 1, 0, 7);
            let vresult = v1.subtract(v2);
            expect(vresult.dimensions).toBe(4);
            expect(vresult.x).toBe(2);
            expect(vresult.y).toBe(-3);
            expect(vresult.z).toBe(3);
            expect(vresult.w).toBe(-2);
        });

        it("should throw an exception when adding different sizes", () => {
            let v1 = new Vector(5, 8, 10, 2);
            let v2 = new Vector(1, 2, 2);

            // We can actually check for a *specific* exception, but
            // we won't go that far for now.
            expect(() => v1.add(v2)).toThrow();
        });
    });

    describe("scalar multiplication and division", () => {
        it("should perform scalar multiplication correctly", () => {
            let v = new Vector(8, 2, 3);
            let vresult = v.multiply(2);

            expect(vresult.x).toBe(16);
            expect(vresult.y).toBe(4);
            expect(vresult.z).toBe(6);
        });

        it("should perform scalar division correctly", () => {
            let v = new Vector(16, 4, 6);
            let vresult = v.divide(4);

            expect(vresult.x).toBe(4);
            expect(vresult.y).toBe(1);
            expect(vresult.z).toBe(1.5);
        });
    });

    describe("dot product", () => {
        it("should compute a 2D dot product correctly", () => {
            let v1 = new Vector(-5, -2);
            let v2 = new Vector(-3, 4);

            expect(v1.dot(v2)).toBe(7);
        });

        it("should compute a zero dot product for perpendicular vectors", () => {
            let v1 = new Vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2);
            let v2 = new Vector(-Math.sqrt(2) / 2, Math.sqrt(2) / 2);
            expect(v1.dot(v2)).toBe(0);
        });

        it("should compute a 3D dot product correctly", () => {
            let v1 = new Vector(3, 2, 5);
            let v2 = new Vector(4, -1, 3);
            expect(v1.dot(v2)).toBe(25);
        });

        it("should compute a 4D dot product correctly", () => {
            let v1 = new Vector(2, 2, 4, 8);
            let v2 = new Vector(-1, 7, 0, 20);
            expect(v1.dot(v2)).toBe(172);
        });

        it("should throw an exception for vectors of different sizes", () => {
            let v1 = new Vector(4, 2);
            let v2 = new Vector(3, 9, 1);

            // We can actually check for a *specific* exception, but
            // we won't go that far for now.
            expect(() => v1.dot(v2)).toThrow();
        });
    });

    describe("cross product", () => {
        it("should throw an exception for non-3D vectors", () => {
            let v1 = new Vector(3, 4);
            let v2 = new Vector(1, 2);

            expect(() => v1.cross(v2)).toThrow();
        });

        it("should compute a right-handed perpendicular", () => {
            let v1 = new Vector(1, 0, 0);
            let v2 = new Vector(0, 1, 0);
            let vresult = v1.cross(v2);

            expect(vresult.x).toBe(0);
            expect(vresult.y).toBe(0);
            expect(vresult.z).toBe(1);
        });

        it("should compute the opposite perpendicular when switched", () => {
            let v1 = new Vector(1, 0, 0);
            let v2 = new Vector(0, 1, 0);
            let vresult = v2.cross(v1);

            expect(vresult.x).toBe(0);
            expect(vresult.y).toBe(0);
            expect(vresult.z).toBe(-1);
        });
    });

    describe("magnitude and unit vectors", () => {
        it("should compute 2D magnitude correctly", () => {
            // The classic example.
            let v = new Vector(3, 4);
            expect(v.magnitude).toBe(5);
        });

        it("should compute 3D magnitude correctly", () => {
            let v = new Vector(5, 0, 12);
            expect(v.magnitude).toBe(13);
        });

        it("should compute 2D unit vectors correctly", () => {
            let v = (new Vector(3, 4)).unit;

            expect(v.magnitude).toBe(1);
            expect(v.x).toBe(3 / 5);
            expect(v.y).toBe(4 / 5);
        });

        it("should compute 3D unit vectors correctly", () => {
            let v = (new Vector(0, -7, 24)).unit;

            expect(v.magnitude).toBe(1);
            expect(v.x).toBe(0);
            expect(v.y).toBe(-7 / 25);
            expect(v.z).toBe(24 / 25);
        });
    });

    describe("projection", () => {
        it("should project a 3D vector onto another correctly", () => {
            let v = new Vector(3, 3, 0);
            let vresult = v.projection(new Vector(5, 0, 0));

            expect(vresult.magnitude).toBe(3);
            expect(vresult.x).toBe(3);
            expect(vresult.y).toBe(0);
            expect(vresult.z).toBe(0);
        });

        it("should throw an exception for vectors of different sizes", () => {
            expect(() => (new Vector(5, 2)).projection(new Vector(9, 8, 1))).toThrow();
        });
    });
});
