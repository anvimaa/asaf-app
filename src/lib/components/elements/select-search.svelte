<script lang="ts">
	import Select from 'svelte-select';

	interface Item {
		value: number;
		label: string;
		filter?: string;
	}

	export let id: string;
	export let name: string;
	export let label: string;
	export let placeholder: string = 'selecione um item na lista';
	export let items: Item[] = [];

	let selectedItem: Item = { value: 0, label: '' };
	let groupBy = (item: any) => item.filter;
</script>

<div>
	<label for={id} class="mb-2">{label}</label>
	<Select {id} {placeholder} {items} bind:value={selectedItem} {groupBy} --border="1px solid">
		<div slot="empty" class="p-4">Nenhum resultado encontrado.</div>
	</Select>
	<input type="hidden" id={name} {name} value={selectedItem.value} />
</div>
