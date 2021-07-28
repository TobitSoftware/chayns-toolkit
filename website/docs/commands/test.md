---
title: "Test Command"
slug: test
sidebar_label: Test
---

```bash
chayns-toolkit test
```

:::caution

This command is currently experimental. It is not semantically versioned and its
API may change during any release.

:::

Runs all of your [Jest](https://jestjs.io/) test suites. Files matching one of
the following schemas are identified as test files:

-   Any file ending with `.spec.@(js|jsx|ts|tsx)` or `.test.@(js|jsx|ts|tsx)`
-   Any JavaScript or TypeScript file in a folder named `__tests__`

The matchers from
[`@testing-library/jest-dom`](https://testing-library.com/docs/dom-testing-library/intro/)
will automatically be injected into the Jest environment, so you can write
meaningful assertions on the DOM like this:

```ts
import { render } from "@testing-library/react"
import { MyComponent } from "./MyComponent"

test('should have "Click Me!" as its text', () => {
    const { getByRole } = render(<MyComponent />)

    expect(getByRole("button")).toHaveTextContent("Click Me!")
})
```

## Getting Started with Testing

If you're new to testing in general, check out the
["Getting Started" page](https://jestjs.io/docs/getting-started) from the Jest
docs.

After you learn the basic syntax and architecture of tests check out the
[Testing Library docs](https://testing-library.com/docs/). Testing Library is a
collection of tools to help you write more meaningful tests for your frontend
code.

The general rule for testing frontend components is:

> The more your tests resemble the way your software is used, the more
> confidence they can give you.
>
> **Kent C. Dodds**
> ([source](https://twitter.com/kentcdodds/status/977018512689455106))

## Parameters

| Parameters           | Function                                                       |
| -------------------- | -------------------------------------------------------------- |
| `-w`, `--watch`      | Runs Jest in [watch mode](https://jestjs.io/docs/cli#--watch)  |
| `--setupFile <path>` | Executes the setup file specified by `<path>` before any tests |

## Customizing jest-Config

Even though the included jest configuration will handle most cases, we also
provide the ability to modify it.

> Please note that the jest configuration does not follow semantic versioning
> and can change with any release.

Use the `jest` property of the configuration object to specify a function that
receives the default jest configuration. Unlike the webpack function it
(currently) does not receive additional information about the build. This
modifier function has to return the modified configuration.

```js title="/toolkit.config.js"
module.exports = {
    jest(config) {
        config.transformIgnorePatterns = [
            // required for node_modules with es6 syntax
            "/node_modules/(?!lodash-es).+\\.js$",
        ]

        return config
    },
}
```
