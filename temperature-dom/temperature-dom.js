var report = function (celsius, fahrenheit) {
    document.getElementById("result").innerHTML = celsius + "\xb0C = " +
        fahrenheit + "\xb0F";
};

document.getElementById("f_to_c").onclick = function () {
    var f = document.getElementById("temperature").value;
    report((f - 32) / 1.8, f);
};

document.getElementById("c_to_f").onclick = function () {
    var c = document.getElementById("temperature").value;
    report(c, 1.8 * c + 32);
};
