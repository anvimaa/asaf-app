<script lang="ts">
	export let name: string;
	export let label: string;
	export let error: any = '';
	export let value: any = undefined;
</script>

<div class="flex flex-col gap-2">
	<label for={name}> {label} </label>
	<input type="text" class="input input-bordered" id={name} {name} bind:value />
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
