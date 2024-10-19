<script lang="ts">
	import DotsHorizontal from 'svelte-radix/DotsHorizontal.svelte';

	import { Button } from '@/components/ui/button/index.js';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import { InfoIcon, Pencil, Trash } from 'lucide-svelte';

	export let id: number;
	export let route = 'paciente';
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
				<InfoIcon size={16} class="" />
			</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />

		<DropdownMenu.Item href="/{route}/new?id={id}">
			Editar
			<DropdownMenu.Shortcut>
				<Pencil size={16} class="" />
			</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />

		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger>Outros</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				<DropdownMenu.RadioGroup value={'Outros'}>
					<DropdownMenu.RadioItem value="Triagem">
						<a href="/paciente/triagem/{id}">Triagem</a>
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="Consulta">Consulta</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			Deletar
			<DropdownMenu.Shortcut>
				<Trash size={16} class="text-red-700" />
			</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
