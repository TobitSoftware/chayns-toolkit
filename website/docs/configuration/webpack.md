---
title: Customizing the Webpack Configuration
slug: webpack-customization
sidebar_label: Webpack Customization
---

Even though the included webpack configuration will handle most cases, we also provide the ability
to modify it.

> Please note that the webpack configuration does not follow semantic versioning and can change with
> any release.

Use the `webpack` property of the configuration object to specify a function that receives the
default webpack configuration along with some other information. This modifier function has to
return the modified configuration.

```js {5} title="/toolkit.config.js"
module.exports = {
    webpack(config, options) {
        // ... do some modifications...

        return config
    },
    // ... other options ...
}
```

The modifier function receives two arguments. First is our default webpack configuration, second is
an object with additional information and utilities, following this interface:

```ts
interface Options {
    /**
     * The webpack module. To avoid version conflicts, you should not import
     * webpack on your own if you want to use one of the built-in plugins.
     * No longer available with version 3
     */
    webpack: webpack

    /**
     * A boolean that specifies wether the configuration is for development or
     * production.
     */
    dev: boolean

    /**
     * Specifies if the current build is for client or server
     */
    target: "client" | "server"
}
```

> If you find yourself modifying the webpack configuration often for a feature that you think
> belongs in our default config, please
> [open an issue](https://github.com/TobitSoftware/create-chayns-app/issues) to discuss it.

## Examples

### DefinePlugin

Instead of webpack.DefinePlugin you can simply define variables via assignment to
config.source.define.

```js
module.exports = {
    webpack(config, { dev }) {
        config.source.define.__DEVELOPMENT__ = dev
        config.source.define.__QA__ = process.env.BUILD_ENV === "qa"
        config.source.define.__STAGING__ = process.env.BUILD_ENV === "staging"
        config.source.define.__PRODUCTION__ = process.env.BUILD_ENV === "production"

        return config
    },
}
```

### Adding react-compiler

Add the required devDependencies:
`npm i @rsbuild/plugin-babel babel-plugin-react-compiler eslint-plugin-react-compiler -D`

When using react version prior to 19 also add: `npm i react-compiler-runtime -D`

```js
const { pluginBabel } = require("@rsbuild/plugin-babel")

module.exports = {
    webpack(config) {
        config.plugins.push(
            pluginBabel({
                include: /\.(?:jsx|tsx)$/,
                babelLoaderOptions(opts) {
                    opts.plugins?.unshift([
                        "babel-plugin-react-compiler",
                        {
                            // specify target react version, can be omitted for versions prior to 19
                            target: "18", // '17' || '18' || '19'
                        },
                    ])
                },
            })
        )

        return config
    },
}
```

⚠️ Below examples only work for versions prior to 3

### Adding a Babel Plugin

This example shows how to add
[`@babel/plugin-proposal-pipeline-operator`](https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator)
to `babel-loader`:

```js title="/toolkit.config.js"
module.exports = {
    webpack(config) {
        const babelRule = config.module.rules.find(
            (rule) => rule.use.loader && rule.use.loader.includes("babel-loader")
        )

        if (!babelRule) return config

        const babelOptions = babelRule.use.options

        const pipelinePlugin = ["@babel/plugin-proposal-pipeline-operator", { proposal: "smart" }]

        if (Array.isArray(babelOptions.plugins)) {
            babelOptions.plugins.push(pipelinePlugin)
        } else {
            babelOptions.plugins = [pipelinePlugin]
        }

        return config
    },
}
```

### Polyfilling a Node Module

This example shows how to polyfill the Node.js `crypto` module using a
[resolve fallback](https://webpack.js.org/configuration/resolve/#resolvefallback):

```js title="/toolkit.config.js"
module.exports = {
    webpack(config) {
        config.resolve.fallback.crypto = require.resolve("crypto-browserify")

        return config
    },
}
```
