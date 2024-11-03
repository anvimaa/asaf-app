<script lang="ts">
	import { formatDate } from '@/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	let showPresencaModal = false;
	let isSubmitting = false;
	let presencaForm = {
		tipo: 'PRESENCA',
		data: new Date().toISOString().split('T')[0],
		id: undefined
	};

	let activeTab = 'detalhes';
	let presencas = data.funcionario?.presencas || [];

	let currentDate = new Date();

	function getMonthDays(date: Date) {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDay = firstDay.getDay();

		return { daysInMonth, startingDay };
	}

	function previousMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
	}

	function nextMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
	}

	$: ({ daysInMonth, startingDay } = getMonthDays(currentDate));

	function getPresencaStatus(data: string) {
		const presenca = presencas.find((p) => p.data.toISOString().split('T')[0] === data);
		return presenca ? presenca.tipo : null;
	}

	async function handlePresencaClick(date: string, currentStatus: string | null) {
		presencaForm = {
			tipo: currentStatus || 'PRESENCA',
			data: date,
			id: undefined
		};
		showPresencaModal = true;
	}

	async function handleSubmitPresenca() {
		try {
			isSubmitting = true;
			const method = presencas.some((p) => p.data.toISOString().split('T')[0] === presencaForm.data)
				? 'PUT'
				: 'POST';

			const response = await fetch(`/api/funcionario/presenca`, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					funcionarioId: data.funcionario?.id,
					...presencaForm
				})
			});

			if (!response.ok) {
				throw new Error('Erro ao registrar presença');
			}

			showPresencaModal = false;
			window.location.reload();
		} catch (error) {
			console.error('Erro ao registrar presença:', error);
			alert('Erro ao registrar presença. Tente novamente.');
		} finally {
			isSubmitting = false;
		}
	}

	// Adicione estas funções para calcular as estatísticas
	function calcularEstatisticas() {
		const total = presencas.length;
		const presentes = presencas.filter((p) => p.tipo === 'PRESENCA').length;
		const faltas = presencas.filter((p) => p.tipo === 'FALTA').length;

		return {
			total,
			presentes,
			faltas,
			percentualPresenca: total > 0 ? (presentes / total) * 100 : 0,
			percentualFalta: total > 0 ? (faltas / total) * 100 : 0
		};
	}

	$: estatisticas = calcularEstatisticas();
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/charts.css/dist/charts.min.css" />
</svelte:head>

<div class="container py-6">
	<div class="grid gap-6">
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight">Detalhes do Funcionário</h1>
			<div class="flex gap-2">
				<button
					class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					on:click={() => (showPresencaModal = true)}
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
						<path d="M8 2v4"></path>
						<path d="M16 2v4"></path>
						<rect width="18" height="18" x="3" y="4" rx="2"></rect>
						<path d="M3 10h18"></path>
					</svg>
					Registrar Presença
				</button>
				<a
					class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					href={`/funcionario/edit/${data.funcionario?.id}`}
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
						><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"
						></path></svg
					>
					Editar
				</a>
				<a
					class="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					href={`/funcionario/delete/${data.funcionario?.id}`}
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
						><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path
							d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
						></path></svg
					>
					Excluir
				</a>
			</div>
		</div>

		<div class="flex space-x-2 border-b">
			<button
				class="px-4 py-2 {activeTab === 'detalhes'
					? 'border-b-2 border-primary font-semibold'
					: ''}"
				on:click={() => (activeTab = 'detalhes')}
			>
				Detalhes
			</button>
			<button
				class="px-4 py-2 {activeTab === 'presencas'
					? 'border-b-2 border-primary font-semibold'
					: ''}"
				on:click={() => (activeTab = 'presencas')}
			>
				Presenças
			</button>
		</div>

		{#if data.funcionario}
			{#if activeTab === 'detalhes'}
				<div class="grid gap-6 md:grid-cols-2">
					<div class="rounded-lg border bg-card p-6 shadow-sm">
						<h2 class="mb-4 text-xl font-semibold">Informações Pessoais</h2>

						<div class="space-y-4">
							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Nome Completo</p>
								<p class="font-medium">{data.funcionario.nome}</p>
							</div>

							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Email</p>
								<p class="font-medium">-</p>
							</div>

							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Telefone</p>
								<p class="font-medium">{data.funcionario.telefone || 'Não informado'}</p>
							</div>

							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">NIF</p>
								<p class="font-medium">{data.funcionario.nif}</p>
							</div>
						</div>
					</div>

					<div class="rounded-lg border bg-card p-6 shadow-sm">
						<h2 class="mb-4 text-xl font-semibold">Informações Profissionais</h2>

						<div class="space-y-4">
							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Função</p>
								<p class="font-medium">{data.funcionario.funcao}</p>
							</div>

							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Data de Admissão</p>
								<p class="font-medium">
									{new Date(data.funcionario.dataAdmissao).toLocaleDateString('pt-BR', formatDate)}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-card p-6 shadow-sm">
					<h2 class="mb-4 text-xl font-semibold">Endereço</h2>

					<div class="grid gap-4 md:grid-cols-2">
						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Morada</p>
							<p class="font-medium">{data.funcionario.endereco || 'Não informado'}</p>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-card p-6 shadow-sm">
					<h2 class="mb-4 text-xl font-semibold">Estatísticas de Presença</h2>

					<div class="grid gap-6 md:grid-cols-2">
						<div>
							<h3 class="mb-2 text-sm font-medium">Distribuição de Presenças</h3>
							<div class="chart-container">
								<table class="charts-css column show-labels show-primary-axis">
									<caption>Distribuição de Presenças</caption>
									<tbody>
										<tr class="">
											<th scope="row">Presenças</th>
											<td
												style="--size: {estatisticas.presentes /
													estatisticas.total}; --color: #22c55e;"
											>
												<span class="data">{estatisticas.presentes}</span>
											</td>
										</tr>
										<tr>
											<th scope="row">Faltas</th>
											<td
												style="--size: {estatisticas.faltas /
													estatisticas.total}; --color: #ef4444;"
											>
												<span class="data">{estatisticas.faltas}</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div class="space-y-4">
							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Total de Registros</p>
								<p class="font-medium">{estatisticas.total}</p>
							</div>
							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Total de Presenças</p>
								<p class="font-medium text-green-600">
									{estatisticas.presentes} - ({estatisticas.percentualPresenca.toFixed(1)}%)
								</p>
							</div>
							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Total de Faltas</p>
								<p class="font-medium text-red-600">
									{estatisticas.faltas} - ({estatisticas.percentualFalta.toFixed(1)}%)
								</p>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<div class="rounded-lg border bg-card p-6 shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<h2 class="text-xl font-semibold">Calendário de Presenças</h2>
						<div class="flex items-center gap-2">
							<button class="rounded-md border p-2 hover:bg-accent" on:click={previousMonth}>
								←
							</button>
							<span class="font-medium">
								{currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
							</span>
							<button class="rounded-md border p-2 hover:bg-accent" on:click={nextMonth}>
								→
							</button>
						</div>
					</div>

					<div class="grid grid-cols-7 gap-1 text-center">
						<div class="font-semibold">Dom</div>
						<div class="font-semibold">Seg</div>
						<div class="font-semibold">Ter</div>
						<div class="font-semibold">Qua</div>
						<div class="font-semibold">Qui</div>
						<div class="font-semibold">Sex</div>
						<div class="font-semibold">Sáb</div>

						{#each Array(startingDay).fill(null) as _}
							<div class="aspect-square p-1"></div>
						{/each}

						{#each Array.from({ length: daysInMonth }, (_, i) => {
							const day = i + 1;
							const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
							const currentDateStr = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
									.toISOString()
									.split('T')[0];
							const status = getPresencaStatus(currentDateStr);
							return { day, status, currentDateStr };
						}) as { day, status, currentDateStr }}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								class="aspect-square cursor-pointer rounded-md border p-1 text-center text-sm font-medium hover:opacity-80 {status ===
								'PRESENCA'
									? 'bg-green-100 text-green-800'
									: status === 'FALTA'
										? 'bg-red-100 text-red-800'
										: ''}"
								on:click={() => handlePresencaClick(currentDateStr, status)}
							>
								<div>{day}</div>
								{#if status}
									<div class="text-xs">
										{status === 'PRESENCA' ? 'Presente' : 'Falta'}
									</div>
								{/if}
							</div>
						{/each}
					</div>

					<div class="mt-4 flex gap-4">
						<div class="flex items-center gap-2">
							<div class="h-4 w-4 rounded bg-green-100"></div>
							<span class="text-sm">Presente</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-4 w-4 rounded bg-red-100"></div>
							<span class="text-sm">Falta</span>
						</div>
					</div>
				</div>
			{/if}
		{:else}
			<div class="rounded-lg border bg-card p-6 text-center shadow-sm">
				<p class="text-muted-foreground">Funcionário não encontrado</p>
			</div>
		{/if}
	</div>
</div>

{#if showPresencaModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground shadow-lg">
			<h2 class="mb-4 text-xl font-semibold">Registrar Presença</h2>

			<form class="space-y-4" on:submit|preventDefault={handleSubmitPresenca}>
				<div class="grid gap-2">
					<label for="tipo" class="text-sm font-medium leading-none"> Tipo de Registro </label>
					<select
						id="tipo"
						bind:value={presencaForm.tipo}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						<option value="PRESENCA">Presença</option>
						<option value="FALTA">Falta</option>
					</select>
				</div>

				<div class="grid gap-2">
					<label for="data" class="text-sm font-medium leading-none"> Data </label>
					<input
						type="date"
						id="data"
						bind:value={presencaForm.data}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					/>
				</div>

				<div class="flex justify-end gap-2 pt-4">
					<button
						type="button"
						class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						on:click={() => (showPresencaModal = false)}
						disabled={isSubmitting}
					>
						Cancelar
					</button>
					<button
						type="submit"
						class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<svg
								class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Enviando...
						{:else}
							Confirmar
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.charts-css {
		--color-1: theme('colors.indigo.500');
		--color-2: theme('colors.blue.400');
		--color-3: theme('colors.green.400');
		--color-4: theme('colors.yellow.400');
	}

	.chart-container {
		height: 200px;
		max-width: 300px;
		margin: 0 auto;
		padding: 1rem;
	}

	.data {
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		color: #374151;
		font-size: 0.875rem;
		font-weight: 500;
	}

	/* Adiciona espaço entre as colunas */
	.charts-css.column tbody tr {
		padding-inline: 25%;
	}

	/* Estiliza o eixo principal */
	.charts-css.show-primary-axis {
		--primary-axis-color: #00ec627d;
	}
</style>
