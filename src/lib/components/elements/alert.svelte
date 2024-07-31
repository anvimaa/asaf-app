<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';

	export let message: string;
	export let title: string;
	export let variant: 'default' | 'destructive' = 'default';
</script>

<div class="my-4">
	<Alert.Root {variant}>
		<CircleAlert class="h-4 w-4" />
		<Alert.Title>
			{title}
		</Alert.Title>
		<Alert.Description>
			{message}
		</Alert.Description>
	</Alert.Root>
</div>
