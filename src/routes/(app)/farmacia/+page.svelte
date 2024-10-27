<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { Plus, NotebookTabs, Minus, Factory } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';

	import ActionButton from './ActionButton.svelte';
	import type { Analise } from '@prisma/client';
	import { formatDate } from '@/utils';
	import Separator from '@/components/ui/separator/separator.svelte';

	export let data: PageData;

	const title = 'Farmacia';

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
	<div class="flex justify-between gap-2">
		<div>
			<Button class="mb-2 font-bold text-white" href="/farmacia/entrada">
				<Plus />
				Entrada
			</Button>
			<Button class="mb-2 font-bold text-white" href="/farmacia/saida">
				<Minus />
				Saida
			</Button>
		</div>

		<div>
			<Button class="mb-2 font-bold text-white" href="/farmacia/categorias">
				<NotebookTabs />
				Categorias
			</Button>
			<Button class="mb-2 font-bold text-white" href="/farmacia/fornecedores">
				<Factory />
				Fornecedores
			</Button>
		</div>
	</div>

	<TableTanStack {title} {columns} itens={data.analises}></TableTanStack>
</div>
