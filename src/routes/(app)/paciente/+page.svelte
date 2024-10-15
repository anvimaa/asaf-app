<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';

	import { superForm } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types';
	import CreateEditForm from './CreateEditForm.svelte';
	import { Plus } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import type { ColumnDef } from '@tanstack/svelte-table';
	import type { Paciente } from '@prisma/client';

	export let data: PageData;
	const { form, errors, message, enhance } = superForm(data.form);

	const title = 'Paciente';
	let isCreateOrEdit: boolean = false;

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
			accessorFn: (row) => `${row.urgencia}`,
			id: 'Urgência',
			header: 'Urgência',
			cell: (info) => info.getValue()
		}
	];

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="flex flex-col gap-y-4">
	{#if isCreateOrEdit}
		<CreateEditForm {enhance} {form} {errors} on:click={() => (isCreateOrEdit = false)} />
	{:else}
		<div class="">
			<Button class="font-bold text-white" on:click={() => (isCreateOrEdit = true)}>
				<Plus />
				Cadastrar {title}
			</Button>
		</div>

		<TableTanStack {title} {columns} itens={data.pacientes}></TableTanStack>
	{/if}
</div>
