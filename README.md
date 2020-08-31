<div align="center">
    <h1><img src="assets/logo.png" width="500px" alt="chayns-scripts" /></h1>
    <p>A zero-config toolchain for developing chayns apps.</p>
</div>

The toolchain contains commands for developing and building your app, aswell as
quality assurance in the form of linting and testing _(soon to come)_.

> This toolchain is specialized in developing apps for the
> [chayns](https://chayns.org/) platform. If you want to develop a general
> purpose web app, take a look at [Next.js](https://nextjs.org/) or
> [`create-react-app`](https://create-react-app.dev/)

## Overview

- [Get Started](#get-started)
  - [Linting](#linting)
- [Commands](#commands)
  - [`chayns-scripts dev`](#chayns-scripts-dev)
  - [`chayns-scripts build`](#chayns-scripts-build)
  - [`chayns-scripts lint`](#chayns-scripts-lint)
- [Features](#features)
  - [TypeScript support](#typescript-support)
  - [(S)CSS Support](#scss-support)
  - [Image Assets](#image-assets)
  - [HMR with `react-refresh` Support](#hmr-with-react-refresh-support)
  - [ESLint configuration](#eslint-configuration)
  - [Analyzing your output bundle](#analyzing-your-output-bundle)
  - [Tree-Shaking for chayns-components](#tree-shaking-for-chayns-components)
  - [The `chayns-scripts.json` configuration file](#the-chayns-scriptsjson-configuration-file)
- [Notes on Multiple Entrypoints](#notes-on-multiple-entrypoints)

## Get Started

Install the `chayns-scripts` package into your project with

```bash
yarn add chayns-scripts -D
```

or

```bash
npm i chayns-scripts -D
```

This will make the `chayns-scripts dev`, `chayns-scripts build` and
`chayns-scripts lint` commands available in your project.

We recommend adding your these scripts to your package.json:

```json
{
	...
	"scripts": {
		"dev": "chayns-scripts dev",
		"build": "chayns-scripts build",
		"lint": "chayns-scripts lint"
    },
    ...
}
```

We will search for entry files in your `src/` directory with one of the
following names:

- `index.js`
- `index.jsx`
- `index.ts`
- `index.tsx`

You will also need a `index.html` file in your `src/` directory which will act
as the template for your app.

> If you want to use TypeScript, you will also need a `tsconfig.json`. You can
> read more about that [here](#typescript-support).

So your general directory structure should look something like this:

```
├── src
│   ├── components
│   │   └── MyComponent.jsx
│   ├── index.html
│   └── index.jsx
├── package-lock.json
├── package.json
└── .gitignore
```

### Linting

We also provide an [ESLint](https://eslint.org/)-configuration for JavaScript
and TypeScript. To activate linting install ESLint first:

```bash
yarn add eslint -D
```

or

```bash
npm i eslint -D
```

Then add a `eslintConfig` key to your `package.json` like that:

```json
{
    ...
    "eslintConfig": {
        "extends": "@chayns-scripts"
    },
    ...
}
```

## Commands

### `chayns-scripts dev`

This command starts a local development server. It will compile your source code
to be compatible with the latest versions of Google Chrome and Firefox for
faster builds.

By default it will open the server on
[`https://localhost:1234/`](https://localhost:1234/) if no https certificate is
provided, or on [`https://0.0.0.0:1234/`](https://0.0.0.0:1234/) if you did
provide one.

You can configure the host, port and SSL settings in a `chayns-scripts.json`
configuration file:

```json
{
	"host": "123.0.0.1",
	"port": 1337,
	"https": {
		"cert": "path-to-cert",
		"key": "path-to-key"
	}
}
```

### `chayns-scripts build`

This will build your source code for production. It will emit the assets in a
`build/` directory in your project root.

#### Parameters

| Parameter         | Function                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-a`, `--analyze` | Open [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) in your default browser after the build is complete |

### `chayns-scripts lint`

This command will lint all `*.js(x)` and `*.ts(x)` files in your project and
report any ESLint errors. It will also try to automatically fix your errors.

## Features

- [TypeScript support](#typescript-support)
- [(S)CSS Support](#scss-support)
- [Image Assets](#image-assets)
- [HMR with `react-refresh` Support](#hmr-with-react-refresh-support)
- [ESLint configuration](#eslint-configuration)
- [Analyzing your output bundle](#analyzing-your-output-bundle)
- [Tree-Shaking for chayns-components](#tree-shaking-for-chayns-components)
- [The `chayns-scripts.json` configuration file](#the-chayns-scriptsjson-configuration-file)

### TypeScript support

TypeScript is supported by default and you are encouraged to use it.

#### Getting started

If you want to start using TypeScript in your project, create a `tsconfig.json`
file in the root of your project and start the `chayns-scripts dev` command.
Your `tsconfig.json` will automatically be filled in with great defaults for the
TypeScript compiler and editor support.

> If you don't have a `tsconfig.json` file and try to use `.ts` or `.tsx` files,
> ESLint will not be able to lint your project and will throw errors.

#### Caveats

Keep in mind that the TypeScript compilation is done by
[`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript).
This has some caveats, mainly not beeing able to use `const enum` and `export =`
or `import =`. Refer to the
[documentation](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)
for more information.

### (S)CSS Support

`.css` and `.scss` files are supported by default. Just import them in your
JavaScript:

```js
import "./my-styles.scss"
```

#### [(S)CSS Modules](https://github.com/css-modules/css-modules)

CSS (or SCSS) modules are also supported. Every file ending with `.module.css`
or `.module.scss` will be treated as a module:

```jsx
import styles from "styles.css"

export function MyComponent() {
	return <div className={styles.box}>I am styled with CSS modules!</div>
}
```

> This is the preferred way to use CSS in your projects.

### Image Assets

Images with `.png`, `.jp(e)g` or `.gif` extensions can be imported into your
components. The default export from an image module will be it's url.

```jsx
import imgSrc from "./my-image.png"

export function MyImage() {
	return <img src={imgSrc} alt="" />
}
```

#### SVG Support

Importing `.svg` files will make them available as React components.

```jsx
import Icon from "./my-icon.svg"

export function MyIcon() {
	return <Icon />
}
```

### HMR with [`react-refresh`](https://github.com/pmmmwh/react-refresh-webpack-plugin) Support

The development server supports hot module reloading with `react-refresh` (the
improved alternative to the now deprecated `react-hot-loader`).

### ESLint configuration

The provided ESLint-configuration can be installed as a standalone package:
`@chayns-scripts/eslint-config`.

> Note that these rules exist for a reason. These rules extend the
> [AirBnB JavaScript Guidelines](https://github.com/airbnb/javascript) and
> should be taken seriously! Especially the accessibility rules are disregarded
> too often 😶. Pay attention to your linter!

### Analyzing your output bundle

With the build script (`chayns-scripts build`) you can use
[`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer)
to investigate performance bottlenecks in your bundle. After bundling it will
automatically open the tree-map of your output files in your default browser. It
will run as long as you keep the terminal process alive.

To activate the bundle analyzer for a build, pass the `-a` or `--analyzer` flag
to `chayns-scripts build`.

### Tree-Shaking for [chayns-components](https://github.com/TobitSoftware/chayns-components)

The tree-shaking for chayns-components is built into the build configuration and
configured automatically.
(https://github.com/TobitSoftware/chayns-components/blob/master/tree-shaking.md)

### The `chayns-scripts.json` configuration file

A `chayns-scripts.json` file in the root of your projects will serve as a
configuration file for the scripts.

Example file:

```json
{
	"host": "123.0.0.1",
	"port": 1337,
	"https": {
		"cert": "path-to-cert",
		"key": "path-to-key"
	}
}
```

| Option      | Type                             | Explanation                                                                                                                                                                            |
| ----------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`host`**  | `string`                         | This configures the hostname for your dev server (used by `chayns-scripts dev`). Will default to `localhost` without SSL certificates or `0.0.0.0` when SSL certificates are provided. |
| **`port`**  | `number`                         | This sets the port for your dev server. Defaults to `1234`.                                                                                                                            |
| **`https`** | `{ cert: string; key: string; }` | This option configures SSL certificates to be used during development. `cert` and `key` have to be paths to the corresponding `.crt` and `.key` files.                                 |

## Notes on Multiple Entrypoints

Sometimes multiple entrypoints are used in webpack configurations to reduce
duplication of configuration. Since this is already the goal of this repository,
a project with multiple entrypoints doesn't seem to make much sense now.

For the time beeing we do not support multiple entrypoints. If you have projects
that are related and you want them to be in the same repository, use a
[monorepo](https://www.toptal.com/front-end/guide-to-monorepos).
