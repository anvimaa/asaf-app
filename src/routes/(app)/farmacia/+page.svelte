<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { Plus, NotebookTabs, Minus, Factory, ClipboardPlus } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';
	import ActionButton from './ActionButton.svelte';
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
	import SelectSearch from '@/components/elements/select-search.svelte';

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

	$: remedios = data.medicamentos.map((b) => {
		return { value: b.id, label: `${b.tipo}: ${b.nome} - ${b.dosagem}gm`, filter: b.tipo };
	});

	const title = 'Registro de Remédios';

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
			accessorFn: (row) => `${row.estoqueAtual}`,
			id: 'Estoque',
			header: 'Estoque',
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

	const columnsEntrada: ColumnDef<any>[] = [
		{
			accessorFn: (row) => `${row.medicamento.nome}`,
			id: 'Nome',
			header: 'Nome',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.fornecedor.nome}`,
			id: 'Fornecedor',
			header: 'Fornecedor',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.quantidade}`,
			id: 'Quantidade',
			header: 'Quantidade',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.dataEntrada.toLocaleDateString('pt', formatDate)}`,
			id: 'Entrada',
			header: 'Entrada',
			cell: (info) => info.getValue()
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
				<ClipboardPlus />
				Remédio
			</DrawerButton>
		</div>

		<div>
			<DrawerButton drawerId="drawer-entrada">
				<Plus />
				Entrada
			</DrawerButton>
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

	<div role="tablist" class="tabs tabs-bordered">
		<input
			type="radio"
			name="my_tabs_1"
			role="tab"
			class="tab"
			aria-label="Remédios"
			checked={true}
		/>
		<div role="tabpanel" class="tab-content p-10">
			<TableTanStack {title} {columns} itens={data.medicamentos} />
		</div>

		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Entrada de Remédios" />
		<div role="tabpanel" class="tab-content p-10">
			<TableTanStack
				title="Registro de Entrada de Remédios"
				columns={columnsEntrada}
				itens={data.entradas}
			/>
		</div>
	</div>
</div>

<Drawer drawerId="drawer-add" title="Cadastrar Remédio">
	<form method="post" use:enhance class="grid gap-4" action="?/cadastrar">
		<InputText name="nome" label="Nome" error={$errors.nome} bind:value={$form.nome} />

		<InputText name="tipo" label="Tipo" error={$errors.tipo} bind:value={$form.tipo} />

		<div class="grid gap-2 md:grid-cols-2">
			<DateInput
				name="dataValidade"
				label="Data de Validade"
				error={$errors.dataValidade}
				bind:value={$form.dataValidade}
			/>

			<SelectListInput
				bind:value={$form.categoriaId}
				name="categoriaId"
				label="Categoria"
				options={categorias}
			/>
		</div>

		<div class="grid gap-2 md:grid-cols-2">
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

		<InputTextArea bind:value={$form.descricao} name="descricao" label="Descrição do Remedio" />

		<div class="divider"></div>
		<div class="grid grid-cols-2 gap-2">
			<button class="btn btn-primary" type="submit">Salvar</button>
			<button class="btn btn-error" type="reset">Limpar</button>
		</div>
	</form>
</Drawer>

<Drawer drawerId="drawer-entrada" title="Entrada de Remédio">
	<form method="post" use:enhance class="grid gap-4" action="?/entrada">
		<SelectSearch name="medicamentoId" id="medicar" label="Medicamento" items={remedios} />
		<SelectSearch name="fornecedorId" id="fornece" label="Fornecedor" items={fornecedores} />

		<div class="grid gap-2 md:grid-cols-2">
			<DateInput name="dataEntrada" label="Data de Entrada" />
			<NumberInput name="quantidade" label="Quantidade" />
		</div>

		<div class="divider"></div>
		<div class="grid grid-cols-2 gap-2">
			<button class="btn btn-primary" type="submit">Salvar</button>
			<button class="btn btn-error" type="reset">Limpar</button>
		</div>
	</form>
</Drawer>
