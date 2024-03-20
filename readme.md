# color-scheme-switch

For a live demo go to [color-scheme-switch.netlify.app](https://color-scheme-switch.netlify.app)

It may seem a little odd, but some people do find it hard to look at a screen when it is bright. There are options in most computers and phones that allow the user to see everything in a darker mode. Everything looks black instead of white, which helps with the overall amount of light coming from the screen. It can stop eye strain and help those people with visual impairment issues.

When designing a web site these days you need to cater for a light mode, the normal standard style, and a dark mode, which has reduced brightness. There are standard CSS features that allow you to detect whether the user prefers light mode or dark mode, but it can be a good idea to give the user the option to switch between these modes.

Below are a number of different parts that, when put together, creates a web site which can show both a light and dark color scheme and allow the user to switch between them. The starting place is the `color-scheme.css` file.

```css
:root {
  /* Allow light and dark modes */
  color-scheme: light dark;

  /* Light mode color variables */
  --light-color-background: rgb(248 248 248);
  --light-color-text: rgb(48 48 48);

  /* Dark mode color variables */
  --dark-color-background: rgb(48 48 48);
  --dark-color-text: rgb(248 248 248);
}

@media (prefers-color-scheme: light) {
  :root {
    /* Set light mode colors */
    --color-background: var(--light-color-background);
    --color-text: var(--light-color-text);
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Set dark mode colors */
    --color-background: var(--dark-color-background);
    --color-text: var(--dark-color-text);
  }
}
```

The `root` class is where all the color scheme information will be put. The first thing we do is tell the browser that we are using both dark and light versions for our site. The `light` keyword is used first, as this will be the default color scheme to use.

This is followed by a list of different color variables for both light and dark types. In this example we only have a background and text color. Then we check which mode the computer prefers by using the `@media` `prefers-color-scheme` keywords. Inside each we set the `--color-background` variables to either the light or dark version of the color.

This works well enough, but how do we allow the user to change between the two color schemes? We cannot change the `prefers-color-scheme` value within the browser. So we need to come up with something ourselves. The method we are looking at here requires us to add a “color-scheme” attribute to the HTML `body` object.

```html
<!DOCTYPE html>
<html lang="en">
<body color-scheme="dark">
…
</body>
</html>
```

Whenever the user switches between light and dark mode, this body attribute is switched between the value “light” and “dark”. Now that we have this idea in place, we can use it when styling the color scheme. Let’s go back to the `color-scheme.css` file and how we can add to it.

```css
body[color-scheme="light"] {
  /* Set light mode for all controls */
  color-scheme: light;

  /* Set light mode colors */
  --color-background: var(--light-color-background);
  --color-text: var(--light-color-text);
}

body[color-scheme="dark"] {
  /* Set dark mode for all controls */
  color-scheme: dark;

  /* Set dark mode colors */
  --color-background: var(--dark-color-background);
  --color-text: var(--dark-color-text);
}
```

These parts are similar to what we have seen before, only this time it is checking the body attribute’s value. Now, if the user has switched to dark mode, it sets the body attribute value to “dark”, which changes the CSS to use the dark mode color variables.

We do need to add something more though. If the page is refreshed then the color scheme setting the user has selected will be lost. We need to save the color scheme and reset it when the page is started up. We do this by saving the color scheme value to the local storage value “color-scheme” and automatically load and reset the body attribute when the `color-scheme-switch.js` file is loaded.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script type="module" src="/color-scheme-switch.js" blocking="render" async></script>
  ...
</head>
```

Unlike most other JavaScript files that need loading, this one must be done before any page rendering can be done, before anything is seen on the page. This is done with the `blocking` keyword set to `render`. We are telling the browser to stop all rendering until the file has been loaded and processed.

```javascript
/**
 * Load the saved color scheme last selected.
 */
static load() {
    // Get color scheme setting
    const colorScheme = window.localStorage.getItem('color-scheme');

    // If there is nothing saved
    if (!colorScheme) return;

    // Set the body's color scheme attribute
    document.body.setAttribute('color-scheme', colorScheme);
}
```

This static function is called after the file has been loaded and processed. It gets the last color scheme the user has selected, and if it exists, then sets the body’s “color-scheme” attribute with the same value.

It is important to make sure this is done before the page is first rendered. Otherwise you may see the screen flash at the start, from light mode to dark mode, or from dark mode to light mode.

The last part we need is to create a way for the user to switch between the two modes. I have created a simple color scheme switch web component that shows a sun and moon icon, which the user can select to switch between light and dark modes.

