<script lang="ts">
	import { servicos, faqs, parceiros, testemunhos } from '@/constants';
	import Logo from '@/components/elements/logo.svelte';

	// Adicionar estado para controlar FAQs abertos
	let faqAberto = -1;

	// Adicionar estado para o tema
	let temaDark = false;

	// Função para alternar o tema
	const alternarTema = () => {
		temaDark = !temaDark;
		document.documentElement.classList.toggle('dark');
	};

	const toggleFaq = (index: number) => {
		faqAberto = faqAberto === index ? -1 : index;
	};

	// Adicionar função para envio de email
	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		try {
			const response = await fetch('https://api.brevo.com/v3/smtp/email', {
				method: 'POST',
				headers: {
					accept: 'application/json',
					'api-key': 'SUA_API_KEY_AQUI',
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					sender: { email: formData.get('email'), name: formData.get('nome') },
					to: [{ email: 'seu-email@dominio.com', name: 'Destinatário' }],
					subject: `Novo contato via site: ${formData.get('assunto')}`,
					htmlContent: `
						<p><strong>Nome:</strong> ${formData.get('nome')}</p>
						<p><strong>Email:</strong> ${formData.get('email')}</p>
						<p><strong>Telefone:</strong> ${formData.get('telefone') || 'Não informado'}</p>
						<p><strong>Assunto:</strong> ${formData.get('assunto')}</p>
						<p><strong>Mensagem:</strong> ${formData.get('mensagem')}</p>
					`
				})
			});

			if (response.ok) {
				alert('Mensagem enviada com sucesso!');
				(event.target as HTMLFormElement).reset();
			} else {
				throw new Error('Falha ao enviar mensagem');
			}
		} catch (error) {
			alert('Erro ao enviar mensagem. Tente novamente.');
			console.error(error);
		}
	};
</script>

<!-- Navegação -->
<nav class="fixed top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex-shrink-0">
				<Logo color={temaDark ? 'white' : 'indigo'} />
			</div>
			<div class="hidden items-center space-x-8 md:flex">
				<a href="#servicos" class="text-gray-700 hover:text-indigo-600 dark:text-gray-200"
					>Serviços</a
				>
				<a href="#faq" class="text-gray-700 hover:text-indigo-600 dark:text-gray-200">FAQ</a>
				<a href="#contato" class="text-gray-700 hover:text-indigo-600 dark:text-gray-200">Contato</a
				>
				<button
					on:click={alternarTema}
					class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
					aria-label="Alternar tema"
				>
					{#if temaDark}
						<svg
							class="h-6 w-6 text-yellow-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
					{:else}
						<svg
							class="h-6 w-6 text-gray-700"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						</svg>
					{/if}
				</button>
				<a
					href="/login"
					class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
				>
					Entrar
				</a>
			</div>
		</div>
	</div>
</nav>

<!-- Hero Section -->
<section class="bg-gradient-to-b from-white to-indigo-50 pt-20 dark:from-gray-900 dark:to-gray-800">
	<div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1
				class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl"
			>
				<span class="block">Simplifique a</span>
				<span class="block text-indigo-600 dark:text-indigo-400">Gestão Hospitalar</span>
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-xl text-gray-500 dark:text-gray-300">
				Gerencie de forma eficiente os pacientes, funcionários e operações do hospital com o nosso
				sistema completo de gestão.
			</p>
			<div class="mt-10">
				<a
					href="/login"
					class="inline-flex animate-bounce items-center rounded-full border border-transparent bg-indigo-600 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-700"
				>
					Começar Agora
					<svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Nova seção de descrição -->
<section class="bg-white py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
			<div>
				<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
					Sistema Completo para Gestão Hospitalar
				</h2>
				<p class="mb-4 text-lg text-gray-600 dark:text-gray-300">
					Nossa solução oferece uma plataforma integrada que simplifica todos os aspectos da gestão
					hospitalar, desde o atendimento ao paciente até o controle financeiro.
				</p>
				<ul class="space-y-4">
					<li class="flex items-center text-gray-600 dark:text-gray-300">
						<svg
							class="mr-2 h-6 w-6 text-indigo-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Interface intuitiva e fácil de usar
					</li>
					<li class="flex items-center text-gray-600 dark:text-gray-300">
						<svg
							class="mr-2 h-6 w-6 text-indigo-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Suporte técnico especializado
					</li>
					<li class="flex items-center text-gray-600 dark:text-gray-300">
						<svg
							class="mr-2 h-6 w-6 text-indigo-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Atualizações constantes
					</li>
				</ul>
			</div>
			<div class="relative">
				<img src="/preview-sadissa.png" alt="Dashboard Preview" class="rounded-lg shadow-xl" />
				<div class="absolute -bottom-6 -right-6 rounded-lg bg-indigo-600 p-4 text-white">
					<p class="font-bold">+1000 hospitais</p>
					<p class="text-sm">já utilizam nossa solução</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Serviços -->
<section id="servicos" class="bg-white py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
			Nossos Serviços
		</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each servicos as servico}
				<div
					class="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800"
				>
					<div class="mb-4 text-indigo-600 dark:text-indigo-400">{@html servico.icon}</div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{servico.titulo}</h3>
					<p class="text-gray-600 dark:text-gray-300">{servico.descricao}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Atualizar a seção de Parceiros -->
<section class="overflow-hidden bg-gray-50 py-20 dark:bg-gray-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
			Parceiros que Confiam em Nós
		</h2>

		<!-- Container do Marquee -->
		<div class="relative flex overflow-x-hidden">
			<!-- Primeira lista de logos -->
			<div class="animate-marquee flex whitespace-nowrap">
				{#each parceiros as parceiro}
					<div class="mx-8 flex items-center justify-center">
						<img
							src={parceiro.logo}
							alt={parceiro.nome}
							class="h-12 w-auto object-contain filter transition-all duration-300 hover:scale-110 hover:filter-none dark:brightness-0 dark:invert"
						/>
					</div>
				{/each}
			</div>

			<!-- Segunda lista de logos (duplicada para rolagem contínua) -->
			<div class="animate-marquee2 absolute top-0 flex whitespace-nowrap">
				{#each parceiros as parceiro}
					<div class="mx-8 flex items-center justify-center">
						<img
							src={parceiro.logo}
							alt={parceiro.nome}
							class="h-12 w-auto object-contain filter transition-all duration-300 hover:scale-110 hover:filter-none dark:brightness-0 dark:invert"
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Atualizar a seção de Testemunhos -->
<section class="bg-white py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
			O que Nossos Clientes Dizem
		</h2>
		<div class="grid gap-8 md:grid-cols-3">
			{#each testemunhos as testemunho}
				<div
					class="relative rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
				>
					<div class="absolute -top-4 left-8">
						<svg class="h-8 w-8 text-indigo-600" fill="currentColor" viewBox="0 0 32 32">
							<path
								d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
							/>
						</svg>
					</div>
					<div class="relative">
						<p class="mb-4 text-gray-600 dark:text-gray-300">{testemunho.texto}</p>
						<div class="mt-6 flex items-center">
							<img
								src={testemunho.foto}
								alt={testemunho.nome}
								class="h-14 w-14 rounded-full object-cover shadow-md"
							/>
							<div class="ml-4">
								<p class="font-semibold text-gray-900 dark:text-white">
									{testemunho.nome}
								</p>
								<div class="text-sm text-gray-500 dark:text-gray-400">
									<p>{testemunho.cargo}</p>
									<p>{testemunho.instituicao}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FAQ -->
<section id="faq" class="bg-gray-50 py-20 dark:bg-gray-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
			Perguntas Frequentes
		</h2>
		<div class="mx-auto max-w-3xl space-y-4">
			{#each faqs as faq, i}
				<div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700">
					<button
						class="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-600"
						on:click={() => toggleFaq(i)}
					>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white">{faq.pergunta}</h3>
						<svg
							class="h-5 w-5 transform transition-transform duration-200 {faqAberto === i
								? 'rotate-180'
								: ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
					{#if faqAberto === i}
						<div class="p-6 pt-0 text-gray-600 dark:text-gray-300">
							{faq.resposta}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Contato -->
<section id="contato" class="bg-white py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
			Entre em Contato
		</h2>
		<div class="mx-auto max-w-xl">
			<form class="space-y-6">
				<div class="relative">
					<label for="nome" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Nome</label
					>
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
						<input
							type="text"
							id="nome"
							class="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="Seu nome completo"
						/>
					</div>
				</div>

				<div class="relative">
					<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Email</label
					>
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<input
							type="email"
							id="email"
							class="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="seu@email.com"
						/>
					</div>
				</div>

				<div class="relative">
					<label for="telefone" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Telefone (opcional)</label
					>
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</div>
						<input
							type="tel"
							id="telefone"
							name="telefone"
							class="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="(00) 00000-0000"
						/>
					</div>
				</div>

				<div class="relative">
					<label for="assunto" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Assunto</label
					>
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
								/>
							</svg>
						</div>
						<input
							type="text"
							id="assunto"
							name="assunto"
							required
							class="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="Assunto da mensagem"
						/>
					</div>
				</div>

				<div class="relative">
					<label for="mensagem" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>Mensagem</label
					>
					<div class="relative mt-1">
						<div class="pointer-events-none absolute left-3 top-3">
							<svg
								class="h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
								/>
							</svg>
						</div>
						<textarea
							id="mensagem"
							rows="4"
							class="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="Digite sua mensagem aqui..."
						></textarea>
					</div>
				</div>

				<button
					type="submit"
					class="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
				>
					Enviar Mensagem
					<svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 5l7 7-7 7M5 5l7 7-7 7"
						/>
					</svg>
				</button>
			</form>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-gray-900 text-white">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<div>
				<Logo color="white" />
				<p class="mt-4 text-gray-400">Simplificando a gestão hospitalar desde 2024.</p>
			</div>
			<div>
				<h3 class="text-sm font-semibold uppercase tracking-wider">Empresa</h3>
				<ul class="mt-4 space-y-2">
					<li><a href="#" class="text-gray-400 hover:text-white">Sobre</a></li>
					<li><a href="#" class="text-gray-400 hover:text-white">Carreira</a></li>
				</ul>
			</div>
			<div>
				<h3 class="text-sm font-semibold uppercase tracking-wider">Suporte</h3>
				<ul class="mt-4 space-y-2">
					<li><a href="#" class="text-gray-400 hover:text-white">Documentação</a></li>
					<li><a href="#" class="text-gray-400 hover:text-white">Ajuda</a></li>
				</ul>
			</div>
			<div>
				<h3 class="text-sm font-semibold uppercase tracking-wider">Legal</h3>
				<ul class="mt-4 space-y-2">
					<li><a href="#" class="text-gray-400 hover:text-white">Privacidade</a></li>
					<li><a href="#" class="text-gray-400 hover:text-white">Termos</a></li>
				</ul>
			</div>
		</div>
		<div class="mt-12 border-t border-gray-800 pt-8">
			<p class="text-center text-gray-400">&copy; 2024 SADISSA. Todos os direitos reservados.</p>
		</div>
	</div>
</footer>
