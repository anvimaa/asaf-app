<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import * as Command from '@/components/ui/command';
	import * as Select from '$lib/components/ui/select/index.js';

	import { generos } from '@/constants';

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
			<Card.Title>Cadastrar Paciente</Card.Title>
			<Card.Description>Preencha todas as informações do formulário.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex w-full flex-col gap-1.5">
				<Label for="nome">Nome do Paciente</Label>
				<Input id="nome" name="nome" bind:value={$form.nome} placeholder="Nome do paciente" />
				{#if $errors.nome}
					<p class="text-sm text-red-500">{$errors.nome}</p>
				{/if}
			</div>

			<div class="mt-2 flex w-full flex-col">
				<Select.Root name="genero">
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder="Selecione o Genero" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Generos</Select.Label>
							{#each generos as genero}
								<Select.Item value={genero} label={genero}>{genero}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="genero" bind:value={$form.genero} />
				</Select.Root>
				{#if $errors.genero}
					<p class="text-sm text-red-500">{$errors.genero}</p>
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
