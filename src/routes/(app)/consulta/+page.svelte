<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { Plus } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';

	import type { Consulta, Paciente } from '@prisma/client';
	import ActionButton from './ActionButton.svelte';

	export let data: PageData;

	const title = 'Consulta';

	const columns: ColumnDef<Consulta>[] = [
		{
			accessorFn: (row) => `${row.medico}`,
			id: 'Medico',
			header: 'Medico',
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
		<Button class="font-bold text-white" href="/consulta/new">
			<Plus />
			Agendar {title}
		</Button>
	</div>

	<TableTanStack {title} {columns} itens={data.consultas}></TableTanStack>
</div>
