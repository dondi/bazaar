/*
 * This JavaScript file defines a Vector object and associated functions.
 * The object itself is returned as the result of a function, allowing us
 * to encapsulate its code and module variables.
 */
var Vector = (function () {
    // Define the constructor.
    var vector = function () {
        this.elements = [].slice.call(arguments);
    };

    // Basic methods.
    vector.prototype.dimensions = function () {
        return this.elements.length;
    };

    vector.prototype.x = function () {
        return this.elements[0];
    };

    vector.prototype.y = function () {
        return this.elements[1];
    };

    vector.prototype.z = function () {
        return this.elements[2];
    };

    vector.prototype.w = function () {
        return this.elements[3];
    };

    return vector;
})();
