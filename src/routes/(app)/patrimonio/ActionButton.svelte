<script lang="ts">
	import DotsHorizontal from 'svelte-radix/DotsHorizontal.svelte';

	import { Button } from '@/components/ui/button/index.js';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import { InfoIcon, Pencil, Trash, LucideInfo } from 'lucide-svelte';

	export let id: number;
	export let route = 'patrimonio';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
		>
			<DotsHorizontal class="h-4 w-4" />
			<span class="sr-only">Abrir Menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[160px]" align="end">
		<DropdownMenu.Item href="/{route}/{id}">
			Detalhes
			<DropdownMenu.Shortcut>
				<LucideInfo size={16} class="" />
			</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
		<DropdownMenu.Item href="/{route}/edit/{id}">
			Editar
			<DropdownMenu.Shortcut>
				<Pencil size={16} class="" />
			</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href="/{route}/delete/{id}">
			Deletar
			<DropdownMenu.Shortcut>
				<Trash size={16} class="text-red-700" />
			</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
