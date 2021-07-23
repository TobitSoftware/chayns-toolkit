---
title: Images and Assets
slug: assets
---

Images that have a `.png`, `.jpg`, `.jpeg`, `.gif` or `.webp` extension can be
imported into your components. The default export of an image module is its
resulting URL, which you can use as the `src` attribute for `<img>` tags for
example:

```jsx
import imgSrc from "./my-image.png"

export function MyImage() {
    return <img src={imgSrc} alt="" />
}
```

The filename of the image will be changed and it will be output into the build
directory.

:::info

To improve loading times, small images (< 10 KB) will be inlined into the
JavaScript code with data-urls and therefore won't appear as files in your
output.

:::

:::tip

When [single-file mode](../configuration/output#single-file-builds) is
activated, all images will be inlined.

:::

## SVG Support

Importing a `.svg`-file automatically convert it into a React component. You can
pass them any props a regular `<svg>`-element would take:

```jsx
import Icon from "./my-icon.svg"

export function MyIcon() {
    return <Icon className="icon" />
}
```
