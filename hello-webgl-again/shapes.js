/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
(() => {
    /*
     * Returns the vertices for a small icosahedron.
     */
    let cube = () => {
        // The core icosahedron coordinates.
        const X = 0.525731112119133606;
        const Z = 0.850650808352039932;

        return {
            vertices: [

            ],

            indices: [

            ]
        };
    };

    let icosahedron = () => {
        // The core icosahedron coordinates.
        const X = 0.5;
        const Y = 0;
        const Z = 0.85;

        return {
            vertices: [
                [ -X, Y, Z ],
                [ X, Y, Z ],
                [ -X, Y, -Z ],
                [ X, Y, -Z ],
                [ Y, Z, X ],
                [ Y, Z, -X ],
                [ Y, -Z, X ],
                [ Y, -Z, -X ],
                [ Z, X, Y ],
                [ -Z, X, Y ],
                [ Z, -X, Y ],
                [ -Z, -X, Y ]
            ],
            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    let toRawTriangleArray = (indexedVertices) => {
        let result = [];

        for (let i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (let j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    let toRawLineArray = (indexedVertices) => {
        let result = [];

        for (let i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (let j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    };

    window.Shapes = {
        icosahedron,
        toRawTriangleArray,
        toRawLineArray
    };
})();
