<script lang="ts">
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import { Button } from '@/components/ui/button/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import { Separator } from '@/components/ui/separator/index.js';
	import { PrinterCheck, Trash, Pencil, HeartPulse } from 'lucide-svelte';
	import DetailsItem from '@/components/elements/details-item.svelte';
	import { formatDate, formatDateTime } from '@/utils';
	import { analises } from '@/constants';
	import { Root } from '@/components/ui/alert';
	import Header from '@/components/sections/header.svelte';
	import { Content } from '@/components/ui/dialog';

	export let consulta: any;
	export let showMenu = true;
</script>

<Card.Root class="overflow-hidden">
	<Card.Header class="flex flex-row items-start bg-muted/50">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-2xl">
				Consulta de: <span class="font-bold uppercase">{consulta.paciente.nome}</span>
			</Card.Title>
			<Card.Description>
				<span class="text-lg font-bold">Tipo de Consulta: {consulta.tipo}</span> <br />
				Data de Cadastro: {consulta.createdAt.toLocaleDateString('pt', formatDateTime)}
			</Card.Description>
		</div>
		{#if showMenu}
			<div class="ml-auto flex items-center gap-1">
				<Button size="sm" variant="outline" class="h-8 gap-1">
					<PrinterCheck class="h-3.5 w-3.5" />
					<span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap"> Ficha </span>
				</Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} size="icon" variant="outline" class="h-8 w-8">
							<EllipsisVertical class="h-3.5 w-3.5" />
							<span class="sr-only">Mais</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Item href="/consulta/new?id={consulta.id}">
							Editar
							<DropdownMenu.Shortcut>
								<Pencil size={16} class="" />
							</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item href="/consulta/delete/{consulta.id}">
							Deletar
							<DropdownMenu.Shortcut>
								<Trash size={16} class="text-red-700" />
							</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		{/if}
	</Card.Header>
	<Card.Content class="p-6 text-sm">
		<div class="grid gap-3">
			<div class="font-semibold">Informações Base</div>
			<ul class="grid gap-3">
				<DetailsItem label="medico" value={consulta.medico} />
				<DetailsItem
					label="data da consulta"
					value={consulta.data.toLocaleDateString('pt', formatDate)}
				/>
				<DetailsItem label="Genero" value={consulta.sexo} />
			</ul>
		</div>
		<Separator class="my-4" />
		<div class="grid grid-cols-2">
			<div class="grid gap-3">
				<div class="font-semibold">Descrição</div>
				<p>{consulta.descricao}</p>
			</div>
			<div class="grid gap-3">
				<div class="font-semibold">Prescrição</div>
				<p>{consulta.prescricao}</p>
			</div>
		</div>

		<Separator class="my-4" />
		<div class="grid gap-3">
			<div class="font-semibold">Consultas</div>
			<ul class="grid gap-3 md:grid-cols-3">
				{#each consulta.analises as analise}
					<Card.Root>
						<Card.Header>
							<DetailsItem label="Tipo de consulta" value={analise.tipo} />
						</Card.Header>
						<Card.Content>
							<DetailsItem label="Resultado" value={analise.resultado} />
						</Card.Content>
						<Card.Footer class="border-t bg-muted/50 px-6 py-3">
							<p>Data da análise: {analise.data.toLocaleDateString('pt', formatDate)}</p>
						</Card.Footer>
					</Card.Root>
				{/each}
			</ul>
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
		<div class="text-xs text-muted-foreground">
			Última atualização <time dateTime="2023-11-23">
				{consulta.updatedAt.toLocaleDateString('pt', formatDateTime)}
			</time>
		</div>
	</Card.Footer>
</Card.Root>
