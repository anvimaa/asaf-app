<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import * as Select from '@/components/ui/select/index.js';

	import { analises, tiposConsulta } from '@/constants';
	import DateTimeInput from '@/components/elements/form/DateTimeInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import Textarea from '@/components/ui/textarea/textarea.svelte';
	import Separator from '@/components/ui/separator/separator.svelte';
	import { Trash } from 'lucide-svelte';
	import type { AnaliseType } from '@/schemas';
	import ComboPacientes from './ComboPacientes.svelte';

	export let data: PageData;
	const { form, errors, message, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}

	let analiseList: AnaliseType[] = [];
	let tipoConsulta: string = '';

	let formState = {
		medico: '',
		pacienteId: undefined,
		prescricao: '',
		descricao: '',
		data: '',
		tipoConsulta: ''
	};

	function addAnalise(): void {
		analiseList = [...analiseList, { id: 0, tipo: '', data: '', resultado: '' }];
	}

	function removeAnalise(index: number): void {
		analiseList = analiseList.filter((_, i) => i !== index);
	}

	function removeAllAnalise(): void {
		analiseList = [];
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		// Serializar a lista de objetos como JSON
		formData.append('analiseList', JSON.stringify(analiseList));

		// Submeter a API route
		const response = await fetch('/api/consulta', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();
		console.log(result);

		toast.success(result.message);
		removeAllAnalise();
		formState = {
			medico: '',
			pacienteId: undefined,
			prescricao: '',
			descricao: '',
			data: '',
			tipoConsulta: ''
		};
	}
</script>

<svelte:head>
	<title>{$form.id ? 'Atualizar' : 'Agendar'} Consulta</title>
</svelte:head>

<form on:submit={handleSubmit}>
	<Card.Root
		data-x-chunk-name="dashboard-04-chunk-1"
		data-x-chunk-description="A form to update the store name."
	>
		<Card.Header>
			<Card.Title>{$form.id ? 'Atualizar' : 'Agendar'} Consulta</Card.Title>
			<Card.Description>Preencha todas as informações do formulário.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-2 md:grid-cols-2">
				<ComboPacientes pacientes={data.pacientes} name="pacienteId" />

				<div class="grid gap-3">
					<Label for="tipoConsulta">Tipo de Consulta</Label>
					<Select.Root
						selected={{ value: '', label: '' }}
						onSelectedChange={(v) => {
							v && (formState.tipoConsulta = v.value);
						}}
					>
						<Select.Trigger id="tipoConsulta" name="tipoConsulta">
							<Select.Value placeholder="Selecione a consulta" />
						</Select.Trigger>
						<Select.Content>
							{#each tiposConsulta as value}
								<Select.Item {value} label={value} class="">{value}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<input type="hidden" name="tipoConsulta" bind:value={formState.tipoConsulta} />
				</div>
			</div>

			<div class="mb-2 grid gap-2 md:grid-cols-2">
				<div class="w-full">
					<Label for="medico">Medico do Paciente</Label>
					<Input
						id="medico"
						name="medico"
						bind:value={formState.medico}
						placeholder="medico do paciente"
					/>
				</div>
				<div class="w-full">
					<DateTimeInput value={formState.data} name="data" label="Data da Consulta" />
					{#if $errors.data}
						<p class="text-sm text-red-500">{$errors.data}</p>
					{/if}
				</div>
				<div class="grid gap-3">
					<Label for="descricao">Descrição</Label>
					<Textarea
						bind:value={formState.descricao}
						id="descricao"
						name="descricao"
						placeholder="Descrição..."
						class="min-h-[4rem]"
					/>
				</div>
				<div class="grid gap-3">
					<Label for="prescricao">Prescrição</Label>
					<Textarea
						bind:value={formState.prescricao}
						id="prescricao"
						name="prescricao"
						placeholder="Prescrição..."
						class="min-h-[4rem]"
					/>
				</div>
			</div>

			<div class="mb-2 grid">
				{#each analiseList as _, i}
					<div class="grid items-center justify-center gap-2 md:grid-cols-4">
						<div class="grid gap-3">
							<Label for="tipoAnalise">Tipo de Analise</Label>
							<Select.Root
								selected={{ value: '', label: '' }}
								onSelectedChange={(v) => {
									v && (analiseList[i].tipo = v.value);
								}}
							>
								<Select.Trigger id="tipoAnalise" name="tipoAnalise">
									<Select.Value placeholder="Selecione a analise" />
								</Select.Trigger>
								<Select.Content>
									{#each analises as value}
										<Select.Item {value} label={value} class="">{value}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>

						<div class="w-full">
							<DateTimeInput
								bind:value={analiseList[i].data}
								name="dataAnalise"
								label="Data da analise"
							/>
						</div>

						<div class="w-full">
							<Label for="resultadoAnalise">Resultado</Label>
							<Input
								id="resultadoAnalise"
								bind:value={analiseList[i].resultado}
								name="resultadoAnalise"
								placeholder="Resultado"
							/>
						</div>

						<Button
							class="mt-2 w-20 bg-red-500 hover:bg-red-600"
							on:click={() => {
								removeAnalise(i);
							}}
						>
							<Trash />
						</Button>
					</div>
				{/each}
			</div>

			<Separator />
			<div class="flex gap-4">
				<Button class="mt-2 bg-yellow-500 hover:bg-yellow-600" on:click={addAnalise}>
					Adicionar Análize
				</Button>
				<Button class="mt-2 bg-red-500 hover:bg-red-600" on:click={removeAllAnalise}>
					Remover Todas Análize
				</Button>
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
