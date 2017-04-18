/*
 * A set of utility functions that are common across many types of
 * WebGL programs.
 */
(() => {
    /*
     * Returns the WebGL rendering context.
     */
    let getGL = (canvas) => canvas.getContext("webgl");

    /*
     * Initializes a vertex buffer for the given array of vertices.
     */
    let initVertexBuffer = (gl, vertices) => {
        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    };

    /*
     * Sets up a GLSL shader of the given type.
     */
    let compileShader = (gl, shaderSource, shaderType, compileError) => {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        // Check for an error.
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            if (compileError) {
                compileError(shader);
            }

            return null;
        } else {
            return shader;
        }
    };

    /*
     * Links a GLSL program.
     */
    let linkShaderProgram = (gl, vertexShader, fragmentShader) => {
        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        return shaderProgram;
    };

    /*
     * Initializes a simple shader program, using these parameters:
     *
     * - gl: The WebGL context to use.
     * - vertexShaderSource: The vertex shader source code.
     * - fragmentShaderSource: The fragment shader source code.
     *
     * Optional parameters:
     *
     * - compileError: The function to call if a shader does not compile.
     * - linkError: The function to call if the program does not link.
     */
    let initSimpleShaderProgram = (gl, vertexShaderSource, fragmentShaderSource, compileError, linkError) => {
        let vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER, compileError);
        let fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER, compileError);

        // If either shader is null, we just bail out.  An error would have
        // been reported to the compileError function.
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        // Link the shader program.
        let shaderProgram = linkShaderProgram(gl, vertexShader, fragmentShader);
        if (gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            return shaderProgram;
        }

        // If we get here, something must have gone wrong.
        if (linkError) {
            linkError(shaderProgram);
        }

        return null;
    }

    window.GLSLUtilities = {
        getGL,
        initVertexBuffer,
        compileShader,
        linkShaderProgram,
        initSimpleShaderProgram
    };
})();
