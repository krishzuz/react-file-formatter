const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const { getOrderIndex } = require('../utils/filterlogic');

/**
 * Sorts the function body based on the custom order specified in the `order` array.
 *
 * @param {string} readFile - The string to parse.
 * @param {Object} configJSON - The configuration object containing the `order` array.
 * @return {Object} - The parsed Abstract Syntax Tree (AST).
 */
async function fileparser(readFile, configJSON) {
  const result = parser(readFile, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
  traverse(result, {
    FunctionDeclaration(path) {
      const body = path.node.body.body;
      body.sort(
        (a, b) =>
          getOrderIndex(a, configJSON.order) -
          getOrderIndex(b, configJSON.order)
      );
    },
    ArrowFunctionExpression(path) {
      const { body } = path.node;
      // Check if the body is a block statement
      if (body.type === 'BlockStatement' && Array.isArray(body.body)) {
        body.body.sort(
          (a, b) =>
            getOrderIndex(a, configJSON.order) -
            getOrderIndex(b, configJSON.order)
        );
      }
    },
  });
  return result;
}
module.exports = {
  fileparser,
};
