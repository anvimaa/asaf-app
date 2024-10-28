<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { Plus, NotebookTabs, Minus, Factory } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';
	import ActionButton from './ActionButton.svelte';
	import type { Medicamento } from '@prisma/client';
	import { formatDate } from '@/utils';
	import Drawer from '@/components/elements/drawer.svelte';
	import InputText from '@/components/elements/form/InputText.svelte';
	import InputTextArea from '@/components/elements/form/InputTextArea.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import DrawerButton from '@/components/elements/drawer-button.svelte';
	import NumberInput from '@/components/elements/form/NumberInput.svelte';
	import DateInput from '@/components/elements/form/DateInput.svelte';
	import SelectListInput from '@/components/elements/SelectListInput.svelte';

	export let data: PageData;

	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}

	$: fornecedores = data.fornecedores.map((b) => {
		return { value: b.id, label: b.nome };
	});

	$: categorias = data.categorias.map((b) => {
		return { value: b.id, label: b.nome };
	});

	const title = 'Farmacia';

	const columns: ColumnDef<any>[] = [
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
			accessorFn: (row) => `${row.dosagem}`,
			id: 'Dosagem',
			header: 'Dosagem',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.categoria.nome}`,
			id: 'Categoria',
			header: 'Categoria',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.dataEntrada.toLocaleDateString('pt', formatDate)}`,
			id: 'Entrada',
			header: 'Entrada',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.dataValidade.toLocaleDateString('pt', formatDate)}`,
			id: 'Validade',
			header: 'Validade',
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
			<DrawerButton>
				<Plus />
				Entrada
			</DrawerButton>
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

	<TableTanStack {title} {columns} itens={data.medicamentos}></TableTanStack>
</div>

<Drawer drawerId="drawer-add">
	<form method="post" use:enhance class="grid gap-4">
		<InputText name="nome" label="Nome" error={$errors.nome} bind:value={$form.nome} />

		<InputText name="tipo" label="Tipo" error={$errors.tipo} bind:value={$form.tipo} />

		<div class="grid gap-2 md:grid-cols-2">
			<DateInput
				name="dataValidade"
				label="Data de Validade"
				error={$errors.dataValidade}
				bind:value={$form.dataValidade}
			/>

			<DateInput
				name="dataEntrada"
				label="Data de Entrada"
				error={$errors.dataEntrada}
				bind:value={$form.dataEntrada}
			/>
		</div>

		<div class="grid gap-2 md:grid-cols-3">
			<NumberInput
				name="estoqueAtual"
				label="Estoque atual"
				error={$errors.estoqueAtual}
				bind:value={$form.estoqueAtual}
			/>

			<NumberInput
				name="limiteEstoque"
				label="Limite de Estoque"
				error={$errors.limiteEstoque}
				bind:value={$form.limiteEstoque}
			/>

			<NumberInput
				name="dosagem"
				label="Dosagem (mg)"
				error={$errors.dosagem}
				bind:value={$form.dosagem}
			/>
		</div>

		<div class="grid gap-2 md:grid-cols-2">
			<SelectListInput
				bind:value={$form.categoriaId}
				name="categoriaId"
				label="Categoria"
				options={categorias}
			/>

			<SelectListInput
				bind:value={$form.fornecedorId}
				name="fornecedorId"
				label="Fornecedor"
				options={fornecedores}
			/>
		</div>

		<InputTextArea bind:value={$form.descricao} name="descricao" label="Descrição da Categoria" />

		<div class="divider"></div>
		<div class="grid grid-cols-2 gap-2">
			<button class="btn btn-primary" type="submit">Salvar</button>
			<button class="btn btn-error" type="reset">Limpar</button>
		</div>
	</form>
</Drawer>
