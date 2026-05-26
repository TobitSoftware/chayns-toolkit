---
title: Migration v3 to v4
---

This guide covers breaking changes when migrating from chayns-toolkit v3 to v4.

## Breaking Changes

### Internal Rsbuild Environments

The toolkit now uses Rsbuild's native environments system internally. This may affect custom webpack
configurations:

- The default config structure has changed due to Rsbuild's environments approach
- Custom webpack modifications via the `webpack` function in `toolkit.config.ts` may behave
  differently
- The `target` parameter is **no longer passed** to the webpack function

**Migration:** If you previously used the `target` parameter to conditionally configure webpack, you
now need to work with Rsbuild's environments. Target-specific adjustments that were previously made
with `if (target === 'server')` should now be applied to the `node` environment in the generated
Rsbuild config.

Alternatively, you can now specify a `target` property (`"web"` | `"node"` | `"web-worker"`) per
entry point in `output.entryPoints`, which simplifies configuration for scenarios like service
workers:

```ts
// toolkit.config.ts
export default {
    output: {
        entryPoints: {
            app: {
                pathIndex: "./src/index.js",
                pathHtml: "./src/index.html",
                target: "web",
            },
            sw: {
                pathIndex: "./src/service-worker.js",
                target: "web-worker",
            },
        },
    },
}
```

Test your custom webpack functions thoroughly and adjust them to work with the new config structure.

### Test Command Removed

The `test` command has been **removed** from the toolkit. This command was used to run tests with
Jest.

**Migration:** Use [Vitest](https://vitest.dev/) directly in your project instead. Vitest is the
recommended alternative and offers better performance and modern features.

### Webpack Public Path for SSR Projects

Projects with Server-Side Rendering (SSR) enabled will experience a change in the
`__webpack_public_path__`:

- Previously, `client` was part of the root directory and included in the publicPath
- Now, `client` is **no longer part** of the publicPath

**Migration:** If you have SSR enabled and reference remote entries, update paths like:

```diff
- ${__webpack_public_path__}v2.remoteEntry
+ ${__webpack_public_path__}client/v2.remoteEntry
```

This only affects projects with `output.serverSideRendering` enabled.

### SingleBundle Option Removed

The `singleBundle` option has been **removed** completely. This option was already non-functional
since v3.0.0.

**Migration:** Remove any `singleBundle` configuration from your `toolkit.config.ts`.

## New Features

Version 4 adds support for modern tooling and configurations:

- **Linaria** - Zero-runtime CSS-in-JS support (automatically enabled when installed)
- **React Compiler** - Automatic React optimization (automatically enabled when installed, can be
  disabled via `output.reactCompiler: false`)
- **Entry Point Targets** - Specify `target` per entry point in `output.entryPoints` (e.g., for
  service workers)
- **JSX Runtime** - Configure React runtime mode (e.g., `"automatic"`)
- **Required React Version** - Enforce minimum React version in your project

See the [configuration documentation](../configuration) for details on these features.

## Summary Checklist

- [ ] Test custom webpack functions (if used) - `target` parameter removed
- [ ] Migrate from `toolkit test` to Vitest
- [ ] Update remote entry paths if using SSR
- [ ] Remove `singleBundle` config if present
