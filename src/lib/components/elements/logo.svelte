<script lang="ts">
	export let color: string = 'indigo';
</script>

<svg
	class="h-8 w-auto text-{color}-600"
	viewBox="0 0 160 40"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Símbolo de batimento cardíaco + cruz -->
	<path
		d="M10 20 L20 20 L25 10 L30 30 L35 20 L45 20"
		stroke="currentColor"
		stroke-width="3"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<!-- Texto SADISSA -->
	<text
		x="55"
		y="27"
		fill="currentColor"
		font-family="Inter, sans-serif"
		font-weight="600"
		font-size="14"
		letter-spacing="0.05em"
	>
		SADISSA
	</text>
</svg>
