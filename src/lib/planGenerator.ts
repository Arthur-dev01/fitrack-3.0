/**
 * Gerador de planos de treino e alimentação personalizados
 */

import {
  calculateBMI,
  classifyBMI,
  calculateCalorieTarget,
  determineWorkoutIntensity,
  calculateWorkoutFrequency,
  type UserProfile,
  type CalorieTarget
} from './healthCalculations';

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface WorkoutPlan {
  name: string;
  description: string;
  goal: string;
  frequency_per_week: number;
  duration_minutes: number;
  intensity: 'baixa' | 'moderada' | 'alta';
  exercises: WorkoutExercise[];
}

export interface MealItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  time: string;
  name: string;
  items: MealItem[];
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fats: number;
}

export interface MealPlan {
  name: string;
  description: string;
  goal: string;
  daily_calories: number;
  daily_protein: number;
  daily_carbs: number;
  daily_fats: number;
  meals: Meal[];
}

/**
 * Gera um plano de treino personalizado baseado no perfil do usuário
 */
export function generateWorkoutPlan(profile: UserProfile): WorkoutPlan {
  const bmi = calculateBMI(profile.weight, profile.height);
  const { goal } = classifyBMI(bmi);
  const intensity = determineWorkoutIntensity(bmi, goal, profile.activityLevel);
  const frequency = calculateWorkoutFrequency(goal, profile.activityLevel);

  let exercises: WorkoutExercise[];
  let name: string;
  let description: string;
  let duration: number;

  if (goal === 'ganhar_peso') {
    name = 'Plano de Hipertrofia';
    description = 'Treino focado em ganho de massa muscular com exercícios compostos e isolados.';
    duration = 60;
    
    exercises = [
      { name: 'Agachamento Livre', sets: 4, reps: '8-12', rest: '90s', notes: 'Foco em técnica' },
      { name: 'Supino Reto', sets: 4, reps: '8-12', rest: '90s' },
      { name: 'Levantamento Terra', sets: 3, reps: '6-10', rest: '120s', notes: 'Exercício avançado' },
      { name: 'Desenvolvimento com Halteres', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Remada Curvada', sets: 4, reps: '8-12', rest: '90s' },
      { name: 'Rosca Direta', sets: 3, reps: '10-15', rest: '60s' },
      { name: 'Tríceps Pulley', sets: 3, reps: '10-15', rest: '60s' },
      { name: 'Panturrilha em Pé', sets: 4, reps: '15-20', rest: '45s' }
    ];
  } else if (goal === 'perder_peso') {
    name = 'Plano de Emagrecimento';
    description = 'Treino combinando exercícios aeróbicos e de força para maximizar a queima de calorias.';
    duration = 50;
    
    exercises = [
      { name: 'Aquecimento - Esteira', sets: 1, reps: '10 min', rest: '0s', notes: 'Intensidade moderada' },
      { name: 'Agachamento com Peso Corporal', sets: 3, reps: '15-20', rest: '45s' },
      { name: 'Flexão de Braço', sets: 3, reps: '10-15', rest: '45s' },
      { name: 'Afundo Alternado', sets: 3, reps: '12-15 cada', rest: '45s' },
      { name: 'Prancha Abdominal', sets: 3, reps: '30-60s', rest: '30s' },
      { name: 'Burpees', sets: 3, reps: '10-12', rest: '60s', notes: 'Alta intensidade' },
      { name: 'Mountain Climbers', sets: 3, reps: '20-30', rest: '45s' },
      { name: 'Cardio Final - Bicicleta', sets: 1, reps: '15 min', rest: '0s', notes: 'HIIT opcional' }
    ];
  } else {
    name = 'Plano de Manutenção';
    description = 'Treino equilibrado para manter a forma física e saúde geral.';
    duration = 45;
    
    exercises = [
      { name: 'Aquecimento Dinâmico', sets: 1, reps: '5 min', rest: '0s' },
      { name: 'Agachamento', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Supino Inclinado', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Remada na Máquina', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Desenvolvimento', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Prancha', sets: 3, reps: '45s', rest: '30s' },
      { name: 'Cardio Leve', sets: 1, reps: '10 min', rest: '0s' }
    ];
  }

  return {
    name,
    description,
    goal,
    frequency_per_week: frequency,
    duration_minutes: duration,
    intensity,
    exercises
  };
}

/**
 * Gera um plano alimentar personalizado baseado no perfil do usuário
 */
export function generateMealPlan(profile: UserProfile): MealPlan {
  const bmi = calculateBMI(profile.weight, profile.height);
  const { goal } = classifyBMI(bmi);
  const calorieTarget = calculateCalorieTarget(profile, goal);

  let name: string;
  let description: string;

  if (goal === 'ganhar_peso') {
    name = 'Plano de Ganho de Massa';
    description = 'Dieta hipercalórica rica em proteínas para ganho de massa muscular.';
  } else if (goal === 'perder_peso') {
    name = 'Plano de Emagrecimento';
    description = 'Dieta com déficit calórico balanceado para perda de gordura saudável.';
  } else {
    name = 'Plano de Manutenção';
    description = 'Dieta equilibrada para manter o peso e saúde ideal.';
  }

  const meals = generateMeals(calorieTarget, goal);

  return {
    name,
    description,
    goal,
    daily_calories: calorieTarget.target,
    daily_protein: calorieTarget.protein,
    daily_carbs: calorieTarget.carbs,
    daily_fats: calorieTarget.fats,
    meals
  };
}

/**
 * Gera as refeições do dia baseado nas metas calóricas
 */
function generateMeals(calorieTarget: CalorieTarget, goal: string): Meal[] {
  const { target, protein, carbs, fats } = calorieTarget;

  // Distribuição de calorias por refeição
  const breakfastCal = Math.round(target * 0.25);
  const lunchCal = Math.round(target * 0.35);
  const dinnerCal = Math.round(target * 0.30);
  const snackCal = Math.round(target * 0.10);

  const meals: Meal[] = [];

  // Café da Manhã
  if (goal === 'ganhar_peso') {
    meals.push({
      time: '07:00',
      name: 'Café da Manhã',
      items: [
        { name: 'Ovos mexidos', portion: '3 unidades', calories: 210, protein: 18, carbs: 2, fats: 15 },
        { name: 'Pão integral', portion: '2 fatias', calories: 160, protein: 8, carbs: 28, fats: 2 },
        { name: 'Abacate', portion: '1/2 unidade', calories: 120, protein: 1, carbs: 6, fats: 11 },
        { name: 'Banana', portion: '1 unidade', calories: 105, protein: 1, carbs: 27, fats: 0 },
        { name: 'Whey Protein', portion: '1 scoop', calories: 120, protein: 24, carbs: 3, fats: 1 }
      ],
      total_calories: 715,
      total_protein: 52,
      total_carbs: 66,
      total_fats: 29
    });
  } else if (goal === 'perder_peso') {
    meals.push({
      time: '07:00',
      name: 'Café da Manhã',
      items: [
        { name: 'Omelete de claras', portion: '3 claras', calories: 51, protein: 11, carbs: 1, fats: 0 },
        { name: 'Pão integral', portion: '1 fatia', calories: 80, protein: 4, carbs: 14, fats: 1 },
        { name: 'Mamão', portion: '1 fatia', calories: 60, protein: 1, carbs: 15, fats: 0 },
        { name: 'Café com leite desnatado', portion: '200ml', calories: 70, protein: 7, carbs: 10, fats: 0 }
      ],
      total_calories: 261,
      total_protein: 23,
      total_carbs: 40,
      total_fats: 1
    });
  } else {
    meals.push({
      time: '07:00',
      name: 'Café da Manhã',
      items: [
        { name: 'Ovos mexidos', portion: '2 unidades', calories: 140, protein: 12, carbs: 1, fats: 10 },
        { name: 'Pão integral', portion: '2 fatias', calories: 160, protein: 8, carbs: 28, fats: 2 },
        { name: 'Queijo branco', portion: '30g', calories: 75, protein: 6, carbs: 2, fats: 5 },
        { name: 'Suco de laranja', portion: '200ml', calories: 90, protein: 1, carbs: 21, fats: 0 }
      ],
      total_calories: 465,
      total_protein: 27,
      total_carbs: 52,
      total_fats: 17
    });
  }

  // Almoço
  if (goal === 'ganhar_peso') {
    meals.push({
      time: '12:00',
      name: 'Almoço',
      items: [
        { name: 'Arroz integral', portion: '2 xícaras', calories: 430, protein: 10, carbs: 90, fats: 3 },
        { name: 'Feijão', portion: '1 concha', calories: 120, protein: 8, carbs: 20, fats: 1 },
        { name: 'Frango grelhado', portion: '200g', calories: 330, protein: 62, carbs: 0, fats: 7 },
        { name: 'Batata doce', portion: '200g', calories: 180, protein: 4, carbs: 41, fats: 0 },
        { name: 'Salada verde', portion: '1 prato', calories: 50, protein: 2, carbs: 10, fats: 0 },
        { name: 'Azeite', portion: '1 colher', calories: 120, protein: 0, carbs: 0, fats: 14 }
      ],
      total_calories: 1230,
      total_protein: 86,
      total_carbs: 161,
      total_fats: 25
    });
  } else if (goal === 'perder_peso') {
    meals.push({
      time: '12:00',
      name: 'Almoço',
      items: [
        { name: 'Arroz integral', portion: '1/2 xícara', calories: 108, protein: 2, carbs: 22, fats: 1 },
        { name: 'Feijão', portion: '1/2 concha', calories: 60, protein: 4, carbs: 10, fats: 0 },
        { name: 'Peito de frango', portion: '150g', calories: 248, protein: 47, carbs: 0, fats: 5 },
        { name: 'Brócolis', portion: '1 xícara', calories: 55, protein: 4, carbs: 11, fats: 1 },
        { name: 'Salada verde', portion: '1 prato', calories: 50, protein: 2, carbs: 10, fats: 0 }
      ],
      total_calories: 521,
      total_protein: 59,
      total_carbs: 53,
      total_fats: 7
    });
  } else {
    meals.push({
      time: '12:00',
      name: 'Almoço',
      items: [
        { name: 'Arroz integral', portion: '1 xícara', calories: 215, protein: 5, carbs: 45, fats: 2 },
        { name: 'Feijão', portion: '1 concha', calories: 120, protein: 8, carbs: 20, fats: 1 },
        { name: 'Carne magra', portion: '150g', calories: 280, protein: 45, carbs: 0, fats: 10 },
        { name: 'Legumes refogados', portion: '1 xícara', calories: 100, protein: 3, carbs: 15, fats: 3 },
        { name: 'Salada', portion: '1 prato', calories: 50, protein: 2, carbs: 10, fats: 0 }
      ],
      total_calories: 765,
      total_protein: 63,
      total_carbs: 90,
      total_fats: 16
    });
  }

  // Lanche da Tarde
  meals.push({
    time: '15:30',
    name: 'Lanche da Tarde',
    items: goal === 'ganhar_peso' 
      ? [
          { name: 'Pasta de amendoim', portion: '2 colheres', calories: 190, protein: 8, carbs: 7, fats: 16 },
          { name: 'Pão integral', portion: '2 fatias', calories: 160, protein: 8, carbs: 28, fats: 2 },
          { name: 'Banana', portion: '1 unidade', calories: 105, protein: 1, carbs: 27, fats: 0 }
        ]
      : [
          { name: 'Iogurte grego natural', portion: '150g', calories: 100, protein: 15, carbs: 6, fats: 2 },
          { name: 'Castanhas', portion: '10 unidades', calories: 100, protein: 3, carbs: 3, fats: 9 }
        ],
    total_calories: goal === 'ganhar_peso' ? 455 : 200,
    total_protein: goal === 'ganhar_peso' ? 17 : 18,
    total_carbs: goal === 'ganhar_peso' ? 62 : 9,
    total_fats: goal === 'ganhar_peso' ? 18 : 11
  });

  // Jantar
  if (goal === 'ganhar_peso') {
    meals.push({
      time: '19:00',
      name: 'Jantar',
      items: [
        { name: 'Macarrão integral', portion: '2 xícaras', calories: 350, protein: 14, carbs: 70, fats: 3 },
        { name: 'Carne moída magra', portion: '150g', calories: 280, protein: 42, carbs: 0, fats: 12 },
        { name: 'Molho de tomate', portion: '1/2 xícara', calories: 60, protein: 2, carbs: 12, fats: 1 },
        { name: 'Salada', portion: '1 prato', calories: 50, protein: 2, carbs: 10, fats: 0 }
      ],
      total_calories: 740,
      total_protein: 60,
      total_carbs: 92,
      total_fats: 16
    });
  } else if (goal === 'perder_peso') {
    meals.push({
      time: '19:00',
      name: 'Jantar',
      items: [
        { name: 'Peixe grelhado', portion: '150g', calories: 206, protein: 42, carbs: 0, fats: 4 },
        { name: 'Batata doce', portion: '100g', calories: 90, protein: 2, carbs: 21, fats: 0 },
        { name: 'Aspargos', portion: '1 xícara', calories: 40, protein: 4, carbs: 8, fats: 0 },
        { name: 'Salada verde', portion: '1 prato', calories: 50, protein: 2, carbs: 10, fats: 0 }
      ],
      total_calories: 386,
      total_protein: 50,
      total_carbs: 39,
      total_fats: 4
    });
  } else {
    meals.push({
      time: '19:00',
      name: 'Jantar',
      items: [
        { name: 'Frango assado', portion: '150g', calories: 248, protein: 47, carbs: 0, fats: 5 },
        { name: 'Arroz integral', portion: '1 xícara', calories: 215, protein: 5, carbs: 45, fats: 2 },
        { name: 'Legumes no vapor', portion: '1 xícara', calories: 80, protein: 3, carbs: 15, fats: 1 },
        { name: 'Salada', portion: '1 prato', calories: 50, protein: 2, carbs: 10, fats: 0 }
      ],
      total_calories: 593,
      total_protein: 57,
      total_carbs: 70,
      total_fats: 8
    });
  }

  // Ceia (apenas para ganho de peso)
  if (goal === 'ganhar_peso') {
    meals.push({
      time: '22:00',
      name: 'Ceia',
      items: [
        { name: 'Queijo cottage', portion: '100g', calories: 98, protein: 11, carbs: 4, fats: 4 },
        { name: 'Aveia', portion: '30g', calories: 117, protein: 4, carbs: 21, fats: 2 }
      ],
      total_calories: 215,
      total_protein: 15,
      total_carbs: 25,
      total_fats: 6
    });
  }

  return meals;
}

/**
 * Gera recomendação de sono baseado no objetivo
 */
export function generateSleepRecommendation(goal: string): {
  target_hours: number;
  recommendation: string;
} {
  // Sono sempre 8 horas como padrão, conforme solicitado
  return {
    target_hours: 8,
    recommendation: 'Durma 8 horas por noite para otimizar a recuperação muscular e o metabolismo. O sono adequado é essencial para atingir seus objetivos de forma saudável.'
  };
}
