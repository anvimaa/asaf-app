<script lang="ts">
	export let label;
	export let value;
</script>

<li class="flex items-center justify-between">
	<span class="text-muted-foreground"> {label} </span>
	<span>{value || '-'}</span>
</li>
