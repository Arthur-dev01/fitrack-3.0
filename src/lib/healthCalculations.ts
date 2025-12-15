/**
 * Utilitários para cálculos de saúde e fitness
 */

export interface UserProfile {
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: 'masculino' | 'feminino' | 'outro';
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso';
}

export interface BMIResult {
  bmi: number;
  category: string;
  goal: 'perder_peso' | 'ganhar_peso' | 'manter_peso';
  recommendation: string;
}

export interface CalorieTarget {
  maintenance: number;
  target: number;
  deficit: number;
  protein: number;
  carbs: number;
  fats: number;
}

/**
 * Calcula o IMC (Índice de Massa Corporal)
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * Classifica o IMC e determina o objetivo
 */
export function classifyBMI(bmi: number): BMIResult {
  let category: string;
  let goal: 'perder_peso' | 'ganhar_peso' | 'manter_peso';
  let recommendation: string;

  if (bmi < 18.5) {
    category = 'Abaixo do peso';
    goal = 'ganhar_peso';
    recommendation = 'Recomendamos um plano de ganho de massa com superávit calórico e treino de força.';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Peso normal';
    goal = 'manter_peso';
    recommendation = 'Mantenha seus hábitos saudáveis com uma dieta balanceada e exercícios regulares.';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Sobrepeso';
    goal = 'perder_peso';
    recommendation = 'Recomendamos um plano de emagrecimento com déficit calórico e exercícios aeróbicos.';
  } else {
    category = 'Obesidade';
    goal = 'perder_peso';
    recommendation = 'Recomendamos um plano de emagrecimento com déficit calórico moderado e acompanhamento profissional.';
  }

  return { bmi, category, goal, recommendation };
}

/**
 * Calcula a Taxa Metabólica Basal (TMB) usando a fórmula de Mifflin-St Jeor
 */
export function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;
  
  let bmr: number;
  
  if (gender === 'masculino') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  return bmr;
}

/**
 * Calcula o gasto calórico diário total (TDEE)
 */
export function calculateTDEE(bmr: number, activityLevel: string): number {
  const activityMultipliers: Record<string, number> = {
    sedentario: 1.2,      // Pouco ou nenhum exercício
    leve: 1.375,          // Exercício leve 1-3 dias/semana
    moderado: 1.55,       // Exercício moderado 3-5 dias/semana
    intenso: 1.725,       // Exercício intenso 6-7 dias/semana
    muito_intenso: 1.9    // Exercício muito intenso, trabalho físico
  };
  
  return bmr * (activityMultipliers[activityLevel] || 1.2);
}

/**
 * Calcula as metas calóricas e de macronutrientes
 */
export function calculateCalorieTarget(
  profile: UserProfile,
  goal: 'perder_peso' | 'ganhar_peso' | 'manter_peso'
): CalorieTarget {
  const bmr = calculateBMR(profile);
  const maintenance = calculateTDEE(bmr, profile.activityLevel);
  
  let target: number;
  let deficit: number;
  
  switch (goal) {
    case 'perder_peso':
      // Déficit de 500 calorias (perda de ~0.5kg por semana)
      deficit = 500;
      target = maintenance - deficit;
      break;
    case 'ganhar_peso':
      // Superávit de 300-500 calorias (ganho de ~0.3-0.5kg por semana)
      deficit = -400;
      target = maintenance + 400;
      break;
    case 'manter_peso':
    default:
      deficit = 0;
      target = maintenance;
      break;
  }
  
  // Cálculo de macronutrientes
  // Proteína: 2g por kg de peso corporal
  const protein = Math.round(profile.weight * 2);
  
  // Gordura: 25-30% das calorias totais
  const fats = Math.round((target * 0.27) / 9); // 9 cal por grama de gordura
  
  // Carboidratos: restante das calorias
  const proteinCalories = protein * 4; // 4 cal por grama de proteína
  const fatsCalories = fats * 9;
  const carbsCalories = target - proteinCalories - fatsCalories;
  const carbs = Math.round(carbsCalories / 4); // 4 cal por grama de carboidrato
  
  return {
    maintenance: Math.round(maintenance),
    target: Math.round(target),
    deficit,
    protein,
    carbs,
    fats
  };
}

/**
 * Determina a intensidade do treino baseado no objetivo e IMC
 */
export function determineWorkoutIntensity(
  bmi: number,
  goal: string,
  activityLevel: string
): 'baixa' | 'moderada' | 'alta' {
  // Para obesidade ou sedentários, começar com intensidade baixa
  if (bmi >= 30 || activityLevel === 'sedentario') {
    return 'baixa';
  }
  
  // Para ganho de peso, intensidade moderada a alta
  if (goal === 'ganhar_peso') {
    return activityLevel === 'leve' ? 'moderada' : 'alta';
  }
  
  // Para perda de peso, intensidade moderada
  if (goal === 'perder_peso') {
    return 'moderada';
  }
  
  // Para manutenção, baseado no nível de atividade
  return activityLevel === 'leve' ? 'moderada' : 'alta';
}

/**
 * Calcula a frequência semanal de treino recomendada
 */
export function calculateWorkoutFrequency(
  goal: string,
  activityLevel: string
): number {
  if (activityLevel === 'sedentario') {
    return 3; // Começar com 3x por semana
  }
  
  if (goal === 'ganhar_peso') {
    return 4; // 4-5x por semana para hipertrofia
  }
  
  if (goal === 'perder_peso') {
    return 5; // 5-6x por semana para emagrecimento
  }
  
  return 4; // Padrão para manutenção
}
