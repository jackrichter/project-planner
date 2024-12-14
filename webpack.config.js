/* eslint-disable no-undef */
const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/app.js",
	output: {
		filename: "app.js",
		path: path.resolve(__dirname, "assets", "scripts")
	}
};
