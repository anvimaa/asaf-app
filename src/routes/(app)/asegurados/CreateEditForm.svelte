<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	export let message: any;
	export let errors: any;
	export let form: any;
	export let enhance: any;
</script>

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
		<Card.Footer class="flex gap-x-2 border-t px-6 py-4">
			<Button type="submit">Salvar Dados</Button>
			<Button type="reset">Limpar Formulário</Button>
			<Button on:click type="button">Fechar Formulário</Button>
		</Card.Footer>
	</Card.Root>
</form>
