<script lang="ts">
	import { Button } from '@/components/ui/button/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import type { ActionData, PageData } from './$types';
	import { ThumbsDown, ThumbsUp } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	$: if (form?.deleted) {
		toast.success('Paciente deletado com sucesso');
	}
</script>

<Card.Root class="sm:col-span-2">
	<Card.Header class="pb-3">
		<Card.Title>Deletar Paciente!</Card.Title>
		<Card.Description class="max-w-lg text-balance leading-relaxed">
			Tens a certeza que pretendes deletar o paciente:
			<span class="font-bold uppercase text-red-500">{data.paciente.nome} </span>
			<br />
			do Sistema?
		</Card.Description>
	</Card.Header>
	<Card.Footer class="gap-4">
		<form method="post" use:enhance>
			<input type="hidden" name="id" value={data.paciente.id} />
			<Button class="bg-red-500 text-white hover:bg-red-700" type="submit">
				<ThumbsUp size={14} class="mr-2" />
				Sim! Tenho certeza
			</Button>
		</form>
		<Button class="bg-green-500 text-white hover:bg-green-700" on:click={() => history.back()}>
			<ThumbsDown size={14} class="mr-2" />
			Cancelar
		</Button>
	</Card.Footer>
</Card.Root>
