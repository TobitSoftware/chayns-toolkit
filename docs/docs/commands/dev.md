---
title: "Dev Command"
slug: dev
sidebar_label: Dev
---

```bash
chayns-toolkit dev
```

Starts a development server on
[`http://localhost:1234/`](http://localhost:1234/) or
[`https://0.0.0.0:1234/`](https://0.0.0.0:1234/) if SSL certificates are
configured.

Fast Refresh is automatically enabled, so you can make edits to your project and
see them in real time.

You can configure SSL certificates, host and port in the `toolkit.config.js`
configuration file:

```js {3,4,5,6} title="/toolkit.config.js"
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

:::info

To achieve faster (re-)build times during development this command only
transpiles your code to work with the latest versions of Chrome, Safari and
Firefox.

:::

## Parameters

| Parameters         | Function                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `-d`, `--devtools` | Debug your application with the standalone React Devtools. [Read more](../features/devtools) |
