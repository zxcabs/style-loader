/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */
var path = require("path");

exports.relativeRequestPath = function relativeRequestPath(context, remainingRequest) {
    remainingRequest = remainingRequest.split("!");
    var last = remainingRequest.length - 1;
    remainingRequest[last] = "." + path.sep + path.relative(context, remainingRequest[last]);
    return remainingRequest.join("!");
};
