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
            },

            enhancedKeys = true,
            minWidth = 57,
            minHeight = 39,
            normalWidth = 59,
            normalHeight = 41,
            maxWidth = 70,
            maxHeight = 52,
            maxUsage = letterSizes["e"],
            spanMargin = 1,
            spanPadding = 18;

        // Function for making keys the right size.
        var changeSize = function (id, size) {
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
    };
    
    // State variables ("model").
    var ticking,
        hr_start,
        min_start,
        sec_start,
        hr_end,
        min_start,
        sec_start,
        targetText;

    // Timing run setup function: reset things so that the web page is
    // ready to accept "keypresses," track progress, and time the whole
    // thing.
    var startTimingSession = function () {
        // Choose a string at random and stick it in text-to-type; blank
        // out the other spans.
        targetText = stringLibrary[Math.floor((Math.random() *
            stringLibrary.length))];
        $(".typed-text").text("");
        $(".current-text").text("");
        $(".text-to-type").text(targetText);
        
        // Hide the timing result element.
        $("#timing-result").fadeOut();
        
        // We don't start the timer until the user hits a key.
        ticking = false;

        // All done; move to the first character.
        advanceText();
    };

    // The function for "advancing" the character one at a time.
    var advanceText = function () {
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
    };
    
    // The function for ending the timing session.
    var endTimingSession = function () {
        var end = new Date();
        hr_end = end.getHours();
        min_end = end.getMinutes();
        sec_end = end.getSeconds();

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
        $("#timing-result").text(minute + ":" + sec)
            .fadeIn();
    };

    // Visual feedback function for errors.
    var flashError = function () {
        $("#content-to-type").removeClass("content-normal")
            .addClass("content-error");
        
        // Restore the white background after 100 milliseconds.
        setTimeout(function () {
            $("#content-to-type").removeClass("content-error")
                .addClass("content-normal");
        }, 100);
    };

    // Set up the event handlers.
    $("div.key span").mousedown(function (event) {
        $(event.currentTarget.parentNode).removeClass("inactive")
            .addClass("active");
        
        // If this is the first key since starting, then we record
        // the start time.
        if (!ticking) {
            var start = new Date();
            hr_start = start.getHours();
            min_start = start.getMinutes();
            sec_start = start.getSeconds();
            ticking = true;
        }
    })

    .mouseup(function (event) {
        $(event.currentTarget.parentNode).removeClass("active")
            .addClass("inactive");
        
        // Is the hit "key" correct?
        if (($(event.currentTarget).text().toLowerCase() ===
                $(".current-text").text()) ||
                ((event.currentTarget.id === "space-bar-hit") &&
                $(".current-text").text() === " ")) {
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
        $("#keyboard-checkbox-label")
            .html($("#keyboard-checkbox-label").html() +
                " (reload the page to get the standard keyboard back)");
        
        // Restart things after a keyboard change.
        startTimingSession();
    });

    // Finish off with a timing session.
    startTimingSession();

});
