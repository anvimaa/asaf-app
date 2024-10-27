<script lang="ts">
	export let name: string;
	export let label: string;
	export let value: any = undefined;
</script>

<div class="flex flex-col gap-2">
	<label for={name}>{label}</label>
	<textarea bind:value class="textarea textarea-bordered" {name} id={name} placeholder={label}
	></textarea>
</div>
