/**
 * Synchronization elements for a bounded buffer solution.
 */
#ifndef BOUNDED_BUFFER_SYNCHRONIZATION
#define BOUNDED_BUFFER_SYNCHRONIZATION

#include <pthread.h>
#include <semaphore.h>

pthread_mutex_t mutex;
sem_t *empty, *full;
#ifndef __APPLE_CC__
sem_t emptyHolder, fullHolder;
#endif

/**
 * Initializes synchronization primitives.
 */
void initSync(void);

#endif
