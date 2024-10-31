<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

	export let drawerId: string = 'drawer-add';
	export let title: string = 'Cadastrar';
</script>

<div class="drawer drawer-end">
	<input id={drawerId} type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
	</div>
	<div class="drawer-side">
		<label for={drawerId} aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="min-h-full w-full bg-zinc-300 p-4 text-base-content dark:bg-zinc-800 md:w-[50%]">
			<div class="flex items-center gap-2">
				<label
					for={drawerId}
					aria-label="close sidebar"
					class="drawer-overlay hover:cursor-pointer"
				>
					<ArrowLeft />
				</label>
				<h1 class="text-2xl font-bold">{title}</h1>
			</div>
			<div class="divider"></div>
			<slot />
		</div>
	</div>
</div>
