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

// Loop to update all keys
$(function() {
    $.each(letterSizes, function (index, value) {
        changeSize("#" + index + "-key", value);
    });
});
