---
title: Riot.js Review Part 1
description: I haven't had much time to check out other frameworks, but finally got the time for this one
date: Oct 1, 2020
author: Arnold Chand
permalink: /posts/2020/10/01/riotjs-review-part-1.html
isPost: true
---

<PostHeader />

I haven't had much time to check out other frameworks, but finally got the time for this one. I have been looking at it
and also been streaming my progress over at [twitch][twitch]. Although there were only two streams, most of the work
was offline. Here are my two cents to it, and this is by no means a robust framework review it's just how I went about
experiencing [riot][riot].

## Simple JS framework with a hint of vue and svelte
The first impression for me were that, riot was like vue and svelte. In the sense that there was a `.riot` file for
writing your components, the syntax is very different. In vue you have a template, script and a style tag on the root
level. In riot there is only one tag, and that is the name of the component, as a custom html tag. And then inside you
add your html elements and enclose your logic in a script tag and your style in a style tag. This is very similar to
svelte except the fact that you don't add the custom tag. Below you should the difference.

### Vue
```vue
<template>
  <h1>{{ greeting }}</h1>
</template>

<script>
export default {
  name: 'MyComponent',
  data() {
    return {
      greeting: 'Hello World'
    }
  }
}
</script>

<style>
h1 { color: blue; }
</style>
```

### Svelte
```html
<script>
let greeting = 'Hello World';
</script>

<style>
h1 { color: blue; }
</style>

<h1>{greeting}</h1>
```

### Riot
```html
<my-component>
  <h1>{greeting}</h1>

  <script>
  export default {
    state: {
      greeting: 'Hello World'
    }
  }
  </script>

  <style>
  h1 { color: blue; }
  </style>
</my-component>
```

Additionally, adding scope in riot is a bit different. Instead of adding an attribute like `scoped` (in vue), you would
use native CSS pseudo-selectors to do that. In CSS this is the `:host` selector and can be used with the example above
like this:

```html
<style>
:host h1 { color: blue; } /* scoped only to the component above */
</style>
```

## No State Management
Riot doesn't come with any state management. You will have to look toward other framework-agnostic state management to
help you keep global state in your application. While, they do provide one separate from the framework called
`@riotjs/observable` - the description says to use it as send/receive events. So not central to state management but
close.

It's not too hard to implement a state management with riot. I was able to figure out a way to use [MobX][mobx] with
riot, although I will admit, it was difficult to go through the docs and issues to figure this one out. Most issues only
talked about the possibility of implementing but no code or logic explanation to determine how. Here is a sample code,
on how I implemented a MobX wrapper with riot. It's not the best but it does the job for a small scale size app.

```js
// store.js
import { observable } from 'mobx'

const state = {
  greeting: 'Hello World',
}

export default observable(state)
```

```js
// plugins/mobx.js
import * as riot from 'riot'
import { reaction, toJS } from 'mobx'

// Register mobx state if store exists in component
export function registerMobxPlugin(store) {
  riot.install((component) => {
    // Check if the store object is defined in the component
    if (component.store) {
      const originalOnMounted = component.onMounted
      const originalOnUnmounted = component.onUnmounted

      // Register the MobX reaction here and then run the default OnMounted lifecycle
      component.onMounted = (props, state) => {
        component._disposer = reaction(() => toJS(store), () => component.update())
        originalOnMounted.apply(component, props, state)
      }

      // Register the MobX disposer here and then run the default OnUnmounted lifecycle
      component.onUnmounted = (props, state) => {
        if (typeof component._disposer === 'function') {
          component._disposer()
        }

        originalOnUnmounted.apply(component, props, state)
      }
    }

    return component
  })
}
```

Just call `registerMobxPlugin` on the `index.js` bootstrap file in a riot app:

```js
// index.js
import '@riotjs/hot-reload'
import { component } from 'riot'
import { registerMobxPlugin } from './plugins/mobx'
import store from './store'

registerMobxPlugin(store)

document.addEventListener('DOMContentLoaded', () => component(App)(document.getElementById('app')))
```

Here is how you'll retrive data from the store from a component:

```html
<!-- my-app.riot -->
<my-app>
  <h1>{store.greeting}</h1>

  <script>
  import store from './store'
  export default {
    // Define the store first
    store,

    onMounted() {
      // Change the greeting after 5s
      setTimeout(() => {
        store.greeting = 'Hello Riot'
      }, 5000)
    }
  }
  </script>
</my-app>
```

Which takes me to my next point.

## Documentation
It does cover a lot of basics of the framework and guides you on how to extend any capabilities of the framework with
what you want to work with. As I showed with the code above on how to implement a MobX wrapper with riot to get a state
management working with the app.

I don't think the documentation is lacking much. However, I do feel like there could be more that can be added to help
a beginner understand and get started with using riot. From what I see this framework is aimed at a intermediate level
developer.

## Typescript Support
While it's not very evident in the docs, there is typescript support, but not 100%. In riot they are called
pre-processors and have support to write TypeScript, SASS, LESS, pug, etc within a `.riot` file - just like vue.
I didn't get to that point, or at least I tried only to be stopped at a point where I was supposed to "create my
pre-processor". While there was an example of this in their [example repo][riot-example] it was not useful to help me
get started with building a typescript project.

## Developer Experience
Another thing that comes with typescript is the language server support. This should still work with `.ts` files but
riot does not have such feature for their `.riot` files. Vue has the Vetur or `vue-language-server` and svelte also
have a language server to provide language features to their `.svelte` but that is not the case with riot. You will end
up trying to debug your code only through the browser (thanks to webpack and source-maps) but any undefined behaviour
can catch you. Especially, when calling a function and have it expect something but there is no handling of undeinfined
behaviour in the app.

## To be continued
This was just some of the things I encountered with riot. Overall, it's a great framework to get started with, only, if
you are an intermediate developer coming from a vue/svelte (something similar to these frameworks) background. I am
still in the process on using this framework. Currently, I'm building a workout app with it and streaming this on
[twitch][twitch] 🙂. Feel free to join me as I keep making these reviews for other frameworks as well.

[twitch]: https://twitch.tv/creativenull
[riot]: https://riot.js.org
[mobx]: https://mobx.js.org
[riot-example]: https://github.com/riot/examples
