/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        modelViewMatrix,
        projectionMatrix,
        vertexPosition,
        vertexColor,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,

        /*
         * This code does not really belong here: it should live
         * in a separate library of matrix and transformation
         * functions.  It is here only to show you how matrices
         * can be used with GLSL.
         *
         * Based on the original glRotate reference:
         *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
         */
        getRotationMatrix = function (angle, x, y, z) {
            // In production code, this function should be associated
            // with a matrix object with associated functions.
            var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
                s = Math.sin(angle * Math.PI / 180.0),
                c = Math.cos(angle * Math.PI / 180.0),
                oneMinusC = 1.0 - c,

                // We can't calculate this until we have normalized
                // the axis vector of rotation.
                x2, // "2" for "squared."
                y2,
                z2,
                xy,
                yz,
                xz,
                xs,
                ys,
                zs;

            // Normalize the axis vector of rotation.
            x /= axisLength;
            y /= axisLength;
            z /= axisLength;

            // *Now* we can calculate the other terms.
            x2 = x * x;
            y2 = y * y;
            z2 = z * z;
            xy = x * y;
            yz = y * z;
            xz = x * z;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            // GL expects its matrices in column major order.
            return [
                (x2 * oneMinusC) + c,
                (xy * oneMinusC) + zs,
                (xz * oneMinusC) - ys,
                0.0,

                (xy * oneMinusC) - zs,
                (y2 * oneMinusC) + c,
                (yz * oneMinusC) + xs,
                0.0,

                (xz * oneMinusC) + ys,
                (yz * oneMinusC) - xs,
                (z2 * oneMinusC) + c,
                0.0,

                0.0,
                0.0,
                0.0,
                1.0
            ];
        },

        /*
         * This is another function that really should reside in a
         * separate library.  But, because the creation of that library
         * is part of the student course work, we leave it here for
         * later refactoring and adaptation by students.
         */
        getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
            var width = right - left,
                height = top - bottom,
                depth = zFar - zNear;

            return [
                2.0 / width,
                0.0,
                0.0,
                0.0,

                0.0,
                2.0 / height,
                0.0,
                0.0,

                0.0,
                0.0,
                -2.0 / depth,
                0.0,

                -(right + left) / width,
                -(top + bottom) / height,
                -(zFar + zNear) / depth,
                1.0
            ];
        };

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.  Note how each object may come with a
    // rotation axis now.
    objectsToDraw = [
        // We move our original triangles a bit to accommodate a new addition
        // to the scene (yes, a translation will also do the trick, if it
        // where implemented in this program).
        {
            vertices: [].concat(
                [ -2.0, 0.0, 0.0 ],
                [ -1.5, 0.0, -0.75 ],
                [ -2.0, 0.5, 0.0 ]
            ),
            colors: [].concat(
                [ 1.0, 0.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 0.0, 1.0 ]
            ),
            mode: gl.TRIANGLES
        },

        {
            color: { r: 0.0, g: 1.0, b: 0 },
            vertices: [].concat(
                [ -1.75, 0.0, -0.5 ],
                [ -1.25, 0.0, -0.5 ],
                [ -1.75, 0.5, -0.5 ]
            ),
            mode: gl.TRIANGLES
        },

        {
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: [].concat(
                [ -2.25, 0.0, 0.5 ],
                [ -1.75, 0.0, 0.5 ],
                [ -2.25, 0.5, 0.5 ]
            ),
            mode: gl.TRIANGLES
        },

        {
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: [].concat(
                [ -1.0, -1.0, 0.75 ],
                [ -1.0, -0.1, -1.0 ],
                [ -0.1, -0.1, -1.0 ],
                [ -0.1, -1.0, 0.75 ]
            ),
            mode: gl.LINE_LOOP,
            axis: { x: 1.0, y: 0.0, z: 1.0 }
        },

        {
            color: { r: 0.0, g: 0.5, b: 0.0 },
            vertices: Shapes.toRawLineArray(Shapes.icosahedron()),
            mode: gl.LINES,
            axis: { x: 0.0, y: 1.0, z: 1.0 }
        },

        // Something that would have been clipped before.
        {
            vertices: [].concat(
                [ 3.0, 1.5, 0.0 ],
                [ 2.0, -1.5, 0.0 ],
                [ 4.0, -1.5, 0.0 ]
            ),
            colors: [].concat(
                [ 1.0, 0.5, 0.0 ],
                [ 0.0, 0.0, 0.5 ],
                [ 0.5, 0.75, 0.5 ]
            ),
            mode: gl.TRIANGLES,
            axis: { x: -0.5, y: 1.0, z: 0.0 }
        },

        // Show off the new shape.
        {
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            // 12 triangles in all.
            colors: [].concat(
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ]
            ),
            mode: gl.TRIANGLES,
            axis: { x: 1.0, y: 1.0, z: 1.0 }
        }
    ];

    // Pass the vertices to WebGL.
    for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
        objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].vertices);

        if (!objectsToDraw[i].colors) {
            // If we have a single color, we expand that into an array
            // of the same color over and over.
            objectsToDraw[i].colors = [];
            for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                    j < maxj; j += 1) {
                objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                    objectsToDraw[i].color.r,
                    objectsToDraw[i].color.g,
                    objectsToDraw[i].color.b
                );
            }
        }
        objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].colors);
    }

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);

    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    /*
     * Displays an individual object, including a transformation that now varies
     * for each object drawn.
     */
    drawObject = function (object) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        // Set up the model-view matrix, if an axis is included.  If not, we
        // specify the identity matrix.
        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(object.axis ?
                getRotationMatrix(currentRotation, object.axis.x, object.axis.y, object.axis.z) :
                [1, 0, 0, 0, // N.B. In a full-fledged matrix library, the identity
                 0, 1, 0, 0, //      matrix should be available as a function.
                 0, 0, 1, 0,
                 0, 0, 0, 1]
            ));

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Because our canvas element will not change size (in this program),
    // we can set up the projection matrix once, and leave it at that.
    // Note how this finally allows us to "see" a greater coordinate range.
    // We keep the vertical range fixed, but change the horizontal range
    // according to the aspect ratio of the canvas.  We can also expand
    // the z range now.
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(getOrthoMatrix(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10
    )));

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });

}(document.getElementById("matrices-webgl")));
