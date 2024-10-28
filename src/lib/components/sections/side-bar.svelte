<script lang="ts">
	import { page } from '$app/stores';
	import Bell from 'lucide-svelte/icons/bell';
	import { Package2 } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { app_menu } from '@/menus';

	export let user: any;
</script>

<div class="hidden border-r bg-muted/40 md:block">
	<div class="flex h-full max-h-screen flex-col gap-2">
		<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
			<a href="/" class="flex items-center gap-2 font-semibold">
				<Package2 class="h-6 w-6" />
				<span class="uppercase">SGH - SADISSA</span>
			</a>
			<Button variant="outline" size="icon" class="ml-auto h-8 w-8">
				<Bell class="h-4 w-4" />
				<span class="sr-only">Configurações</span>
			</Button>
		</div>
		<div class="flex-1">
			<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
				{#each app_menu as menu}
					{#if menu.levels?.includes(user.nivelAcesso)}
						<a
							class:active={$page.url.pathname === menu.href}
							href={menu.href}
							class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
						>
							<svelte:component this={menu.icon} />
							{menu.label}
						</a>
					{/if}
				{/each}
			</nav>
		</div>
		<div class="mt-auto p-4"></div>
	</div>
</div>

<style>
	.active {
		@apply bg-muted text-foreground;
	}
</style>
