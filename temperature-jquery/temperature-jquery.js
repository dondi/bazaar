$(function () {

    var report = function (celsius, fahrenheit) {
        $("#result").html(celsius + "\xb0C = " + fahrenheit + "\xb0F");
    };

    $("#f_to_c").click(function () {
        var f = $("#temperature").val();
        report((f - 32) / 1.8, f);
    });

    $("#c_to_f").click(function () {
        var c = $("#temperature").val();
        report(c, 1.8 * c + 32);
    });

});
