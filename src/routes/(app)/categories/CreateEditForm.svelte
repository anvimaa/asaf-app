<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { Textarea } from '@/components/ui/textarea';
	import { Label } from '@/components/ui/label';

	export let errors: any;
	export let form: any;
	export let enhance: any;
</script>

<form method="POST" use:enhance>
	<Card.Root
		data-x-chunk-name="dashboard-04-chunk-1"
		data-x-chunk-description="A form to update the store name."
	>
		<Card.Header>
			<Card.Title>Cadastrar Categoria</Card.Title>
			<Card.Description>Preencha todas as informações do formulário.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex w-full flex-col gap-1.5">
				<Label for="categoryName">Nome da Categoria</Label>
				<Input
					id="categoryName"
					name="categoryName"
					bind:value={$form.categoryName}
					placeholder="Nome da Categoria"
				/>
				{#if $errors.categoryName}
					<p class="text-sm text-red-500">{$errors.categoryName}</p>
				{/if}
			</div>
			<div class="flex w-full flex-col gap-1.5">
				<Label for="description">Descrição</Label>
				<Textarea
					id="description"
					rows={15}
					name="description"
					bind:value={$form.description}
					placeholder="Descrição da Categoria"
				/>
				{#if $errors.description}
					<p class="text-sm text-red-500">{$errors.description}</p>
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
