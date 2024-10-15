<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Alert from '@/components/elements/alert.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;

	$: console.log(form);
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Iniciar Sessão</h1>
				<p class="text-balance text-muted-foreground">
					Introduza o seu email e a sua senha para iniciar a sessão.
				</p>
			</div>
			<form method="post" use:enhance>
				{#if form?.message}
					<Alert message={form.message} title="Atenção" variant="destructive" />
				{/if}
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" name="email" placeholder="email@provedor.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Senha</Label>
						</div>
						<Input id="password" name="password" type="password" required />
					</div>
					<Button type="submit" class="w-full">Iniciar Sessão</Button>
				</div>
			</form>
		</div>
	</div>
	<div class="hidden bg-muted lg:block">
		<img
			src="https://placehold.jp/1400x1400.png"
			alt="placeholder"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
