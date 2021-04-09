---
title: Using React Devtools
slug: react-devtools
---

Sometimes you might not be able to use the React Devtools browser extension,
e.g. when developing content inside an iframe.

For this case we support using the standalone React Devtools via the
[`react-devtools`](https://github.com/facebook/react/tree/master/packages/react-devtools)
NPM-package. To use it, first install it as a dev dependency of your project:

```bash
# Yarn
yarn add react-devtools -D

# NPM
npm install react-devtools -D
```

Now you can pass the `-d` (or `--devtools`) option to the `chayns-toolkit dev`
command. It then starts the React Devtools window, which will connect to your
application once it has loaded in the browser.
