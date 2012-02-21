#
# Some of the OpenGL-specific logic here was taken from the Makefile of
# Nate Robins's OpenGL tutor programs.
#
CC = gcc
COMPILER = ${CC}

# -g: Additional debugging information, if requested; otherwise, we...
# -O3: Optimize to level 3.
ifdef DEBUG
OPTFLAGS = -g
else
OPTFLAGS = -O3
endif

# -Wall: We want to see *all* warnings.
CFLAGS = -Wall ${OPTFLAGS}

# Libraries vary by platform, so we need some conditionals
# ...but by default, they are:
LDFLAGS = -lGL -lGLU -lglut

UNAME = ${shell uname}

ifeq (${UNAME}, Darwin) # Mac OS X
# OpenGL and GLUT are frameworks in Mac OS X
LDFLAGS = -framework OpenGL -framework GLUT
endif

ifeq (${UNAME}, windows32) # MinGW
LDFLAGS = -lopengl32 -lglu32 -lfreeglut
CFLAGS = -Wall ${OPTFLAGS} -D_STDCALL_SUPPORTED -D_M_IX86 -DGL_GLEXT_PROTOTYPES
endif

hello-opengl: hello-opengl.o
	${COMPILER} ${CFLAGS} -o $@ *.o ${LDFLAGS}

clean:
	rm -rf *.o hello-opengl *.dSYM
