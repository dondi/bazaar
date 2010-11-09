$(function () {
    // Initialize the array of strings to type.
    var stringLibrary = [
        "the quick brown fox jumps over the lazy dog",
        "seventy six trombones led the big parade",
        "four score and seven years ago",
        "ask not what your country can do for you",
        "we the people of the united states",
        "when in the course of human events",
        "mary mary quite contrary, how does your garden grow",
        "to be or not to be, that is the question",
        "friends, romans, countrymen, lend me your ears",
        "it was the best of times, it was the worst of times",
        "criminals are a superstitious and cowardly lot",
        "romeo, romeo, wherefore art thou romeo",
        "he has eaten me out of house and home",
        "play it once, sam, for old times sake",
        "no, mr. bond, i expect you to die",
        "nobody thinks in terms of human beings",
        "everybody ought to go careful in a city like this",
        "i have the advantage of knowing your habits",
        "in his eyes she eclipses and predominates",
        "science is the belief in the ignorance of experts"
    ],

    // Experimental keyboard setup function: we will call this when the
    // user requests for the experimental keyboard.
    setupExperimentalKeyboard = function () {
        /**
         * Created by: Brian Handy & Andrew Garrard
         */
        var letterSizes = {
                "a": 8.167,
                "b": 1.492,
                "c": 2.782,
                "d": 4.253,
                "e": 12.702,
                "f": 2.228,
                "g": 2.015,
                "h": 6.094,
                "i": 6.966,
                "j": 0.153,
                "k": 0.772,
                "l": 4.025,
                "m": 2.406,
                "n": 6.749,
                "o": 7.507,
                "p": 1.929,
                "q": 0.095,
                "r": 5.987,
                "s": 6.327,
                "t": 9.056,
                "u": 2.758,
                "v": 0.978,
                "w": 2.360,
                "x": 0.150,
                "y": 1.974,
                "z": 0.074
            },

            enhancedKeys = true,
            minWidth = 57,
            minHeight = 39,
            normalWidth = 59,
            normalHeight = 41,
            maxWidth = 70,
            maxHeight = 52,
            maxUsage = letterSizes.e,
            spanMargin = 1,
            spanPadding = 18,

            // Function for making keys the right size.
            changeSize = function (id, size) {
                // Change the key size.
                if (enhancedKeys) {
                    var diffWidth = (maxWidth - minWidth) * (size / maxUsage),
                        diffHeight = (maxHeight - minHeight) * (size / maxUsage),
                        marginWidth = Math.floor(spanMargin - (diffWidth / 2)),
                        marginHeight = Math.floor(spanMargin - (diffHeight / 2));
    
                    $(id).css({
                        "width" : (minWidth + diffWidth) + "px",
                        "height" : (minHeight + diffHeight) + "px"
                    })
    
                    // Change the margin size to keep the hit area centered.
                    .css("margin-top", marginHeight + "px")
                    .css("margin-bottom", marginHeight + "px")
                    .css("margin-left", marginWidth + "px")
                    .css("margin-right", marginWidth + "px")
                    
                    // Adjust the padding to compensate for this shift.
                    .css("padding-top", (spanPadding - marginHeight) + "px");
                } else {
                    // Or reset key size
                    $(id).css({
                        "width" : normalWidth + "px",
                        "height" : normalHeight + "px"
                    });
                }
            };

        $.each(letterSizes, function (index, value) {
            changeSize("#" + index + "-key-hit", value);
        });
    },
    
    // State variables ("model").
    ticking,
    tick_start,
    targetText,

    // The function for "advancing" the character one at a time.
    advanceText = function () {
        var typedText = $('.typed-text'),
            currentText = $('.current-text'),
            textToType = $('.text-to-type'),
            textToTypeVal = textToType.text();
        
        // Append the current text to the typed area.
        typedText.text(typedText.text() + currentText.text());
        
        // Set the new current text.
        currentText.text(textToTypeVal.charAt(0));
        
        // Remove character from area to type.
        textToType.text((textToTypeVal.slice(1)));
    },

    // Timing run setup function: reset things so that the web page is
    // ready to accept "keypresses," track progress, and time the whole
    // thing.
    startTimingSession = function () {
        // Choose a string at random and stick it in text-to-type; blank
        // out the other spans.
        var targetIndex = Math.floor((Math.random() * stringLibrary.length));
        targetText = stringLibrary[targetIndex];
        $("#message").text(targetIndex);
        $(".typed-text").text("");
        $(".current-text").text("");
        $(".text-to-type").text(targetText);
        
        // Hide the timing result element.
        $("#timing-result").fadeOut();
        
        // We don't start the timer until the user hits a key.
        ticking = false;

        // All done; move to the first character.
        advanceText();
    },
    
    // The function for ending the timing session.
    endTimingSession = function () {
        var tick_end = new Date();

        $("#timing-result").text((tick_end - tick_start) / 1000)
            .fadeIn();
    },

    // Visual feedback function for errors.
    flashError = function () {
        $("#content-to-type").removeClass("content-normal")
            .addClass("content-error");
        
        // Restore the white background after 100 milliseconds.
        setTimeout(function () {
            $("#content-to-type").removeClass("content-error")
                .addClass("content-normal");
        }, 200);
    };

    // Initialize all keys as inactive.
    $("div.key").addClass("inactive");

    // Set up the event handlers.
    $("div.key span").click(function (event) {
        // If this is the first key since starting, then we record
        // the start time.
        if (!ticking) {
            tick_start = new Date();
            ticking = true;
        }
        
        // Is the hit "key" correct?
        var currentText = $(".current-text").text();
        if (($(event.currentTarget).text().toLowerCase() === currentText) ||
                ((event.currentTarget.id === "space-bar-hit") &&
                (currentText === " "))) {
            advanceText();
            
            // Are we done?
            if ($(".typed-text").text() === targetText) {
                endTimingSession();
            }
        } else {
            flashError();
        }
    });

    $("#start-button").click(startTimingSession);

    $("#keyboard-checkbox").click(function () {
        setupExperimentalKeyboard();
        $("#keyboard-checkbox").attr("disabled", "true");
        
        // Restart things after a keyboard change.
        startTimingSession();
    });

    // Finish off with a timing session.
    startTimingSession();

    // (Experimental) Eliminate scrolling on iOS browsers.
    document.body.ontouchmove = function (event) {
        event.preventDefault();
    };
    document.body.ontouchstart = document.body.ontouchmove;

});
