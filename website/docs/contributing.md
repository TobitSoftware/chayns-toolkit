---
title: Contributing
slug: contributing
---

First you should
[fork the project](https://github.com/tobitsoftware/chayns-toolkit/fork) to your
own GitHub-Account to be able to commit changes to it.

Then clone the forked version to your computer. Install the packages by
executing

```bash
# Install packages for `chayns-toolkit` project
npm i

# Install packages for `example` project
npm --prefix example i
```

If you want to test any changes you made with the example project you have to
build `chayns-toolkit` first. For that you can run `npm run build` or let
`npm run watch` run in the background to continously build it.

Now you can open a shell in the `example/` directory and use `chayns-toolkit`
just like you would on any other project.

## Releasing a new version

If you have enough permissions on GitHub and NPM you can release a new version.

1. Use `npm version (patch|minor|major)` to increase the version.
2. Use `npm publish` to release the new version.

You do not have to build the project beforehand, that will be done pre-publish.
