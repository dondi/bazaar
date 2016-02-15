/**
 * Public definitions for a bounded buffer.
 */
#ifndef BOUNDED_BUFFER_DEFINITIONS
#define BOUNDED_BUFFER_DEFINITIONS

typedef int buffer_item;

#define BUFFER_SIZE 5
#define ITEM_BOUND  9

/**
 * Number of characters needed to display an item; it's essentially
 * ceil(log10(ITEM_BOUND)).
 */
#define ITEM_WIDTH 1

#endif
