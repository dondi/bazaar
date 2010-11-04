$(function () {
    // Initialize all keys as inactive.
    $("div.key span").addClass("inactive");

    // Set up the event handlers.
    $("div.key span").mousedown(function (event) {
        $(event.currentTarget).removeClass("inactive");
        $(event.currentTarget).addClass("active");
    })

    .mouseup(function (event) {
        $(event.currentTarget).removeClass("active");
        $(event.currentTarget).addClass("inactive");
        
        var typedText     = $('.typed-text'),
            textToType    = $('.text-to-type'),
            textToTypeVal = textToType.text();
        
        // Append one character to typed area
        typedText.append(textToTypeVal.charAt(0));
        
        // Remove character from area to type
        textToType.text((textToTypeVal.slice(1)));
    });

});
    
/**
 * Performs the lexical distance analysis from the target string to the user's
 * input, then returns the number of differences (errors) as an integer Derived
 * from Levenshtein Distance article on Wikipedia :D
 */
var errors = function (targetString, userString) {
    var i, j, cost,
    d = [];
    
    if (targetString.length === 0) {
        return userString.length;
    }
    if (userString.length === 0) {
        return targetString.length;
    }
    
    for (i = 0; i <= targetString.length; i += 1) {
        d[i] = [];
        d[i][0] = i;
    }
    
    for (j = 0; j <= userString.length; j += 1) {
        d[0][j] = j;
    }
    
    for (i = 1; i <= targetString.length; i += 1) {
        for (j = 1; j <= userString.length; j += 1) {
            if (targetString.charAt(i - 1) === userString.charAt(j - 1)) {
                cost = 0;
            } else {
                cost = 1;
            }
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
            if (i > 1 && j > 1 && targetString.charAt(i - 1) === userString.charAt(j - 2) && targetString.charAt(i - 2) === userString.charAt(j - 1)) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    return d[targetString.length][userString.length];
};

// Set up the timer recording.
var TimerControl = {

    setupEnd : function(endButton) {

        return function() {

            var Hr_start;
            var Min_start;
            var Sec_start;
            var Hr_end;
            var Min_start;
            var Sec_start;
            var running = 0;

            function startTimer() {
                var start = new Date();
                Hr_start = start.getHours();
                Min_start = start.getMinutes();
                Sec_start = start.getSeconds();
                running = 1;
            }

            function endTimer() {
                var end = new Date();
                Hr_end = end.getHours();
                Min_end = end.getMinutes();
                Sec_end = end.getSeconds();
            }

            function calcTime() {
                var minute;
                var sec;
                if (Hr_end != Hr_start) {
                    minute = 60 - Min_start + Min_end;
                } else {
                    minute = Min_end - Min_start;
                }
                if (Min_end != Min_start) {
                    sec = 60 - Sec_start + Sec_end;
                    minute = minute - 1;
                } else {
                    sec = Sec_end - Sec_start;
                }
                alert(minute + ":" + sec);
            }

            $('html').live("keydown", function() {
                if (running == 0) {
                    startTimer();
                }
            });

            $(endButton).click(function() {
                $(endButton).css("color", "red");
                running = 0;
                endTimer();
                calcTime();
            });
        }
    }
};
