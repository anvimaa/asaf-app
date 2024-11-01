<script lang="ts">
	import InputText from '@/components/elements/form/InputText.svelte';
	import type { PageData } from './$types';
	import DateInput from '@/components/elements/form/DateInput.svelte';
	import SelectListInput from '@/components/elements/SelectListInput.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { ISOString } from '@/utils';

	export let data: PageData;

	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}

	let dataAdmissao = ISOString($form.dataAdmissao);
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
		<h1 class="text-2xl font-bold">Editar Funcionário</h1>
		<p class="text-gray-500">Atualize as informações do funcionário</p>
	</div>
</div>

<form method="post" use:enhance class="grid gap-4">
	<input type="hidden" name="id" value={$form.id} />
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
			bind:value={dataAdmissao}
		/>

		<InputText name="funcao" label="Função" error={$errors.funcao} bind:value={$form.funcao} />
	</div>

	<InputText name="agente" label="Agente" error={$errors.agente} bind:value={$form.agente} />

	<div class="divider"></div>
	<div class="grid grid-cols-3 gap-2">
		<button class="btn btn-primary" type="submit">Salvar</button>
		<button class="btn btn-error" type="reset">Limpar</button>
		<a href="/funcionario/delete/{$form.id}" class="btn-destructive btn">Excluir</a>
	</div>
</form>
