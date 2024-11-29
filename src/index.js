#!/usr/bin/env node
const generate = require('@babel/generator').default;
const { existsSync, readFileSync, writeFileSync } = require('fs');
const { formatAndAddSpaces } = require('../utils/prettierConfig');
const configJSONDefault = require('../utils/custom.json');
const { getFileContent } = require('../utils/readFiles');
const { fileparser } = require('./formatFile');
/**
 * Command-line parameters:
 * param1 = file path or format option (e.g., --format-all, --format-jsx)
 * param2 = optional config file path or flag (e.g., --all-jsx)
 */

// Extract CLI arguments
const [, , param1, param2 = ''] = process.argv;
const createFile = '.reactfileformaterrc.json';

// Create a default config file if it doesn't exist
if (!existsSync(createFile)) {
  writeFileSync(
    createFile,
    JSON.stringify(configJSONDefault, null, 2),
    'utf-8'
  );
}

// Ensure file reading
let configJSON;
try {
  configJSON = readFileSync(createFile, 'utf-8');
  // Optionally, parse the JSON
  configJSON = JSON.parse(configJSON);
} catch (err) {
  console.error('Error reading the config file:', err.message);
}
let fileArr = [];

// Check if the `--format-*` option is provided and set up file filtering
if (param1.startsWith('--format')) {
  const fileType = param1.split('-').pop(); // Extract file type (jsx, ts, etc.)
  if (fileType !== 'format' && fileType.length > 0) {
    fileArr = getFileContent({
      filterFile: fileType,
      content: configJSON.content,
    });
  }
} else {
  fileArr = [param1];
}

// Validate and load custom config file if provided
if (param2.length > 0) {
  if (!existsSync(param2)) {
    console.error(`Error: Config file not found at "${param2}"`);
    process.exit(1);
  }
  try {
    configJSON = JSON.parse(readFileSync(param2, 'utf-8'));
  } catch (error) {
    console.error(`Error: Failed to parse config file "${param2}"`);
    process.exit(1);
  }
}

// Validate file existence for param1
if (!existsSync(param1) && !param1.startsWith('--format')) {
  console.error(`Error: File not found at "${param1}"`);
  process.exit(1);
}
(async function processFile() {
  try {
    if (fileArr.length > 0 && configJSON) {
      for (const file of fileArr) {
        // Read file content
        const fileContent = readFileSync(file, 'utf-8');

        // Parse the file content into AST
        const ast = await fileparser(fileContent, configJSON);

        // Generate code from AST
        const { code } = generate(ast);
        if (!code) {
          if (fileContent.length === 0) {
            console.log(`Empty file : ${file.split('/').pop()}`);
          } else {
            console.error(
              'Error: Code generation failed. Please report the issue.'
            );
          }
        } else {
          // Format the generated code
          const formattedCode = await formatAndAddSpaces(
            code,
            configJSON?.prettier
          );
          // Save the formatted code back to the file
          writeFileSync(file, formattedCode);
          console.log(`formatted file: "${file.split('/').pop()}"`);
        }
      }
    }
  } catch (error) {
    console.error(`Error: An unexpected issue occurred - ${error.message}`);
    process.exit(1);
  }
})();
