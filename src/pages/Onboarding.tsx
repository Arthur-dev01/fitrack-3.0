import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  calculateBMI, 
  classifyBMI, 
  calculateCalorieTarget,
  type UserProfile 
} from '@/lib/healthCalculations';
import { generateWorkoutPlan, generateMealPlan, generateSleepRecommendation } from '@/lib/planGenerator';
import { Activity, Scale, Ruler, Calendar, User } from 'lucide-react';

export default function Onboarding() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);

      // Validações
      if (weight <= 0 || height <= 0 || age <= 0) {
        throw new Error("Por favor, insira valores válidos");
      }

      // Calcular IMC e classificação
      const bmi = calculateBMI(weight, height);
      const { category, goal, recommendation } = classifyBMI(bmi);

      // Criar perfil do usuário
      const profile: UserProfile = {
        weight,
        height,
        age,
        gender: formData.gender as 'masculino' | 'feminino' | 'outro',
        activityLevel: formData.activityLevel as any
      };

      // Calcular metas calóricas
      const calorieTarget = calculateCalorieTarget(profile, goal);

      // Atualizar perfil no banco de dados
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          weight,
          height,
          age,
          gender: formData.gender,
          bmi: parseFloat(bmi.toFixed(2)),
          bmi_category: category,
          goal,
          activity_level: formData.activityLevel,
          daily_calories_target: calorieTarget.target,
          daily_protein_target: calorieTarget.protein,
          daily_carbs_target: calorieTarget.carbs,
          daily_fats_target: calorieTarget.fats
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Gerar plano de treino
      const workoutPlan = generateWorkoutPlan(profile);
      const { error: workoutError } = await supabase
        .from('workout_plans')
        .insert({
          user_id: user.id,
          name: workoutPlan.name,
          description: workoutPlan.description,
          goal: workoutPlan.goal,
          frequency_per_week: workoutPlan.frequency_per_week,
          duration_minutes: workoutPlan.duration_minutes,
          intensity: workoutPlan.intensity,
          exercises: workoutPlan.exercises,
          is_active: true
        });

      if (workoutError) throw workoutError;

      // Gerar plano alimentar
      const mealPlan = generateMealPlan(profile);
      const { error: mealError } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user.id,
          name: mealPlan.name,
          description: mealPlan.description,
          goal: mealPlan.goal,
          daily_calories: mealPlan.daily_calories,
          daily_protein: mealPlan.daily_protein,
          daily_carbs: mealPlan.daily_carbs,
          daily_fats: mealPlan.daily_fats,
          meals: mealPlan.meals,
          is_active: true
        });

      if (mealError) throw mealError;

      // Mostrar resultado
      const sleepRec = generateSleepRecommendation(goal);
      
      toast({
        title: "Perfil configurado com sucesso! 🎉",
        description: `IMC: ${bmi.toFixed(1)} - ${category}. ${recommendation}`,
      });

      // Redirecionar para dashboard
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erro ao configurar perfil",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isStep1Valid = formData.weight && formData.height && formData.age;
  const isStep2Valid = formData.gender && formData.activityLevel;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Configure seu Perfil
          </CardTitle>
          <CardDescription className="text-center">
            Vamos personalizar sua experiência no FitTrack
          </CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            <div className={`h-2 w-20 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 w-20 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in-up">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Dados Físicos
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Scale className="w-4 h-4" />
                      Peso (kg)
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      placeholder="75.5"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      Altura (cm)
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      step="0.1"
                      placeholder="175"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Idade
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid || isLoading}
                >
                  Próximo
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in-up">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Nível de Atividade
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">
                    Qual é o seu nível de atividade física?
                  </Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => handleInputChange('activityLevel', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentario">
                        Sedentário (pouco ou nenhum exercício)
                      </SelectItem>
                      <SelectItem value="leve">
                        Levemente ativo (exercício leve 1-3 dias/semana)
                      </SelectItem>
                      <SelectItem value="moderado">
                        Moderadamente ativo (exercício moderado 3-5 dias/semana)
                      </SelectItem>
                      <SelectItem value="intenso">
                        Muito ativo (exercício intenso 6-7 dias/semana)
                      </SelectItem>
                      <SelectItem value="muito_intenso">
                        Extremamente ativo (exercício muito intenso, trabalho físico)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ℹ️ Com base nas suas informações, vamos criar automaticamente:
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                    <li>• Plano de treino personalizado</li>
                    <li>• Dieta com déficit ou superávit calórico</li>
                    <li>• Recomendação de 8 horas de sono</li>
                    <li>• Metas de macronutrientes</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isStep2Valid || isLoading}
                  >
                    {isLoading ? "Configurando..." : "Finalizar"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
