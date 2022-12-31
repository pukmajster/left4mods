<script lang="ts">
  import { collections } from '../stores/profile'
</script>

<option hidden value="">Pick a Collection</option>
<option value="">None</option>
<!-- <option value="_">Mods not in any collection</option> -->
<option disabled>----------------------------</option>
{#each $collections as collection}
  <option value={collection.id}>{collection.label}</option>
{/each}
