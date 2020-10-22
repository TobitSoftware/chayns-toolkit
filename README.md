<div align="center">
    <h1>
        <img src="https://raw.githubusercontent.com/TobitSoftware/chayns-toolkit/HEAD/assets/logo.png" width="500px" alt="chayns-toolkit" />
    </h1>
    <p>A zero-config toolchain for developing chayns® apps.</p>
    <div>
        <img src="https://img.shields.io/github/license/TobitSoftware/chayns-toolkit?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/npm/v/chayns-toolkit?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/last-commit/TobitSoftware/chayns-toolkit?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/issues-raw/TobitSoftware/chayns-toolkit?style=for-the-badge" alt="" />
    </div>
</div>

---

**chayns-toolkit** contains pre-configured tools for the development, publishing
and quality assurance of your app. It was created to simplify the development
experience when working with [React](https://reactjs.org).

> This toolchain is specialized in developing apps and plugins for the
> [chayns®](https://chayns.org/) platform. If you want to develop a general
> purpose web app, take a look at [Next.js](https://nextjs.org/) or
> [`create-react-app`](https://create-react-app.dev/).

## Overview

-   [Get Started](#get-started)
-   [Commands](#commands)
    -   [`chayns-toolkit dev`](#chayns-toolkit-dev)
    -   [`chayns-toolkit build`](#chayns-toolkit-build)
    -   [`chayns-toolkit lint`](#chayns-toolkit-lint)
-   [Features](#features)
    -   [TypeScript Support](#typescript-support)
    -   [(S)CSS Support](#scss-support)
    -   [Image Assets](#image-assets)
    -   [HMR With `react-refresh` Support](#hmr-with-react-refresh-support)
    -   [Using React Devtools](#using-react-devtools)
    -   [ESLint Configuration](#eslint-configuration)
    -   [Single-File Builds](#single-file-builds)
    -   [Environment Variables](#environment-variables)
    -   [Analyzing Your Bundle](#analyzing-your-bundle)
    -   [Tree-Shaking `chayns-components`](#tree-shaking-chayns-components)
    -   [Adjusting the Webpack Configuration](#adjusting-the-webpack-configuration)
-   [The `toolkit.config.js` Configuration File](#the-toolkitconfigjs-configuration-file)
-   [Notes on Multiple Entrypoints](#notes-on-multiple-entrypoints)

## Get Started

To start a new project with `chayns-toolkit`, use our
[`create-chayns-app`](https://github.com/TobitSoftware/create-chayns-app)
command line tool. It will set up an optimal development environment for you in
one command.

## Commands

### `chayns-toolkit dev`

Starts a development server on
[`http://localhost:1234/`](http://localhost:1234/) or
[`https://0.0.0.0:1234/`](https://0.0.0.0:1234/) if SSL was configured.

You can configure SSL certificates, host and port in the
[`toolkit.config.js`](#the-toolkitconfigjs-configuration-file) configuration
file:

```js
module.exports = {
    development: {
        host: "123.4.5.6",
        port: 1337,
        cert: "/path/to/cert.crt",
        key: "/path/to/key.key",
    },
    // ...
}
```

| Parameters         | Function                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `-d`, `--devtools` | Debug your application with the standalone React Devtools. [Read more](#using-react-devtools) |

> To achieve faster (re-)build times during development this command only
> transpiles your code to work with the latest versions of Chrome, Safari and
> Firefox.

### `chayns-toolkit build`

Compiles your source code for production. The output is emitted into a `build/`
folder in your project directory.

Your code is transpiled to work with browsers matching the following
[browserslist](https://github.com/browserslist/browserslist) query:

```
>0.5%
not dead
not op_mini all
```

You can check the exact browsers and versions this matches at any time by
running

```bash
npx browserslist ">0.5%, not dead, not op_mini all"
```

| Parameters        | Function                                                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-a`, `--analyze` | Analyze your bundle with [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) after compilation. [Read more](#analyzing-your-bundle) |

### `chayns-toolkit lint`

Lints your JavaScript and TypeScript source code with
[ESLint](https://eslint.org/) to report any warnings or errors and automatically
fix them if possible.

We recommend to use our included [ESLint configuration](#eslint-configuration).

## Features

-   [TypeScript Support](#typescript-support)
-   [(S)CSS Support](#scss-support)
-   [Image Assets](#image-assets)
-   [HMR With `react-refresh` Support](#hmr-with-react-refresh-support)
-   [Using React Devtools](#using-react-devtools)
-   [ESLint Configuration](#eslint-configuration)
-   [Single-File Builds](#single-file-builds)
-   [Environment Variables](#environment-variables)
-   [Analyzing Your Bundle](#analyzing-your-bundle)
-   [Tree-Shaking `chayns-components`](#tree-shaking-chayns-components)
-   [Adjusting the Webpack Configuration](#adjusting-the-webpack-configuration)

### TypeScript Support

TypeScript is fully supported.

#### Getting Started

To start using TypeScript in your project, create a `tsconfig.json` file in the
root of your project or create a `.ts` or `.tsx` file in your `src/` directory.
The next time you start the `chayns-toolkit dev` command, we will automatically
populate/create the `tsconfig.json`-file with our recommended configuration.

> If you do not have a `tsconfig.json` file and use `.ts` or `.tsx` files,
> ESLint will not be able to check these for errors.

You are now ready to use TypeScript in your `.ts` and `.tsx` files!

#### Caveats

The TypeScript compilation is done by
[`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript).
This has some caveats, mainly not being able to use `const enum` and `export =`
or `import =`.

The automatically generated `tsconfig.json` includes `"isolatedModules": true`
in the TypeScript compiler options, which will make the TypeScript compiler warn
you about using unsupported features.

Refer to the
[Babel documentation](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)
for more information.

### (S)CSS Support

You can import `.css` and `.scss` files into your JavaScript/TypeScript files to
include them in the bundling process:

```js
import "./my-styles.scss"
```

#### CSS Modules

CSS modules are also supported. Every file ending with `.module.css` or
`.module.scss` will be treated as a module. Use it like this:

```jsx
import styles from "styles.css"

export function MyComponent() {
    return <div className={styles.box}>I am styled with CSS modules!</div>
}
```

> For more information on CSS Modules check out
> [this article](https://css-tricks.com/css-modules-part-1-need/).

### Image Assets

Images with `.png`, `.jpg`, `.jpeg`, `.gif` or `.webp` extensions can be
imported into your components and will be included in the bundle. The default
export of an image module is its resulting URL:

```jsx
import imgSrc from "./my-image.png"

export function MyImage() {
    return <img src={imgSrc} alt="" />
}
```

> Small images (< 10 KB) will be inlined into the JavaScript code with data-urls
> and therefore won't appear as files in your output. This improves loading
> times. When single-file mode is activated, all images will be inlined.

#### SVG Support

Importing `.svg` files automatically converts them to React components. They
take any of the props a regular `<svg>`-element would take:

```jsx
import Icon from "./my-icon.svg"

export function MyIcon() {
    return <Icon className="icon" />
}
```

### HMR With `react-refresh` Support

The development server supports hot module reloading with
[`react-refresh`](https://github.com/pmmmwh/react-refresh-webpack-plugin),the
improved alternative to the now deprecated `react-hot-loader`.

This allows you to see changes in your React components in real-time after
saving without losing component state. Some patterns will force a full reload,
for further information refer to
[this paragraph](https://github.com/pmmmwh/react-refresh-webpack-plugin#caveats).

### Using React Devtools

Sometimes you might not be able to use the React Devtools browser extension,
e.g. when developing inside of an iframe.

For this case we support using the standalone React Devtools via the
[`react-devtools`](https://github.com/facebook/react/tree/master/packages/react-devtools)-package.
First you have to install it as a development dependency:

```bash
# Yarn
yarn add react-devtools -D

# NPM
npm install react-devtools -D
```

Now you can pass the `-d` (or `--devtools`) option to `chayns-toolkit dev`. It
then starts the React Devtools window, which will connect to your application
once it has loaded in the browser.

### ESLint Configuration

Our ESLint-config `@chayns-toolkit/eslint-config` is automatically included when
`chayns-toolkit` is installed.

To activate the config add an `eslintConfig` key to your `package.json`:

```json
{
    "...": "",
    "eslintConfig": {
        "extends": "@chayns-toolkit"
    },
    "...": ""
}
```

or use one of the
[other options for configuring ESLint](https://eslint.org/docs/user-guide/configuring#using-configuration-files-1).

The configuration can also be installed as a standalone package
(`@chayns-toolkit/eslint-config`).

If you think a rule should be enabled, disabled or adjusted, please consider
[opening an issue](https://github.com/TobitSoftware/chayns-toolkit/issues/new)
to discuss the suggested change instead of changing your local configuration.

### Single-File Builds

In single-file build mode, the compiler will inline all assets (CSS, images,
etc.) together with all JavaScript into a single bundle. This can be useful when
building smaller fragments of a UI, e.g. some kind of plugin.

### Environment Variables

All system environment variables as well as any variables specified in a
`.env.local` file in the root of your project directory will be available to
your code under `process.env.VAR_NAME`

This allows you to specify environment variables in your CI/CD solution and use
them in your source code.

> Please note that this is a string based replacement. Only
> `process.env.VAR_NAME` will be replaced, but other syntax like
> `const { GOOGLE_API_KEY } = process.env` might not be detected.

### Analyzing Your Bundle

By passing the `--analyze` flag to `chayns-toolkit build` you can use
[`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer)
to investigate your bundle-size. It will automatically open the tree-map of your
bundled files after compiling. It runs for as long as you keep the terminal
process alive.

### Tree-Shaking `chayns-components`

The tree-shaking for
[`chayns-components`](https://github.com/TobitSoftware/chayns-components) is
built into the build configuration and configured automatically. For further
information refer to
[this document](https://github.com/TobitSoftware/chayns-components/blob/master/tree-shaking.md).

If your bundle size is unexpectedly large, please
[open an issue](https://github.com/TobitSoftware/chayns-toolkit/issues/new).

### Adjusting the Webpack Configuration

Even though the included webpack configuration will handle most cases, we also
provide the ability to modify it.

> Please note that the webpack configuration does not follow SemVer and it could
> change during any release, even patch releases.

Use the `webpack` property of the configuration object to specify a function
that receives the default webpack configuration along with some other
information. This modifier function has to return the modified configuration.

The modifier function receives two arguments. First is our default webpack
configuration, second is an object with additional information and utilities,
following this interface:

```ts
interface Options {
    /**
     * The webpack module. Do not import webpack on your own if you want to use
     * one of the built-in plugins.
     */
    webpack: webpack

    /**
     * A boolean that specifies wether the configuration is for local
     * development or production.
     */
    dev: boolean
}
```

This is an example of editing the webpack configuration by adding
`@babel/plugin-proposal-pipeline-operator` to `babel-loader`:

```js
module.exports = {
    webpack(config) {
        const babelRule = config.module.rules.find(
            (rule) =>
                rule.use.loader && rule.use.loader.includes("babel-loader")
        )

        if (!babelRule) return config

        const babelOptions = babelRule.use.options

        const pipelinePlugin = [
            "@babel/plugin-proposal-pipeline-operator",
            { proposal: "smart" },
        ]

        if (Array.isArray(babelOptions.plugins)) {
            babelOptions.plugins.push(pipelinePlugin)
        } else {
            babelOptions.plugins = [pipelinePlugin]
        }

        return config
    },
}
```

If you find yourself modifying the webpack configuration often for a feature
that you think belongs in our default config, please
[open an issue](https://github.com/TobitSoftware/create-chayns-app/issues) to
discuss it.

## The `toolkit.config.js` Configuration File

You can configure certain aspects of the commands with the `toolkit.config.js`
file in the root of your project directory.

This is an example of the `toolkit.config.js`-file with all available options
specified:

```js
module.exports = {
    development: {
        host: "123.0.0.1",
        port: 1337,
        cert: "//path/to/ssl/cert",
        key: "//path/to/ssl/key",
    },
    output: {
        singleBundle: false,
        filename: "[package].[contenthash].js",
        path: "//my-qa-server/example-project",
    },
    webpack(config, { webpack, dev }) {
        // modify the webpack configuration...

        return modifiedConfig
    },
}
```

### `development` Options:

These options configure your development server started by the
`chayns-toolkit dev` command:

| Option     | Type     | Explanation                                                                                                          |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| **`host`** | `string` | The hostname of your development server. Defaults to `localhost` or `0.0.0.0` if both `cert` and `key` are provided. |
| **`port`** | `number` | The port of your development server. Defaults to `1234`.                                                             |
| **`cert`** | `string` | The path to a SSL certificate file for your development server. Not specified by default.                            |
| **`key`**  | `string` | The path to a SSL key file for your development server. Not specified by default.                                    |

### `output` Options:

These options configure your build output generated by the
`chayns-toolkit build` command:

| Option             | Type      | Explanation                                                                                                                                                                                                                                                                                                          |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`singleBundle`** | `boolean` | Toggles the [single-file build functionality](#single-file-builds).                                                                                                                                                                                                                                                  |
| **`filename`**     | `string`  | Change the file-name your of primary output bundle. You can use any of the [webpack substitutions](https://webpack.js.org/configuration/output/#template-strings) as well as the `[package]` substitution (will be replaced by the name specified in your `package.json`). Defaults to `[package].[contenthash].js`. |
| **`path`**         | `string`  | Set an absolute path where your output will be emitted to (e.g. build directly to a directory that is accessible via HTTPS on a QA server).                                                                                                                                                                          |

### The `webpack` Option:

Please refer to the
["Adjusting the webpack configuration"](#adjusting-the-webpack-configuration)
section.

## Notes on Multiple Entrypoints

Some projects use multiple webpack entrypoints for different outputs to reduce
configuration duplication. Since this package gets rid of your build
configuration, a project with multiple entrypoints make much sense. Therefore we
do not currently support multiple entrypoints.

If you have projects that are related and you want them to be in the same
repository, use a
[monorepo](https://www.toptal.com/front-end/guide-to-monorepos) architecture.
