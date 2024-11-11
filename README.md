<div align="center">
    <a href="https://tobitsoftware.github.io/chayns-toolkit/" target="_blank">
        <h1 align="center">
            <img src="https://raw.githubusercontent.com/TobitSoftware/chayns-toolkit/HEAD/assets/logo.png" width="500px" alt="chayns-toolkit" />
        </h1>
    </a>
    <p align="center">A zero-config toolchain for developing chayns® apps.</p>
    <p align="center">
        <a href="https://github.com/TobitSoftware/chayns-toolkit/blob/master/LICENSE" target="_blank">
            <img src="https://img.shields.io/github/license/TobitSoftware/chayns-toolkit?color=%23A855F7&labelColor=%2327272A&style=for-the-badge" alt="" />
        </a>
        <a href="https://www.npmjs.com/package/chayns-toolkit" target="_blank">
            <img src="https://img.shields.io/npm/v/chayns-toolkit?color=%236366F1&labelColor=%2327272A&style=for-the-badge" alt="" />
        </a>
        <a href="https://github.com/TobitSoftware/chayns-toolkit/branches" target="_blank">
            <img src="https://img.shields.io/github/last-commit/TobitSoftware/chayns-toolkit?color=%2310B981&labelColor=%2327272A&style=for-the-badge" alt="" />
        </a>
    </p>
</div>

---

**chayns-toolkit** contains pre-configured tools for the development, publishing and quality
assurance of your app. It was created to simplify the development experience when working with
[React](https://reactjs.org).

> This toolchain is specialized in developing apps and plugins for the
> [chayns®](https://chayns.org/) platform. If you want to develop a general purpose web app, take a
> look at [Next.js](https://nextjs.org/). <br>

<br>

## ❯ Getting Started

For the easiest way to start a new chayns® project with chayns-toolkit check out
[`create-chayns-app`](https://github.com/TobitSoftware/create-chayns-app).

<br>

## ❯ Documentation

Visit
[https://tobitsoftware.github.io/chayns-toolkit/](https://tobitsoftware.github.io/chayns-toolkit/)
to view the full documentation.

<br>

## ❯ Migration v2 to v3

The chayns-toolkit moved RsBuild instead of webpack in this version. This means customizing the
config has changed significantly.

-   **output.apiVersion** has been removed
-   **remoteEntry.js** has been renamed to **v2.remoteEntry.js**
-   **output.serverSideRendering** has been added. This creates a build to use for modules in SSR.
    -   Creates two subdirectories in build directory for client- and server-build.
-   dotenv-Files will be automatically loaded now depending on the current NODE_ENV/BUILD_ENV
    -   Only variables which start with PUBLIC\_ are passed to the javascript context. Other
        variables are only available in the toolkit.config.js to customize the config
-   Not defined environment-variables are not replaced by RsBuild which can cause errors (webpack
    replaced them with empty string)
-   **output.entryPoints** has been added and changes how to configure the entry points of the
    application
    [https://tobitsoftware.github.io/chayns-toolkit/docs/configuration/output](https://tobitsoftware.github.io/chayns-toolkit/docs/configuration/output)

## ❯ Contributing

Please see our
[contributing document](https://tobitsoftware.github.io/chayns-toolkit/docs/contributing).

<br>

---

<p align="center">
    <sub>
        Project created by Leo Driesch at Tobit.Software.
    </sub>
</p>
<p align="center">
    <a href="https://labs.tobit.com/">
        <img alt="Tobit.Software homepage" src="./assets/icons/globe.svg">
    </a>
    &nbsp;&nbsp;
    <a href="https://github.com/TobitSoftware">
        <img alt="Tobit.Software on GitHub" src="./assets/icons/github.svg">
    </a>
</p>
