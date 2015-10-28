/*
 * A very basic HTTP relay server using node.js.
 *
 * Thank you to @florton for doing the initial legwork.
 *
 * Inspired by http://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
 */
var express = require('express');
var request = require('request');
var app = express();

var API_HOST = "http://api.steampowered.com"; // Put your actual API host here.

app.use('/', function (req, res) {
    var url = API_HOST + req.url;

    console.log("Connecting to service:", url);
    console.log("Using parameters:", req.query);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    req.pipe(request(url)).pipe(res);
});

console.log("Starting super-simple HTTP relay server...");
app.listen(process.env.PORT || 3000);
