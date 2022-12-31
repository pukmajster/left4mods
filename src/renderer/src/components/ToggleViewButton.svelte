<script lang="ts">
  import { selectedMods, showConflictingView, totalConflictingMods } from '../stores/library'

  function toggleView() {
    $showConflictingView = !$showConflictingView
    $selectedMods = []
  }
</script>

<button
  on:click={toggleView}
  class="btn btn-sm"
  class:btn-filled-warning={$totalConflictingMods > 0}
  class:btn-filled-primary={$totalConflictingMods == 0 && $showConflictingView}
>
  {#if $showConflictingView}
    View All
  {:else}
    View {$totalConflictingMods} Conflicting
  {/if}
</button>

<style>
  button {
    min-width: 100px;
  }
</style>
