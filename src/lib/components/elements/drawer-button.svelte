<script lang="ts">
	export let drawerId: string = 'drawer-add';
</script>

<label for={drawerId} class="btn btn-primary drawer-button">
	<slot />
</label>
