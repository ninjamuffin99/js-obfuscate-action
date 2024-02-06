import core from "@actions/core";
import JavaScriptObfuscator from "javascript-obfuscator";
import type { TOptionsPreset } from "javascript-obfuscator/typings/src/types/options/TOptionsPreset";
import fs from "node:fs";
// import github from "@actions/github"; // Seeminlgly not used

try {
	let path = core.getInput("path");

	if (!path) path = process.argv[2];

	if (!path) throw new Error("Path is required");

	console.log(`Javascript path is ${path}`);
	if (!fs.existsSync(path)) throw new Error(`File not found: ${path}`);

	// File does exist, let's continue.
	const jsFile = fs.readFileSync(path, "utf8");

	let obfuscatorLevel = core.getInput("obfuscatorLevel");

	if (!obfuscatorLevel) {
		if (process.argv[4]) obfuscatorLevel = process.argv[4];
		else obfuscatorLevel = "default";
	}

	const obfuscatorOptions = JavaScriptObfuscator.getOptionsByPreset(
		obfuscatorLevel as TOptionsPreset,
	);

	const obfuscator = JavaScriptObfuscator.obfuscate(jsFile, obfuscatorOptions);
	let outputPath = core.getInput("outputPath");

	if (!outputPath) {
		if (process.argv[3]) outputPath = process.argv[3];
		else outputPath = path;
	}

	fs.writeFileSync(outputPath, obfuscator.getObfuscatedCode());
} catch (error) {
	core.setFailed(error.message);
}
