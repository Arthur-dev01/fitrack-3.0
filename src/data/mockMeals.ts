export interface MacroDetails {
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface Meal {
  id: string;
  name: string;
  category: "café da manhã" | "almoço" | "jantar" | "lanche";
  calories: number;
  macros: MacroDetails;
  substitution: string;
  motivation: string;
  prepTips: string[];
  ingredients: string[];
  xp: number;
}

export const mockMeals: Meal[] = [
  {
    id: "1",
    name: "Bowl de Açaí Proteico",
    category: "café da manhã",
    calories: 420,
    macros: { protein: 25, carbs: 55, fats: 12, fiber: 10 },
    substitution: "Substitua açaí por pitaya para menos calorias",
    motivation: "Energia e antioxidantes para começar bem! 🍇",
    prepTips: [
      "Bata o açaí congelado até ficar cremoso",
      "Use banana congelada para textura",
      "Adicione granola só na hora de servir",
    ],
    ingredients: [
      "200g açaí puro",
      "1 banana",
      "30g whey protein",
      "50g granola",
      "Frutas vermelhas",
    ],
    xp: 80,
  },
  {
    id: "2",
    name: "Frango Grelhado com Batata Doce",
    category: "almoço",
    calories: 520,
    macros: { protein: 45, carbs: 50, fats: 10, fiber: 7 },
    substitution: "Troque frango por peixe para ômega-3",
    motivation: "Refeição clássica para ganhos! 💪",
    prepTips: [
      "Tempere o frango 2h antes",
      "Asse a batata doce com casca",
      "Adicione especiarias para mais sabor",
    ],
    ingredients: [
      "200g peito de frango",
      "200g batata doce",
      "Brócolis no vapor",
      "Azeite de oliva",
      "Temperos naturais",
    ],
    xp: 100,
  },
  {
    id: "3",
    name: "Salmão com Quinoa e Legumes",
    category: "jantar",
    calories: 580,
    macros: { protein: 38, carbs: 42, fats: 25, fiber: 8 },
    substitution: "Use tilápia para uma opção mais econômica",
    motivation: "Ômega-3 para saúde e performance! 🐟",
    prepTips: [
      "Salmão assado a 180°C por 15min",
      "Cozinhe quinoa na proporção 1:2 de água",
      "Legumes salteados mantêm nutrientes",
    ],
    ingredients: [
      "150g salmão",
      "100g quinoa",
      "Mix de legumes",
      "Limão siciliano",
      "Ervas frescas",
    ],
    xp: 120,
  },
  {
    id: "4",
    name: "Pasta Integral com Molho de Tomate Caseiro",
    category: "almoço",
    calories: 480,
    macros: { protein: 20, carbs: 70, fats: 12, fiber: 9 },
    substitution: "Macarrão de abobrinha para low carb",
    motivation: "Carboidrato inteligente para energia! 🍝",
    prepTips: [
      "Cozinhe o macarrão al dente",
      "Molho com tomates frescos é melhor",
      "Adicione proteína magra",
    ],
    ingredients: [
      "100g macarrão integral",
      "Molho de tomate caseiro",
      "Carne moída magra",
      "Manjericão fresco",
      "Parmesão light",
    ],
    xp: 90,
  },
  {
    id: "5",
    name: "Smoothie Verde Detox",
    category: "lanche",
    calories: 180,
    macros: { protein: 15, carbs: 25, fats: 4, fiber: 6 },
    substitution: "Adicione abacate para mais saciedade",
    motivation: "Nutrientes líquidos em segundos! 🥤",
    prepTips: [
      "Use vegetais congelados",
      "Adicione gengibre para acelerar metabolismo",
      "Bata bem até ficar homogêneo",
    ],
    ingredients: [
      "1 xícara espinafre",
      "1/2 maçã verde",
      "1 scoop whey",
      "Água de coco",
      "Hortelã",
    ],
    xp: 60,
  },
  {
    id: "6",
    name: "Ovos Mexidos com Aveia",
    category: "café da manhã",
    calories: 380,
    macros: { protein: 30, carbs: 35, fats: 15, fiber: 5 },
    substitution: "Use claras para menos gordura",
    motivation: "Proteína de alto valor biológico! 🥚",
    prepTips: [
      "Mexa em fogo baixo para textura cremosa",
      "Adicione vegetais picados",
      "Tempere com ervas frescas",
    ],
    ingredients: [
      "3 ovos inteiros",
      "40g aveia",
      "Tomate cereja",
      "Cebola",
      "Queijo cottage",
    ],
    xp: 85,
  },
  {
    id: "7",
    name: "Bowl de Carne com Arroz Integral",
    category: "jantar",
    calories: 550,
    macros: { protein: 42, carbs: 60, fats: 14, fiber: 8 },
    substitution: "Arroz de couve-flor para low carb",
    motivation: "Refeição completa e balanceada! 🍚",
    prepTips: [
      "Carne grelhada em alta temperatura",
      "Arroz integral leva mais tempo para cozinhar",
      "Adicione vegetais coloridos",
    ],
    ingredients: [
      "180g carne magra",
      "100g arroz integral",
      "Feijão preto",
      "Salada mista",
      "Abacate",
    ],
    xp: 110,
  },
  {
    id: "8",
    name: "Wrap de Frango Light",
    category: "lanche",
    calories: 320,
    macros: { protein: 28, carbs: 35, fats: 8, fiber: 6 },
    substitution: "Tortilha de espinafre para mais nutrientes",
    motivation: "Prático e nutritivo! 🌯",
    prepTips: [
      "Desfiе o frango ainda quente",
      "Use molho de iogurte no lugar de maionese",
      "Aqueça a tortilha antes de montar",
    ],
    ingredients: [
      "1 tortilha integral",
      "120g frango desfiado",
      "Alface e tomate",
      "Iogurte grego",
      "Cenoura ralada",
    ],
    xp: 75,
  },
  {
    id: "9",
    name: "Panqueca de Banana e Aveia",
    category: "café da manhã",
    calories: 350,
    macros: { protein: 20, carbs: 50, fats: 8, fiber: 7 },
    substitution: "Adicione cacau para versão chocolate",
    motivation: "Doce saudável sem culpa! 🥞",
    prepTips: [
      "Amasse bem a banana madura",
      "Deixe descansar massa por 5min",
      "Fogo médio-baixo para não queimar",
    ],
    ingredients: [
      "1 banana madura",
      "2 ovos",
      "40g aveia",
      "Canela",
      "Mel para finalizar",
    ],
    xp: 70,
  },
  {
    id: "10",
    name: "Buddha Bowl Vegetariano",
    category: "almoço",
    calories: 450,
    macros: { protein: 22, carbs: 58, fats: 16, fiber: 12 },
    substitution: "Adicione tofu para mais proteína",
    motivation: "Arco-íris de nutrientes! 🌈",
    prepTips: [
      "Prepare cada ingrediente separadamente",
      "Monte de forma visualmente atraente",
      "Molho tahine caseiro é essencial",
    ],
    ingredients: [
      "Grão de bico assado",
      "Quinoa",
      "Vegetais assados",
      "Abacate",
      "Molho tahine",
    ],
    xp: 95,
  },
];
