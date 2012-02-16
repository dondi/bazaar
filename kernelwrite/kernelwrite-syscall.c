/**
 * This program demonstrates invocation of the write and pause
 * system calls using the syscall function.
 */
#include <linux/types.h>
#include <linux/unistd.h>
#include <string.h>

/**
 * A tad more familiar, but still pretty low-level...
 */
int main(int argc, char *argv[]) {
  char *message1 = "Written via hardcore system call!\n";
  // We keep the hardcoded system call numbers to illustrate
  // that they are still just that: numbers.
  syscall(4, 0, message1, strlen(message1));
  char *message2 = "Press Ctrl-C to quit...\n";
  syscall(4, 0, message2, strlen(message2));
  syscall(29);
}
