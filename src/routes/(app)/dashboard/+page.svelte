<script lang="ts">
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import Users from 'lucide-svelte/icons/users';
	import Stethoscope from 'lucide-svelte/icons/stethoscope';
	import Pills from 'lucide-svelte/icons/pill';
	import UserCog from 'lucide-svelte/icons/user-cog';
	import * as Card from '@/components/ui/card/index.js';
	import * as Table from '@/components/ui/table/index.js';

	const stats = [
		{
			title: 'Total de Pacientes',
			value: '12.594',
			change: '+14%',
			changeType: 'positive',
			icon: Users,
			description: 'em relação ao mês anterior'
		},
		{
			title: 'Consultas Hoje',
			value: '147',
			change: '+23%',
			changeType: 'positive',
			icon: Stethoscope,
			description: 'comparado à média diária'
		},
		{
			title: 'Estoque Farmácia',
			value: '2.847',
			change: '-3%',
			changeType: 'negative',
			icon: Pills,
			description: 'itens em estoque'
		},
		{
			title: 'Funcionários Ativos',
			value: '284',
			change: '+5%',
			changeType: 'positive',
			icon: UserCog,
			description: 'em relação ao trimestre anterior'
		}
	];
</script>

<svelte:head>
	<title>Dashboard - SADISSA</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/charts.css/dist/charts.min.css" />
</svelte:head>

<!-- Stats Cards -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each stats as stat}
		<Card.Root class="relative overflow-hidden">
			<Card.Header class="space-y-0 pb-2">
				<div class="flex items-center justify-between">
					<Card.Title class="text-sm font-medium">{stat.title}</Card.Title>
					<svelte:component this={stat.icon} class="h-4 w-4 text-muted-foreground" />
				</div>
			</Card.Header>
			<Card.Content>
				<div class="flex items-baseline space-x-3">
					<div class="text-2xl font-bold">{stat.value}</div>
					<span
						class={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}
					>
						{stat.change}
					</span>
				</div>
				<p class="mt-1 text-xs text-muted-foreground">
					{stat.description}
				</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>

<!-- Charts Section -->
<div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
	<!-- Ocupação de Leitos -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Ocupação de Leitos</Card.Title>
			<Card.Description>Últimos 7 dias</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="h-[200px] w-full">
				<table
					class="charts-css column show-labels show-primary-axis show-4-secondary-axes data-spacing-4 h-[180px]"
				>
					<tbody>
						<tr><td style="--size: 0.8;"><span class="data">80%</span></td></tr>
						<tr><td style="--size: 0.65;"><span class="data">65%</span></td></tr>
						<tr><td style="--size: 0.9;"><span class="data">90%</span></td></tr>
						<tr><td style="--size: 0.85;"><span class="data">85%</span></td></tr>
						<tr><td style="--size: 0.7;"><span class="data">70%</span></td></tr>
						<tr><td style="--size: 0.75;"><span class="data">75%</span></td></tr>
						<tr><td style="--size: 0.82;"><span class="data">82%</span></td></tr>
					</tbody>
				</table>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Distribuição de Atendimentos -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Distribuição de Atendimentos</Card.Title>
			<Card.Description>Por especialidade</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex h-[200px] w-full items-center justify-center">
				<div class="relative h-[140px] w-[140px]">
					<table class="charts-css pie show-labels h-full w-full">
						<tbody>
							<tr><td style="--start: 0; --end: 0.35;"></td></tr>
							<tr><td style="--start: 0.35; --end: 0.6;"></td></tr>
							<tr><td style="--start: 0.6; --end: 0.8;"></td></tr>
							<tr><td style="--start: 0.8; --end: 1;"></td></tr>
						</tbody>
					</table>
				</div>
				<!-- Legenda separada -->
				<div class="ml-4 space-y-2 text-sm">
					<div class="flex items-center">
						<span class="mr-2 h-3 w-3 rounded-full bg-indigo-500"></span>
						<span>Clínica Geral (35%)</span>
					</div>
					<div class="flex items-center">
						<span class="mr-2 h-3 w-3 rounded-full bg-blue-400"></span>
						<span>Pediatria (25%)</span>
					</div>
					<div class="flex items-center">
						<span class="mr-2 h-3 w-3 rounded-full bg-green-400"></span>
						<span>Ortopedia (20%)</span>
					</div>
					<div class="flex items-center">
						<span class="mr-2 h-3 w-3 rounded-full bg-yellow-400"></span>
						<span>Outros (20%)</span>
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Novo Gráfico de Linhas - Tendência de Atendimentos -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Tendência de Atendimentos</Card.Title>
			<Card.Description>Últimos 30 dias</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="h-[200px] w-full">
				<table
					class="charts-css line show-labels show-primary-axis show-4-secondary-axes data-spacing-4 h-[180px]"
				>
					<tbody>
						<tr><td style="--start: 0.4; --size: 0.4;"><span class="data">40</span></td></tr>
						<tr><td style="--start: 0.4; --size: 0.6;"><span class="data">60</span></td></tr>
						<tr><td style="--start: 0.6; --size: 0.5;"><span class="data">50</span></td></tr>
						<tr><td style="--start: 0.5; --size: 0.8;"><span class="data">80</span></td></tr>
						<tr><td style="--start: 0.8; --size: 0.7;"><span class="data">70</span></td></tr>
						<tr><td style="--start: 0.7; --size: 0.6;"><span class="data">60</span></td></tr>
						<tr><td style="--start: 0.6; --size: 0.9;"><span class="data">90</span></td></tr>
					</tbody>
				</table>
			</div>
		</Card.Content>
	</Card.Root>
</div>

<!-- Additional Info Section -->
<div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
	<!-- Próximas Consultas -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Próximas Consultas</Card.Title>
			<Card.Description>Agendamentos para hoje</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="space-y-4">
				{#each Array(4) as _, i}
					<div class="flex items-center justify-between">
						<div>
							<p class="font-medium">Paciente {i + 1}</p>
							<p class="text-sm text-muted-foreground">Dr. Silva - Cardiologia</p>
						</div>
						<div class="text-sm">14:3{i}</div>
					</div>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Medicamentos Críticos -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Estoque Crítico</Card.Title>
			<Card.Description>Medicamentos abaixo do mínimo</Card.Description>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Medicamento</Table.Head>
						<Table.Head>Qtd</Table.Head>
						<Table.Head>Mínimo</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Dipirona 500mg</Table.Cell>
						<Table.Cell>50</Table.Cell>
						<Table.Cell class="text-red-500">100</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Amoxicilina 500mg</Table.Cell>
						<Table.Cell>30</Table.Cell>
						<Table.Cell class="text-red-500">80</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>

	<!-- Indicadores de Performance -->
	<Card.Root>
		<Card.Header>
			<Card.Title>KPIs</Card.Title>
			<Card.Description>Indicadores principais</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="space-y-4">
				<div class="grid gap-2">
					<div class="flex items-center justify-between">
						<span class="text-sm">Tempo Médio de Espera</span>
						<span class="font-medium">23 min</span>
					</div>
					<div class="h-2 rounded-full bg-gray-100">
						<div class="h-full rounded-full bg-green-500" style="width: 65%;" />
					</div>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center justify-between">
						<span class="text-sm">Satisfação do Paciente</span>
						<span class="font-medium">92%</span>
					</div>
					<div class="h-2 rounded-full bg-gray-100">
						<div class="h-full rounded-full bg-blue-500" style="width: 92%;" />
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>

<!-- Adicionar estilos CSS -->
<style>
	/* Personalização dos gráficos */
	.charts-css {
		--color-1: theme('colors.indigo.500');
		--color-2: theme('colors.blue.400');
		--color-3: theme('colors.green.400');
		--color-4: theme('colors.yellow.400');
	}

	/* Estilização do gráfico de linhas */
	.line.charts-css td {
		background-image: linear-gradient(
			to right,
			theme('colors.indigo.500'),
			theme('colors.blue.400')
		);
	}

	/* Melhorar visualização das labels */
	.charts-css .data {
		font-size: 0.75rem;
		color: theme('colors.gray.600');
	}

	/* Ajustes específicos para o gráfico de pizza */
	.pie.charts-css {
		--color-1: theme('colors.indigo.500');
		--color-2: theme('colors.blue.400');
		--color-3: theme('colors.green.400');
		--color-4: theme('colors.yellow.400');
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	/* Remover labels do gráfico de pizza já que agora temos legenda */
	.pie.charts-css .data {
		display: none;
	}
</style>
