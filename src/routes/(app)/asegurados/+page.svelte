<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import CreateEditForm from './CreateEditForm.svelte';

	export let data: PageData;
	const { form, errors, message, enhance } = superForm(data.form);

	let isCreateOrEdit: boolean = false;
</script>

<svelte:head>
	<title>Asegurados</title>
</svelte:head>

<div class="flex flex-col gap-y-4">
	{#if isCreateOrEdit}
		<CreateEditForm {enhance} {form} {message} {errors} on:click={() => (isCreateOrEdit = false)} />
	{:else}
		<div class="">
			<Button on:click={() => (isCreateOrEdit = true)}>Cadastrar Asegurado</Button>
			<p>
				{$form.name}
			</p>
		</div>
		<h1>Tabela de asegurados</h1>
	{/if}
</div>
