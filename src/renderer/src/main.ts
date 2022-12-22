import App from './App.svelte'
import './assets/style.css'

import '@skeletonlabs/skeleton/styles/all.css'
import '@skeletonlabs/skeleton/themes/theme-crimson.css'

import './assets/skeleton-theme-2.css'

const app = new App({
  // @ts-ignore: ignore an error lol
  target: document.getElementById('app')
})

export default app
