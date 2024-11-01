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
	import type { Funcionario } from '@prisma/client';

	export let data: PageData;

	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}

	const title = 'Registro de Funcionários';

	const columns: ColumnDef<Funcionario>[] = [
		{
			accessorFn: (row) => `${row.nome}`,
			id: 'Nome',
			header: 'Nome',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.funcao}`,
			id: 'Função',
			header: 'Função',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.nif}`,
			id: 'NIF',
			header: 'NIF',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.telefone}`,
			id: 'Telefone',
			header: 'Telefone',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.agente}`,
			id: 'Nº Agente',
			header: 'Nº Agente',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.dataAdmissao.toLocaleDateString('pt', formatDate)}`,
			id: 'Data Contratação',
			header: 'Data Contratação',
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
				<ClipboardPlus />
				Cadastrar Funcionário
			</DrawerButton>
		</div>

		<div>
			<DrawerButton drawerId="drawer-entrada">
				<Plus />
				Entradas
			</DrawerButton>
		</div>
	</div>

	<div role="tablist" class="tabs tabs-bordered">
		<input
			type="radio"
			name="my_tabs_1"
			role="tab"
			class="tab"
			aria-label="Funcionarios"
			checked={true}
		/>
		<div role="tabpanel" class="tab-content p-10">
			<TableTanStack {title} {columns} itens={data.funcionarios} />
		</div>
	</div>
</div>

<Drawer drawerId="drawer-add" title="Cadastrar Funcionário">
	<form method="post" use:enhance class="grid gap-4" action="?/cadastrar">
		<InputText name="nome" label="Nome" error={$errors.nome} bind:value={$form.nome} />

		<div class="grid gap-2 md:grid-cols-2">
			<SelectListInput
				bind:value={$form.genero}
				name="genero"
				label="Gênero"
				options={[
					{ value: 'Masculino', label: 'Masculino' },
					{ value: 'Feminino', label: 'Feminino' }
				]}
			/>

			<InputText name="nif" label="NIF" error={$errors.nif} bind:value={$form.nif} />
		</div>

		<div class="grid gap-2 md:grid-cols-2">
			<InputText
				name="endereco"
				label="Endereço"
				error={$errors.endereco}
				bind:value={$form.endereco}
			/>
			<InputText
				name="telefone"
				label="Telefone"
				error={$errors.telefone}
				bind:value={$form.telefone}
			/>
		</div>

		<div class="grid gap-2 md:grid-cols-2">
			<DateInput
				name="dataAdmissao"
				label="Data de Admissão"
				error={$errors.dataAdmissao}
				bind:value={$form.dataAdmissao}
			/>

			<InputText name="funcao" label="Função" error={$errors.funcao} bind:value={$form.funcao} />
		</div>

		<InputText name="agente" label="Agente" error={$errors.agente} bind:value={$form.agente} />

		<div class="divider"></div>
		<div class="grid grid-cols-2 gap-2">
			<button class="btn btn-primary" type="submit">Salvar</button>
			<button class="btn btn-error" type="reset">Limpar</button>
		</div>
	</form>
</Drawer>
