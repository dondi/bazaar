/**
 * Created by: Brian Handy & Andrew Garrard
 */

var keysArray = [ 8.167, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 6.094,
        6.966, 0.153, 0.772, 4.025, 2.406, 6.749, 7.507, 1.929, 0.095, 5.987,
        6.327, 9.056, 2.758, 0.978, 2.360, 0.150, 1.974, 0.074 ];

var lettersArray = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y",
        "z" ];

var enhancedKeys = true;
var minWidth = 77;
var minHeight = 48;
var normalWidth = 79;
var normalHeight = 50;
var maxWidth = 90;
var maxHeight = 61;
var maxUsage = keysArray[4];
var spanMargin = 2;

// Function for making keys the right size.
var changeSize = function (id, slot) {
    // Change the key size
    if (enhancedKeys) {
        $(id).css({
            "width" : ""
                    + (minWidth + ((maxWidth - minWidth) * (keysArray[slot] / maxUsage)))
                    + "px",
            "height" : ""
                    + (minHeight + ((maxHeight - minHeight) * (keysArray[slot] / maxUsage)))
                    + "px"
        });

        // Change the margin size - we attempted to have it so that the keys
        // would not move. It did not work
        $(id).css("margin-top",
            ""
            + spanMargin
            - ((maxHeight - minHeight) * (keysArray[slot] / maxUsage))
            / 2 + "px");
        $(id).css("margin-bottom",
            ""
            + spanMargin
            - ((maxHeight - minHeight) * (keysArray[slot] / maxUsage))
            / 2 + "px");
        $(id).css("margin-left",
            ""
            + spanMargin
            - ((maxWidth - minWidth) * (keysArray[slot] / maxUsage))
            / 2 + "px");
        $(id).css("margin-right",
            ""
            + spanMargin
            - ((maxWidth - minWidth) * (keysArray[slot] / maxUsage))
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
    for (i = 0; i < keysArray.length; i++) {
        changeSize("#" + lettersArray[i] + "-key", i);
    }
});
