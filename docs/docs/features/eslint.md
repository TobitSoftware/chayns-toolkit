---
title: ESLint
slug: eslint
---

`chayns-toolkit` provides an [ESLint](https://eslint.org/) preset that is
optimized for developing React applications.

To activate the config add an `eslintConfig` key to your `package.json`:

```json
{
    "...": "",
    "eslintConfig": {
        "extends": "@chayns-toolkit"
    },
    "...": ""
}
```

> Alternatively you can also create a `.eslintrc` file or use one of the
> [other options for configuring ESLint](https://eslint.org/docs/user-guide/configuring#using-configuration-files-1).

## Using the Configuration without `chayns-toolkit`

For some projects `chayns-toolkit` can't help your development workflow, e.g.
for developing NPM libraries, CLI tools or Node.js server applications.

The ESLint configuration can also be installed as a standalone package:

```bash
# Yarn
yarn add @chayns-toolkit/eslint-config -D

# NPM
npm install @chayns-toolkit/eslint-config -D
```

## Adjusting the Configuration

For special use-cases the rules can be adjusted or deactivated. Refer to the
[ESLint documentation](https://eslint.org/docs/user-guide/configuring) on how to
do that.

If you think a rule in the configuration should be enabled, disabled or
adjusted, please consider
[opening an issue](https://github.com/TobitSoftware/chayns-toolkit/issues/new)
to discuss the suggested change instead of changing your local configuration.
