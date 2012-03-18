/**
 * Synchronization primitive implementation.
 */
#include "bb-sync.h"

#include "buffer.h"
#ifdef __APPLE_CC__
#include <fcntl.h>
#endif
#include <pthread.h>
#include <semaphore.h>

void initSync(void) {
    pthread_mutex_init(&mutex, NULL);
#ifndef __APPLE_CC__
    empty = &emptyHolder;
    full = &fullHolder;
    sem_init(empty, 0, BUFFER_SIZE - 1);
    sem_init(full, 0, 0);
#else
    sem_unlink("empty");
    sem_unlink("full");
    empty = sem_open("empty", O_CREAT, S_IRWXU, BUFFER_SIZE - 1);
    full = sem_open("full", O_CREAT, S_IRWXU, 0);
#endif
}
