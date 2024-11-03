<script lang="ts">
	import { Command } from 'cmdk-sv';
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import * as Popover from '@/components/ui/popover';
	import { Check, ChevronsUpDown, Search } from 'lucide-svelte';
	import { cn } from '@/utils';

	export let pacientes: Array<{
		id: number;
		nome: string;
		nif: string;
	}>;
	export let name: string;

	let open = false;
	let value = '';
	let searchTerm = '';

	$: filteredPacientes = pacientes.filter(
		(paciente) =>
			paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
			paciente.nif.includes(searchTerm)
	);

	function selectPaciente(paciente: { id: number; nome: string; nif: string }) {
		value = paciente.nome;
		open = false;

		// Criar e disparar evento de mudança para o input hidden
		const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
		if (input) {
			input.value = paciente.id.toString();
			input.dispatchEvent(new Event('change', { bubbles: true }));
		}
	}
</script>

<div class="grid gap-3">
	<Label for="paciente">
		Paciente <span class="text-red-500">*</span>
	</Label>
	<input type="hidden" {name} />
	<Popover.Root bind:open>
		<Popover.Trigger asChild let:builder>
			<Button
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-full justify-between"
				builders={[builder]}
			>
				{value || 'Selecione um paciente'}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[--width] p-0">
			<Command.Root class="w-full">
				<div class="flex items-center border-b px-3">
					<Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
					<Input
						placeholder="Buscar por nome ou NIF..."
						bind:value={searchTerm}
						class="h-11 w-full border-0 bg-transparent p-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<Command.Empty class="p-6 text-center text-sm">Nenhum paciente encontrado.</Command.Empty>
				<Command.Group class="max-h-[300px] overflow-auto">
					{#each filteredPacientes as paciente (paciente.id)}
						<Command.Item
							value={paciente.nome}
							class="flex cursor-pointer items-center px-4 py-2 hover:bg-accent"
							on:click={() => selectPaciente(paciente)}
						>
							<Check
								class={cn('mr-2 h-4 w-4', value === paciente.nome ? 'opacity-100' : 'opacity-0')}
							/>
							<div class="flex flex-col">
								<span>{paciente.nome}</span>
								<span class="text-xs text-gray-500">NIF: {paciente.nif}</span>
							</div>
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
