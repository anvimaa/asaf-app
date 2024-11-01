<script lang="ts">
	import { formatDate } from '@/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container py-6">
	<div class="grid gap-6">
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight">Detalhes do Patrimônio</h1>
			<div class="flex gap-2">
				<a
					class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					href={`/patrimonio/edit/${data.patrimonio?.id}`}
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
					href={`/patrimonio/delete/${data.patrimonio?.id}`}
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

		{#if data.patrimonio}
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-card p-6 shadow-sm">
					<h2 class="mb-4 text-xl font-semibold">Informações do Patrimônio</h2>

					<div class="space-y-4">
						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Nome</p>
							<p class="font-medium">{data.patrimonio.nome}</p>
						</div>

						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Código</p>
							<p class="font-medium">{data.patrimonio.codigo}</p>
						</div>

						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Tipo</p>
							<p class="font-medium">{data.patrimonio.tipo}</p>
						</div>

						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Valor</p>
							<p class="font-medium">
								{new Intl.NumberFormat('pt', { style: 'currency', currency: 'AOA' }).format(
									data.patrimonio.valor
								)}
							</p>
						</div>

						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Estado</p>
							<p class="font-medium">{data.patrimonio.estado}</p>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-card p-6 shadow-sm">
					<h2 class="mb-4 text-xl font-semibold">Informações de Garantia e Manutenção</h2>

					<div class="space-y-4">
						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Possui Garantia</p>
							<p class="font-medium">{data.patrimonio.garantia ? 'Sim' : 'Não'}</p>
						</div>

						{#if data.patrimonio.garantia}
							<div class="grid gap-1">
								<p class="text-sm text-muted-foreground">Validade da Garantia</p>
								<p class="font-medium">
									{data.patrimonio.dataGarantia
										? new Date(data.patrimonio.dataGarantia).toLocaleDateString('pt-BR', formatDate)
										: 'Não informada'}
								</p>
							</div>
						{/if}

						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Última Manutenção</p>
							<p class="font-medium">
								{data.patrimonio.ultimaManutencao
									? new Date(data.patrimonio.ultimaManutencao).toLocaleDateString(
											'pt-BR',
											formatDate
										)
									: 'Não realizada'}
							</p>
						</div>

						<div class="grid gap-1">
							<p class="text-sm text-muted-foreground">Próxima Manutenção</p>
							<p class="font-medium">
								{data.patrimonio.proximaManutencao
									? new Date(data.patrimonio.proximaManutencao).toLocaleDateString(
											'pt-BR',
											formatDate
										)
									: 'Não agendada'}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<h2 class="mb-4 text-xl font-semibold">Observações</h2>

				<div class="grid gap-4">
					<div class="grid gap-1">
						<p class="font-medium">{data.patrimonio.observacoes || 'Sem observações'}</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="rounded-lg border bg-card p-6 text-center shadow-sm">
				<p class="text-muted-foreground">Patrimônio não encontrado</p>
			</div>
		{/if}
	</div>
</div>
