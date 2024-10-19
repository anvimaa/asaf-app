<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import { MoveLeft } from 'lucide-svelte';
	import Separator from '@/components/ui/separator/separator.svelte';
	import DetailsCard from './DetailsCard.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Informações - {data.paciente?.nome}</title>
</svelte:head>

<div class="mb-4 flex items-center justify-between">
	<Button on:click={() => history.back()}>
		<MoveLeft></MoveLeft>
	</Button>

	<h1 class="">
		Informações Gerais: <span class="font-bold uppercase"> {data.paciente?.nome}</span>
	</h1>
</div>
<Separator />

<DetailsCard paciente={data.paciente} />
