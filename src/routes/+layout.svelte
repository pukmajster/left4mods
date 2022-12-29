<script>
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import { Github } from 'lucide-svelte';
	import '../app.postcss';
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<img src="favicon.png" width="48" alt="logo" class="pr-2" />
				<strong class="text-xl uppercase">Left 4 Mods</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm btn-ghost-surface" href="https://github.com/pukmajster/left4mods" target="_blank" rel="noreferrer">
				<Github size={16} />
				<span>GitHub</span>
			</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
