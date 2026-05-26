---
title: Migration v2 to v3
---

The chayns-toolkit moved RsBuild instead of webpack in this version. This means customizing the
config has changed significantly.

- **output.apiVersion** has been removed
- **remoteEntry.js** has been renamed to **v2.remoteEntry.js**
- **output.serverSideRendering** has been added. This creates a build to use for modules in SSR.
    - Creates two subdirectories in build directory for client- and server-build.
- dotenv-Files will be automatically loaded now depending on the current NODE_ENV/BUILD_ENV
    - Only variables which start with PUBLIC\_ are passed to the javascript context. Other variables
      are only available in the toolkit.config.js to customize the config
- Not defined environment-variables are not replaced by RsBuild which can cause errors (webpack
  replaced them with empty string)
- **output.entryPoints** has been added and changes how to configure the entry points of the
  application [output configuration docs](../configuration/output.md)
