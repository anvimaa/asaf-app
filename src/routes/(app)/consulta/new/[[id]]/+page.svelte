<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import * as Select from '@/components/ui/select/index.js';

	import { analises, generos } from '@/constants';
	import SelectInput from '@/components/elements/form/SelectInput.svelte';
	import DateTimeInput from '@/components/elements/form/DateTimeInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import Textarea from '@/components/ui/textarea/textarea.svelte';
	import Separator from '@/components/ui/separator/separator.svelte';
	import { array } from 'zod';

	export let data: PageData;
	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}

	let countAnalises = 0;

	function addAnalise(): void {
		countAnalises += 1;
	}
</script>

<svelte:head>
	<title>{$form.id ? 'Atualizar' : 'Agendar'} Consulta</title>
</svelte:head>

<form method="POST" use:enhance>
	<Card.Root
		data-x-chunk-name="dashboard-04-chunk-1"
		data-x-chunk-description="A form to update the store name."
	>
		<Card.Header>
			<Card.Title>{$form.id ? 'Atualizar' : 'Agendar'} Consulta</Card.Title>
			<Card.Description>Preencha todas as informações do formulário.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="mb-2 grid gap-2 md:grid-cols-2">
				<div class="w-full">
					<Label for="medico">Medico do Paciente</Label>
					<Input
						id="medico"
						name="medico"
						bind:value={$form.medico}
						placeholder="medico do paciente"
					/>
					{#if $errors.medico}
						<p class="text-sm text-red-500">{$errors.medico}</p>
					{/if}
				</div>
				<div class="w-full">
					<DateTimeInput value={$form.data} name="data" label="Data da Consulta" />
					{#if $errors.data}
						<p class="text-sm text-red-500">{$errors.data}</p>
					{/if}
				</div>
				<div class="grid gap-3">
					<Label for="descricao">Descrição</Label>
					<Textarea
						bind:value={$form.descricao}
						id="descricao"
						name="descricao"
						placeholder="Descrição..."
						class="min-h-[4rem]"
					/>
				</div>
				<div class="grid gap-3">
					<Label for="prescricao">Prescrição</Label>
					<Textarea
						bind:value={$form.prescricao}
						id="prescricao"
						name="prescricao"
						placeholder="Prescrição..."
						class="min-h-[4rem]"
					/>
				</div>
			</div>
			<Separator />
			<Button class="mt-2" on:click={addAnalise}>Adicionar Análize</Button>
			<div class="mt-2 grid">
				{#each Array(countAnalises) as _}
					<div class="grid gap-2 md:grid-cols-3">
						<div class="grid gap-3">
							<Label for="urgencia">Tipo de Analise</Label>
							<Select.Root selected={{ value: '', label: '' }}>
								<Select.Trigger id="urgencia" name="urgencia">
									<Select.Value placeholder="Selecione a analise" />
								</Select.Trigger>
								<Select.Content>
									{#each analises as value}
										<Select.Item {value} label={value} class="">{value}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden name="tipoanalise" />
						</div>

						<div class="w-full">
							<DateTimeInput value={$form.data} name="data" label="Data da analise" />
							{#if $errors.data}
								<p class="text-sm text-red-500">{$errors.data}</p>
							{/if}
						</div>

						<div class="w-full">
							<Label for="tipoanalise">Resultado</Label>
							<Input id="tipoanalise" name="tipoanalise" placeholder="Resultado" />
						</div>
					</div>
				{/each}
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
