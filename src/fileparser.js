const parser = require("@babel/parser");
const { getOrderIndex } = require("../utils/filterlogic");
const traverse = require("@babel/traverse").default;

/**
 * Sorts the function body based on the custom order specified in the `order` array.
 *
 * @param {string} readFile - The string to parse.
 * @param {Array} order - The custom order to sort the function body.
 * @return {Object} - The parsed Abstract Syntax Tree (AST).
 */
async function fileparser(readFile) {
  const result = parser.parse(readFile, {
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

module.exports = fileparser;
