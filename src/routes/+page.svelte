<script>
	import Orbit from './Orbit.svelte';
</script>

<svelte:head>
	<title>SGH - SADISSA</title>
</svelte:head>

<!-- Cabeçalho -->
<header class="bg-white shadow">
	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<h1 class="text-3xl font-bold text-gray-900">SGH - SADISSA</h1>
	</div>
</header>

<!-- Seção Principal -->
<main class="h-screen">
	<div class="relative overflow-hidden">
		<div class="mx-auto max-w-7xl">
			<div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
				<div class="mx-auto mt-10 px-4 sm:px-6 lg:px-8">
					<div class="grid place-items-center sm:text-center lg:text-left">
						<h2
							class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
						>
							<span class="block">Simplifique</span>
							<span class="block text-indigo-600">a Gestão Hospitalar</span>
						</h2>
						<p
							class="mt-3 text-base text-gray-500 sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0"
						>
							Gerencie de forma eficiente os pacientes, funcionários e operações do hospital com o
							nosso sistema completo de gestão.
						</p>
						<div class="mt-5 justify-center sm:mt-8 sm:flex lg:justify-start">
							<div class="rounded-md shadow">
								<a
									href="/login"
									class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg"
								>
									Começar
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
