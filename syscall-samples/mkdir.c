/**
 * This program demonstrates invocation of the mkdir
 * system call (39) using the syscall function.
 */
#include <linux/types.h>
#include <linux/unistd.h>
#include <string.h>

int main(int argc, char *argv[]) {
  // We demonstrate the use of command-line arguments here.
  // But note the non-existent error handling (all the better
  // to illustrate the error code below).
  int result = syscall(39, argv[1], 0777 /* Note: octal */);

  // A result of -1 means that something went wrong.  Otherwise,
  // check for your new directory!
  if (result == -1) {
    // Don't use this error message in "real" programs. O_o
    char *errorMessage = "Herp derp mkderp\n";
    syscall(4, 2, errorMessage, strlen(errorMessage));
  }
}
