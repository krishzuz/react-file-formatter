#!/usr/bin/env node
const generate = require('@babel/generator').default;
const { existsSync, readFileSync, writeFileSync, write } = require('fs');
const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const { getOrderIndex } = require('../utils/filterlogic');
const { formatAndAddSpaces } = require('../utils/prettierConfig');
const configJSONDefault = require('../utils/custom.json');

const [, , filePath, configPath = ''] = process.argv;

let configJSON = configJSONDefault;

// check the config file exist or not - only run if config file is provided or use the default one
if (configPath.length > 0) {
  if (!existsSync(configPath)) {
    console.error('Config file not found:', configPath);
    process.exit(1);
  } else {
    configJSON = JSON.parse(readFileSync(configPath, 'utf-8'));
  }
}

// check the file exist or not
if (!existsSync(filePath)) {
  console.error('File not found:', filePath);
  process.exit(1);
} else {
  // read the file
  const readFile = readFileSync(filePath, 'utf-8');

  async function callParser() {
    // parsing the file
    const ast = await fileparser(readFile);
    const output = generate(ast);

    if (output.code) {
      // formatting the file
      const prettierOutput = await formatAndAddSpaces(
        output.code,
        configJSON.prettier
      );
      // after fomatting a file save it
      writeFileSync(filePath, prettierOutput);
      console.log('File formatted:', filePath);
    } else {
      console.log('Something went wrong - Please Report the issuse');
    }
  }
  callParser();
}

/**
 * Sorts the function body based on the custom order specified in the `order` array.
 *
 * @param {string} readFile - The string to parse.
 * @return {Object} - The parsed Abstract Syntax Tree (AST).
 */
async function fileparser(readFile) {
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
