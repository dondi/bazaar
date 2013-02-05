/**
 * This program demonstrates invocation of the sysinfo
 * system call (116) using the syscall function.  Some
 * of its output is then displayed.
 */
#include <linux/kernel.h>
#include <linux/types.h>
#include <linux/unistd.h>

// For convenience, we just use the stdio functions to display
// the output for this one.
#include <stdio.h>

int main(int argc, char *argv[]) {
  // The sysinfo structure is in kernel.h.
  struct sysinfo result;

  // We keep the hardcoded system call numbers to illustrate
  // that they are still just that: numbers.
  syscall(116, &result);

  // Display some of the returned RAM information.
  printf("Total RAM: %ld, free RAM: %ld\n", result.totalram, result.freeram);
}
