#!/usr/bin/env node
const generate = require("@babel/generator").default;
const fs = require("fs");
const fileparser = require("./utils/fileparser");
const json = require("./utils/custom.json");
const order = json.order;

const [, , filePath] = process.argv;

// check the file exist or not
if (!fs.existsSync(filePath)) {
  console.error("File not found:", filePath);
  process.exit(1);
} else {
  // read the file
  const readFile = fs.readFileSync(filePath, "utf-8");

  async function callParser() {
    // parsing the file
    const ast = await fileparser(readFile, order);

    const output = generate(ast);

    if (output.code) {
      // outputting the file at the same location
      fs.writeFileSync(filePath, output.code);
      console.log("File formatted:", filePath);
    } else {
      console.log("Something went wrong - Please Report the issuse");
    }
  }
  callParser();
}
