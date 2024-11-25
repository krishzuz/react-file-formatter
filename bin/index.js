#!/usr/bin/env node
const babel = require("@babel/core");
const generate = require("@babel/generator").default;
const fs = require("fs");
const { type } = require("os");
const fileparser = require("./utils/fileparser.js");
const json = require("./custom.json");
const order = json.order;

const [, , filePath] = process.argv;

// check the file exist or not
if (!fs.existsSync(filePath)) {
  console.error("File not found:", filePath);
  process.exit(1);
} else {
  console.log("File found:", filePath);
  // read the file
  const readFile = fs.readFileSync(filePath, "utf-8");

  async function callParser() {
    // parsing the file
    const ast = await fileparser(readFile, order);

    const output = generate(ast);

    if (output.code) {
      // outputting the file at the same location
      fs.writeFileSync(filePath, output.code);
    } else {
      console.log("Something went wrong - Please Report the issuse");
    }
  }

  callParser();
}
