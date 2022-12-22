<script lang="ts">
  import { CodeBlock, Divider } from '@skeletonlabs/skeleton'
  import classnames from 'classnames'
  import { combinedCategoryToLabelMap } from '../constants/categories'
  import { enabledMods, groupedEnabledMods, modIdToOverview } from '../stores/library'
  import { modManifest } from '../stores/manifest'
  import { collections, toggleModInCurrentPresetSafe } from '../stores/profile'

  $: mod = $modManifest[$modIdToOverview]

  function openModInBrowser() {
    window.api.openLinkInBrowser(`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.id}`)
  }

  $: collectionsThatFeatureThisMod = $collections.filter((collection) =>
    collection.mods.includes(mod.id)
  )

  $: otherModsBySameAuthor =
    mod?.addonauthor == null
      ? []
      : Object.keys($modManifest)
          .filter((id) => $modManifest[id].addonauthor == mod.addonauthor)
          .filter((id) => id != mod.id)

  $: isEnabled = $enabledMods.includes(mod.id)

  $: isGroupEnabled = $groupedEnabledMods.some((group) =>
    group.some((conflictingMod) => conflictingMod.id == mod.id)
  )

  function toggleModEnabled() {
    toggleModInCurrentPresetSafe(mod.id)
  }
</script>

<div class="mod">
  <img
    alt="mod"
    src={`file:///home/kry/.local/share/Steam/steamapps/common/Left%204%20Dead%202/left4dead2/addons/workshop/${mod.id}.jpg`}
    class="shadow-lg"
  />

  <div class="credits p-4">
    <h3>{mod.addontitle}</h3>
    <div class="categories pt-2">
      {#each mod.categories ?? [] as category}
        {#if combinedCategoryToLabelMap[category] !== undefined}
          <p class="category">{combinedCategoryToLabelMap[category]}</p>
        {/if}
      {/each}
    </div>

    <button class=" w-full btn btn-ghost-primary mt-4" on:click={openModInBrowser}
      >Open in Workshop</button
    >

    <button
      class={classnames(' w-full btn  mt-4', {
        'btn-ghost-surface': !isEnabled,
        'btn-ghost-primary': isEnabled && !isGroupEnabled,
        'btn-ghost-warning': isGroupEnabled
      })}
      on:click={toggleModEnabled}
      >{isEnabled ? (isGroupEnabled ? 'Enabled (Conflicting)' : 'Enabled') : 'Disabled'}</button
    >

    {#if mod.addonauthor}
      <h4>
        Author <div class="text-xs">{mod.addonauthor}</div>
      </h4>
    {/if}

    {#if mod.addonversion}
      <h4 class="">
        Version <div class="text-xs">{mod.addonversion}</div>
      </h4>
    {/if}

    {#if mod.addontagline}
      <h4 class="">
        Tagline <div class="text-xs">{mod.addontagline}</div>
      </h4>
    {/if}

    {#if mod.addondescription}
      <h4 class="">
        Description <div class="text-xs">{mod.addondescription}</div>
      </h4>
    {/if}

    <Divider margin="mt-7" />

    {#if collectionsThatFeatureThisMod.length > 0}
      <h4 class="">
        Fun fact <div class="text-xs">
          Featured in {collectionsThatFeatureThisMod.length} collection{collectionsThatFeatureThisMod.length >
          2
            ? 's'
            : ''}.
        </div>
      </h4>
    {/if}

    {#if otherModsBySameAuthor.length > 0}
      <h4 class="">
        Fun fact <div class="text-xs">
          You have subscribed to {otherModsBySameAuthor.length} other mod{otherModsBySameAuthor.length >
          2
            ? 's'
            : ''} by this author!
        </div>
      </h4>
    {/if}

    <Divider margin="mt-5" />
    <div class="pt-6" />
    <CodeBlock language="Files" text="text-xs" code={mod.files.join('\n')} />
  </div>
</div>

<style lang="postcss">
  .mod {
    --mod-enabled-color: rgb(25, 165, 25);
    --mod-conflicting-color: #ff5151f9;

    display: flex;
    flex-direction: column;

    width: 400px;
    max-width: 400px;
    overflow-x: hidden;
    /* background-color: #262847; */
  }

  img {
    aspect-ratio: 5/3;
    width: 400px;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    z-index: 9999;
  }

  .category {
    padding: 5px 8px;
    background-color: rgba(180, 180, 183, 0.141);
    border-radius: 2px;
  }

  .categories p {
    font-size: 14px;
  }

  .credits h4 {
    @apply mt-4 mb-1;
  }
</style>
