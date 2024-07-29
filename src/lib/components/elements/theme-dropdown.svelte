<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Computer } from 'lucide-svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Escolher Tema</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item on:click={() => setMode('light')}>
			<Sun class="mr-2" />
			Claro
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => setMode('dark')}>
			<Moon class="mr-2" />
			Escuro
		</DropdownMenu.Item>
		<DropdownMenu.Separator></DropdownMenu.Separator>
		<DropdownMenu.Item on:click={() => resetMode()}>
			<Computer class="mr-2" />
			Sistema
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
