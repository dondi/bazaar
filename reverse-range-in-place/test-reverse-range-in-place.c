#include <assert.h>
#include <string.h>

// This inline forward declaration ensures that the compiler knows about
// reverse_range_in_place regardless of how this file is used.
void reverse_range_in_place(char* string, int start_index, int end_index);

#define MAX_TEST_STRING_LENGTH 20

void test_reverse_range_in_place() {
  char* original_string = "Reverse my insides!";
  char test_string[MAX_TEST_STRING_LENGTH];
  strncpy(test_string, original_string, MAX_TEST_STRING_LENGTH);

  reverse_range_in_place(test_string, 9, 5);
  assert(strncmp(original_string, test_string, MAX_TEST_STRING_LENGTH) == 0);

  reverse_range_in_place(test_string, 100, strlen(original_string) - 1);
  assert(strncmp(original_string, test_string, MAX_TEST_STRING_LENGTH) == 0);

  reverse_range_in_place(test_string, 90, -100);
  assert(strncmp(original_string, test_string, MAX_TEST_STRING_LENGTH) == 0);

  reverse_range_in_place(test_string, -9, -5);
  assert(strncmp(original_string, test_string, MAX_TEST_STRING_LENGTH) == 0);

  reverse_range_in_place(test_string, 2, 8);
  assert(strncmp("Rem esrevy insides!", test_string, MAX_TEST_STRING_LENGTH) == 0);

  reverse_range_in_place(test_string, -10, 4);
  assert(strncmp("e meRsrevy insides!", test_string, MAX_TEST_STRING_LENGTH) == 0);

  reverse_range_in_place(test_string, 9, 100);
  assert(strncmp("e meRsrev!sedisni y", test_string, MAX_TEST_STRING_LENGTH) == 0);

  reverse_range_in_place(test_string, -100, 100);
  assert(strncmp("y insides!versRem e", test_string, MAX_TEST_STRING_LENGTH) == 0);
}
