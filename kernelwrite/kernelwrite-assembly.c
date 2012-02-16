/**
 * This program demonstrates assembly-level invocation of
 * the write and pause system calls.
 */
#include <linux/types.h>
#include <stdio.h>
#include <string.h>

/**
 * Invokes the write() system call directly.
 */
ssize_t write(int fd, const void * buf, size_t count) {
  long __res;
  __asm__ volatile ("int $0x80" :
                    "=a" (__res) :
                    "0" (4), // write is system call number 4
                    "b" ((long)(fd)),
                    "c" ((long)(buf)),
                    "d" ((long)(count)));
  return (ssize_t)(__res);
}

/**
 * Invokes the pause() system call directly.
 */
long pause(void) {
  long __res;
  __asm__ volatile ("int $0x80" :
                    "=a" (__res) :
                    "0" (29)); // pause is system call number 29

  return (long)(__res);
}

/**
 * Do NOT try this with "normal" programs!
 */
int main(int argc, char *argv[]) {
  char *message1 = "Written via hardcore system call!\n";
  write(0, message1, strlen(message1));
  char *message2 = "Press Ctrl-C to quit...\n";
  write(0, message2, strlen(message2));
  pause();
}
