<script lang="ts">
	const servicos = [
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
			titulo: 'Gestão de Pacientes',
			descricao: 'Controle completo do histórico e informações dos pacientes.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
			titulo: 'Gestão de Funcionários',
			descricao: 'Administre equipes e escalas de trabalho eficientemente.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>',
			titulo: 'Relatórios Inteligentes',
			descricao: 'Análises e relatórios detalhados para tomada de decisões.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>',
			titulo: 'Gestão de Farmácia',
			descricao: 'Controle de estoque, dispensação e rastreamento de medicamentos.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',
			titulo: 'Análises Laboratoriais',
			descricao: 'Gestão de exames, resultados e integração com laboratórios.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>',
			titulo: 'Gestão de Consultas',
			descricao: 'Agendamento, histórico e acompanhamento de consultas médicas.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
			titulo: 'Gestão Financeira',
			descricao: 'Controle de receitas, despesas e faturamento hospitalar.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>',
			titulo: 'Controle de Medicamentos',
			descricao: 'Rastreamento de entrada e saída de medicamentos e insumos.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
			titulo: 'Prontuário Eletrônico',
			descricao: 'Registro digital completo do histórico dos pacientes.'
		},
		{
			icon: '<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
			titulo: 'Gestão de Qualidade',
			descricao: 'Monitoramento de indicadores e processos hospitalares.'
		}
	];

	const faqs = [
		{
			pergunta: 'Como começar a usar o sistema?',
			resposta:
				'Basta criar uma conta e fazer login. Nossa equipe irá auxiliar na configuração inicial.'
		},
		{
			pergunta: 'O sistema é seguro?',
			resposta: 'Sim, utilizamos as mais avançadas tecnologias de segurança e criptografia.'
		},
		{
			pergunta: 'Existe suporte técnico?',
			resposta: 'Oferecemos suporte 24/7 para todos os nossos clientes.'
		},
		{
			pergunta: 'Qual o tempo médio de implantação do sistema?',
			resposta: 'O processo de implantação leva em média 30 dias, incluindo treinamento da equipe.'
		},
		{
			pergunta: 'O sistema pode ser personalizado?',
			resposta:
				'Sim, podemos adaptar várias funcionalidades de acordo com as necessidades específicas do seu hospital.'
		},
		{
			pergunta: 'Como é feito o backup dos dados?',
			resposta:
				'Realizamos backups automáticos diários e mantemos redundância em diferentes servidores para garantir a segurança dos dados.'
		},
		{
			pergunta: 'O sistema está de acordo com a LGPD?',
			resposta:
				'Sim, nosso sistema segue todas as diretrizes da Lei Geral de Proteção de Dados e outras regulamentações pertinentes.'
		},
		{
			pergunta: 'É possível acessar o sistema via dispositivos móveis?',
			resposta:
				'Sim, o sistema é responsivo e pode ser acessado através de smartphones e tablets, além de computadores.'
		}
	];

	// Adicionar estado para controlar FAQs abertos
	let faqAberto = -1;

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
					subject: 'Novo contato via site',
					htmlContent: `
						<p><strong>Nome:</strong> ${formData.get('nome')}</p>
						<p><strong>Email:</strong> ${formData.get('email')}</p>
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
<nav class="fixed top-0 z-50 w-full bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex-shrink-0">
				<svg
					class="h-8 w-auto text-indigo-600"
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
			</div>
			<div class="hidden items-center space-x-8 md:flex">
				<a href="#servicos" class="text-gray-700 hover:text-indigo-600">Serviços</a>
				<a href="#faq" class="text-gray-700 hover:text-indigo-600">FAQ</a>
				<a href="#contato" class="text-gray-700 hover:text-indigo-600">Contato</a>
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
<section class="bg-gradient-to-b from-white to-indigo-50 pt-20">
	<div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
				<span class="block">Simplifique a</span>
				<span class="block text-indigo-600">Gestão Hospitalar</span>
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-xl text-gray-500">
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
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
			<div>
				<h2 class="mb-6 text-3xl font-bold text-gray-900">
					Sistema Completo para Gestão Hospitalar
				</h2>
				<p class="mb-4 text-lg text-gray-600">
					Nossa solução oferece uma plataforma integrada que simplifica todos os aspectos da gestão
					hospitalar, desde o atendimento ao paciente até o controle financeiro.
				</p>
				<ul class="space-y-4">
					<li class="flex items-center text-gray-600">
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
					<li class="flex items-center text-gray-600">
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
					<li class="flex items-center text-gray-600">
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
				<img
					src="https://pixselo.com/wp-content/uploads/2023/07/hospital-management-software-img.png"
					alt="Dashboard Preview"
					class="rounded-lg shadow-xl"
				/>
				<div class="absolute -bottom-6 -right-6 rounded-lg bg-indigo-600 p-4 text-white">
					<p class="font-bold">+1000 hospitais</p>
					<p class="text-sm">já utilizam nossa solução</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Serviços -->
<section id="servicos" class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-extrabold text-gray-900">Nossos Serviços</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each servicos as servico}
				<div class="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
					<div class="mb-4 text-indigo-600">{@html servico.icon}</div>
					<h3 class="mb-2 text-xl font-semibold">{servico.titulo}</h3>
					<p class="text-gray-600">{servico.descricao}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FAQ -->
<section id="faq" class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-extrabold text-gray-900">Perguntas Frequentes</h2>
		<div class="mx-auto max-w-3xl space-y-4">
			{#each faqs as faq, i}
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<button
						class="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50"
						on:click={() => toggleFaq(i)}
					>
						<h3 class="text-lg font-medium text-gray-900">{faq.pergunta}</h3>
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
						<div class="p-6 pt-0 text-gray-600 transition-all duration-200">
							{faq.resposta}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Contato -->
<section id="contato" class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-16 text-center text-3xl font-extrabold text-gray-900">Entre em Contato</h2>
		<div class="mx-auto max-w-xl">
			<form class="space-y-6" on:submit={handleSubmit}>
				<div class="relative">
					<label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
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
							class="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							placeholder="Seu nome completo"
						/>
					</div>
				</div>

				<div class="relative">
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
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
							class="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							placeholder="seu@email.com"
						/>
					</div>
				</div>

				<div class="relative">
					<label for="mensagem" class="block text-sm font-medium text-gray-700">Mensagem</label>
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
							class="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							placeholder="Digite sua mensagem aqui..."
						></textarea>
					</div>
				</div>

				<button
					type="submit"
					class="flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
				<svg
					class="h-8 w-auto text-white"
					viewBox="0 0 160 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 20 L20 20 L25 10 L30 30 L35 20 L45 20"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
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
