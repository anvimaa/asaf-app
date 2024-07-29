<script lang="ts">
	import '../app.css';
	import Header from '@/components/sections/header.svelte';
	import SideBar from '@/components/sections/side-bar.svelte';
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<SideBar />
	<div class="flex flex-col">
		<Header />
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<slot />
		</main>
	</div>
</div>
