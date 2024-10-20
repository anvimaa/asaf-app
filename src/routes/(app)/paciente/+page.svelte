<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { Plus } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';

	import type { Paciente } from '@prisma/client';
	import ActionButton from './ActionButton.svelte';

	export let data: PageData;

	const title = 'Paciente';

	const columns: ColumnDef<Paciente>[] = [
		{
			accessorFn: (row) => `${row.nome}`,
			id: 'Nome',
			header: 'Nome',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.nif}`,
			id: 'NIF',
			header: 'NIF',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.sexo}`,
			id: 'Genero',
			header: 'Genero',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.area}`,
			id: 'Área',
			header: 'Área',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.urgencia || '-'}`,
			id: 'Urgência',
			header: 'Urgência',
			cell: (info) => info.getValue()
		},
		{
			id: 'Acções',
			header: '...',
			enableColumnFilter: false,
			cell: (info) =>
				renderComponent(ActionButton, {
					id: info.row.original.id
				})
		}
	];
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="flex flex-col gap-y-4">
	<div class="">
		<Button class="font-bold text-white" href="/paciente/new">
			<Plus />
			Cadastrar {title}
		</Button>
	</div>

	<TableTanStack {title} {columns} itens={data.pacientes}></TableTanStack>
</div>
