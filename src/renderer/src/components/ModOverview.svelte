<script lang="ts">
  import { CodeBlock, Divider } from '@skeletonlabs/skeleton'
  import classnames from 'classnames'
  import type { IMod } from 'shared'
  import { combinedCategoryToLabelMap } from '../constants/categories'
  import thumbnailFallback from '../constants/thumbnailFallback'
  import { enabledMods, groupedEnabledMods, modIdToOverview } from '../stores/library'
  import { modManifest } from '../stores/manifest'
  import { collections, gameDir, toggleModInCurrentPresetSafe } from '../stores/profile'

  $: mod = $modManifest.mods[$modIdToOverview] as IMod

  // Shoutout to https://stackoverflow.com/a/69025425
  $: thumbnail = `file://${$gameDir}/left4dead2/addons/${mod?.fromworkshop ? 'workshop/' : ''}${
    mod.id
  }.jpg`
  const handleMissingThumbnail = (ev) => (ev.target.src = thumbnailFallback)

  function openModInBrowser() {
    window.api.openLinkInBrowser(`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.id}`)
  }

  $: collectionsThatFeatureThisMod = $collections.filter((collection) =>
    collection.mods.includes(mod.id)
  )

  $: otherModsBySameAuthor =
    mod?.addonauthor == null
      ? []
      : Object.keys($modManifest.mods)
          .filter((id) => $modManifest.mods[id].addonauthor == mod.addonauthor)
          .filter((id) => id != mod.id)

  $: isEnabled = $enabledMods.includes(mod.id)

  $: isGroupEnabled = $groupedEnabledMods.some((group) =>
    group.some((conflictingMod) => conflictingMod.id == mod.id)
  )

  function toggleModEnabled() {
    toggleModInCurrentPresetSafe(mod.id)
  }

  $: fileSizeMb = mod.vpksize / (1024 * 1024)
  $: fileSizeLabel = fileSizeMb > 1 ? `${fileSizeMb.toFixed(1)} MB` : `< 1.0 MB`

  $: steamProtocolUrl = `steam://url/CommunityFilePage/${mod.id}`
</script>

<div class="mod">
  <img alt="mod" src={thumbnail} on:error={handleMissingThumbnail} class="shadow-lg" />

  <div class="credits p-4">
    <h3>{mod.addontitle}</h3>
    <div class="categories pt-2">
      {#each mod.categories ?? [] as category}
        {#if combinedCategoryToLabelMap[category] !== undefined}
          <p class="category">{combinedCategoryToLabelMap[category]}</p>
        {/if}
      {/each}
    </div>

    <button
      class={classnames(' w-full btn btn-sm  mt-4', {
        'btn-filled-surface': !isEnabled,
        'btn-filled-tertiary': isEnabled && !isGroupEnabled,
        'btn-filled-warning': isGroupEnabled
      })}
      on:click={toggleModEnabled}
      >{isEnabled ? (isGroupEnabled ? 'Enabled (Conflicting)' : 'Enabled') : 'Disabled'}</button
    >

    {#if mod.fromworkshop}
      <div class="flex gap-3">
        <button class=" w-full btn btn-sm  btn-filled-primary mt-4" on:click={openModInBrowser}
          >Open in Browser</button
        >

        <a href={steamProtocolUrl} class=" w-full btn btn-sm  btn-filled-primary mt-4"
          >Open in Steam</a
        >
      </div>
    {/if}

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

    {#if mod.vpksize}
      <h4 class="">
        File Size <div class="text-xs">{fileSizeLabel}</div>
      </h4>
    {/if}

    <Divider margin="mt-7" />

    {#if collectionsThatFeatureThisMod.length > 0 || otherModsBySameAuthor.length > 0}
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
    {/if}

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
