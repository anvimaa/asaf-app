<script lang="ts">
	import * as Card from '@/components/ui/card/index.js';
	import * as Tabs from '@/components/ui/tabs/index.js';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/charts.css/dist/charts.min.css" />
</svelte:head>

<Tabs.Root value="pacientes">
	<Tabs.List>
		<Tabs.Trigger value="pacientes">Pacientes</Tabs.Trigger>
		<Tabs.Trigger value="consultas">Consultas</Tabs.Trigger>
		<Tabs.Trigger value="farmacia">Farmácia</Tabs.Trigger>
		<Tabs.Trigger value="funcionarios">Funcionários</Tabs.Trigger>
		<Tabs.Trigger value="patrimonio">Património</Tabs.Trigger>
	</Tabs.List>

	<!-- Relatório de Pacientes -->
	<Tabs.Content value="pacientes">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<Card.Root>
				<Card.Header>
					<Card.Title>Evolução de Pacientes</Card.Title>
					<Card.Description>Últimos 6 meses</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="h-[200px]">
						<table class="charts-css column show-labels show-primary-axis data-spacing-5 h-[180px]">
							<tbody>
								<tr><td style="--size: 0.65;"><span class="data">650</span></td></tr>
								<tr><td style="--size: 0.75;"><span class="data">750</span></td></tr>
								<tr><td style="--size: 0.85;"><span class="data">850</span></td></tr>
								<tr><td style="--size: 0.95;"><span class="data">950</span></td></tr>
								<tr><td style="--size: 0.80;"><span class="data">800</span></td></tr>
								<tr><td style="--size: 0.90;"><span class="data">900</span></td></tr>
							</tbody>
						</table>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Distribuição por Idade</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex h-[200px] items-center justify-center">
						<div class="relative h-[140px] w-[140px]">
							<table class="pie charts-css">
								<tbody>
									<tr><td style="--start:0; --end: 0.3;"></td></tr>
									<tr><td style="--start:0.3; --end: 0.5;"></td></tr>
									<tr><td style="--start:0.5; --end: 0.8;"></td></tr>
									<tr><td style="--start:0.8; --end: 1;"></td></tr>
								</tbody>
							</table>
						</div>
						<div class="ml-4 space-y-2 text-sm">
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-indigo-500"></span>
								<span>0-18 anos (30%)</span>
							</div>
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-blue-400"></span>
								<span>19-40 anos (20%)</span>
							</div>
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-green-400"></span>
								<span>41-60 anos (30%)</span>
							</div>
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-yellow-400"></span>
								<span>60+ anos (20%)</span>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Status de Atendimento</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Em Tratamento</span>
								<span class="font-medium">65%</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-green-500" style="width: 65%;" />
							</div>
						</div>
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Alta Médica</span>
								<span class="font-medium">25%</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-blue-500" style="width: 25%;" />
							</div>
						</div>
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Aguardando</span>
								<span class="font-medium">10%</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-yellow-500" style="width: 10%;" />
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</Tabs.Content>
	<Tabs.Content value="consultas">
		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title>Consultas por Especialidade</Card.Title>
				</Card.Header>
				<Card.Content>
					<table
						class="charts-css bar show-labels show-primary-axis data-spacing-4 h-[200px] w-full"
					>
						<tbody>
							<tr><td style="--size: 0.85;"><span class="data">Clínica Geral (85)</span></td></tr>
							<tr><td style="--size: 0.65;"><span class="data">Pediatria (65)</span></td></tr>
							<tr><td style="--size: 0.45;"><span class="data">Ortopedia (45)</span></td></tr>
							<tr><td style="--size: 0.35;"><span class="data">Cardiologia (35)</span></td></tr>
							<tr><td style="--size: 0.25;"><span class="data">Neurologia (25)</span></td></tr>
						</tbody>
					</table>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Tempo Médio de Espera</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Clínica Geral</span>
								<span class="font-medium">45 min</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-indigo-500" style="width: 75%;" />
							</div>
						</div>
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Pediatria</span>
								<span class="font-medium">30 min</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-blue-500" style="width: 50%;" />
							</div>
						</div>
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Ortopedia</span>
								<span class="font-medium">60 min</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-green-500" style="width: 100%;" />
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</Tabs.Content>

	<Tabs.Content value="farmacia">
		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title>Estoque por Categoria</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex h-[200px] items-center justify-center">
						<div class="relative h-[140px] w-[140px]">
							<table class="pie charts-css">
								<tbody>
									<tr
										><td style="--start:0; --end: 0.4"><span class="data">Analgésicos</span></td
										></tr
									>
									<tr
										><td style="--start:0.4; --end: 0.7"><span class="data">Antibióticos</span></td
										></tr
									>
									<tr
										><td style="--start:0.7; --end: 0.9"
											><span class="data">Anti-inflamatórios</span></td
										></tr
									>
									<tr><td style="--start:0.9; --end: 1"><span class="data">Outros</span></td></tr>
								</tbody>
							</table>
						</div>
						<div class="ml-4 space-y-2 text-sm">
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-indigo-500"></span>
								<span>Analgésicos (40%)</span>
							</div>
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-blue-400"></span>
								<span>Antibióticos (30%)</span>
							</div>
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-green-400"></span>
								<span>Anti-inflamatórios (20%)</span>
							</div>
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-yellow-400"></span>
								<span>Outros (10%)</span>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Alertas de Estoque</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="rounded-lg border bg-red-50 p-4">
							<div class="flex items-center">
								<span class="mr-2 text-red-500">⚠️</span>
								<span class="font-medium text-red-700">5 itens abaixo do estoque mínimo</span>
							</div>
						</div>
						<div class="rounded-lg border bg-yellow-50 p-4">
							<div class="flex items-center">
								<span class="mr-2 text-yellow-500">⚠️</span>
								<span class="font-medium text-yellow-700">8 itens próximos ao vencimento</span>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</Tabs.Content>

	<Tabs.Content value="funcionarios">
		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title>Distribuição por Cargo</Card.Title>
				</Card.Header>
				<Card.Content>
					<table
						class="charts-css column show-labels show-primary-axis data-spacing-4 h-[200px] w-full"
					>
						<tbody>
							<tr><td style="--size: 0.4;"><span class="data">Médicos (40)</span></td></tr>
							<tr><td style="--size: 0.35;"><span class="data">Enfermeiros (35)</span></td></tr>
							<tr><td style="--size: 0.15;"><span class="data">Técnicos (15)</span></td></tr>
							<tr><td style="--size: 0.1;"><span class="data">Administrativo (10)</span></td></tr>
						</tbody>
					</table>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Turnos de Trabalho</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Manhã</span>
								<span class="font-medium">45%</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-blue-500" style="width: 45%;" />
							</div>
						</div>
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Tarde</span>
								<span class="font-medium">35%</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-green-500" style="width: 35%;" />
							</div>
						</div>
						<div class="grid gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Noite</span>
								<span class="font-medium">20%</span>
							</div>
							<div class="h-2 rounded-full bg-gray-100">
								<div class="h-full rounded-full bg-indigo-500" style="width: 20%;" />
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</Tabs.Content>

	<Tabs.Content value="patrimonio">
		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title>Estado dos Equipamentos</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex h-[200px] items-center justify-center">
						<div class="relative h-[140px] w-[140px]">
							<table class="pie charts-css">
								<tbody>
									<tr
										><td style="--start:0; --end: 0.6"><span class="data">Funcionando</span></td
										></tr
									>
									<tr
										><td style="--start:0.6; --end: 0.85"><span class="data">Manutenção</span></td
										></tr
									>
									<tr
										><td style="--start:0.85; --end: 1"><span class="data">Inoperante</span></td
										></tr
									>
								</tbody>
							</table>
						</div>
						<div class="ml-4 space-y-2 text-sm">
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
								<span>Funcionando (60%)</span>
							</div>
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-yellow-500"></span>
								<span>Manutenção (25%)</span>
							</div>
							<div class="flex items-center">
								<span class="mr-2 h-3 w-3 rounded-full bg-red-500"></span>
								<span>Inoperante (15%)</span>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Manutenções Programadas</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="rounded-lg border p-4">
							<div class="flex items-center justify-between">
								<span class="font-medium">Raio-X</span>
								<span class="text-sm text-gray-500">Em 5 dias</span>
							</div>
						</div>
						<div class="rounded-lg border p-4">
							<div class="flex items-center justify-between">
								<span class="font-medium">Tomógrafo</span>
								<span class="text-sm text-gray-500">Em 12 dias</span>
							</div>
						</div>
						<div class="rounded-lg border p-4">
							<div class="flex items-center justify-between">
								<span class="font-medium">Ultrassom</span>
								<span class="text-sm text-gray-500">Em 15 dias</span>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</Tabs.Content>
</Tabs.Root>

<style>
	/* Personalização dos gráficos */
	.charts-css {
		--color-1: theme('colors.indigo.500');
		--color-2: theme('colors.blue.400');
		--color-3: theme('colors.green.400');
		--color-4: theme('colors.yellow.400');
	}

	.charts-css .data {
		font-size: 0.75rem;
		color: theme('colors.gray.600');
	}

	.pie.charts-css {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.pie.charts-css .data {
		display: none;
	}
</style>
