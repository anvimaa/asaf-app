<script lang="ts">
	import type { PageData } from './$types';
	import DetailsCard from './DetailsCard.svelte';

	export let data: PageData;
</script>

<DetailsCard consulta={data.consulta} />
