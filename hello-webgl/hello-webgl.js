/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // These variables store 3D model information.
        triangle,
        rectangle,
        triangleBuffer,
        rectangleBuffer,

        // These variables will hold the GLSL shader code.  Hardcoded for
        // illustrative purposes only; they are typically linked to or
        // loaded dynamically.
        vertexShaderSource,
        fragmentShaderSource,

        // More shader variables, this time for the actual shader-related
        // functions or objects.
        setupShader,
        shaderProgram,
        vertexShader,
        fragmentShader,

        // Important state variables.
        vertexPosition,

        // The big "draw scene" function.
        drawScene;

    // Grab the WebGL rendering context.
    gl = canvas.getContext("experimental-webgl");
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up everything that is needed for the scene.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.
    triangle = [].concat(
        [ 0.0, 0.0, 0.0 ],
        [ 0.5, 0.0, 0.5 ],
        [ 0.0, 0.5, 0.0 ]
    );

    rectangle = [].concat(
        [ -1.0, -1.0, 0.75 ],
        [ -1.0, -0.1, -1.0 ],
        [ -0.1, -0.1, -1.0 ],
        [ -0.1, -1.0, 0.75 ]
    );

    // Pass the vertices to WebGL.
    triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle), gl.STATIC_DRAW);

    rectangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectangle), gl.STATIC_DRAW);

    // Load the vertex shader code.
    vertexShaderSource = $("#vertex-shader").text();

    // Load the fragment shader code.
    fragmentShaderSource = $("#fragment-shader").text();

    // We will do this twice, so we put it in a function.
    setupShader = function (gl, shaderSource, shaderType) {
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        // Very cursory error-checking here...
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
            return null;
        } else {
            return shader;
        }
    };

    // OK, so now we REALLY set up the shaders.
    vertexShader = setupShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    fragmentShader = setupShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
        // Another fatal issue.
        alert("Could not initialize shaders...sorry.");
        return;
    }

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        // Another fatal issue.
        alert("Could not link shaders...sorry.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Display the objects.
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, triangle.length / 3);

        gl.bindBuffer(gl.ARRAY_BUFFER, rectangleBuffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINE_LOOP, 0, rectangle.length / 3);

        // All done.
        gl.flush();
    };

    // ...and finally, do the initial display.
    drawScene();

}(document.getElementById("hello-webgl")));
