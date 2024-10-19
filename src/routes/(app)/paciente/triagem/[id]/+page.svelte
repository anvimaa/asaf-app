<script lang="ts">
	import PageHeader from '@/components/elements/page-header.svelte';
	import { Input } from '@/components/ui/input/index.js';
	import { Textarea } from '@/components/ui/textarea/index.js';
	import { Label } from '@/components/ui/label/index.js';
	import * as Select from '@/components/ui/select/index.js';
	import type { PageData } from './$types';
	import DetailsCard from '../../[id]/DetailsCard.svelte';
	import { consultas } from '@/constants';
	import Button from '@/components/ui/button/button.svelte';
	import { ArrowLeft, Save } from 'lucide-svelte';

	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';

	export let data: PageData;
	const { form, errors, message, enhance, reset } = superForm(data.form);

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}
</script>

<svelte:head>
	<title>Triagem - {data.paciente?.nome}</title>
</svelte:head>

<PageHeader>
	<span>Triagem - {data.paciente?.nome}</span>
</PageHeader>

<div class="flex gap-1">
	<div class="relative hidden flex-col items-start gap-8 md:flex">
		<form class="grid w-full items-start gap-6" method="post" use:enhance>
			<fieldset class="grid gap-6 rounded-lg border p-4">
				<legend class="-ml-1 px-1 text-sm font-medium"> Informações Base </legend>
				<div class="grid gap-4 md:grid-cols-2">
					<div class="grid gap-3">
						<Label for="idade">Idade</Label>
						<Input id="idade" name="idade" placeholder="0" type="number" />
					</div>
					<div class="grid gap-3">
						<Label for="peso">Peso</Label>
						<Input id="peso" name="peso" placeholder="0kg" />
					</div>
				</div>

				<div class="grid gap-4 md:grid-cols-2">
					<div class="grid gap-3">
						<Label for="ta">T.A (Temperatura)</Label>
						<Input id="ta" name="ta" placeholder="0.0" />
					</div>
					<div class="grid gap-3">
						<Label for="pa">P.A (Pressão Arterial)</Label>
						<Input id="pa" name="pa" placeholder="0.0" />
					</div>
				</div>
			</fieldset>
			<fieldset class="grid gap-6 rounded-lg border p-4">
				<legend class="-ml-1 px-1 text-sm font-medium"> Outras </legend>
				<div class="grid gap-3">
					<Label for="area">Area</Label>
					<Select.Root
						selected={{ value: consultas[0], label: consultas[0] }}
						onSelectedChange={(v) => {
							v && ($form.area = v.value);
						}}
					>
						<Select.Trigger id="area" name="area">
							<Select.Value placeholder="Select a role" />
						</Select.Trigger>
						<Select.Content>
							{#each consultas as consulta}
								<Select.Item value={consulta} label={consulta} class="">{consulta}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$form.area} name="area" />
				</div>
				<div class="grid gap-3">
					<Label for="obs">Observações</Label>
					<Textarea id="obs" name="obs" placeholder="Observação..." class="min-h-[4rem]" />
				</div>
			</fieldset>
			<fieldset class="grid grid-cols-2 gap-6 rounded-lg border p-4">
				<Button type="submit">
					<Save></Save>
					Salvar
				</Button>
				<Button
					class="bg-red-500 hover:bg-red-900"
					on:click={() => {
						history.back();
					}}
				>
					<ArrowLeft></ArrowLeft>
					Cancelar
				</Button>
			</fieldset>
		</form>
	</div>

	<div class="mt-2 flex-1">
		<DetailsCard paciente={data.paciente} showMenu={false} showBaseInfo={false} />
	</div>
</div>
