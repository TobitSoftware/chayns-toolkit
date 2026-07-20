---
title: Module Federation
slug: module-federation
---

chayns-toolkit supports [Module Federation](https://module-federation.io/) out of the box, allowing
you to expose modules that can be consumed by other applications at runtime.

## Configuration

Module Federation is enabled when you configure the `output.exposeModules` option in your
`toolkit.config.js`:

```js title="/toolkit.config.js"
module.exports = {
    output: {
        exposeModules: {
            "./MyComponent": "./src/MyComponent",
            "./utils": "./src/utils/index",
        },
    },
}
```

This will generate a `v2.remoteEntry.js` file in your build output that other applications can use
to load your exposed modules.

## Security & Restrictions

Module Federation in the chayns® ecosystem is restricted to **trusted domains** for security
reasons. This means:

- ✅ **Internal modules**: Modules hosted on trusted Tobit domains can be consumed by other chayns®
  applications
- ❌ **External customer modules**: External customers cannot provide modules that are consumable by
  other chayns® applications, as their domains are not in the trusted domains list

### Workaround for External Customers

While external customers cannot expose modules to other chayns® applications, they can still use
Module Federation **within their own iframe/application**. This allows them to:

- Split their own application into multiple federated modules
- Load remote modules from their own infrastructure
- Use Module Federation's benefits (code splitting, lazy loading, etc.) within their own domain

This restriction ensures that only verified and trusted modules can be loaded across the chayns®
platform, maintaining security and stability for all users.

## Mixing Entry Points and Exposed Modules

When you use both `output.entryPoints` and `output.exposeModules` in the same project, you need to
be aware of Module Federation's async boundary requirement.

### The Async Boundary Problem (RUNTIME-005)

Module Federation requires an **async boundary** between the initial chunk and your application code
when exposing modules. Without this boundary, you may encounter the `RUNTIME-005` error in
production builds:

```
Shared module is not available for eager consumption
```

This error occurs because Module Federation needs to load shared dependencies asynchronously before
your application code runs. The problem typically manifests as:

- **Development mode**: Often works fine because of different chunk strategies
- **Production mode**: Fails at runtime when trying to load shared modules
- **Error timing**: Happens during application initialization, not at build time

The root cause is that when you have both entry points and exposed modules, the entry point tries to
eagerly consume shared dependencies that haven't been loaded yet, because Module Federation hasn't
had a chance to initialize them asynchronously.

### Solution: Bootstrap Pattern

To fix this, split your entry point into two files using the **bootstrap pattern**:

**1. Create a bootstrap file** (`src/bootstrap.jsx` or `src/bootstrap.tsx`):

```jsx title="/src/bootstrap.jsx"
// This is your actual application code
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

const root = createRoot(document.getElementById("root"))
root.render(<App />)
```

**2. Update your entry point** (`src/index.jsx` or `src/index.tsx`):

```jsx title="/src/index.jsx"
// This creates the async boundary
import("./bootstrap")
```

**3. Update toolkit.config.js**:

```js title="/toolkit.config.js"
module.exports = {
    output: {
        entryPoints: {
            index: {
                pathIndex: "./src/index", // Points to the file with import()
                pathHtml: "./src/index.html",
            },
        },
        exposeModules: {
            "./MyComponent": "./src/MyComponent",
        },
    },
}
```

The dynamic `import()` in your entry point creates the required async boundary, allowing Module
Federation to properly initialize shared dependencies before loading your application code.

:::tip Example Implementation

The [example project](https://github.com/TobitSoftware/chayns-toolkit/tree/main/example) in the
chayns-toolkit repository uses this bootstrap pattern. You can refer to `src/index.jsx` and
`src/bootstrap.tsx` for a working implementation.

:::

### When Is This Required?

You need the bootstrap pattern when:

- ✅ You use both `entryPoints` and `exposeModules` in the same project

You don't need it when:

- ❌ You only use `exposeModules` (no entry points)
- ❌ You only use `entryPoints` (no exposed modules)
- ❌ You have both, but set `disableReactSharing: true` **and** don't use any other shared
  dependencies (very rare case)

**In practice:** If you're mixing entry points and exposed modules, you almost always need the
bootstrap pattern, since React is shared by default.

### Disabling Module Federation per Entry Point

Some entry points should stay out of Module Federation even when the project exposes federated
modules. This can apply to a plain browser helper script, but also to a complete HTML entry point
that should not load the Module Federation runtime.

For those cases, set `moduleFederation: false` on the specific entry point:

```js title="/toolkit.config.js"
module.exports = {
    output: {
        exposeModules: {
            "./AppWrapper": "./src/components/AppWrapper",
        },
        entryPoints: {
            index: {
                pathIndex: "./src/index",
                pathHtml: "./src/index.html",
            },
            settings: {
                pathIndex: "./src/settings",
                pathHtml: "./src/settings.html",
                moduleFederation: false,
            },
            helperScript: {
                pathIndex: "./src/helper-script",
                filename: "static/js/helperScript.js",
                moduleFederation: false,
            },
        },
    },
}
```

This keeps the marked entry point out of the federated web environment, so it does not receive the
Module Federation runtime or shared dependency wiring. Internally, that entry point is built in a
separate non-federated web environment.

Use this when:

- the entry is a separate browser script that should load only its own code
- the entry is a full HTML page that should run independently from the exposed modules in the same
  build

This option only disables Module Federation for the specific entry point.

Because the entry point moves into a separate web environment, it no longer shares chunks with the
federated web entry points from the same build. This is usually a good fit for separate scripts or
pages that are never loaded together, but it can increase build output size when large dependencies
are duplicated across both environments.

### Troubleshooting RUNTIME-005

If you encounter the `RUNTIME-005` error:

1. **Check your configuration**: Verify that you have both `entryPoints` and `exposeModules`
   configured
2. **Verify the bootstrap pattern**: Make sure your entry point file only contains
   `import("./bootstrap")` and nothing else
3. **Check imports**: Ensure your bootstrap file doesn't have any static imports of shared
   dependencies before the dynamic import
4. **Test in production mode**: Run a production build locally with
   `chayns-toolkit build && chayns-toolkit serve` to reproduce the issue

## Version Compatibility

When using Module Federation with shared dependencies like `chayns-api`, it's important to maintain
version compatibility between your toolkit and the API.

### chayns-api Compatibility

The chayns-toolkit major version should always be **1 higher** than the chayns-api major version
you're using:

| chayns-api Version | chayns-toolkit Version |
| ------------------ | ---------------------- |
| v1.x.x             | v2.x.x                 |
| v2.x.x             | v3.x.x                 |
| v3.x.x             | v4.x.x                 |

This alignment ensures that the Module Federation runtime and shared dependencies are compatible
across all applications in your federation.

### Why This Matters

When multiple applications share dependencies through Module Federation, they must agree on
compatible versions. Mismatched versions can lead to:

- Runtime errors when loading remote modules
- Duplicate dependency loading
- Inconsistent behavior across federated applications

**Example package.json:**

```json
{
    "dependencies": {
        "chayns-api": "^3.0.0"
    },
    "devDependencies": {
        "chayns-toolkit": "^4.0.0"
    }
}
```

## Shared Dependencies

By default, chayns-toolkit automatically shares the following dependencies in Module Federation:

- `react`
- `react-dom`
- `react-dom/server`
- `react-dom/client` (when available)

The required versions are automatically detected from your `package.json`. You can disable React
sharing if needed:

```js title="/toolkit.config.js"
module.exports = {
    output: {
        exposeModules: {
            "./MyComponent": "./src/MyComponent",
        },
        disableReactSharing: true,
    },
}
```

### Overriding Required Versions

By default, chayns-toolkit derives the Module Federation `shared.requiredVersion` values from
`peerDependencies` first, then from `dependencies` in your `package.json`.

If your package intentionally allows a broader range (e.g., `"react": "18 || 19"`), but your
federated module must use a stricter version at runtime, you can override this via
`output.reactRequiredVersions`:

```js title="/toolkit.config.js"
module.exports = {
    output: {
        exposeModules: {
            "./MyComponent": "./src/MyComponent",
        },
        // Apply the same version to react, react-dom and react-dom/client
        reactRequiredVersions: "^19.0.0",

        // Or use an object if you need to specify both explicitly
        reactRequiredVersions: {
            react: "^18.2.0",
            reactDom: "^18.2.0",
        },
    },
}
```

**Options:**

- **String**: Applies the same override to `react`, `react-dom` and `react-dom/client`
- **Object**:
    - `react`: Version range for React
    - `reactDom`: Version range for react-dom (also applies to `react-dom/client` and
      `react-dom/server`)
    - **Note**: React and React-DOM should always use the same major version

This is particularly useful when working with federated modules that need to ensure specific React
version compatibility across different applications.

## Remote Entry File

The generated `v2.remoteEntry.js` file is the entry point for consuming applications. It contains:

- Metadata about exposed modules
- Shared dependency configuration
- Runtime code for module loading

Consuming applications can load your remote modules by adding the remote entry to their Module
Federation configuration.

## Manifest

You can enable manifest generation to provide additional metadata about your module:

```js title="/toolkit.config.js"
module.exports = {
    output: {
        exposeModules: {
            "./AppWrapper": "./src/AppWrapper",
        },
    },
    manifest: {
        module: true,
        externalAssets: ["https://example.com/external-script.js"],
        textStringLibraries: ["my-library"],
    },
}
```

The manifest will include:

- Build version
- Exposed modules list
- External assets (optional)
- Text string libraries (optional)

## Server-Side Rendering

Module Federation also works with server-side rendering. When you configure
`output.serverSideRendering`, separate bundles are created for both client and server:

```js title="/toolkit.config.js"
module.exports = {
    output: {
        exposeModules: {
            "./AppWrapper": "./src/AppWrapper",
        },
        serverSideRendering: true,
    },
}
```

This creates two `v2.remoteEntry.js` files, one in the `client/` and one in the `server/`
subdirectory of your build output.
