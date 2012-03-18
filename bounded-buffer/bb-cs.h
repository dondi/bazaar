/**
 * Definitions for critical-section functions and shared resources.
 */
#ifndef __BB_CS__
#define __BB_CS__

#include "buffer.h"

/**
 * Adds the given item to the buffer.
 */
int insert_item(buffer_item item);

/**
 * Removes the next item from the buffer.
 */
int remove_item(buffer_item *item);
    
#endif
