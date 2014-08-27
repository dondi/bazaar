import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * Sum performs a number of summations on multiple threads.
 */
public class Sum {
    public static void main(String[] args) throws InterruptedException {
        Stream<String> strings = Stream.of(args);
        if (args.length > 0) {
            int totalSum = strings.mapToInt(Integer::parseInt) // We want to do operations on integers, not strings
                    .peek(num -> System.out.println("Starting summation to " + num + "..."))
                    .parallel() // We want everything to be done in parallel
                    .map(max -> IntStream.rangeClosed(1, max).sum()) // Perform our summation function on all numbers
                    .sequential()
                    .peek(sum -> System.out.println("Summation = " + sum))
                    .sum(); // Find the total sum and store it in the original int.
            System.out.println("\nFinal sum of sums = " + totalSum);

        }
    }
}

