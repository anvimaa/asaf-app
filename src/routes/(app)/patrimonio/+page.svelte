<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { Plus, NotebookTabs, Minus, Factory, ClipboardPlus } from 'lucide-svelte';
	import TableTanStack from '@/components/elements/table/table-tan-stack.svelte';
	import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';
	import ActionButton from './ActionButton.svelte';
	import { formatDate, gerarCodigoUnico } from '@/utils';
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
	import type { Patrimonio } from '@prisma/client';

	export let data: PageData;

	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}

	const title = 'Registro do Património';

	const columns: ColumnDef<Patrimonio>[] = [
		{
			accessorFn: (row) => `${row.nome}`,
			id: 'Descrição',
			header: 'Descrição',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.codigo}`,
			id: 'Código',
			header: 'Código',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.estado}`,
			id: 'Estado',
			header: 'Estado',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.localizacao}`,
			id: 'Localização',
			header: 'Localização',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (row) => `${row.dataAquisicao.toLocaleDateString('pt', formatDate)}`,
			id: 'Data Aquisição',
			header: 'Data Aquisição',
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

	$: codigo = gerarCodigoUnico($form.nome);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="flex flex-col gap-y-4">
	<div class="flex justify-between gap-2">
		<div>
			<DrawerButton>
				<ClipboardPlus />
				Cadastrar Património
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
			aria-label="Património"
			checked={true}
		/>
		<div role="tabpanel" class="tab-content p-10">
			<TableTanStack {title} {columns} itens={data.patrimonios} />
		</div>
	</div>
</div>

<Drawer drawerId="drawer-add" title="Cadastrar Património">
	<form method="post" use:enhance class="grid gap-4" action="?/cadastrar">
		<InputText name="nome" label="Descrição" error={$errors.nome} bind:value={$form.nome} />

		<div class="grid gap-2 md:grid-cols-2">
			<InputText name="codigo" label="Código" error={$errors.codigo} bind:value={codigo} />
			<SelectListInput
				bind:value={$form.tipo}
				name="tipo"
				label="Tipo"
				options={[
					{ value: 'Equipamento', label: 'Equipamento' },
					{ value: 'Móvel', label: 'Móvel' },
					{ value: 'Imóvel', label: 'Imóvel' }
				]}
			/>
		</div>

		<div class="grid gap-2 md:grid-cols-2">
			<SelectListInput
				bind:value={$form.estado}
				name="estado"
				label="Estado"
				options={[
					{ value: 'Novo', label: 'Novo' },
					{ value: 'Usado', label: 'Usado' },
					{ value: 'Danificado', label: 'Danificado' }
				]}
			/>
			<InputText
				name="localizacao"
				label="Localização"
				error={$errors.localizacao}
				bind:value={$form.localizacao}
			/>
		</div>

		<div class="grid gap-2 md:grid-cols-2">
			<DateInput
				name="dataAquisicao"
				label="Data de Aquisição"
				error={$errors.dataAquisicao}
				bind:value={$form.dataAquisicao}
			/>
			<NumberInput name="valor" label="Valor" error={$errors.valor} bind:value={$form.valor} />
		</div>

		<div class="grid gap-2 md:grid-cols-2">
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Possui Garantia?</span>
					<input type="checkbox" class="toggle" bind:checked={$form.garantia} name="garantia" />
				</label>
			</div>
			{#if $form.garantia}
				<DateInput
					name="dataGarantia"
					label="Data da Garantia"
					error={$errors.dataGarantia}
					bind:value={$form.dataGarantia}
				/>
			{/if}
		</div>

		<div class="grid gap-2 md:grid-cols-2">
			<DateInput
				name="ultimaManutencao"
				label="Última Manutenção"
				error={$errors.ultimaManutencao}
				bind:value={$form.ultimaManutencao}
			/>
			<DateInput
				name="proximaManutencao"
				label="Próxima Manutenção"
				error={$errors.proximaManutencao}
				bind:value={$form.proximaManutencao}
			/>
		</div>

		<InputTextArea name="observacoes" label="Observações" bind:value={$form.observacoes} />

		<div class="divider"></div>
		<div class="grid grid-cols-2 gap-2">
			<button class="btn btn-primary" type="submit">Salvar</button>
			<button class="btn btn-error" type="reset">Limpar</button>
		</div>
	</form>
</Drawer>
