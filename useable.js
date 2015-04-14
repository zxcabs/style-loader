/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var path = require("path"),
	utils = require("./utils");
module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	remainingRequest = utils.relativeRequestPath(this.context, remainingRequest);
	return [
		"var refs = 0;",
		"var dispose;",
		"exports.use = exports.ref = function() {",
		"	if(!(refs++)) {",
		"		var content = require(" + JSON.stringify("!!" + remainingRequest) + ")",
		"		if(typeof content === 'string') content = [[module.id, content, '']];",
		"		dispose = require(" + JSON.stringify("!" + path.join(__dirname, "addStyles.js")) + ")(content);",
		"	}",
		"	return exports",
		"};",
		"exports.unuse = exports.unref = function() {",
		"	if(!(--refs)) {",
		"		dispose();",
		"		dispose = null;",
		"	}",
		"};",
		"if(module.hot) {",
		"	var lastRefs = module.hot.data && module.hot.data.refs || 0;",
		"	if(lastRefs) {",
		"		exports.ref();",
		"		refs = lastRefs;",
		"	}",
		"	module.hot.accept();",
		"	module.hot.dispose(function(data) {",
		"		data.refs = refs;",
		"		if(dispose) {",
		"			dispose();",
		"		}",
		"	});",
		"}",
	].join("\n");
};
