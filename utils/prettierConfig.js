const prettier = require('prettier');

async function formatAndAddSpaces(rawCode, configJSON) {
  const prettierConfig = {
    ...configJSON,
  };
  try {
    // First, format the code with Prettier
    const formattedCode = await prettier.format(rawCode, {
      ...prettierConfig,
      parser: 'typescript', // Ensure the correct parser for JSX
    });

    // TODO: Add extra space between lines
    // console.log(formattedCode.split('\n'), 'hello');
    // Add extra space between lines
    // const withExtraSpaces = formattedCode
    //   .split('\n')
    //   .map((line) => (line.trim() ? `${line}\n` : '')) // Adds a new line after non-empty lines
    //   .join('\n');

    // console.log('Formatted Code with Spaces:', withExtraSpaces);

    return formattedCode;
  } catch (error) {
    console.error('Error formatting the code:', error);
  }
}

module.exports = { formatAndAddSpaces };
