<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './components/Header.svelte'
  import ModLibrary from './components/ModLibrary.svelte'
  import { modManifest } from './stores/manifest'

  onMount(async () => {
    let data = await window.api.requestManifest(false)
    console.log(data)
    modManifest.set(data)
  })
</script>

<div class="container">
  <Header />
  <ModLibrary />
</div>

<style>
  .container {
    display: grid;
    grid-template-rows: 64px 1fr;
  }
</style>
