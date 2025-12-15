export interface Exercise {
  name: string;
  repsOrTime: string;
  tips: string;
}

export interface Workout {
  id: string;
  name: string;
  type: "cardio" | "força" | "HIIT" | "funcional" | "flexibilidade";
  duration: number;
  intensity: "leve" | "moderada" | "intensa";
  equipment: "nenhum" | "halteres" | "bola" | "faixa";
  description: string;
  exercises: Exercise[];
  xp: number;
}

export const mockWorkouts: Workout[] = [
  {
    id: "1",
    name: "Corrida Matinal",
    type: "cardio",
    duration: 30,
    intensity: "moderada",
    equipment: "nenhum",
    description: "Comece o dia com energia! 🌅",
    exercises: [
      {
        name: "Aquecimento (caminhada leve)",
        repsOrTime: "5 minutos",
        tips: "Mantenha postura ereta e braços relaxados",
      },
      {
        name: "Corrida moderada",
        repsOrTime: "20 minutos",
        tips: "Respire pelo nariz e expire pela boca",
      },
      {
        name: "Alongamento final",
        repsOrTime: "5 minutos",
        tips: "Foque em pernas e quadril",
      },
    ],
    xp: 150,
  },
  {
    id: "2",
    name: "Treino de Força Completo",
    type: "força",
    duration: 45,
    intensity: "intensa",
    equipment: "halteres",
    description: "Construa músculos fortes! 💪",
    exercises: [
      {
        name: "Agachamento com halteres",
        repsOrTime: "4x12 repetições",
        tips: "Joelhos alinhados com os pés, costas retas",
      },
      {
        name: "Supino com halteres",
        repsOrTime: "4x10 repetições",
        tips: "Cotovelos a 45° do corpo",
      },
      {
        name: "Remada curvada",
        repsOrTime: "4x12 repetições",
        tips: "Mantenha a coluna neutra",
      },
      {
        name: "Desenvolvimento de ombros",
        repsOrTime: "3x10 repetições",
        tips: "Núcleo contraído durante todo movimento",
      },
    ],
    xp: 250,
  },
  {
    id: "3",
    name: "HIIT Explosivo",
    type: "HIIT",
    duration: 20,
    intensity: "intensa",
    equipment: "nenhum",
    description: "Queime calorias em tempo recorde! 🔥",
    exercises: [
      {
        name: "Burpees",
        repsOrTime: "30 segundos (20s descanso)",
        tips: "Movimentos explosivos mas controlados",
      },
      {
        name: "Mountain climbers",
        repsOrTime: "30 segundos (20s descanso)",
        tips: "Core ativado, quadril estável",
      },
      {
        name: "Jump squats",
        repsOrTime: "30 segundos (20s descanso)",
        tips: "Aterrissagem suave nos calcanhares",
      },
      {
        name: "High knees",
        repsOrTime: "30 segundos (20s descanso)",
        tips: "Braços coordenados com as pernas",
      },
    ],
    xp: 300,
  },
  {
    id: "4",
    name: "Yoga Flow Relaxante",
    type: "flexibilidade",
    duration: 30,
    intensity: "leve",
    equipment: "nenhum",
    description: "Encontre seu equilíbrio interior 🧘",
    exercises: [
      {
        name: "Saudação ao sol",
        repsOrTime: "5 repetições",
        tips: "Respiração sincronizada com movimentos",
      },
      {
        name: "Guerreiro I e II",
        repsOrTime: "1 minuto cada lado",
        tips: "Quadril alinhado, olhar fixo",
      },
      {
        name: "Cachorro olhando para baixo",
        repsOrTime: "2 minutos",
        tips: "Calcanhares buscando o chão",
      },
      {
        name: "Postura da criança",
        repsOrTime: "3 minutos",
        tips: "Relaxe completamente",
      },
    ],
    xp: 100,
  },
  {
    id: "5",
    name: "Funcional Full Body",
    type: "funcional",
    duration: 40,
    intensity: "moderada",
    equipment: "faixa",
    description: "Treine movimentos do dia a dia! 🎯",
    exercises: [
      {
        name: "Agachamento com faixa",
        repsOrTime: "3x15 repetições",
        tips: "Faixa acima dos joelhos para ativar glúteos",
      },
      {
        name: "Prancha com toque no ombro",
        repsOrTime: "3x20 toques",
        tips: "Minimize rotação do quadril",
      },
      {
        name: "Ponte de glúteo com faixa",
        repsOrTime: "3x15 repetições",
        tips: "Aperte glúteos no topo",
      },
      {
        name: "Lateral walk com faixa",
        repsOrTime: "3x20 passos",
        tips: "Mantenha tensão constante na faixa",
      },
    ],
    xp: 200,
  },
  {
    id: "6",
    name: "Cardio Dance Party",
    type: "cardio",
    duration: 35,
    intensity: "moderada",
    equipment: "nenhum",
    description: "Dançar é se exercitar com alegria! 🎵",
    exercises: [
      {
        name: "Aquecimento rítmico",
        repsOrTime: "5 minutos",
        tips: "Movimente o corpo todo ao ritmo da música",
      },
      {
        name: "Coreografia principal",
        repsOrTime: "25 minutos",
        tips: "Não se preocupe em acertar, divirta-se!",
      },
      {
        name: "Cool down",
        repsOrTime: "5 minutos",
        tips: "Reduza intensidade gradualmente",
      },
    ],
    xp: 180,
  },
  {
    id: "7",
    name: "Pilates Core Power",
    type: "força",
    duration: 30,
    intensity: "moderada",
    equipment: "bola",
    description: "Fortaleça seu centro de força! ⚡",
    exercises: [
      {
        name: "Prancha na bola",
        repsOrTime: "3x45 segundos",
        tips: "Corpo em linha reta da cabeça aos pés",
      },
      {
        name: "Roll out na bola",
        repsOrTime: "3x10 repetições",
        tips: "Controle o movimento de ida e volta",
      },
      {
        name: "Pike na bola",
        repsOrTime: "3x12 repetições",
        tips: "Use o core para levantar o quadril",
      },
      {
        name: "Crunch na bola",
        repsOrTime: "3x20 repetições",
        tips: "Amplitude completa do movimento",
      },
    ],
    xp: 170,
  },
  {
    id: "8",
    name: "Mobilidade Ativa",
    type: "flexibilidade",
    duration: 25,
    intensity: "leve",
    equipment: "faixa",
    description: "Melhore sua amplitude de movimento! 🌟",
    exercises: [
      {
        name: "Rotação de quadril com faixa",
        repsOrTime: "2x10 cada lado",
        tips: "Movimentos controlados e amplos",
      },
      {
        name: "Alongamento dinâmico de isquios",
        repsOrTime: "2x12 repetições",
        tips: "Não force além do confortável",
      },
      {
        name: "Abertura de ombros com faixa",
        repsOrTime: "2x15 repetições",
        tips: "Mantenha braços esticados",
      },
      {
        name: "Gato-vaca",
        repsOrTime: "3 minutos",
        tips: "Sincronize com respiração",
      },
    ],
    xp: 120,
  },
  {
    id: "9",
    name: "HIIT Cardio Blast",
    type: "HIIT",
    duration: 25,
    intensity: "intensa",
    equipment: "nenhum",
    description: "Supere seus limites! 🚀",
    exercises: [
      {
        name: "Sprint no lugar",
        repsOrTime: "40s (20s descanso)",
        tips: "Joelhos altos, máxima velocidade",
      },
      {
        name: "Prancha jack",
        repsOrTime: "40s (20s descanso)",
        tips: "Mantenha quadril estável",
      },
      {
        name: "Skater jumps",
        repsOrTime: "40s (20s descanso)",
        tips: "Aterrissagem controlada",
      },
      {
        name: "Bicycle crunches",
        repsOrTime: "40s (20s descanso)",
        tips: "Cotovelo toca joelho oposto",
      },
    ],
    xp: 280,
  },
  {
    id: "10",
    name: "Força de Pernas",
    type: "força",
    duration: 35,
    intensity: "intensa",
    equipment: "halteres",
    description: "Construa pernas poderosas! 🦵",
    exercises: [
      {
        name: "Agachamento búlgaro",
        repsOrTime: "4x10 cada perna",
        tips: "Joelho da frente a 90° no fundo",
      },
      {
        name: "Stiff com halteres",
        repsOrTime: "4x12 repetições",
        tips: "Sinta o alongamento nos isquios",
      },
      {
        name: "Avanço com halteres",
        repsOrTime: "3x12 cada perna",
        tips: "Tronco ereto, joelho não passa do pé",
      },
      {
        name: "Elevação de panturrilha",
        repsOrTime: "4x20 repetições",
        tips: "Amplitude completa do movimento",
      },
    ],
    xp: 240,
  },
];
