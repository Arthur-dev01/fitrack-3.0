/**
 * Serviço de personalização com IA
 * Usa OpenAI para ajustar planos baseado nas preferências do usuário
 */

import type { WorkoutPlan, MealPlan } from './planGenerator';
import type { UserProfile } from './healthCalculations';

export interface UserPreferences {
  dietaryRestrictions?: string[]; // Ex: vegetariano, vegano, sem glúten, sem lactose
  dislikedFoods?: string[];
  preferredExercises?: string[];
  avoidedExercises?: string[];
  equipmentAvailable?: string[]; // Ex: halteres, barra, elástico, apenas peso corporal
  mealPreferences?: string; // Texto livre sobre preferências
  workoutPreferences?: string; // Texto livre sobre preferências
}

export interface AIPersonalizationRequest {
  profile: UserProfile;
  preferences: UserPreferences;
  currentPlan: WorkoutPlan | MealPlan;
  planType: 'workout' | 'meal';
}

/**
 * Personaliza um plano usando IA baseado nas preferências do usuário
 */
export async function personalizeWithAI(
  request: AIPersonalizationRequest
): Promise<WorkoutPlan | MealPlan> {
  const { profile, preferences, currentPlan, planType } = request;

  if (planType === 'workout') {
    return await personalizeWorkoutPlan(
      profile,
      preferences,
      currentPlan as WorkoutPlan
    );
  } else {
    return await personalizeMealPlan(
      profile,
      preferences,
      currentPlan as MealPlan
    );
  }
}

/**
 * Personaliza plano de treino com IA
 */
async function personalizeWorkoutPlan(
  profile: UserProfile,
  preferences: UserPreferences,
  currentPlan: WorkoutPlan
): Promise<WorkoutPlan> {
  const prompt = buildWorkoutPrompt(profile, preferences, currentPlan);

  try {
    // Aqui você pode integrar com a API da OpenAI
    // Por enquanto, vamos retornar ajustes baseados em regras
    const adjustedPlan = { ...currentPlan };

    // Ajustar exercícios baseado em equipamento disponível
    if (preferences.equipmentAvailable) {
      adjustedPlan.exercises = adjustExercisesForEquipment(
        currentPlan.exercises,
        preferences.equipmentAvailable
      );
    }

    // Remover exercícios que o usuário quer evitar
    if (preferences.avoidedExercises && preferences.avoidedExercises.length > 0) {
      adjustedPlan.exercises = adjustedPlan.exercises.filter(
        ex => !preferences.avoidedExercises?.some(
          avoided => ex.name.toLowerCase().includes(avoided.toLowerCase())
        )
      );
    }

    // Adicionar exercícios preferidos se não estiverem no plano
    if (preferences.preferredExercises && preferences.preferredExercises.length > 0) {
      // Lógica para adicionar exercícios preferidos
    }

    return adjustedPlan;
  } catch (error) {
    console.error('Erro ao personalizar plano de treino:', error);
    return currentPlan;
  }
}

/**
 * Personaliza plano alimentar com IA
 */
async function personalizeMealPlan(
  profile: UserProfile,
  preferences: UserPreferences,
  currentPlan: MealPlan
): Promise<MealPlan> {
  const prompt = buildMealPrompt(profile, preferences, currentPlan);

  try {
    const adjustedPlan = { ...currentPlan };

    // Ajustar refeições baseado em restrições alimentares
    if (preferences.dietaryRestrictions) {
      adjustedPlan.meals = adjustMealsForRestrictions(
        currentPlan.meals,
        preferences.dietaryRestrictions
      );
    }

    // Remover alimentos que o usuário não gosta
    if (preferences.dislikedFoods && preferences.dislikedFoods.length > 0) {
      adjustedPlan.meals = adjustedPlan.meals.map(meal => ({
        ...meal,
        items: meal.items.filter(
          item => !preferences.dislikedFoods?.some(
            disliked => item.name.toLowerCase().includes(disliked.toLowerCase())
          )
        )
      }));
    }

    return adjustedPlan;
  } catch (error) {
    console.error('Erro ao personalizar plano alimentar:', error);
    return currentPlan;
  }
}

/**
 * Constrói o prompt para personalização de treino
 */
function buildWorkoutPrompt(
  profile: UserProfile,
  preferences: UserPreferences,
  currentPlan: WorkoutPlan
): string {
  return `
Você é um personal trainer especializado. Ajuste o seguinte plano de treino baseado nas preferências do cliente:

PERFIL DO CLIENTE:
- Peso: ${profile.weight}kg
- Altura: ${profile.height}cm
- Idade: ${profile.age} anos
- Sexo: ${profile.gender}
- Nível de atividade: ${profile.activityLevel}

PLANO ATUAL:
${JSON.stringify(currentPlan, null, 2)}

PREFERÊNCIAS DO CLIENTE:
${preferences.equipmentAvailable ? `- Equipamentos disponíveis: ${preferences.equipmentAvailable.join(', ')}` : ''}
${preferences.preferredExercises ? `- Exercícios preferidos: ${preferences.preferredExercises.join(', ')}` : ''}
${preferences.avoidedExercises ? `- Exercícios a evitar: ${preferences.avoidedExercises.join(', ')}` : ''}
${preferences.workoutPreferences ? `- Outras preferências: ${preferences.workoutPreferences}` : ''}

Por favor, ajuste o plano mantendo o mesmo objetivo e intensidade, mas personalizando os exercícios conforme as preferências.
Retorne o plano ajustado no mesmo formato JSON.
`;
}

/**
 * Constrói o prompt para personalização de dieta
 */
function buildMealPrompt(
  profile: UserProfile,
  preferences: UserPreferences,
  currentPlan: MealPlan
): string {
  return `
Você é um nutricionista especializado. Ajuste o seguinte plano alimentar baseado nas preferências do cliente:

PERFIL DO CLIENTE:
- Peso: ${profile.weight}kg
- Altura: ${profile.height}cm
- Idade: ${profile.age} anos
- Sexo: ${profile.gender}
- Nível de atividade: ${profile.activityLevel}

PLANO ATUAL:
${JSON.stringify(currentPlan, null, 2)}

PREFERÊNCIAS DO CLIENTE:
${preferences.dietaryRestrictions ? `- Restrições alimentares: ${preferences.dietaryRestrictions.join(', ')}` : ''}
${preferences.dislikedFoods ? `- Alimentos que não gosta: ${preferences.dislikedFoods.join(', ')}` : ''}
${preferences.mealPreferences ? `- Outras preferências: ${preferences.mealPreferences}` : ''}

Por favor, ajuste o plano mantendo as mesmas metas calóricas e de macronutrientes, mas personalizando as refeições conforme as preferências.
Retorne o plano ajustado no mesmo formato JSON.
`;
}

/**
 * Ajusta exercícios baseado em equipamento disponível
 */
function adjustExercisesForEquipment(
  exercises: any[],
  equipment: string[]
): any[] {
  const equipmentLower = equipment.map(e => e.toLowerCase());
  
  // Mapeamento de substituições de exercícios
  const substitutions: Record<string, Record<string, string>> = {
    'peso_corporal': {
      'Agachamento Livre': 'Agachamento com Peso Corporal',
      'Supino Reto': 'Flexão de Braço',
      'Levantamento Terra': 'Agachamento Búlgaro',
      'Desenvolvimento com Halteres': 'Flexão Pike',
      'Remada Curvada': 'Remada Invertida',
      'Rosca Direta': 'Rosca com Toalha',
      'Tríceps Pulley': 'Tríceps Mergulho'
    },
    'halteres': {
      'Agachamento Livre': 'Agachamento com Halteres',
      'Supino Reto': 'Supino com Halteres',
      'Levantamento Terra': 'Levantamento Terra com Halteres',
      'Remada na Máquina': 'Remada com Halteres'
    }
  };

  // Se tiver apenas peso corporal
  if (equipmentLower.includes('peso corporal') || equipmentLower.includes('nenhum')) {
    return exercises.map(ex => {
      const substitution = substitutions['peso_corporal'][ex.name];
      if (substitution) {
        return { ...ex, name: substitution };
      }
      return ex;
    });
  }

  return exercises;
}

/**
 * Ajusta refeições baseado em restrições alimentares
 */
function adjustMealsForRestrictions(
  meals: any[],
  restrictions: string[]
): any[] {
  const restrictionsLower = restrictions.map(r => r.toLowerCase());

  // Mapeamento de substituições de alimentos
  const substitutions: Record<string, Record<string, any>> = {
    'vegetariano': {
      'Frango grelhado': { name: 'Tofu grelhado', protein: 15, calories: 145 },
      'Peito de frango': { name: 'Grão de bico', protein: 15, calories: 164 },
      'Carne magra': { name: 'Lentilha', protein: 18, calories: 230 },
      'Carne moída magra': { name: 'Proteína de soja texturizada', protein: 50, calories: 330 },
      'Peixe grelhado': { name: 'Tempeh grelhado', protein: 19, calories: 193 }
    },
    'vegano': {
      'Ovos mexidos': { name: 'Tofu mexido', protein: 10, calories: 100 },
      'Omelete de claras': { name: 'Tofu mexido', protein: 10, calories: 100 },
      'Queijo branco': { name: 'Queijo vegano', protein: 3, calories: 80 },
      'Queijo cottage': { name: 'Iogurte de soja', protein: 6, calories: 80 },
      'Iogurte grego natural': { name: 'Iogurte de coco', protein: 1, calories: 80 },
      'Whey Protein': { name: 'Proteína vegetal', protein: 20, calories: 110 },
      'Leite desnatado': { name: 'Leite de amêndoas', protein: 1, calories: 30 }
    },
    'sem glúten': {
      'Pão integral': { name: 'Pão sem glúten', protein: 4, calories: 90 },
      'Macarrão integral': { name: 'Macarrão de arroz', protein: 4, calories: 190 },
      'Aveia': { name: 'Quinoa', protein: 4, calories: 120 }
    },
    'sem lactose': {
      'Queijo branco': { name: 'Queijo sem lactose', protein: 6, calories: 75 },
      'Queijo cottage': { name: 'Queijo cottage sem lactose', protein: 11, calories: 98 },
      'Iogurte grego natural': { name: 'Iogurte sem lactose', protein: 10, calories: 100 },
      'Leite desnatado': { name: 'Leite sem lactose', protein: 8, calories: 80 }
    }
  };

  return meals.map(meal => {
    const adjustedItems = meal.items.map((item: any) => {
      for (const restriction of restrictionsLower) {
        if (substitutions[restriction] && substitutions[restriction][item.name]) {
          const sub = substitutions[restriction][item.name];
          return {
            ...item,
            name: sub.name,
            protein: sub.protein,
            calories: sub.calories
          };
        }
      }
      return item;
    });

    // Recalcular totais
    const total_calories = adjustedItems.reduce((sum: number, item: any) => sum + item.calories, 0);
    const total_protein = adjustedItems.reduce((sum: number, item: any) => sum + item.protein, 0);
    const total_carbs = adjustedItems.reduce((sum: number, item: any) => sum + item.carbs, 0);
    const total_fats = adjustedItems.reduce((sum: number, item: any) => sum + item.fats, 0);

    return {
      ...meal,
      items: adjustedItems,
      total_calories,
      total_protein,
      total_carbs,
      total_fats
    };
  });
}

/**
 * Chama a API da OpenAI para personalização avançada
 */
export async function callOpenAI(prompt: string): Promise<string> {
  // Esta função pode ser implementada para chamar a API da OpenAI
  // quando o usuário quiser personalização mais avançada
  
  // Exemplo de implementação:
  /*
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Você é um especialista em fitness e nutrição.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
  */
  
  throw new Error('OpenAI integration not implemented yet');
}
