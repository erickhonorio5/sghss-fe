import { Feature } from "@/lib/schema/FeatureSchema";

const featuresData : Feature[] = [
  {
    id: 1,
    icon: "/images/icon/icon-01.svg",
    title: "Dashboard Inteligente",
    description:
        "Visualize indicadores em tempo real como número de consultas, taxa de ocupação, cancelamentos e desempenho da equipe médica.",
  },
  {
    id: 2,
    icon: "/images/icon/icon-02.svg",
    title: "Cadastro Completo de Pacientes e Médicos",
    description:
        "Gerencie dados detalhados com histórico clínico, contatos, convênios, especialidades e documentos.",
  },
  {
    id: 3,
    icon: "/images/icon/icon-03.svg",
    title: "Histórico Clínico e Prontuário",
    description:
        "Armazene e acesse facilmente o histórico de consultas, anotações médicas, exames e prescrições dos pacientes.",
  },
  {
    id: 4,
    icon: "/images/icon/icon-04.svg",
    title: "Controle de Consultas e Agendamentos",
    description:
        "Agende, reagende ou cancele consultas com verificação de disponibilidade, evitando conflitos e otimizando horários.",
  },
  {
    id: 5,
    icon: "/images/icon/icon-05.svg",
    title: "Apontamento de Horários Inteligente",
    description:
        "Registro de entrada, saída e pausas dos profissionais, com cálculo automático de carga horária e relatórios.",
  },
  {
    id: 6,
    icon: "/images/icon/icon-06.svg",
    title: "Notificações e Alertas",
    description:
        "Envio automático de lembretes por e-mail ou WhatsApp para pacientes e médicos sobre consultas e alterações.",
  },
];

export default featuresData;