# react-file-formatter

`react-file-formatter` is a command-line tool to format and standardize React code files. It helps you clean up and format your React files with ease. The module can be used via `npx`, without the need to install it globally, making it easy to use in any React project.

---

## Installation

You don’t need to install this package globally. You can use it directly with `npx` from the command line:

```bash
npx react-file-formatter <path-to-file-or-directory>


Usage
You can run react-file-formatter using npx followed by the path to the file or directory you want to format.

Command Syntax:

npx react-file-formatter <path-to-file-or-directory>


Example 1: Format a single file
If you have a file, e.g., src/components/Button.js, and you want to format it:

npx react-file-formatter src/components/Button.js

This will format the file Button.js and clean up the code according to the formatting rules defined in the module.

Example 2: Format all .js files in a directory
You can also format multiple files at once. If you want to format all .js files in a specific folder, you can use a wildcard:

npx react-file-formatter src/**/*.js

This will format all JavaScript files in the src directory and its subdirectories.
```
