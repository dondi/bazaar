/**
 * A sample program that may result in deadlocked threads.
 * Based on SGG sample code in Figure 7.1.
 */
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

/**
 * Utility function for waiting a random amount of time.
 */
int randomwait(int bound) {
    int wait = rand() % bound;
    sleep(wait);
    return wait;
}

/**
 * Mutexes on which to "synchronize" (badly).
 */
pthread_mutex_t first_mutex;
pthread_mutex_t second_mutex;

/**
 * Function run by the first deadlocking thread.
 */
void *do_work_one(void *param) {
    // For better visibility, we'll display a little counter.
    printf("1.0 Starting thread one...\n");
    int work_one_counter = 0;

    while (1) {
        randomwait(2);
        printf("1.1 Work one getting first mutex...\n");
        pthread_mutex_lock(&first_mutex);
        printf("1.2 Work one getting second mutex...\n");
        pthread_mutex_lock(&second_mutex);
        
        printf("1.3 Work one: %d\n", work_one_counter);
        work_one_counter++;
        randomwait(4);
        
        printf("1.4 Work one releasing second mutex...\n");
        pthread_mutex_unlock(&second_mutex);
        printf("1.5 Work one releasing first mutex...\n");
        pthread_mutex_unlock(&first_mutex);
    }
}

/**
 * Function run by the second deadlocking thread.
 */
void *do_work_two(void *param) {
    // For better visibility, we'll display a little counter.
    printf("2.0 Starting thread two...\n");
    int work_two_counter = 0;
    
    while (1) {
        randomwait(5);
        printf("2.1 Work two getting second mutex...\n");
        pthread_mutex_lock(&second_mutex);
        printf("2.2 Work two getting first mutex...\n");
        pthread_mutex_lock(&first_mutex);
        
        printf("2.3 Work two: %d\n", work_two_counter);
        work_two_counter++;
        randomwait(4);
        
        printf("2.4 Work two releasing first mutex...\n");
        pthread_mutex_unlock(&first_mutex);
        printf("2.5 Work two releasing second mutex...\n");
        pthread_mutex_unlock(&second_mutex);
    }
}

/**
 * Starts the potentially deadlocked threads.
 */
int main(int argc, char** argv) {
    printf("Starting deadlock sample...\n");

    /* Initialize the synchronization primitives. */
    pthread_mutex_init(&first_mutex, NULL);
    pthread_mutex_init(&second_mutex, NULL);

    /* Start the threads. */
    pthread_t thread_one;
    pthread_t thread_two;
    
    pthread_create(&thread_one, NULL, do_work_one, NULL);
    pthread_create(&thread_two, NULL, do_work_two, NULL);
    
    /* Not really needed, since we'll pretty much run forever... */
    pthread_join(thread_one, NULL);
    pthread_join(thread_two, NULL);
}
