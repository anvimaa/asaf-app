<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';

	import { generos } from '@/constants';
	import SelectInput from '@/components/elements/form/SelectInput.svelte';
	import DateTimeInput from '@/components/elements/form/DateTimeInput.svelte';
	import type { PageData } from './$types';
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

<svelte:head>
	<title>{$form.id ? 'Editar' : 'Cadastrar'} Paciente</title>
</svelte:head>

<form method="POST" use:enhance>
	<Card.Root
		data-x-chunk-name="dashboard-04-chunk-1"
		data-x-chunk-description="A form to update the store name."
	>
		<Card.Header>
			<Card.Title>{$form.id ? 'Editar' : 'Cadastrar'} Paciente</Card.Title>
			<Card.Description>Preencha todas as informações do formulário.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-2 md:grid-cols-2">
				<div class="w-full">
					<Label for="nome">Nome do Paciente</Label>
					<Input id="nome" name="nome" bind:value={$form.nome} placeholder="Nome do paciente" />
					{#if $errors.nome}
						<p class="text-sm text-red-500">{$errors.nome}</p>
					{/if}
				</div>

				<div class="w-full">
					<Label for="nif">Número de Identificação</Label>
					<Input id="nif" name="nif" bind:value={$form.nif} placeholder="nif do paciente" />
					{#if $errors.nif}
						<p class="text-sm text-red-500">{$errors.nif}</p>
					{/if}
				</div>
			</div>

			<div class="grid gap-2 md:grid-cols-2">
				<div class="w-full">
					<SelectInput
						value={$form.sexo}
						items={generos}
						name="sexo"
						label="Genero"
						placeholder="Selecione o Genero"
					/>
					{#if $errors.sexo}
						<p class="text-sm text-red-500">{$errors.sexo}</p>
					{/if}
				</div>

				<div class="w-full">
					<DateTimeInput
						value={$form.dataNascimento}
						name="dataNascimento"
						label="Data de Nascimento"
					/>
					{#if $errors.dataNascimento}
						<p class="text-sm text-red-500">{$errors.dataNascimento}</p>
					{/if}
				</div>
			</div>

			<div class="grid gap-2 md:grid-cols-2">
				<div class="w-full">
					<Label for="endereco">Endereço</Label>
					<Input
						id="endereco"
						name="endereco"
						bind:value={$form.endereco}
						placeholder="endereco do paciente"
					/>
					{#if $errors.endereco}
						<p class="text-sm text-red-500">{$errors.endereco}</p>
					{/if}
				</div>

				<div class="w-full">
					<Label for="telefone">Telefone</Label>
					<Input
						id="telefone"
						name="telefone"
						bind:value={$form.telefone}
						placeholder="telefone do paciente"
					/>
					{#if $errors.telefone}
						<p class="text-sm text-red-500">{$errors.telefone}</p>
					{/if}
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex gap-x-2 border-t px-6 py-4">
			<Button type="submit">Salvar Dados</Button>
			<Button
				on:click={() => {
					reset();
				}}
			>
				Limpar Formulário
			</Button>
			<Button
				on:click={() => {
					history.back();
				}}>Fechar Formulário</Button
			>
		</Card.Footer>
	</Card.Root>
</form>
