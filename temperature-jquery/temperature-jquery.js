/* This is a typical "web page setup" routine using jQuery. */
$(function () {

    // Define a function that we will need.
    var report = function (celsius, fahrenheit) {
        $("#result").html(celsius + "\xb0C = " + fahrenheit + "\xb0F");
    };

    // Set up event handlers.
    $("#f_to_c").click(function () {
        var f = $("#temperature").val();
        report((f - 32) / 1.8, f);
    });

    $("#c_to_f").click(function () {
        var c = $("#temperature").val();
        report(c, 1.8 * c + 32);
    });

});
/* Here's some fire for you:
[Verse 1 - Childish Gambino:]
Watching haters wonder why Gambino got the game locked
Half-Thai thickie, all she wanna do is Bangkok
Got her hair done, French braids, now she A$AP
Bino so insensitive, she asking, "Why you say that?!"
I'm chillin', real nigga feeling
Rich kid, asshole: paint me as a villain
Still spitting that cash flow: DJ Khaled
I got a penthouse on both coasts, pH balance
Real nigga, I rep those, why though? Cause I said so
Hip deep in the Pepto, I got five on her like Ben Folds
I got more tail than that PetCo, you faker than some Sweet'N Low
Yeah, you got some silverware, but really are you eating though?
Are you eating though? Nigga, are you eating though?
Breakfast, lunch and dinner's for beginners, you ain't even know
Never catching cases, why they faces look so e-m-o?
Watch a hater hate me, wanna play me like a piano
My architect know Japanese, yo' girl, she chalky knees
No hands like soccer teams and y'all fuck boys like Socrates
You niggas ain't copping these, niggas ain't looking like me
Nah, I ain't checking I.D. but I bounce 'em with no problem
Tell 'em, Problem (Problem!)

[Bridge - Childish Gambino:]
I'm winnin', yeah, yeah, I'm winnin' [x3]
Rich kid, asshole, paint me as a villain

[Hook - Problem:]
Don't be mad cause I'm doing me better than you doing you [x3]
Better than you doing you, fuck it, what you gon' do?

[Verse 2 - Childish Gambino:]
Different color, my passport, Instagram my stack load
Hashtag my day wear and your girl drink my day care.
And I'm born rich, life ain't fair (silver spoon coon, ho)
Ain't nobody sicker and my Fisker "vroom, vroom, " ho
Ain't nobody
Fiskers don't make noise when they start up, just so you know
Top of the Hold 'em totem, rich forever, a million was not the quota
My father owned half of MoMA and did it with no diploma
Year off, got no rules, tripping off of them toadstools
More green than my Whole Foods and I'm too fly, Jeff Goldblum
Got a glass house in the Palisades, that a-k-a
White hood, white hood, (okay-kay-kay)
Furniture custom, you shop at IKEA
So Maserati, you whipping a Kia
Spending this money, it's longer than Nia
Live like a Coppola, me and Sofia
Waking up broke, man, wouldn't wanna be ya
Friends with the dope man, help a nigga re-up
Bring a girlfriend, man, trouble when I see her
"Err-err-err-err": onomatopoeia, oh, I got my cool on! (tailormade)
I'm winning so they had to dump the Gatorade
And I don't give a fuck about my family name

[Hook]
*/