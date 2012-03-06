/**
 * This program uses the POSIX thread API to calculate multiple
 * summations from 1 to n.
 */
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

/**
 * Shared total which the sums will update.
 */
static int sumOfSums = 0;

/**
 * Forward declaration of the summation function
 * (i.e., what gets threaded).
 */
void *sumRun(void *maxStr);

int main(int argc, char *argv[]) {
    if (argc > 1) {
        pthread_t *threads = malloc(sizeof(pthread_t) * (argc - 1));

        pthread_attr_t attr;
        pthread_attr_init(&attr);

        int i;
        for (i = 1; i < argc; i++) {
            pthread_create(&threads[i - 1], &attr, sumRun, argv[i]);
        }

        for (i = 1; i < argc; i++) {
            pthread_join(threads[i - 1], NULL);
        }

        printf("\nFinal sum of sums = %d\n", sumOfSums);
    } else {
        printf("Usage: Sum <int>*\n");
    }
}

void *sumRun(void *maxStr) {
    int max = atoi(maxStr);
    printf("Starting summation to %d...\n", max);
    int sum = 0;
    int i;
    for (i = 0; i <= max; i++) {
        printf(".%d.", i);
        sum +=i;

        // Artificial delay.
        usleep(20000);
    }

    printf("Summation to %d = %d\n", max, sum);

    // Increment the sum of sums.
    sumOfSums += sum;
}
