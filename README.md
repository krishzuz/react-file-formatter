# react-file-formatter

`react-file-formatter` is a command-line tool to format and standardize React code files. It helps you clean up and format your React files with ease. The module can be used via `npx`, without the need to install it globally, making it easy to use in any React project. Currently install it through `npm` or `pnpm` globally or project specific and use it.

Kindly provide your feedback or any further issues which needs to be fix on the git repo.

We are working to make this plugin better 🚀

---

## Installation

<!-- You don’t need to install this package globally. You can use it directly with `npx` from the command line: -->

```bash
npm i react-file-formatter -g
```

## Example 1: Format a single file

```
npx react-file-formatter src/components/Button.js
```

## Example 2: If Globally Insatalled

```
react-file-formatter <path-to-file>
```

- If you have a file, e.g., src/components/Button.js, and you want to format it:

- This will format the file Button.js and clean up the code according to the formatting rules defined in the module.

<!-- ## Example 2: Format all .js files in a directory

```
npx react-file-formatter src/\*_/_.js
```

- You can also format multiple files at once. If you want to format all .js files in a specific folder, you can use a wildcard:

- This will format all JavaScript files in the src directory and its subdirectories. -->

# Files can be formatted using this plugin

- JSX, TSX files
- React custom hook/hook {ts,js} files
- js, ts (currently working)

## Before Formatting

```import React from 'react';

const Button =({label}) => {
    const ref = useRef(null)
    useEffect(()=>{
        console.log("something")
    } , [])
    const [clicked , setClicked] = useState(false)
  return(
    <button ref={ref} onClick={()=> setClicked(!clicked)} className="btn">
      {label}
    </button>
  )
}
export default Button;
```

## After Formatting

```import React from 'react';

const Button =({label}) => {
    const [clicked , setClicked] = useState(false)
    const ref = useRef(null)
    useEffect(()=>{
        console.log("something")
    } , [])
  return(
    <button ref={ref} onClick={()=> setClicked(!clicked)} className="btn">
      {label}
    </button>
  )
}
export default Button;
```
