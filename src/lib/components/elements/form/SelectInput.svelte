<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import Label from '@/components/ui/label/label.svelte';
	import { generos } from '@/constants';

	export let items: any = [];
	export let value: any;
	export let label: string;
	export let name: string;
	export let placeholder: string = 'Selecione um valor';
</script>

<Label for={name}>{label}</Label>

<Select.Root
	onSelectedChange={(v) => {
		v && (value = v.value);
	}}
>
	<Select.Trigger class="w-full" {value}>
		<Select.Value {placeholder} />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>{label}</Select.Label>
			{#each items as item}
				<Select.Item value={item} label={item}>{item}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input {name} type="hidden" bind:value />
</Select.Root>
