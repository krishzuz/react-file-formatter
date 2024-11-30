# react-file-formatter ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![npm version](https://img.shields.io/badge/npm-v1.1.8)

`react-file-formatter` is a command-line tool designed to help React developers standardize and clean up their React code files for improved readability and maintainability. The tool automatically formats your React code and allows you to reorder functions and hooks based on a custom order specified by the user.

If you find any issues kindly reachout! or create a issue in github repo.

---

## Installation

You don’t need to install this package globally. You can use it directly with `npx` from the command line:

```
npx react-file-formatter --format-all
```

```bash
npm i react-file-formatter -g
```

# Problem We Are Solving

In React projects, it's common to use multiple hooks and functions in a single file. Over time, this can lead to disorganized and hard-to-read code. react-file-formatter solves this by automatically:

- ## Reordering Code for Readability and Cleanliness:

  The tool automatically sorts hooks, functions, and return statements based on a custom order, making the code more consistent and easier to understand.

- ## Integrating Prettier for Code Formatting:
  In addition to reordering, the tool also formats the code using Prettier, ensuring consistent formatting across your project. This eliminates the need to worry about inconsistent indentation, quotes, and other formatting issues.

# Features

- Customizable Ordering: Define your preferred order of hooks and functions in a simple JSON file.
- Prettier Integration: Automatically format your code according to your Prettier configuration.
- CLI Tool: Easily use the tool from the command line to format your files.

# How to Use

Install globally or project specify or just run the command

```
npx react-file-formatter --format-all
```

```
npm install -g react-file-formatter
```

```
npm install react-file-formatter
```

# .reactfileformaterrc.json JSON Configuration File:

.reactfileformaterrc.json file will be created automatically in the root of your project. Where you can modify and configure code based on
your project needs. NOTE: content property is important to format the code files. Make sure it exists!

```
{
  "content": ["./src", "./utils"],
  "order": [
    "useContext",
    "useState",
    "useRef",
    "useMutation",
    "function",
    "ArrowFunctionExpression",
    "useEffect",
    "return"
  ],
  "prettier": {
    "trailingComma": "es5",
    "tabWidth": 2,
    "singleQuote": true,
    "semi": true
  }
}

```

## Example 1: Format a single file with default configuration

```
npx react-file-formatter <file-path>
```

## Example 2: Format a single file with custom configuration

```
npx react-file-formatter <file-path> <custom.json-path>
```

## Example 3: If Globally Insatalled

```
react-file-formatter <path-to-file>
```

- If you have a file, e.g., src/components/Button.js, and you want to format it:

- This will format the file Button.js and clean up the code according to the formatting rules defined in the module.

## Example 4: Formatting all files

```
npx react-file-formatter --format-all
```

This command will check the `.reactfileformaterrc.json` configuration file and excute the formatting process only to
the folder paths which is mentioned in the `content` property.

## List of commands:

| Command                    | Flags           |
|----------------------------|-----------------|
| npx react-file-formatter   | --format-all    |
| npx react-file-formatter   | --format-jsx    |
| npx react-file-formatter   | --format-tsx    |
| npx react-file-formatter   | --format-js     |
| npx react-file-formatter   | --format-ts     | 

If it is a react component it will apply reordering else it will apply the prettier rules which is specified.


## Files can be formatted using this plugin

- JSX, TSX files
- React custom hook/hook {ts,js} files
- .js, .ts

## Before Formatting

```
import { useState, useEffect, useContext, useRef } from "react";

const MyComponent = () => {
  const [state, setState] = useState(0);
  const inputRef = useRef(null);
  const context = useContext(MyContext);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleClick = () => {
    setState(state + 1);
  };

  return <div onClick={handleClick}>State: {state}</div>;
};
```

## After Formatting

```
import { useContext, useState, useRef, useEffect } from "react";

const MyComponent = () => {
  const context = useContext(MyContext);
  const [state, setState] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleClick = () => {
    setState(state + 1);
  };

  return <div onClick={handleClick}>State: {state}</div>;
};
```

## Contributing

Feel free to contribute to the project! To get started, fork the repository, make your changes, and create a pull request.

## License

This project is licensed under the MIT License.
