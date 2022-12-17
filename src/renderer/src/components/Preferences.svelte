<script lang="ts">
  import { toggleShowPreferences } from '../stores/preferences'

  let gameDir =
    'file:///home/kry/.local/share/Steam/steamapps/common/Left%204%20Dead%202/left4dead2/'
</script>

<div class="overlay">
  <div class="preferences">
    <input bind:value={gameDir} />
    <button on:click={toggleShowPreferences}> close </button>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: #000000bd;
    z-index: 99;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .preferences {
    display: flex;
    flex-direction: column;
    gap: 12px;

    max-width: 700px;
    width: 100%;
    padding: 1em;

    background-color: #262847;
    border-radius: 8px;
  }
</style>
