<div align="center">
    <h1><img src="assets/logo.png" width="500px" alt="chayns-scripts" /></h1>
    <p>A zero-config toolchain for developing chayns® apps.</p>
    <div>
        <img src="https://img.shields.io/github/license/leodr/chayns-scripts?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/npm/v/chayns-scripts?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/last-commit/leodr/chayns-scripts?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/issues-raw/leodr/chayns-scripts?style=for-the-badge" alt="" />
    </div>
</div>

---

**chayns-scripts** contains pre-configured tools for the development, publishing
and quality assurance of your app. It was created to simplify the development
experience when working with [React](https://reactjs.org).

> This toolchain is specialized in developing apps and plugins for the
> [chayns®](https://chayns.org/) platform. If you want to develop a general
> purpose web app, take a look at [Next.js](https://nextjs.org/) or
> [`create-react-app`](https://create-react-app.dev/).

## Overview

-   [Get Started](#get-started)
-   [Commands](#commands)
    -   [`chayns-scripts dev`](#chayns-scripts-dev)
    -   [`chayns-scripts build`](#chayns-scripts-build)
    -   [`chayns-scripts lint`](#chayns-scripts-lint)
-   [Features](#features)
    -   [TypeScript Support](#typescript-support)
    -   [(S)CSS Support](#scss-support)
    -   [Image Assets](#image-assets)
    -   [HMR With `react-refresh` Support](#hmr-with-react-refresh-support)
    -   [ESLint Configuration](#eslint-configuration)
    -   [Single-File Builds](#single-file-builds)
    -   [Analyzing Your Bundle](#analyzing-your-bundle)
    -   [Tree-Shaking for chayns-components](#tree-shaking-for-chayns-components)
    -   [The `chayns-scripts.json` Configuration File](#the-chayns-scriptsjson-configuration-file)
-   [Notes on Multiple Entrypoints](#notes-on-multiple-entrypoints)

## Get Started

First install the `chayns-scripts` package in your project as a dev dependency:

```bash
yarn add chayns-scripts -D
```

or

```bash
npm i chayns-scripts -D
```

The package provides the following commands:

-   `chayns-scripts dev`
-   `chayns-scripts build`
-   `chayns-scripts lint`

We recommend adding these to the scripts section of your package.json:

```json
{
    "...": "",
    "scripts": {
        "dev": "chayns-scripts dev",
        "build": "chayns-scripts build",
        "lint": "chayns-scripts lint"
    },
    "...": ""
}
```

A JavaScript/TypeScript file in the `src/` directory with one of the following
names will be the entry point for your bundle:

-   `index.js`
-   `index.jsx`
-   `index.ts`
-   `index.tsx`

> To use TypeScript, you need a `tsconfig.json`.
> [Read more](#typescript-support)

If you specify a `src/index.html` file, it will be included included in the
build process.

Your project structure should look similar to this:

```
├── src
│   ├── components
│   │   └── MyComponent.jsx
│   ├── index.html // optional
│   └── index.jsx
├── package-lock.json
├── package.json
└── .gitignore
```

An example project can be found
[here](https://github.com/leodr/chayns-scripts/tree/master/packages/example-project).

### Configuring Linting

We also provide an [ESLint](https://eslint.org/)-configuration that works with
JavaScript and TypeScript. ESLint comes preinstalled with this package, so
there's no need to install it seperately.

All you have to do is add the `eslintConfig` key to your `package.json`:

```json
{
    "...": "",
    "eslintConfig": {
        "extends": "@chayns-scripts"
    },
    "...": ""
}
```

For editor integrations check out the official
[ESLint integrations page](https://eslint.org/docs/user-guide/integrations#editors).

### Code Formatting

All projects are using `chayns-scripts` should be formatted with
[Prettier](https://prettier.io/). First, install Prettier and its
`package.json`-formatter in your project:

```bash
yarn add prettier prettier-plugin-packagejson -D
```

or

```bash
npm i prettier prettier-plugin-packagejson -D
```

Then add the `prettier` key with the following configuration to your
`package.json`:

```json
{
    "...": "",
    "prettier": {
        "tabWidth": 4,
        "singleQuote": true
    },
    "...": ""
}
```

Now you can format all files in your project with `yarn prettier . --write` or
`npx prettier . --write`.

To format your files on save, check out the
[Prettier editor integrations](https://prettier.io/docs/en/editors.html) page
(or the [Webstorm guide](https://prettier.io/docs/en/webstorm.html), if you're
using that).

> Using the same code formatter mostly important for Git diffs when working on a
> team. Read [this](https://prettier.io/docs/en/why-prettier.html) for more
> information on why you should use Prettier.

## Commands

### `chayns-scripts dev`

Starts a local development server on
[`http://localhost:1234/`](https://localhost:1234/) or
[`https://0.0.0.0:1234/`](https://0.0.0.0:1234/) if SSL was configured.

You can configure the host, port and SSL settings in a `chayns-scripts.json`
configuration file:

```json
{
    "development": {
        "host": "123.0.0.1",
        "port": 1337,
        "cert": "path-to-cert",
        "key": "path-to-key"
    },
    "...": ""
}
```

> To achieve faster (re-)build times this command only transpiles your code to
> work with the latest versions of Google Chrome, Safari and Firefox.

### `chayns-scripts build`

Compiles your source code for production. The output is emitted into a `build/`
directory in your project root.

Your code is transpiled to work with browsers matching the following
[browserslist](https://github.com/browserslist/browserslist) query:

```
>0.5%
not dead
not op_mini all
```

| Parameters        | Function                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-a`, `--analyze` | Analyze your bundle with [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer). [Read more](#analyzing-your-bundle) |

### `chayns-scripts lint`

Lints your JavaScript and TypeScript source code with
[ESLint](https://eslint.org/) and reports any errors, automatically fixing them
if possible.

We recommend to use our included [ESLint configuration](#eslint-configuration).

## Features

-   [TypeScript Support](#typescript-support)
-   [(S)CSS Support](#scss-support)
-   [Image Assets](#image-assets)
-   [HMR With `react-refresh` Support](#hmr-with-react-refresh-support)
-   [ESLint Configuration](#eslint-configuration)
-   [Analyzing Your Bundle](#analyzing-your-bundle)
-   [Tree-Shaking for chayns-components](#tree-shaking-for-chayns-components)
-   [The `chayns-scripts.json` Configuration File](#the-chayns-scriptsjson-configuration-file)

### TypeScript Support

TypeScript is supported by default and we encourage to use it.

#### Getting Started

To start using TypeScript in your project, create a `tsconfig.json` file in the
root of your project and start the `chayns-scripts dev` command. Your
`tsconfig.json` will automatically be filled our recommended configuration.

> If you do not have a `tsconfig.json` file and use `.ts` or `.tsx` files,
> ESLint will not be able to check these for errors.

#### Caveats

The TypeScript compilation is done by
[`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript).
This has some caveats, mainly not beeing able to use `const enum` and `export =`
or `import =`.

The automatically generated `tsconfig.json` includes `"isolatedModules": true`
in the TypeScript compiler options, which will make the TypeScript compiler warn
you when using unsupported features.

Refer to the
[Babel documentation](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)
for more information.

### (S)CSS Support

You can import `.css` and `.scss` files by default:

```js
import "./my-styles.scss"
```

#### CSS Modules

CSS modules are also supported. Every file ending with `.module.css` or
`.module.scss` will be treated as a module, to be used like this:

```jsx
import styles from "styles.css"

export function MyComponent() {
    return <div className={styles.box}>I am styled with CSS modules!</div>
}
```

> This is the preferred way to use CSS in your projects. For more information on
> CSS Modules check out
> [this article](https://css-tricks.com/css-modules-part-1-need/).

### Image Assets

Images with `.png`, `.jpg`, `.jpeg` or `.gif` extensions can be imported into
your components and will be automatically be included in the bundle. An image
modules default export will be it's final url:

```jsx
import imgSrc from "./my-image.png"

export function MyImage() {
    return <img src={imgSrc} alt="" />
}
```

> Small images (< 8 KB) will be inlined into the JavaScript code with data-urls
> and therefore won't appear as files next to your bundled code. This improves
> loading times of small images.

#### SVG Support

Importing `.svg` files will automatically make them available as React
components:

```jsx
import Icon from "./my-icon.svg"

export function MyIcon() {
    return <Icon />
}
```

### HMR With [`react-refresh`](https://github.com/pmmmwh/react-refresh-webpack-plugin) Support

The development server supports hot module reloading with `react-refresh` (the
improved alternative to the now deprecated `react-hot-loader`).

This allows you to see changes in your React components instantly after saving
without losing component state. Some patterns are unsupported, for further
information refer to
[this paragraph](https://github.com/pmmmwh/react-refresh-webpack-plugin#caveats).

### ESLint Configuration

Our ESLint-config `@chayns-scripts/eslint-config`) is automatically included
when `chayns-scripts` is installed.

To activate the config add an `eslintConfig` key to your `package.json`:

```json
{
    "...": "",
    "eslintConfig": {
        "extends": "@chayns-scripts"
    },
    "...": ""
}
```

or use one of the
[other options for configuring ESLint](https://eslint.org/docs/user-guide/configuring#using-configuration-files-1).

The configuration can be installed as a standalone package
(`@chayns-scripts/eslint-config`).

> Personal note: These rules exist for a reason. They extend the
> [AirBnB JavaScript Guidelines](https://github.com/airbnb/javascript) and
> should be taken seriously, especially the accessibility rules are disregarded
> way too often 😶. Pay attention to your linter and use disabling-comments
> sparingly.

If you think that a rule should be adjusted, please
[open an issue](https://github.com/leodr/chayns-scripts/issues/new) to discuss
the suggested change instead of adjusting your local configuration.

### Single-File Builds

In single-file build mode, the compiler will inline everything (CSS, assets,
etc.) into a single bundle. This can be useful when building smaller parts of a
UI, for example a wallet- or messenger-plugin.

### Analyzing Your Bundle

By passing the `--analyze` flag to `chayns-scripts build` you can use
[`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer)
to investigate your bundle-size. It will automatically open the tree-map of your
bundled files after compiling. This will run as long as you keep the terminal
process alive.

### Tree-Shaking [`chayns-components`](https://github.com/TobitSoftware/chayns-components)

The tree-shaking for chayns-components is built into the build configuration and
configured automatically. For further information refer to
[this document](https://github.com/TobitSoftware/chayns-components/blob/master/tree-shaking.md).

If your bundle size is unexpectedly large, please
[open an issue](https://github.com/leodr/chayns-scripts/issues/new).

### The `chayns-scripts.json` Configuration File

A `chayns-scripts.json` file in the root of your projects is used to configure
certain aspects of the scripts (but is not required).

Example `chayns-scripts.json` with all of the available options specified:

```json
{
    "development": {
        "host": "123.0.0.1",
        "port": 1337,
        "cert": "//path/to/ssl/cert",
        "key": "//path/to/ssl/key"
    },
    "output": {
        "singleBundle": false,
        "filename": "[package].[contenthash].bundle.js"
    }
}
```

#### `development` Options:

These options configure the behavior of your development server (the
`chayns-scripts dev` command).

| Option     | Type     | Explanation                                                                                                             |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| **`host`** | `string` | Configures the hostname of your dev server. Defaults to `localhost` or `0.0.0.0` if both `cert` and `key` are provided. |
| **`port`** | `number` | Sets the port of your dev server. Defaults to `1234`.                                                                   |
| **`cert`** | `string` | Specifies the path to a SSL certificate file for your development server. Not specified by default.                     |
| **`key`**  | `string` | Specifies the path to a SSL key file for your development server. Not specified by default.                             |

#### `output` Options:

These options configure your output bundles (affect the `chayns-scripts build`
command).

| Option             | Type      | Explanation                                                                                                                                                                                                                                                                                                          |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`singleBundle`** | `boolean` | Toggles the [single-file build functionality](#single-file-builds).                                                                                                                                                                                                                                                  |
| **`filename`**     | `string`  | Change the file-name your of primary output bundle. You can use any of the [webpack substitutions](https://webpack.js.org/configuration/output/#template-strings) as well as the `[package]` substitution (will be replaced by the name specified in your `package.json`). Defaults to `[package].[contenthash].js`. |

## Notes on Multiple Entrypoints

Some projects use multiple webpack entrypoints for different outputs to reduce
configuration duplication. Since this is already the purpose of this repository,
a project with multiple entrypoints doesn't seem to make much sense.

Therefore we do not support multiple entrypoints. If you have projects that are
related and you want them to be in the same repository, use a
[monorepo](https://www.toptal.com/front-end/guide-to-monorepos).
