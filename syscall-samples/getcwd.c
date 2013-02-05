/**
 * This program demonstrates invocation of the getcwd
 * system call (183) using the syscall function.
 */
#include <linux/types.h>
#include <linux/unistd.h>
#include <string.h>

int main(int argc, char *argv[]) {
  char result[1024]; // Lots of room!

  // We keep the hardcoded system call numbers to illustrate
  // that they are still just that: numbers.
  syscall(183, result);

  // Append a newline for better looks.
  int originalLength = strlen(result);
  result[originalLength] = '\n';

  // Must re-terminate the string, of course.
  result[originalLength + 1] = '\0';

  syscall(4, 0, result, strlen(result));
}
