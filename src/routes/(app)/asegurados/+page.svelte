<script lang="ts">
	import SuperDebug from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	export let data: PageData;

	const { form, errors, message, enhance } = superForm(data.form);
</script>

<svelte:head>
	<title>Asegurados</title>
</svelte:head>

<SuperDebug data={$form} />

{#if $message}<h3>{$message}</h3>{/if}

<form method="POST" use:enhance>
	<Card.Root
		data-x-chunk-name="dashboard-04-chunk-1"
		data-x-chunk-description="A form to update the store name."
	>
		<Card.Header>
			<Card.Title>Cadastrar Asegurado</Card.Title>
			<Card.Description>Preencha todas as informações do Asegurado.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex w-full max-w-sm flex-col gap-1.5">
				<Label for="name">Nome Completo</Label>
				<Input id="name" name="name" bind:value={$form.name} placeholder="Nome" />
				{#if $errors.name}
					<p class="text-sm text-red-500">{$errors.name}</p>
				{/if}
			</div>
			<div class="flex w-full max-w-sm flex-col gap-1.5">
				<Label for="email">E-mail</Label>
				<Input id="email" type="email" name="email" bind:value={$form.email} placeholder="E-mail" />
				{#if $errors.email}
					<p class="text-sm text-red-500">{$errors.email}</p>
				{/if}
			</div>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button type="submit">Salvar</Button>
		</Card.Footer>
	</Card.Root>
</form>

<style>
	.invalid {
		color: red;
	}
</style>
