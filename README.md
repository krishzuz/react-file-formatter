# react-file-formatter

`react-file-formatter` is a command-line tool designed to help React developers standardize and clean up their React code files for improved readability and maintainability. The tool automatically formats your React code and allows you to reorder functions and hooks based on a custom order specified by the user.

If you find any issues kindly reachout! or create a issue in github repo.

---

## Installation

<!-- You don’t need to install this package globally. You can use it directly with `npx` from the command line: -->

```bash
npm i react-file-formatter -g
```

## Problem We Are Solving

In React projects, it's common to use multiple hooks and functions in a single file. Over time, this can lead to disorganized and hard-to-read code. react-file-formatter solves this by automatically:

- # Reordering Code for Readability and Cleanliness:

  The tool automatically sorts hooks, functions, and return statements based on a custom order, making the code more consistent and easier to understand.

- # Integrating Prettier for Code Formatting:
  In addition to reordering, the tool also formats the code using Prettier, ensuring consistent formatting across your project. This eliminates the need to worry about inconsistent indentation, quotes, and other formatting issues.

## Features

- Customizable Ordering: Define your preferred order of hooks and functions in a simple JSON file.
- Prettier Integration: Automatically format your code according to your Prettier configuration.
- CLI Tool: Easily use the tool from the command line to format your files.

## How to Use

Install globally or project specify

```
npm install -g react-file-formatter

npm install react-file-formatter
```

## Create a Custom JSON Configuration File:

Create a `custom.json` file in the project root and define the order and Prettier settings.
Example of `custom.json`.

```
{
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

# Example 1: Format a single file with default configuration

```
npx react-file-formatter <file-path>
```

# Example 2: Format a single file with custom configuration

```
npx react-file-formatter <file-path> <custom.json-path>
```

# Example 3: If Globally Insatalled

```
react-file-formatter <path-to-file>
```

- If you have a file, e.g., src/components/Button.js, and you want to format it:

- This will format the file Button.js and clean up the code according to the formatting rules defined in the module.

# Files can be formatted using this plugin

- JSX, TSX files
- React custom hook/hook {ts,js} files

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

This project is licensed under the ISC License.
