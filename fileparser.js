const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

/**
 * Sorts the function body based on the custom order specified in the `order`
 * array.
 *
 * The custom order is as follows:
 *
 * 1. `return`
 * 2. Direct hook calls like `useEffect`
 * 3. Hook assignments like `const [state, setState] = useState()`
 * 4. Function declarations like `function handleClick()`
 * 5. Arrow function declarations like `const handleClick = () => {}`
 *
 * @param {string} readFile - The string to parse.
 * @param {Array} order - The custom order to sort the function body.
 * @return {Object} - The parsed Abstract Syntax Tree (AST).
 */
async function fileparser(readFile, order) {
  // parsing technique
  const ast = parser.parse(readFile, {
    sourceType: "module",
    // support jsx and tsx
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    FunctionDeclaration(path) {
      const { body } = path.node.body;

      const getOrderIndex = (node) => {
        if (node.type === "ReturnStatement") {
          return order.indexOf("return");
        } else if (
          node.type === "ExpressionStatement" &&
          node.expression.type === "CallExpression"
        ) {
          // For direct hook calls like `useEffect`
          const callee = node.expression.callee.name;
          return order.indexOf(callee);
        } else if (node.type === "VariableDeclaration") {
          // For hook assignments like `const [state, setState] = useState()`
          const declarator = node.declarations[0];
          if (declarator.init && declarator.init.type === "CallExpression") {
            const callee = declarator.init.callee.name;
            return order.indexOf(callee);
          } else if (
            node.declarations[0].init?.type === "ArrowFunctionExpression"
          ) {
            return order.indexOf("ArrowFunctionExpression");
          } else if (node.type === "VariableDeclaration") {
            const declarator = node.declarations[0];
            if (
              declarator.init?.type === "ObjectPattern" &&
              declarator.init.properties
            ) {
              const property = declarator.init;
              if (
                property.properties.some((p) => p.key?.name === "mutate") &&
                declarator.init.arguments?.length
              ) {
                return order.indexOf("useMutation");
              }
            }
          }
        } else if (node.type === "FunctionDeclaration") {
          // For function declarations like `function handleClick()`
          return order.indexOf("function");
        } else if (
          node.type === "VariableDeclaration" &&
          node.declarations[0].init?.type === "ArrowFunctionExpression"
        ) {
          // For arrow function declarations like `const handleClick = () => {}`
          console.log("called arrow");
          return order.indexOf("ArrowFunctionExpression");
        }
        return -1; // Default for unhandled nodes
      };
      // Sort the function body based on the custom order
      body.sort((a, b) => getOrderIndex(a) - getOrderIndex(b));
    },
  });

  return ast;
}

module.exports = fileparser;
