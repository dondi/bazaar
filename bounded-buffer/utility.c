/**
 * Utility implementation.
 */
#include "utility.h"

#include <stdlib.h>
#include <unistd.h>

int randomwait(int bound) {
    int wait = rand() % bound;
    sleep(wait);
    return wait;
}
