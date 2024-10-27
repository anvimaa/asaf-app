<script lang="ts">
	import type { PageData } from './$types';
	import { Plus } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';
	import ActionButton from './ActionButton.svelte';
	import type { Categoria } from '@prisma/client';
	import InputText from '@/components/elements/form/InputText.svelte';
	import InputTextArea from '@/components/elements/form/InputTextArea.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import Drawer from '@/components/elements/drawer.svelte';

	export let data: PageData;

	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}

	const title = 'Categoria';

	const columns: ColumnDef<Categoria>[] = [
		{
			accessorFn: (row) => `${row.nome}`,
			id: 'Nome',
			header: 'Nome',
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
		<label for="drawer-add" class="btn btn-primary drawer-button">
			<Plus />
			Cadastrar
		</label>
	</div>

	<TableTanStack {title} {columns} itens={data.categorias}></TableTanStack>
</div>

<Drawer drawerId="drawer-add">
	<form method="post" use:enhance>
		<InputText error={$errors.nome} bind:value={$form.nome} name="nome" label="Nome da Categoria" />
		<InputTextArea bind:value={$form.descricao} name="descricao" label="Descrição da Categoria" />

		<div class="divider"></div>
		<button class="btn btn-primary" type="submit">Salvar</button>
		<button class="btn btn-error" type="reset">Limpar</button>
	</form>
</Drawer>
