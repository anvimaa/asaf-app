<script lang="ts">
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import { Button } from '@/components/ui/button/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import { Separator } from '@/components/ui/separator/index.js';
	import { PrinterCheck, Trash, Pencil, HeartPulse } from 'lucide-svelte';
	import DetailsItem from '@/components/elements/details-item.svelte';
	import { formatDateTime } from '@/utils';

	export let paciente: any;
	export let showMenu = true;
	export let showBaseInfo = true;
</script>

<Card.Root class="overflow-hidden">
	<Card.Header class="flex flex-row items-start bg-muted/50">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-lg">
				Paciente: <span class="font-bold uppercase">{paciente.nome}</span>
			</Card.Title>
			<Card.Description>
				Data de Cadastro: {paciente.createdAt.toLocaleDateString('pt', formatDateTime)}
			</Card.Description>
		</div>
		{#if showMenu}
			<div class="ml-auto flex items-center gap-1">
				<Button size="sm" variant="outline" class="h-8 gap-1">
					<PrinterCheck class="h-3.5 w-3.5" />
					<span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap"> Ficha </span>
				</Button>
				<Button
					size="sm"
					variant="outline"
					class="h-8 gap-1"
					href="/paciente/triagem/{paciente.id}"
				>
					<HeartPulse size={14} />
					<span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap"> Triagem </span>
				</Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} size="icon" variant="outline" class="h-8 w-8">
							<EllipsisVertical class="h-3.5 w-3.5" />
							<span class="sr-only">Mais</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Item href="/paciente/new?id={paciente.id}">
							Editar
							<DropdownMenu.Shortcut>
								<Pencil size={16} class="" />
							</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item href="/paciente/delete/{paciente.id}">
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
		{#if showBaseInfo}
			<div class="grid gap-3">
				<div class="font-semibold">Informações Pessoais</div>
				<ul class="grid gap-3">
					<DetailsItem label="nif" value={paciente.nif} />
					<DetailsItem label="telefone" value={paciente.telefone} />
					<DetailsItem label="Genero" value={paciente.sexo} />
				</ul>
				<Separator class="my-2" />
				<ul class="grid gap-3">
					<DetailsItem label="Idade" value={paciente.idade} />
					<DetailsItem label="peso" value={paciente.peso} />
					<DetailsItem label="altura" value={paciente.altura} />
				</ul>
			</div>
			<Separator class="my-4" />
		{/if}

		<div class="grid gap-3">
			<div class="font-semibold">Triagem</div>
			<ul class="grid gap-3">
				<DetailsItem label="PA" value={paciente.pa} />
				<DetailsItem label="TA" value={paciente.ta} />
				<DetailsItem label="Area" value={paciente.area} />
				<DetailsItem label="urgencia" value={paciente.urgencia} />
				<DetailsItem label="Estado" value={paciente.estadoTriagem} />
			</ul>
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
		<div class="text-xs text-muted-foreground">
			Última atualização <time dateTime="2023-11-23">
				{paciente.updatedAt.toLocaleDateString('pt', formatDateTime)}
			</time>
		</div>
	</Card.Footer>
</Card.Root>
