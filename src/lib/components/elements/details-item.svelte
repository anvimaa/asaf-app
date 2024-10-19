<script lang="ts">
	export let label;
	export let value;
</script>

<li class="flex items-center justify-between">
	<span class="uppercase text-muted-foreground"> {label} </span>
	<span class="uppercase">{value || '-'}</span>
</li>
