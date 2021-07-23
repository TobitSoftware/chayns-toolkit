---
title: TypeScript Support
slug: typescript
---

TypeScript is fully supported out of the box and can be enabled in a breeze.

## Getting Started

To start using TypeScript in your project, create a `tsconfig.json` file in the
root of your project.

The next time you start the `chayns-toolkit dev` command, we will automatically
populate the `tsconfig.json`-file with our recommended configuration.

:::note

Even though you can use `.ts` or `.tsx` files without a `tsconfig.json` it is
highly recommended to set it up. This will give you better editor support and
ESLint warnings.

:::

🎉 **Congrats!** You are now ready to use TypeScript in your `.ts` and `.tsx`
files!

## Caveats

The TypeScript transpilation is done by Babel with
[`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript).
This has some caveats, mainly not being able to use these features:

-   `const enum`
-   `export =` and `import =`
-   TypeScript namespaces

The automatically generated `tsconfig.json` includes the
`"isolatedModules": true` option in the TypeScript compiler options so you will
get warned when using these unsupported features.

Refer to the "Caveats" section in the
[Babel documentation](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)
for more information.

## Support for custom path aliases

`chayns-toolkit` supports the `paths` and `baseUrl` options from `tsconfig.json`
or `jsconfig.json` to create more readable paths.

You can set the `baseUrl` like so in your `tsconfig.json` or `jsconfig.json`:

```json {3} title="/tsconfig.json"
{
    "compilerOptions": {
        "baseUrl": "./src"
    }
}
```

Then you can import files based on your `baseUrl`:

```ts
import { MyComponent } from "components/MyComponent"
// Instead of "../../components/MyComponent" or something along those lines
```

If you want to know more about
[`baseUrl`](https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url)
and
[`paths`](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
check the TypeScript docs.
