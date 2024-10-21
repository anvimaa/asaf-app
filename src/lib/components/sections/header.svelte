<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Package from 'lucide-svelte/icons/package';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Menu from 'lucide-svelte/icons/menu';
	import { Package2, Home, LineChart, LogOut } from 'lucide-svelte';
	import Search from 'lucide-svelte/icons/search';
	import Users from 'lucide-svelte/icons/users';
	import { page } from '$app/stores';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import ThemeDropdown from '../elements/theme-dropdown.svelte';
	import { app_menu } from '@/menus';

	export let user: any;
</script>

<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="flex flex-col">
			<nav class="grid gap-2 text-lg font-medium">
				<a href="##" class="flex items-center gap-2 text-lg font-semibold">
					<Package2 class="h-6 w-6" />
					<span class="">SGH - SADISSA</span>
				</a>
				{#each app_menu as menu}
					<a
						class:active={$page.url.pathname === menu.href}
						href={menu.href}
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<svelte:component this={menu.icon} />
						{menu.label}
					</a>
				{/each}
			</nav>
			<div class="mt-auto"></div>
		</Sheet.Content>
	</Sheet.Root>
	<div class="w-full flex-1">
		<form>
			<div class="relative">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Pesquisar..."
					class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
				/>
			</div>
		</form>
	</div>
	<ThemeDropdown />
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
				<CircleUser class="h-5 w-5" />
				<span class="sr-only">Menu Meu Perfil</span>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label><b>{user.name}</b></DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>Perfil</DropdownMenu.Item>
			<DropdownMenu.Item>Ajuda</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<a href="/logout" class="flex items-center justify-between gap-2">
					<LogOut />
					Terminar Sessão
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</header>
