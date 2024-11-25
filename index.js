#!/usr/bin/env node
const generate = require("@babel/generator").default;
const { existsSync, readFileSync, writeFileSync } = require("fs");
const fileparser = require("./fileparser");
const json = require("./custom.json");
const order = json.order;

const [, , filePath] = process.argv;

// check the file exist or not
if (!existsSync(filePath)) {
  console.error("File not found:", filePath);
  process.exit(1);
} else {
  // read the file
  const readFile = readFileSync(filePath, "utf-8");

  async function callParser() {
    // parsing the file
    const ast = await fileparser(readFile, order);

    const output = generate(ast);

    if (output.code) {
      // outputting the file at the same location
      writeFileSync(filePath, output.code);
      console.log("File formatted:", filePath);
    } else {
      console.log("Something went wrong - Please Report the issuse");
    }
  }
  callParser();
}
