---
title: Environment Variables
slug: env-vars
---

All system environment variables as well as any variables specified in a
`.env.local` file in the root of your project directory will be available to
your code under `process.env.VAR_NAME`.

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

Keep your `.env.local` in your `.gitignore` file and not push it to source
control.

Set environment variables in your CI/CD solution (e.g. Vercel, TeamCity)
directly. Here's a guide on how to do that for
[TeamCity](https://www.jetbrains.com/help/teamcity/configuring-build-parameters.html).

If you want your app to behave differently for each build environment, e.g. use
a QA backend when doing QA tests, use an environment variable for it
(`BUILD_ENV` for example). Set a different value for this environment variable
for every build environment (`BUILD_ENV=qa`, `BUILD_ENV=production`, etc.).

## Caveats

During compilation, `chayns-toolkit` will look at your source code and look for
places where you access `process.env`. It will then match these places with the
available environment variables and do a string replacement if it can find one.

In other words this means that you cannot access the variables with any other
syntax. Only `process.env.VAR_NAME` will be replaced, but other syntax like
`const { VAR_NAME } = process.env` will not be detected.
