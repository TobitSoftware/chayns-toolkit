# `chayns-toolkit build`

Compiles your source code for production. The output is emitted into a `build/`
folder at the root of your project.

## Analyzing the Bundle Size

When you pass the `--analyze` flag
[`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer)
starts up after the build so you can investigate the bundle size. It runs for as
long as you keep the terminal process alive.

## Parameters

| Parameters        | Function                                                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-a`, `--analyze` | Analyze your bundle with [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) after compilation. [Read more](#analyzing-your-bundle) |

## Browser Support

Your code is transpiled to work with browsers matching the following
[browserslist](https://github.com/browserslist/browserslist) query:

```
>0.5%
not dead
not op_mini all
```

You can check the exact browsers and versions this matches at any time by
running

```bash
npx browserslist ">0.5%, not dead, not op_mini all"
```
