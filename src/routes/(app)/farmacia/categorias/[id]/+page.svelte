<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import { MoveLeft } from 'lucide-svelte';
	import type { ColumnDef } from '@tanstack/svelte-table';
	import type { Medicamento } from '@prisma/client';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';

	export let data: PageData;

	const columns: ColumnDef<Medicamento>[] = [
		{
			accessorFn: (row) => `${row.nome}`,
			id: 'Nome',
			header: 'Nome',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.tipo}`,
			id: 'Tipo',
			header: 'Tipo',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.estoqueAtual}`,
			id: 'Estoque Atual',
			header: 'Estoque Atual',
			cell: (info) => info.getValue()
		}
	];
</script>

<svelte:head>
	<title>Informações - {data.categoria?.nome}</title>
</svelte:head>

<div class="mb-4 flex items-center justify-between">
	<Button on:click={() => history.back()}>
		<MoveLeft></MoveLeft>
	</Button>

	<h1 class="">
		Informações Gerais: <span class="font-bold uppercase"> {data.categoria?.nome}</span>
	</h1>
</div>

<TableTanStack title="Medicamentos" {columns} itens={data.categoria?.medicamentos}></TableTanStack>
