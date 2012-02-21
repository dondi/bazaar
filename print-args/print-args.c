#include <stdio.h>

/**
 * This program just spits the arguments that it got.
 */
int main(int argc, char *argv[]) {
    int i;
    for (i = 0; i < argc; i++) {
        printf("argument %d: %s\n", i, argv[i]);
    }
}
