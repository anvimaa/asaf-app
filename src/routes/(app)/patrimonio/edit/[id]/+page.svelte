<script lang="ts">
	import InputText from '@/components/elements/form/InputText.svelte';
	import type { PageData } from './$types';
	import DateInput from '@/components/elements/form/DateInput.svelte';
	import SelectListInput from '@/components/elements/SelectListInput.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { ISOString } from '@/utils';
	import InputTextArea from '@/components/elements/form/InputTextArea.svelte';
	import NumberInput from '@/components/elements/form/NumberInput.svelte';

	export let data: PageData;

	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}

	let dataAquisicao = ISOString($form.dataAquisicao || new Date());
	let dataGarantia = ISOString($form.dataGarantia || new Date());
	let ultimaManutencao = ISOString($form.ultimaManutencao || new Date());
	let proximaManutencao = ISOString($form.proximaManutencao || new Date());
</script>

<div class="mb-8 flex items-center justify-between">
	<div>
		<button
			class="mb-4 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			on:click={() => history.back()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="mr-2 h-4 w-4"
			>
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
			Voltar
		</button>
		<h1 class="text-2xl font-bold">Editar Patrimônio</h1>
		<p class="text-gray-500">Atualize as informações do Patrimônio</p>
	</div>
</div>

<form method="post" use:enhance class="grid gap-4">
	<input type="hidden" name="id" bind:value={$form.id} />
	<InputText name="nome" label="Descrição" error={$errors.nome} bind:value={$form.nome} />

	<div class="grid gap-2 md:grid-cols-2">
		<InputText name="codigo" label="Código" error={$errors.codigo} bind:value={$form.codigo} />
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
			bind:value={dataAquisicao}
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
				bind:value={dataGarantia}
			/>
		{/if}
	</div>

	<div class="grid gap-2 md:grid-cols-2">
		<DateInput
			name="ultimaManutencao"
			label="Última Manutenção"
			error={$errors.ultimaManutencao}
			bind:value={ultimaManutencao}
		/>
		<DateInput
			name="proximaManutencao"
			label="Próxima Manutenção"
			error={$errors.proximaManutencao}
			bind:value={proximaManutencao}
		/>
	</div>

	<InputTextArea name="observacoes" label="Observações" bind:value={$form.observacoes} />

	<div class="divider"></div>
	<div class="grid grid-cols-2 gap-2">
		<button class="btn btn-primary" type="submit">Salvar</button>
		<button class="btn btn-error" type="reset">Limpar</button>
	</div>
</form>
