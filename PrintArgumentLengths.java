public class PrintArgumentLengths {
    public static void main(String[] args) {
        System.out.println("You typed " + args.length + " arguments with that command.");

        int totalOdd = 0;
        for (String arg: args) {
            if (arg.length() % 2 != 0) {
                totalOdd += 1;
            }
        }
    }
}
