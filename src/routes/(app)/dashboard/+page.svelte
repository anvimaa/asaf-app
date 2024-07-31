<script lang="ts">
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import * as Avatar from '@/components/ui/avatar/index.js';
	import { Badge } from '@/components/ui/badge/index.js';
	import { Button } from '@/components/ui/button/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import * as Table from '@/components/ui/table/index.js';
	import { stats, transations } from '@/constants';
</script>

<svelte:head>
	<title>Painel</title>
</svelte:head>

<div class="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
	{#each stats as stat}
		<Card.Root
			data-x-chunk-name="dashboard-01-chunk-0"
			data-x-chunk-description="A card showing the total revenue in USD and the percentage difference from last month."
		>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">{stat.title}</Card.Title>
				<svelte:component this={stat.icon} class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{stat.content}</div>
				<p class="text-xs text-muted-foreground">
					{stat.description}
				</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>

<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
	<Card.Root
		class="xl:col-span-2"
		data-x-chunk-name="dashboard-01-chunk-4"
		data-x-chunk-description="A card showing a table of recent transactions with a link to view all transactions."
	>
		<Card.Header class="flex flex-row items-center">
			<div class="grid gap-2">
				<Card.Title>Operações</Card.Title>
				<Card.Description>Últimas Operações realizadas.</Card.Description>
			</div>
			<Button href="##" size="sm" class="ml-auto gap-1">
				Ver todas
				<ArrowUpRight class="h-4 w-4" />
			</Button>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Assegurado</Table.Head>
						<Table.Head class="">Operação</Table.Head>
						<Table.Head class="">Estado</Table.Head>
						<Table.Head class="">Data</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each transations as transation}
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">{transation.name}</div>
								<div class="hidden text-sm text-muted-foreground md:inline">{transation.email}</div>
							</Table.Cell>
							<Table.Cell class="">{transation.operation}</Table.Cell>
							<Table.Cell class="">
								<Badge class="text-xs" variant="outline">{transation.status}</Badge>
							</Table.Cell>
							<Table.Cell class="">{transation.date.toLocaleDateString()}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>

	<Card.Root
		data-x-chunk-name="dashboard-01-chunk-5"
		data-x-chunk-description="A card showing a list of recent sales with customer names and email addresses."
	>
		<Card.Header>
			<Card.Title>Recent Sales</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-8">
			<div class="flex items-center gap-4">
				<Avatar.Root class="hidden h-9 w-9 sm:flex">
					<Avatar.Image src="/avatars/01.png" alt="Avatar" />
					<Avatar.Fallback>OM</Avatar.Fallback>
				</Avatar.Root>
				<div class="grid gap-1">
					<p class="text-sm font-medium leading-none">Olivia Martin</p>
					<p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
				</div>
				<div class="ml-auto font-medium">+$1,999.00</div>
			</div>
			<div class="flex items-center gap-4">
				<Avatar.Root class="hidden h-9 w-9 sm:flex">
					<Avatar.Image src="/avatars/02.png" alt="Avatar" />
					<Avatar.Fallback>JL</Avatar.Fallback>
				</Avatar.Root>
				<div class="grid gap-1">
					<p class="text-sm font-medium leading-none">Jackson Lee</p>
					<p class="text-sm text-muted-foreground">jackson.lee@email.com</p>
				</div>
				<div class="ml-auto font-medium">+$39.00</div>
			</div>
			<div class="flex items-center gap-4">
				<Avatar.Root class="hidden h-9 w-9 sm:flex">
					<Avatar.Image src="/avatars/03.png" alt="Avatar" />
					<Avatar.Fallback>IN</Avatar.Fallback>
				</Avatar.Root>
				<div class="grid gap-1">
					<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
					<p class="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
				</div>
				<div class="ml-auto font-medium">+$299.00</div>
			</div>
			<div class="flex items-center gap-4">
				<Avatar.Root class="hidden h-9 w-9 sm:flex">
					<Avatar.Image src="/avatars/04.png" alt="Avatar" />
					<Avatar.Fallback>WK</Avatar.Fallback>
				</Avatar.Root>
				<div class="grid gap-1">
					<p class="text-sm font-medium leading-none">William Kim</p>
					<p class="text-sm text-muted-foreground">will@email.com</p>
				</div>
				<div class="ml-auto font-medium">+$99.00</div>
			</div>
			<div class="flex items-center gap-4">
				<Avatar.Root class="hidden h-9 w-9 sm:flex">
					<Avatar.Image src="/avatars/05.png" alt="Avatar" />
					<Avatar.Fallback>SD</Avatar.Fallback>
				</Avatar.Root>
				<div class="grid gap-1">
					<p class="text-sm font-medium leading-none">Sofia Davis</p>
					<p class="text-sm text-muted-foreground">sofia.davis@email.com</p>
				</div>
				<div class="ml-auto font-medium">+$39.00</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
