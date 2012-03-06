import java.util.ArrayList;
import java.util.List;

/**
 * Sum performs a number of summations on multiple threads.
 */
public class Sum implements Runnable {
    /**
     * Shared total which the sums will update.
     */
    private static int SumOfSums = 0;

    /**
     * Initializes a Sum with the ending value.
     */
    public Sum(int max) {
        this.max = max;
        this.sum = 0;
    }

    /**
     * @see java.lang.Runnable.run()
     */
    public void run() {
        System.out.println("Starting summation to " + max + "...");
        sum = 0;
        for (int i = 0; i <= max; i++) {
            System.out.print("." + i + ".");
            sum += i;

            // Artificial delay.
            try {
                Thread.sleep(20);
            } catch(InterruptedException iexc) {
            }
        }
        System.out.println("Summation to " + max + " = " + sum);

        // Increment the sum of sums.
        synchronized(Sum.class) {
            SumOfSums += sum;
        }
    }

    private int max;
    private int sum;

    /**
     * Test driver for Sum.
     */
    public static void main(String[] args) {
        if (args.length > 0) {
            List<Thread> threads = new ArrayList<Thread>(args.length);
            for (String s: args) {
                threads.add(new Thread(new Sum(Integer.parseInt(s))));
            }

            for (Thread t: threads) {
                t.start();
            }

            for (Thread t: threads) {
                try {
                    t.join();
                } catch(InterruptedException iexc) {
                }
            }

            System.out.println("\nFinal sum of sums = " + SumOfSums);
        } else {
            System.out.println("Usage: Sum <int>*");
        }
    }
}
