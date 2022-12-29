<script>
	import DiApple from 'svelte-icons/di/DiApple.svelte';
	import DiLinux from 'svelte-icons/di/DiLinux.svelte';
	import DiWindows from 'svelte-icons/di/DiWindows.svelte';
</script>

<div class="container h-full mx-auto mt-8 px-3 flex justify-center items-center">
	<div class="space-y-10 text-center flex items-center flex-col">
		<h2 class="font-bold">A full-blown mod manager for <span class="text-primary-500">Left 4 Dead 2.</span></h2>

		<h3>View, manage and organize your mods installed from the workshop or elsewere.</h3>
		
		<div class="app-preview-wrapper flex justify-center  items-center m-2">
			<img class="app-preview" src="l4m.png" alt="App Preview">
		</div>

		<div class="flex justify-center flex-wrap gap-4  py-5 items-stretch">
			<div class="feature card">
				<h3>Searching & Filtering</h3>
				<div>
					Quickly look for the kind of mod you want. Search by title, filter by tags, etc.
				</div>
			</div>

			<div class="feature card">
				<h3>Presets</h3>
				<div>
					Switch between different sets of selected mods. They're basically like mod packs!
				</div>
			</div>

			<div class="feature card">
				<h3>Collections</h3>
				<div>
					Neatly group up various mods into collections.
				</div>
			</div>

			<div class="feature card">
				<h3>Conflicts</h3>
				<div>
					Easily sort out conflicting mods and see exactly which ones are conflicting.
				</div>
			</div>
		</div>

		<div class="flex flex-col justify-center space-x-2 py-5 gap-4">
			<h2>Downloads</h2>

			<div class="downloads flex gap-8 my-4" >
				<a class="download-link" rel="noreferrer" href="https://github.com/pukmajster/left4mods/releases" target="_blank" >
					<div class="os"><DiWindows /></div>
					Windows 10/11
				</a>

				<a class="download-link" rel="noreferrer" href="https://github.com/pukmajster/left4mods/releases" target="_blank" >
					<div class="os"><DiApple /></div>
					Mac OS
				</a>

				<a class="download-link" rel="noreferrer" href="https://github.com/pukmajster/left4mods/releases" target="_blank" >
					<div class="os"><DiLinux /></div>
					Linux Flatpak
				</a>
			</div>
			
			<div>
				You can also view all other/older downloads <a rel="noreferrer" target="_blank" href="https://github.com/pukmajster/left4mods/releases">here</a>.
			</div>
		</div>

		<div class="space-y-2 py-5">
			<h2>Contributions / Bug Reports</h2>
			<p>Contributions and bug reports are welcome on the project's <a rel="noreferrer" target="_blank" href="https://github.com/pukmajster/left4mods/" >GitHub page
				</a>.
		</div>

		<footer class="space-y-2 py-5">
			<p>Powered by <a href="https://skeleton.dev/" target="_blank" rel="noreferrer">Skeleton</a>.</p>
			<p class="!text-sm ">Left 4 Mods is an open-source project and not affiliated with Valve, Steam or Left 4 Dead 2.</p>
			<p class="!text-sm ">All other trademarks are property of their respective owners.</p>
		</footer>
	</div>

	<style lang="postcss">
		figure {
			@apply flex relative flex-col;
		}
		figure svg,
		.img-bg {
			@apply w-64 h-64 md:w-80 md:h-80;
		}
		.img-bg {
			@apply bg-gradient-to-r from-primary-300 to-warning-300;
			@apply absolute z-[-1] rounded-full blur-[64px];
			animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite;
		}
		@keyframes pulse {
			50% {
				transform: scale(1.5);
			}
		}

		.app-preview {
			max-width: 600px;
			width: 100%;
		}

		.app-preview img {
		}

		.download-link {
			@apply flex  items-center gap-2;
		}
		
		.os {
			@apply w-10 h-10;
		}

		.feature {
			@apply p-8 flex flex-col gap-4  text-left;
			max-width: 20rem;
		}

		.feature h3 {
			@apply font-bold;
		}

	</style>
</div>
