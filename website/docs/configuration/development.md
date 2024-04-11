---
title: Development Options
slug: development
sidebar_label: Development
---

These options configure your development server started with `chayns-toolkit dev`.

All options aswell as the `toolkit.config.js` file itself are optional.

```js title="/toolkit.config.js"
module.exports = {
    development: {
        /**
         * The hostname of your development server. Defaults to `localhost` or
         * `0.0.0.0` if both `cert` and `key` are provided.
         *
         * @type {string}
         */
        host: "123.0.0.1",

        /**
         * The port the development server will run on. Defaults to `1234`.
         *
         * @type {number}
         */
        port: 1337,

        /**
         * The ports the development servers will run on. Only used when
         * output.serverSideRendering is true.
         * Defaults to { client: 1234, server: 1235 }.
         * @type {{ client: number, server: number }}
         */
        ports: { client: 4001, server: 4002 },

        /**
         * The path to a SSL certificate file for your development server. Not
         * specified by default.
         *
         * @type {string}
         */
        cert: "//path/to/ssl/cert",

        /**
         * The path to a SSL key file for your development server. Not specified
         * by default.
         *
         * @type {string}
         */
        key: "//path/to/ssl/key",
    },
    // ... other options ...
}
```
