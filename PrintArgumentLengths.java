public class PrintArgumentLengths {
    public static void main(String[] args) {
        System.out.println("You typed in " + args.length + " arguments.");
        System.out.println("That is an " + (args.length % 2 == 0 ? "even" : "odd") + " number.");
    }
}
