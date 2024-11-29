const getOrderIndex = (node, order) => {
  if (node.type === 'ReturnStatement') {
    return order.indexOf('return');
  }
  if (
    node.type === 'ExpressionStatement' &&
    node.expression.type === 'CallExpression'
  ) {
    // Direct hook calls like `useEffect`, `useContext`
    const callee = node.expression.callee.name;
    return order.indexOf(callee) !== -1 ? order.indexOf(callee) : -1;
  }
  if (node.type === 'VariableDeclaration') {
    const declarator = node.declarations[0];
    if (declarator.init?.type === 'CallExpression') {
      // Hook assignments like `const [state, setState] = useState()`
      const callee = declarator.init.callee.name;
      return order.indexOf(callee) !== -1 ? order.indexOf(callee) : -1;
    }
    if (declarator.init?.type === 'ArrowFunctionExpression') {
      // Arrow functions
      return order.indexOf('ArrowFunctionExpression');
    }
    if (declarator.init?.type === 'ObjectPattern') {
      // Destructuring hooks, like `const { mutate } = useMutation()`
      const properties = declarator.init.properties || [];
      if (
        properties.some((prop) => prop.key.name === 'mutate') &&
        declarator.init.arguments?.length
      ) {
        return order.indexOf('useMutation');
      }
    }
  }
  if (node.type === 'FunctionDeclaration') {
    // Named function declarations
    return order.indexOf('function');
  }
  return -1; // Default for unhandled nodes
};
module.exports = {
  getOrderIndex,
};
