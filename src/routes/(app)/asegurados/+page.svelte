<script lang="ts">
	import SuperDebug from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	// Client API:
	//const { form } = superForm(data.form);
	const { form, errors, constraints, message } = superForm(data.form);
</script>

<svelte:head>
	<title>Asegurados</title>
</svelte:head>

<SuperDebug data={$form} />

<form method="POST">
	<label for="name">Name</label>
	<input type="text" name="name" bind:value={$form.name} />

	<label for="email">E-mail</label>
	<input type="email" name="email" bind:value={$form.email} />

	<div><button>Submit</button></div>
</form>
