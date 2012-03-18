/**
 * Synchronization elements for a bounded buffer solution.
 */
#ifndef __BB_SYNC__
#define __BB_SYNC__

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
