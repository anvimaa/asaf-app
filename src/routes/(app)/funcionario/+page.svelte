<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let data: PageData;

	let funcionarios = [
		{ id: 1, nome: 'João Silva', cargo: 'Desenvolvedor', email: 'joao@exemplo.com' },
		{ id: 2, nome: 'Maria Santos', cargo: 'Designer', email: 'maria@exemplo.com' }
	];

	let novoFuncionario = {
		nome: '',
		cargo: '',
		email: ''
	};

	function handleSubmit() {
		// Adicionar lógica para salvar funcionário
		funcionarios = [...funcionarios, { id: funcionarios.length + 1, ...novoFuncionario }];
		novoFuncionario = { nome: '', cargo: '', email: '' };
	}
</script>

<div class="container mx-auto p-4">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Funcionários</h1>

		<Dialog>
			<DialogTrigger asChild>
				<Button>Adicionar Funcionário</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo Funcionário</DialogTitle>
				</DialogHeader>
				<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
					<div class="grid gap-2">
						<Label for="nome">Nome</Label>
						<Input id="nome" bind:value={novoFuncionario.nome} required />
					</div>
					<div class="grid gap-2">
						<Label for="cargo">Cargo</Label>
						<Input id="cargo" bind:value={novoFuncionario.cargo} required />
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" bind:value={novoFuncionario.email} required />
					</div>
					<Button type="submit" class="w-full">Salvar</Button>
				</form>
			</DialogContent>
		</Dialog>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full border-collapse border border-gray-200">
			<thead>
				<tr class="bg-gray-100">
					<th class="border p-2 text-left">ID</th>
					<th class="border p-2 text-left">Nome</th>
					<th class="border p-2 text-left">Cargo</th>
					<th class="border p-2 text-left">Email</th>
					<th class="border p-2 text-left">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each funcionarios as funcionario}
					<tr>
						<td class="border p-2">{funcionario.id}</td>
						<td class="border p-2">{funcionario.nome}</td>
						<td class="border p-2">{funcionario.cargo}</td>
						<td class="border p-2">{funcionario.email}</td>
						<td class="border p-2">
							<Button variant="outline" size="sm" class="mr-2">Editar</Button>
							<Button variant="destructive" size="sm">Excluir</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
