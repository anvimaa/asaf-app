<script lang="ts">
	import InputText from '@/components/elements/form/InputText.svelte';
	import type { PageData } from './$types';
	import DateInput from '@/components/elements/form/DateInput.svelte';
	import SelectListInput from '@/components/elements/SelectListInput.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}
</script>

<div class="mb-8 flex items-center justify-between">
	<div>
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
			bind:value={$form.dataAdmissao}
		/>

		<InputText name="funcao" label="Função" error={$errors.funcao} bind:value={$form.funcao} />
	</div>

	<InputText name="agente" label="Agente" error={$errors.agente} bind:value={$form.agente} />

	<div class="divider"></div>
	<div class="grid grid-cols-3 gap-2">
		<button class="btn btn-primary" type="submit">Salvar</button>
		<button class="btn btn-error" type="reset">Limpar</button>
		<a href="/funcionario" class="btn btn-secondary">Voltar</a>
	</div>
</form>
