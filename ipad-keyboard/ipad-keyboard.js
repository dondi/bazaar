$(function () {
    // Initialize the array of strings to type.
    var stringLibrary = [
        "the quick brown fox jumps over the lazy dog",
        "seventy six trombones led the big parade",
        "she sells seashells by the seashore"
    ];

    // Initialize all keys as inactive.
    $("div.key").addClass("inactive");

    // Experimental keyboard setup function: we will call this when the
    // user requests for the experimental keyboard.
    var setupExperimentalKeyboard = function () {
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
        };

        var enhancedKeys = true;
        var minWidth = 77;
        var minHeight = 48;
        var normalWidth = 79;
        var normalHeight = 50;
        var maxWidth = 90;
        var maxHeight = 61;
        var maxUsage = letterSizes["e"];
        var spanMargin = 2;

        // Function for making keys the right size.
        var changeSize = function (id, size) {
            // Change the key size
            if (enhancedKeys) {
                $(id).css({
                    "width" : ""
                            + (minWidth + ((maxWidth - minWidth) * (size / maxUsage)))
                            + "px",
                    "height" : ""
                            + (minHeight + ((maxHeight - minHeight) * (size / maxUsage)))
                            + "px"
                });

                // Change the margin size - we attempted to have it so that the keys
                // would not move. It did not work
                $(id).css("margin-top",
                    ""
                    + spanMargin
                    - ((maxHeight - minHeight) * (size / maxUsage))
                    / 2 + "px");
                $(id).css("margin-bottom",
                    ""
                    + spanMargin
                    - ((maxHeight - minHeight) * (size / maxUsage))
                    / 2 + "px");
                $(id).css("margin-left",
                    ""
                    + spanMargin
                    - ((maxWidth - minWidth) * (size / maxUsage))
                    / 2 + "px");
                $(id).css("margin-right",
                    ""
                    + spanMargin
                    - ((maxWidth - minWidth) * (size / maxUsage))
                    / 2 + "px");
            } else {
                // Or reset key size
                $(id).css({
                    "width" : "" + normalWidth + "px",
                    "height" : "" + normalHeight + "px"
                });
            }
        };

        $.each(letterSizes, function (index, value) {
            changeSize("#" + index + "-key", value);
        });
    };
    
    // Timing run setup function: reset things so that the web page is
    // ready to accept "keypresses," track progress, and time the whole
    // thing.
    var startTimingSession = function () {
        // State variables ("model").
        var currentIndex;

        // Choose a string at random and stick in text-to-type.
        $(".text-to-type").html(stringLibrary[Math.floor((Math.random() *
                stringLibrary.length))]);
        
        // Hide the timing result element.
        $("#timing-result").hide();
        
        // Initialize state.
        currentIndex = 0;
        
        // Set up the current text.
        var textToTypeVal = $(".text-to-type").text();
        $(".typed-text").text("");
        $(".current-text").text(textToTypeVal.charAt(0));
        $(".text-to-type").text(textToTypeVal.slice(1));
        
        // Set up event handlers.
    };

    // Set up the event handlers.
    $("div.key span").mousedown(function (event) {
        $(event.currentTarget.parentNode).removeClass("inactive");
        $(event.currentTarget.parentNode).addClass("active");
    })

    .mouseup(function (event) {
        $(event.currentTarget.parentNode).removeClass("active");
        $(event.currentTarget.parentNode).addClass("inactive");
        
        var typedText = $('.typed-text'),
            currentText = $('.current-text');
            textToType = $('.text-to-type'),
            textToTypeVal = textToType.text();
        
        // Append the current text to the typed area.
        typedText.append(currentText.text());
        
        // Set the new current text.
        currentText.text(textToTypeVal.charAt(0));
        
        // Remove character from area to type.
        textToType.text((textToTypeVal.slice(1)));
    });

    $("#keyboard-checkbox").click(function () {
        setupExperimentalKeyboard();
        $("#keyboard-checkbox").attr("disabled", "true");
        $("#keyboard-checkbox-label")
            .html($("#keyboard-checkbox-label").html() +
                " (reload the page to get the standard keyboard back)");
    });

    // Finish off with a timing session.
    startTimingSession();

});

// Set up the timer recording.
var TimerControl = {

    setupEnd : function (endButton) {

        return function () {

            var hr_start,
                min_start,
                sec_start,
                hr_end,
                min_start,
                sec_start,
                running = false;

            var startTimer = function () {
                var start = new Date();
                hr_start = start.getHours();
                min_start = start.getMinutes();
                sec_start = start.getSeconds();
                running = true;
                $("#timing-result").hide();
            };

            var endTimer = function () {
                var end = new Date();
                hr_end = end.getHours();
                min_end = end.getMinutes();
                sec_end = end.getSeconds();
            };

            var calcTime = function () {
                var minute;
                var sec;
                if (hr_end !== hr_start) {
                    minute = 60 - min_start + min_end;
                } else {
                    minute = min_end - min_start;
                }
                if (min_end !== min_start) {
                    sec = 60 - sec_start + sec_end;
                    minute = minute - 1;
                } else {
                    sec = sec_end - sec_start;
                }
                $("#timing-result").html(minute + ":" + sec)
                    .fadeIn();
            };

            $('html').live("click", function () {
                if (!running) {
                    startTimer();
                }
            });

            $(endButton).click(function () {
                $(endButton).css("color", "red");
                running = false;
                endTimer();
                calcTime();
                event.stopPropagation();
            });
        };
    }
};
