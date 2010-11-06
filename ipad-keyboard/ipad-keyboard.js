$(function () {
    // Initialize the array of strings to type.
    var stringLibrary = [
        "the quick brown fox jumps over the lazy dog",
        "seventy six trombones led the big parade",
        "she sells seashells by the seashore"
    ];

    // Initialize all keys as inactive.
    $("div.key").addClass("inactive");

    // Set up the event handlers.
    $("div.key span").mousedown(function (event) {
        $(event.currentTarget.parentNode).removeClass("inactive");
        $(event.currentTarget.parentNode).addClass("active");
    })

    .mouseup(function (event) {
        $(event.currentTarget.parentNode).removeClass("active");
        $(event.currentTarget.parentNode).addClass("inactive");
        
        var typedText     = $('.typed-text'),
            textToType    = $('.text-to-type'),
            textToTypeVal = textToType.text();
        
        // Append one character to typed area
        typedText.append(textToTypeVal.charAt(0));
        
        // Remove character from area to type
        textToType.text((textToTypeVal.slice(1)));
    });

    // Choose a string at random and stick in text-to-type.
    $("#text-to-type").html(stringLibrary[Math.floor((Math.random() *
            stringLibrary.length))]);
    
    $("#timing-result").hide();
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
