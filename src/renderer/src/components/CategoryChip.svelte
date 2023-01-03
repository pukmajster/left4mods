<script lang="ts">
  import { combinedCategoryToLabelMap } from '../constants/categories'

  export let category: string

  $: label = combinedCategoryToLabelMap[category]

  function handleClick() {}
</script>

<button class="btn btn-filled-surface btn-sm">
  {label}
</button>
