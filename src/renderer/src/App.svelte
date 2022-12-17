<script lang="ts">
  import Header from './components/Header.svelte'
  import ModLibrary from './components/ModLibrary.svelte'
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
