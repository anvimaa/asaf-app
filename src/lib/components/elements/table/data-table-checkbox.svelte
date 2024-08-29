<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { writable } from 'svelte/store';
	export let checked = false;
</script>

<div class="flex items-center space-x-2">
	<Checkbox id="terms" bind:checked aria-labelledby="terms-label" />
</div>
