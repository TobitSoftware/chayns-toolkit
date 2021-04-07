# (S)CSS Support

You can import `.css` and `.scss` files into your JavaScript/TypeScript files to
include them in your bundle:

```js
import "./my-styles.scss"
```

## CSS Modules

Any file ending with `.module.css` or `.module.scss` will be treated as a
[CSS module](https://github.com/css-modules/css-modules). You can import the
class names from the module like so:

```jsx
import styles from "./styles.css"

export function MyComponent() {
    return <div className={styles.box}>I am styled with CSS modules!</div>
}
```

> For more information on CSS Modules check out
> [this article](https://css-tricks.com/css-modules-part-1-need/).
