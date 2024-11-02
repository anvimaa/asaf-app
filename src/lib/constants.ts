import { Users } from "lucide-svelte";
import type { Stat, Transation } from "./types";

export const stats: Stat[] = [
    {
        title: 'Pacientes',
        content: 2,
        description: 'Total de pacientes registrados',
        icon: Users
    },
    {
        title: 'Consultas',
        content: 1,
        description: 'Total de Consultas Registradas',
        icon: Users
    }
];

export const transations: Transation[] = [
    {
        name: 'Antonio...',
        email: '936985457',
        operation: 'Normal',
        status: 'Triagem',
        date: new Date()
    }
    , {
        name: 'Maria...',
        email: '925784521',
        operation: 'Urgente',
        status: 'Banco de Urgencia',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    }
]

export const generos: string[] = ["Masculino", "Feminino", "Outro"]
export const urgencias: string[] = ["Normal", "Regular", "Intensivo"]
export const areas: string[] = ["Triagem", "Banco de Urgência", "Medicina"]
export const consultas: string[] = ["Por indicar", "Pediatria", "Medicina", "Nutrição", "Pre-natal", "Planeamento Familiar"]
export const analises: string[] = ["Sangue", "Vidal", "DNA"]
export const tiposConsulta: string[] = ["Febre Tifoide", "Paludismo"]

export const servicos = [
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

export const faqs = [
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

// Dados dos parceiros com logos reais
export const parceiros = [
    {
        nome: 'Hospital Sírio-Libanês',
        logo: 'https://media.istockphoto.com/id/1418665770/vector/health-care-logo-template-hospital-and-clinic-icon.jpg?s=1024x1024&w=is&k=20&c=3EnQUyNSY4tcfv-KVLI3gQuInlIMi-IzUHTPHr9QG0E='
    },
    {
        nome: 'Hospital Albert Einstein',
        logo: 'https://media.istockphoto.com/id/1418665770/vector/health-care-logo-template-hospital-and-clinic-icon.jpg?s=1024x1024&w=is&k=20&c=3EnQUyNSY4tcfv-KVLI3gQuInlIMi-IzUHTPHr9QG0E='
    },
    {
        nome: 'Hospital São Luiz',
        logo: 'https://media.istockphoto.com/id/1418665770/vector/health-care-logo-template-hospital-and-clinic-icon.jpg?s=1024x1024&w=is&k=20&c=3EnQUyNSY4tcfv-KVLI3gQuInlIMi-IzUHTPHr9QG0E='
    },
    {
        nome: "Rede D'Or",
        logo: 'https://media.istockphoto.com/id/1418665770/vector/health-care-logo-template-hospital-and-clinic-icon.jpg?s=1024x1024&w=is&k=20&c=3EnQUyNSY4tcfv-KVLI3gQuInlIMi-IzUHTPHr9QG0E='
    },
    {
        nome: 'Fleury',
        logo: 'https://media.istockphoto.com/id/1418665770/vector/health-care-logo-template-hospital-and-clinic-icon.jpg?s=1024x1024&w=is&k=20&c=3EnQUyNSY4tcfv-KVLI3gQuInlIMi-IzUHTPHr9QG0E='
    },
    {
        nome: 'Dasa',
        logo: 'https://media.istockphoto.com/id/1418665770/vector/health-care-logo-template-hospital-and-clinic-icon.jpg?s=1024x1024&w=is&k=20&c=3EnQUyNSY4tcfv-KVLI3gQuInlIMi-IzUHTPHr9QG0E='
    }
];

// Dados dos testemunhos com fotos do Unsplash
export const testemunhos = [
    {
        nome: 'Dr. João Silva',
        cargo: 'Diretor Clínico',
        foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        texto:
            'O SADISSA revolucionou a forma como gerenciamos nosso hospital. A eficiência aumentou significativamente e nossos processos estão muito mais organizados.',
        instituicao: 'Hospital São Lucas'
    },
    {
        nome: 'Dra. Maria Santos',
        cargo: 'Coordenadora de Enfermagem',
        foto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        texto:
            'A implementação do sistema foi extremamente suave e o suporte técnico é excepcional. Nossa equipe adaptou-se rapidamente e os resultados são visíveis.',
        instituicao: 'Clínica Santa Maria'
    },
    {
        nome: 'Dr. Pedro Costa',
        cargo: 'Gestor Hospitalar',
        foto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        texto:
            'Desde que começamos a usar o SADISSA, reduzimos nossos custos operacionais em 30% e melhoramos significativamente a satisfação dos pacientes.',
        instituicao: 'Centro Médico São José'
    }
];