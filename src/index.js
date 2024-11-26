#!/usr/bin/env node
const generate = require("@babel/generator").default;
const { existsSync, readFileSync, writeFileSync } = require("fs");
const parser = require("@babel/parser").parse;
const traverse = require("@babel/traverse").default;
const { getOrderIndex } = require("../utils/filterlogic");

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
    const ast = await fileparser(readFile);

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

/**
 * Sorts the function body based on the custom order specified in the `order` array.
 *
 * @param {string} readFile - The string to parse.
 * @param {Array} order - The custom order to sort the function body.
 * @return {Object} - The parsed Abstract Syntax Tree (AST).
 */
async function fileparser(readFile) {
  const result = parser(readFile, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(result, {
    FunctionDeclaration(path) {
      const body = path.node.body.body;
      body.sort((a, b) => getOrderIndex(a) - getOrderIndex(b));
    },
    ArrowFunctionExpression(path) {
      const body = path.node.body.body;
      body.sort((a, b) => getOrderIndex(a) - getOrderIndex(b));
    },
  });

  return result;
}
