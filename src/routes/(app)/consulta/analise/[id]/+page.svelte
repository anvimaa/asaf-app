<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import * as Select from '@/components/ui/select/index.js';
	import type { PageData } from './$types';
	import DateTimeInput from '@/components/elements/form/DateTimeInput.svelte';
	import { analises } from '@/constants';

	export let data: PageData;
	let tipo = '';
	let dataAnalise = '';
	let resultado = '';

	$: {
		tipo = data.analise?.tipo || '';
		dataAnalise = data.analise?.data.toLocaleDateString() || '';
		resultado = data.analise?.resultado || '';
	}
</script>

{data.analise?.consulta.paciente.nome}

<div class="grid items-center justify-center gap-2">
	<div class="grid gap-3">
		<Label for="tipoAnalise">Tipo de Analise</Label>
		<Select.Root
			selected={{ value: tipo, label: tipo }}
			onSelectedChange={(v) => {
				v && (tipo = v.value);
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
		<DateTimeInput bind:value={dataAnalise} name="dataAnalise" label="Data da analise" />
	</div>

	<div class="w-full">
		<Label for="resultadoAnalise">Resultado</Label>
		<Input
			id="resultadoAnalise"
			bind:value={resultado}
			name="resultadoAnalise"
			placeholder="Resultado"
		/>
	</div>
</div>
