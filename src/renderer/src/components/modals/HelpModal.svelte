<script lang="ts">
  // Props

  import { Github } from 'lucide-svelte'

  /** Exposes parent props to this component. */
  export let parent: any

  // Base Classes
  const cBase = 'space-y-4'
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <h5 class="font-bold">Useful Key Combos / Actions</h5>
  <div class="grid grid-cols-1 gap-4">
    <div class="keycombo">
      <p>Ctrl + Left Click</p>
      <span>Selects/Unselects a single mod</span>
    </div>

    <div class="keycombo">
      <p>Ctrl + Shift</p>
      <span>Selects/Unselects every mod you put your mouse over</span>
    </div>

    <div class="keycombo">
      <p>Right Click</p>
      <span>Shows you an overview of the mod you click on</span>
    </div>
  </div>

  <h5 class="font-bold">Found a Bug / Requesting a Feature?</h5>
  <p class="flex gap-2">
    You can visit the <a
      class=" inline flex items-center gap-1"
      href="https://github.com/pukmajster/left4mods/issues"
      target="_blank"
    >
      <Github size={16} /> GitHub</a
    > issues page and report there!
  </p>

  <!-- prettier-ignore -->
  <footer class="modal-footer {parent.regionFooter}">
    <button class="btn btn-ghost-primary" on:click={parent.onClose}>Close</button>
  </footer>
</div>

<style>
  .keycombo {
    display: flex;
    grid-template-columns: 120px auto;
    gap: 1rem;
  }

  .keycombo p {
    display: inline;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    color: #24262a;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
  }
</style>
