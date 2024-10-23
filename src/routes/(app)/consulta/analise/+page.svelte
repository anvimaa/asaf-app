<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { Plus } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';

	import ActionButton from './ActionButton.svelte';
	import type { Analise } from '@prisma/client';
	import { formatDate } from '@/utils';

	export let data: PageData;

	const title = 'Consulta';

	const columns: ColumnDef<Analise>[] = [
		{
			accessorFn: (row) => `${row.tipo}`,
			id: 'Analise',
			header: 'Analise',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.resultado}`,
			id: 'Resultado',
			header: 'Resultado',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.data.toLocaleDateString('pt', formatDate)}`,
			id: 'Data',
			header: 'Data',
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
		<p>Consulta: {data.consulta?.tipo}</p>
		<p>Paciente: {data.consulta?.paciente.nome}</p>
	</div>

	<TableTanStack {title} {columns} itens={data.analises}></TableTanStack>
</div>
