<script lang="ts">
	import Header from '@/components/sections/header.svelte';
	import SideBar from '@/components/sections/side-bar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<svelte:head>
	<title>SHG - SADISSA</title>
</svelte:head>

<Toaster />

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<SideBar />
	<div class="flex flex-col">
		<Header user={data.user} />
		<main class="p-4">
			<slot />
		</main>
	</div>
</div>
