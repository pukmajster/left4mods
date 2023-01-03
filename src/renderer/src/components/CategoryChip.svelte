<script lang="ts">
  import { drawerStore } from '@skeletonlabs/skeleton'
  import categories, { combinedCategoryToLabelMap } from '../constants/categories'
  import { activeCategoriesToFilterBy, visibleFilterPanel } from '../stores/library'

  export let category: string

  $: label = combinedCategoryToLabelMap[category]

  function handleClick() {
    $activeCategoriesToFilterBy = [category]
    drawerStore.close()

    console.log('looking for', category)

    for (let categoryName of Object.keys(categories)) {
      console.log('--- categoryName: ', categoryName)

      console.log(Object.keys(categories[categoryName]))

      if (Object.keys(categories[categoryName]).includes(category)) {
        $visibleFilterPanel = categoryName
        break
      }
    }
  }
</script>

<button on:click={handleClick} class="btn btn-filled-surface btn-sm">
  {label}
</button>
