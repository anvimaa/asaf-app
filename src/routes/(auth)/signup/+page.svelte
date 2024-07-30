<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Criar uma conta.</h1>
<form method="post" use:enhance>
	<label for="name">Nome</label>
	<input name="name" id="name" /><br />
	<label for="email">Email</label>
	<input type="email" name="email" id="email" /><br />
	<label for="password">Senha</label>
	<input type="password" name="password" id="password" /><br />
	<button>Salvar</button>
	<p>{form?.message ?? ''}</p>
</form>
<a href="/login">Login</a>
