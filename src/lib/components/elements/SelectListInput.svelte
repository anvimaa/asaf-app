<script lang="ts">
	import type { SelectListOption } from '@/types';

	export let label: string;
	export let name: string;
	export let value: any = undefined;
	export let options: SelectListOption[];
</script>

<div class="flex flex-col gap-x-2">
	<label for={name} class="label">{label}</label>
	<select
		id={name}
		{name}
		bind:value
		class="select select-bordered flex-1 border-zinc-400 bg-zinc-100 dark:border-neutral-600 dark:bg-neutral-800"
	>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>
