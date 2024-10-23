<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import type { PageData } from './$types';
	import DateTimeInput from '@/components/elements/form/DateTimeInput.svelte';
	import { ArrowLeft, Save } from 'lucide-svelte';
	import Textarea from '@/components/ui/textarea/textarea.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { ISOString } from '@/utils';

	export let data: PageData;

	const { form, errors, message, reset, enhance } = superForm(data.form, {
		resetForm: true
	});

	$: if ($message) {
		if ($message.type === 'error') {
			toast.error($message.message);
		} else {
			toast.success($message.message);
		}
	}
</script>

<div class="flex gap-1">
	<div class="relative hidden flex-col items-start gap-8 md:flex">
		<form class="grid w-full items-start gap-6" method="post" use:enhance>
			<input type="hidden" name="id" value="0" />
			<fieldset class="grid gap-6 rounded-lg border p-4">
				<legend class="-ml-1 px-1 text-sm font-medium"> Informações da Analise </legend>
				<div class="grid gap-4">
					<div class="grid gap-3">
						<Label for="tipo">Tipo da análise</Label>
						<Input bind:value={$form.tipo} id="tipo" name="tipo" type="text" />
						{#if $errors.tipo}
							<p class="text-sm text-red-600">{$errors.tipo}</p>
						{/if}
					</div>
					<div class="grid gap-3">
						<DateTimeInput value={$form.data} name="data" label="Data da análise" />
						{#if $errors.data}
							<p class="text-sm text-red-600">{$errors.data}</p>
						{/if}
					</div>
					<div class="grid gap-3">
						<Label for="resultado">Resultado da análise</Label>
						<Input bind:value={$form.resultado} id="resultado" type="text" name="resultado" />
						{#if $errors.resultado}
							<p class="text-sm text-red-600">{$errors.resultado}</p>
						{/if}
					</div>
				</div>
				<div class="grid gap-3">
					<Label for="obs">Observações</Label>
					<Textarea bind:value={$form.obs} id="obs" name="obs" class="min-h-[4rem]" />
					{#if $errors.obs}
						<p class="text-sm text-red-600">{$errors.tipo}</p>
					{/if}
				</div>
			</fieldset>

			<fieldset class="grid grid-cols-2 gap-6 rounded-lg border p-4">
				<Button type="submit">
					<Save></Save>
					Salvar
				</Button>
				<Button
					class="bg-red-500 hover:bg-red-900"
					on:click={() => {
						history.back();
					}}
				>
					<ArrowLeft></ArrowLeft>
					Voltar
				</Button>
			</fieldset>
		</form>
	</div>
</div>
