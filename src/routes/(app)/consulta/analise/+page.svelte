<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { Plus, ExternalLink } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';

	import ActionButton from './ActionButton.svelte';
	import type { Analise } from '@prisma/client';
	import { formatDate } from '@/utils';
	import Separator from '@/components/ui/separator/separator.svelte';

	export let data: PageData;

	const title = 'Analise';

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
		<Button class="mb-2 font-bold text-white" href="/consulta/analise/new/{data.consulta?.id}">
			<Plus />
			Nova {title}
		</Button>

		<Separator />

		<h1 class="mt-2 flex items-center text-3xl font-bold">
			{data.consulta?.paciente.nome}
			<a href="/paciente/{data.consulta?.paciente.id}" class="ml-2"> <ExternalLink /></a>
		</h1>
		<h2 class="flex items-center text-lg font-bold">
			Tipo da Consulta: {data.consulta?.tipo}
			<a href="/consulta/{data.consulta?.id}" class="ml-4"> <ExternalLink size={16} /></a>
		</h2>
		<h2 class="text-lg">Medico: <b>{data.consulta?.medico}</b></h2>
	</div>

	<TableTanStack {title} {columns} itens={data.analises}></TableTanStack>
</div>
