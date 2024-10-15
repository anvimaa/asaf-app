<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { generos } from '@/constants';

	export let items: any = [];
	export let value: any;
	export let label: string;
	export let name: string;
</script>

<Select.Root
	onSelectedChange={(v) => {
		v && (value = v.value);
	}}
>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Selecione um valor" />
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
