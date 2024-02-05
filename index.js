const core = require("@actions/core");
const github = require("@actions/github");
let JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("node:fs");

try {
	let path = core.getInput("path");

	if (!path) path = process.argv[2];

	if (!path) throw new Error("Path is required");

	console.log(`Javascript path is ${path}`);
	if (!fs.existsSync(path)) throw new Error("File not found: " + path);

	// File does exist, let's continue.
	let jsFile = fs.readFileSync(path, "utf8");

	let obfuscatorLevel = core.getInput("obfuscatorLevel");

	if (!obfuscatorLevel) {
		if (process.argv[4]) obfuscatorLevel = process.argv[4];
		else obfuscatorLevel = "default";
	}

	let obfuscatorOptions =
		JavaScriptObfuscator.getOptionsByPreset(obfuscatorLevel);

	let obfuscator = JavaScriptObfuscator.obfuscate(jsFile, obfuscatorOptions);
	let outputPath = core.getInput("outputPath");

	if (!outputPath) {
		if (process.argv[3]) outputPath = process.argv[3];
		else outputPath = path;
	}

	fs.writeFileSync(outputPath, obfuscator.getObfuscatedCode());
} catch (error) {
	core.setFailed(error.message);
}
