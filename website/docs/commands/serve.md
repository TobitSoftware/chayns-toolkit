---
title: "Serve Command"
slug: serve
sidebar_label: Serve
---

```bash
chayns-toolkit serve

chayns-toolkit serve -p <number>
```

Serves static files similar to [serve](https://www.npmjs.com/package/serve), but is designed to
simplify serving files from build output as easy as possible.

This will serve all files configured via `output.path` (Default: `build`) and use the port- and
ssl-configuration from the `development`-section. Optionally the port from the config can be
overriden like in the 2nd example above.
