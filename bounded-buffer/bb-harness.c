/**
 * A test harness for running solutions to the bounded buffer problem.
 */
#include <pthread.h>
#include <stdio.h>

#include "bb-sync.h"

/* The test harness defines the expected interfaces. */
void *produce(int produceBound);
void *consume(int consumeBound);

/**
 * Thread runner for the producer.
 */
void *prodRunner(void *arg) {
    printf("Starting producer\n");
    produce((int)arg);
    printf("Ending producer\n");
    pthread_exit(NULL);
}

/**
 * Thread runner for the consumer.
 */
void *consRunner(void *arg) {
    printf("Starting consumer\n");
    consume((int)arg);
    printf("Ending consumer\n");
    pthread_exit(NULL);
}

/**
 * Overall driver program.
 */
int main(int argc, char** argv) {
    printf("Starting bounded buffer test harness...\n");

    /* Initialize the synchronization primitives. */
    initSync();

    /* Start the threads. */
    pthread_t prod, cons;
    pthread_create(&prod, NULL, prodRunner, (void *)2);
    pthread_create(&cons, NULL, consRunner, (void *)3);

    /* Not really needed, since we'll pretty much run forever... */
    pthread_join(prod, NULL);
    pthread_join(cons, NULL);

    /* We won't really get here, but to avoid any warnings... */
    return 0;
}
