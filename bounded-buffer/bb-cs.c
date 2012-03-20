/**
 * Implementation (and privates) for critical-section functions.
 */
#include "bb-cs.h"
#include "buffer.h"

#include <stdio.h>
#include <string.h>

static int in = 0;
static int out = 0;
static buffer_item buffer[BUFFER_SIZE];

void display_buffer(const char *preface, int in, int out) {
    char display[BUFFER_SIZE * (ITEM_WIDTH + 1) + 64];
    char buffer_content[ITEM_WIDTH + 1];
    sprintf(display, "(%s) in: %d out: %d [ ", preface, in, out);
    int i;
    for (i = 0; i < BUFFER_SIZE; i++) {
        sprintf(buffer_content, "%d", buffer[i]);

        if (i == in) {
            strcat(display, "+>");
        }
        strcat(display, buffer_content);

        if (i == out) {
            strcat(display, "->");
        }
        strcat(display, " ");
    }
    strcat(display, "]\n");
    printf("%s", display);
}

int insert_item(buffer_item item) {
    // Critical section sanity check.
    if (((in + 1) % BUFFER_SIZE) == out) {
        printf("*** CRITICAL SECTION VIOLATION ***\n");
        return -1;
    }

    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;
    display_buffer("insert", in, out);
    return 0;
}

int remove_item(buffer_item *item) {
    // Critical section sanity check.
    if (in == out) {
        printf("*** CRITICAL SECTION VIOLATION ***\n");
        return -1;
    }

    *item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    display_buffer("remove", in, out);
    return 0;
}
