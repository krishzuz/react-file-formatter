const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

/**
 * Sorts the function body based on the custom order specified in the `order` array.
 *
 * @param {string} readFile - The string to parse.
 * @param {Array} order - The custom order to sort the function body.
 * @return {Object} - The parsed Abstract Syntax Tree (AST).
 */
async function fileparser(readFile, order) {
  const result = parser.parse(readFile, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(result, {
    FunctionDeclaration(path) {
      const body = path.node.body.body;

      // Helper function to determine the order of a node
      const getOrderIndex = (node) => {
        if (node.type === "ReturnStatement") {
          return order.indexOf("return");
        }

        if (
          node.type === "ExpressionStatement" &&
          node.expression.type === "CallExpression"
        ) {
          // Direct hook calls like `useEffect`, `useContext`
          const callee = node.expression.callee.name;
          return order.indexOf(callee) !== -1 ? order.indexOf(callee) : -1;
        }

        if (node.type === "VariableDeclaration") {
          const declarator = node.declarations[0];
          if (declarator.init?.type === "CallExpression") {
            // Hook assignments like `const [state, setState] = useState()`
            const callee = declarator.init.callee.name;
            return order.indexOf(callee) !== -1 ? order.indexOf(callee) : -1;
          }

          if (declarator.init?.type === "ArrowFunctionExpression") {
            // Arrow functions
            return order.indexOf("ArrowFunctionExpression");
          }

          if (declarator.init?.type === "ObjectPattern") {
            // Destructuring hooks, like `const { mutate } = useMutation()`
            const properties = declarator.init.properties || [];
            if (
              properties.some((prop) => prop.key.name === "mutate") &&
              declarator.init.arguments?.length
            ) {
              return order.indexOf("useMutation");
            }
          }
        }

        if (node.type === "FunctionDeclaration") {
          // Named function declarations
          return order.indexOf("function");
        }

        return -1; // Default for unhandled nodes
      };

      // Sort the function body based on the custom order
      body.sort((a, b) => getOrderIndex(a) - getOrderIndex(b));
    },
  });

  return result;
}

module.exports = fileparser;
