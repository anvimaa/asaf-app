<script lang="ts">
	import Label from '@/components/ui/label/label.svelte';

	export let value: any;
	export let name: string;
	export let disabled: boolean = false;
	export let label: string;
</script>

<Label for={name}>{label}</Label>

<input class="w-full rounded-sm border p-1" type="date" id={name} {name} bind:value {disabled} />
