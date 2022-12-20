<script lang="ts">
  import { showConflictingView, totalConflictingMods } from '../stores/library'

  function toggleView() {
    $showConflictingView = !$showConflictingView
  }
</script>

{#if $totalConflictingMods > 0 || $showConflictingView}
  <button
    on:click={toggleView}
    class="btn btn-sm "
    class:btn-ghost-warning={$totalConflictingMods > 0}
    class:btn-ghost-accent={$totalConflictingMods == 0 && $showConflictingView}
  >
    {#if $showConflictingView}
      Show all
    {:else}
      Show {$totalConflictingMods} conflicting
    {/if}
  </button>
{/if}
