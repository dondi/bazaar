/**
 * hello-opengl.c displays an icosahedron using bare-bones, shader-based OpenGL.
 */
#include <stdio.h>
#include <stdlib.h>

#ifdef __APPLE_CC__
#include <GLUT/glut.h>
#else
#include <GL/glut.h>
#endif

/**
 * Identifiers for individual shaders and the overall shader program.
 */
static GLuint vertexShader;
static GLuint fragmentShader;
static GLuint program;

/**
 * The buffer that OpenGL will use for grabbing vertices.
 */
static GLfloat points[120][3];

/*
 * The geometric model of the program --- essentially an ad hoc mesh.  Again, only
 * its simplicity lets us get away with making everything global, and barely so.
 */
#define X 0.525731112119133606
#define Z 0.850650808352039932

static GLfloat vdata[12][3] = {
    { -X, 0.0, Z },
    { X, 0.0, Z },
    { -X, 0.0, -Z },
    { X, 0.0, -Z },
    { 0.0, Z, X },
    { 0.0, Z, -X },
    { 0.0, -Z, X },
    { 0.0, -Z, -X },
    { Z, X, 0.0 },
    { -Z, X, 0.0 },
    { Z, -X, 0.0 },
    { -Z, -X, 0.0 }
};

static GLuint tindices[20][3] = {
    { 1, 4, 0 },
    { 4, 9, 0 },
    { 4, 5, 9 },
    { 8, 5, 4 },
    { 1, 8, 4 },
    { 1, 10, 8 },
    { 10, 3, 8 },
    { 8, 3, 5 },
    { 3, 2, 5 },
    { 3, 7, 2 },
    { 3, 10, 7 },
    { 10, 6, 7 },
    { 6, 11, 7 },
    { 6, 0, 11 },
    { 6, 1, 0 },
    { 10, 1, 6 },
    { 11, 0, 9 },
    { 2, 11, 9 },
    { 5, 2, 9 },
    { 11, 2, 7 }
};

/**
 * The vertex shader source code --- hardcoded for educational purposes only!
 */
const GLchar* vertexShaderSource[] = {
    "attribute vec4 vPosition;"
    "void main() {"
    "   gl_Position = vPosition;"
    "}"
};

/**
 * The fragment shader source code --- ditto about hardcoding.
 */
const GLchar* fragmentShaderSource[] = {
    "void main() {"
    "  gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0);"
    "}"
};

/**
 * Utility function for displaying shader log messages.
 */
void displayShaderLog(char *prefix, GLuint shader) {
    GLint length;
    GLchar *log;

    glGetShaderiv(shader, GL_INFO_LOG_LENGTH, &length);
    log = (GLchar *)malloc(length);
    glGetShaderInfoLog(shader, length, &length, log);
    printf("%s: %s\n", prefix, log);
    free(log);
}

/**
 * Utility function for displaying program log messages.
 */
void displayProgramLog(char *prefix, GLuint program) {
    GLint length;
    GLchar *log;

    glGetProgramiv(program, GL_INFO_LOG_LENGTH, &length);
    log = (GLchar *)malloc(length);
    glGetProgramInfoLog(program, length, &length, log);
    printf("%s: %s\n", prefix, log);
    free(log);
}

/**
 * Initializes the shaders: creates the required OpenGL objects,
 * then compiles and links the code.
 */
void initShaders() {
    vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, 1, vertexShaderSource, NULL);
    glCompileShader(vertexShader);

    GLint compiled;
    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &compiled);
    if (!compiled) {
        displayShaderLog("Compilation log", vertexShader);
    }

    fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, fragmentShaderSource, NULL);
    glCompileShader(fragmentShader);

    glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &compiled);
    if (!compiled) {
        displayShaderLog("Compilation log", fragmentShader);
    }

    program = glCreateProgram();
    glAttachShader(program, vertexShader);
    glAttachShader(program, fragmentShader);
    glLinkProgram(program);

    GLint linked;
    glGetProgramiv(program, GL_LINK_STATUS, &linked);
    if (linked) {
        glUseProgram(program);
    } else {
        displayProgramLog("Link log", program);
    }
}

/**
 * Initialization entry point; calls initShaders() for shader setup.
 */
void init(void) {
    // White background.
    glClearColor(1.0, 1.0, 1.0, 0.0);

    // Vertex array setup.
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, points);
    glEnableVertexAttribArray(0);

    // Now for the shaders.
    initShaders();
}

/**
 * Helper function for copying one point into another.
 */
void copyPoint(GLfloat *dest, GLfloat *src) {
    dest[0] = src[0];
    dest[1] = src[1];
    dest[2] = src[2];
}

/**
 * The GLUT display function.
 */
void display(void) {
    glClear(GL_COLOR_BUFFER_BIT);

    // Iterate through each triangle, defining each line segment.
    int i, j;
    for (i = 0, j = 0; i < 20; i++) {
        int segment;
        for (segment = 0; segment < 3; segment++) {
            copyPoint(points[j], vdata[tindices[i][segment]]);
            j++;
            copyPoint(points[j], vdata[tindices[i][(segment + 1) % 3]]);
            j++;
        }
    }

    // Send the vertices over; the shaders do the rest.
    glDrawArrays(GL_LINES, 0, 120);
    glFlush();
}

/**
 * The main program.
 */
int main(int argc, char **argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_RGB);
    glutInitWindowSize(256, 256);
    glutInitWindowPosition(50, 50);
    glutCreateWindow("Hello OpenGL");
    //File changed!

    // Setup.
    init();

    // Controller setup.
    glutDisplayFunc(display);

    // Go!
    glutMainLoop();
    return 0;
}
