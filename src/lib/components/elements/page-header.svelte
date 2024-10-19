<script lang="ts">
	import { MoveLeft } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import Separator from '../ui/separator/separator.svelte';
</script>

<div class="mb-4 flex items-center justify-between">
	<Button on:click={() => history.back()}>
		<MoveLeft></MoveLeft>
	</Button>

	<slot />
</div>
<Separator />
