---
title: Environment Variables
slug: env-vars
---

With chayns-toolkit@3 `.env`-files are automatically loaded depending on the current environment
which is defined as `process.env.BUILD_ENV || (!development ? 'production' : 'development')`. This
will load up to 4 files, with the files listed at the bottom having higher priority:

```
.env
.env.local
.env.{environment}
.env.{environment}.local
```

Unlike previous versions only variables starting with `PUBLIC_` are exposed to your app, while
others are only available in your toolkit.config.js to modify the config.

These values can be accessed in your code on the `process.env` or `import.meta.env` namespace:

```js
const API_KEY = process.env.GOOGLE_MAPS_API_KEY
// or
const API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY
```

## Default Variables

The chayns-toolkit will define following variables by default:

-   process.env.VERSION
-   import.meta.env.VERSION
-   process.env.BUILD_VERSION
-   import.env.BUILD_VERSION
-   process.env.BUILD_ENV
-   import.meta.env.BUILD_ENV
-   process.env.\_\_PACKAGE_NAME\_\_
-   import.meta.env.\_\_PACKAGE_NAME\_\_
-   \_\_REQUIRED_REACT_VERSION\_\_

Rsbuild also injects some variables by default, for further information check their
[documentation](https://rsbuild.dev/guide/advanced/env-vars#default-variables).

## How to Use It Correctly

Keep your `.env*.local`-files in your `.gitignore` file and do not push them to source control.

Set environment variables in your CI/CD solution (e.g. Vercel, TeamCity) directly. Here's a guide on
how to do that for
[TeamCity](https://www.jetbrains.com/help/teamcity/configuring-build-parameters.html).

If you want your app to behave differently for each build environment, e.g. use a QA backend when
doing QA tests, set `process.env.BUILD_ENV` to `qa` and define a variable in the `.env.qa`-file.

## Caveats

During compilation, `chayns-toolkit` will look at your source code and look for places where you
access `process.env`. It will then match these places with the available environment variables and
do a string replacement if it can find one.

In other words this means that you cannot access the variables with any other syntax. Only
`process.env.VAR_NAME` will be replaced, but other syntax like `const { VAR_NAME } = process.env`
will not be detected.

⚠️ Unlike in older versions not defined variables will not be replaced anymore and could cause
runtime errors.

---

> ⚠️ The content below is only relevant for versions older than 3.

All system environment variables as well as any variables specified in a `.env.local` file in the
root of your project directory will be available to your code under `process.env.VAR_NAME`.

Starting with version 2.0.12 `.env`-files are also loaded according to the current environment. This
way up to 4 files can be loaded, with the files listed at the bottom having higher priority.

```
.env
.env.local
.env.{environment}
.env.{environment}.local
```

## Example

Your `.env.local` file would look something like this:

```env title="/.env.local"
GOOGLE_MAPS_API_KEY=1bc29b36f623ba82aaf6724fd3b16718
OTHER_IMPORTANT_API_KEY=ca794fb2d950acf25c964ecc35f2d7e2
... other values ...
```

These values can be accessed in your code on the `process.env` namespace:

```ts
const API_KEY = process.env.GOOGLE_MAPS_API_KEY
```

## How to Use It Correctly

Keep your `.env.local` in your `.gitignore` file and not push it to source control.

Set environment variables in your CI/CD solution (e.g. Vercel, TeamCity) directly. Here's a guide on
how to do that for
[TeamCity](https://www.jetbrains.com/help/teamcity/configuring-build-parameters.html).

If you want your app to behave differently for each build environment, e.g. use a QA backend when
doing QA tests, use an environment variable for it (`BUILD_ENV` for example). Set a different value
for this environment variable for every build environment (`BUILD_ENV=qa`, `BUILD_ENV=production`,
etc.).

## Caveats

During compilation, `chayns-toolkit` will look at your source code and look for places where you
access `process.env`. It will then match these places with the available environment variables and
do a string replacement if it can find one.

In other words this means that you cannot access the variables with any other syntax. Only
`process.env.VAR_NAME` will be replaced, but other syntax like `const { VAR_NAME } = process.env`
will not be detected.
