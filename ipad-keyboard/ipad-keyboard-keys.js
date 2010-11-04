/**
 * Created by: Brian Handy & Andrew Garrard
 */

var keysArray = [
8.167,
1.492,
2.782,
4.253,
12.702,
2.228,
2.015,
6.094,
6.966,
0.153,
0.772,
4.025,
2.406,
6.749,
7.507,
1.929,
0.095,
5.987,
6.327,
9.056,
2.758,
0.978,
2.360,
0.150,
1.974,
0.074];

var lettersArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var minWidth = 69;
var minHeight = 40;
var maxWidth = 99;
var maxHeight = 70;
var maxUsage = keysArray[4];

// Function for making keys the right size
function changeSize (id, slot) {
	$(function () {
		// Change the key size
		$(id).css("width", "" + (minWidth + ((maxWidth - minWidth) * (keysArray[slot] / maxUsage))) + "px");
		$(id).css("height", "" + (minHeight + ((maxHeight - minHeight) * (keysArray[slot] / maxUsage))) + "px");
		
		// Change the margin size - we attempted to have it so that the keys would not move. It did not work
		// $(id).css("margin-top", "" + 3 - ((maxHeight - minHeight) * (keysArray[slot] / maxUsage))/2 + "px");
		// $(id).css("margin-bottom", "" + 3 - ((maxHeight - minHeight) * (keysArray[slot] / maxUsage))/2 + "px");
		// $(id).css("margin-left", "" +  3 - ((maxWidth - minWidth) * (keysArray[slot] / maxUsage))/2 + "px");
		// $(id).css("margin-right", "" +  3 - ((maxWidth - minWidth) * (keysArray[slot] / maxUsage))/2 + "px");
	});
}

// Loop to update all keys
$(function () {
	for (i=0; i<keysArray.length; i++) {
		changeSize("#" + lettersArray[i] + "-key", i);
	}
});
