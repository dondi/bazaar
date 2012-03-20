/**
 * Consumer implementation.
 */
#include "bb-cs.h"
#include "bb-sync.h"
#include "buffer.h"
#include "utility.h"

#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

void consume(int consumeBound) {
    buffer_item item;
    while (1) {
        sem_wait(full);
        pthread_mutex_lock(&mutex);
        if (remove_item(&item)) {
            fprintf(stderr, "***** Remove failed!\n");
            pthread_mutex_unlock(&mutex);
            return;
        }
        pthread_mutex_unlock(&mutex);
        sem_post(empty);

        // Simulate a non-trivial consume.
        randomwait(consumeBound);
        printf("Consumed %d.\n", item);
    }
}
