---
title: ESM/Typescript
slug: esm/ts
sidebar_label: ESM/Typescript
---

Previous versions only allowed the config to have cjs-format. New versions also added experimental
support for `esm` or `typescript` variants of the toolkit config. This lets you use `import` instead
of `require` or even gives you typescript support when editing your toolkit config, which can help
when you have to modify parts of the config.

## CommonJS (Default)

```js
// toolkit.config.js
const fs = require("fs")

module.exports = {
    development: {
        // ...
    },
    output: {
        // ...
    },
}
```

## ESM

```js
// toolkit.config.mjs
import fs from "fs"

export default {
    development: {
        // ...
    },
    output: {
        // ...
    },
}
```

## Typescript

```ts
// toolkit.config.ts
import type { ToolkitConfig } from "chayns-toolkit"
import fs from "fs"

const config: ToolkitConfig = {
    development: {
        // ...
    },
    output: {
        // ...
    },
}

export default config
```
