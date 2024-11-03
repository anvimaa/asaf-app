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

	$: pacientes = data.pacientes.map((paciente) => ({
		id: paciente.id,
		nome: paciente.nome,
		nif: paciente.nif
	}));

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

	let formErrors = {
		medico: false,
		pacienteId: false,
		data: false,
		tipoConsulta: false
	};

	function addAnalise(): void {
		analiseList = [...analiseList, { id: 0, tipo: '', data: new Date(), resultado: '' }];
	}

	function removeAnalise(index: number): void {
		analiseList = analiseList.filter((_, i) => i !== index);
	}

	function removeAllAnalise(): void {
		analiseList = [];
	}

	function validateForm(): boolean {
		formErrors = {
			medico: !formState.medico,
			pacienteId: !formState.pacienteId,
			data: !formState.data,
			tipoConsulta: !formState.tipoConsulta
		};

		return !Object.values(formErrors).some((error) => error);
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!validateForm()) {
			toast.error('Por favor, preencha todos os campos obrigatórios');
			return;
		}

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
				<ComboPacientes {pacientes} name="pacienteId" />
				{#if formErrors.pacienteId}
					<p class="text-sm text-red-500">Selecione um paciente</p>
				{/if}

				<div class="grid gap-3">
					<Label for="tipoConsulta">
						Tipo de Consulta <span class="text-red-500">*</span>
					</Label>
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
					{#if formErrors.tipoConsulta}
						<p class="text-sm text-red-500">Selecione o tipo de consulta</p>
					{/if}
				</div>
			</div>

			<div class="mb-2 grid gap-2 md:grid-cols-2">
				<div class="w-full">
					<Label for="medico">
						Médico do Paciente <span class="text-red-500">*</span>
					</Label>
					<Input
						id="medico"
						name="medico"
						bind:value={formState.medico}
						placeholder="Nome do médico"
						class={formErrors.medico ? 'border-red-500' : ''}
					/>
					{#if formErrors.medico}
						<p class="text-sm text-red-500">Informe o médico</p>
					{/if}
				</div>
				<div class="w-full">
					<Label for="data">
						Data da Consulta <span class="text-red-500">*</span>
					</Label>
					<DateTimeInput
						value={formState.data}
						name="data"
						class={formErrors.data ? 'border-red-500' : ''}
					/>
					{#if formErrors.data}
						<p class="text-sm text-red-500">Selecione uma data</p>
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
