import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, Utensils, Dumbbell, Save } from 'lucide-react';
import { personalizeWithAI, type UserPreferences } from '@/lib/aiPersonalization';
import type { UserProfile } from '@/lib/healthCalculations';

export default function Personalizacao() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);
  const [mealPlan, setMealPlan] = useState<any>(null);

  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestrictions: [],
    dislikedFoods: [],
    preferredExercises: [],
    avoidedExercises: [],
    equipmentAvailable: [],
    mealPreferences: '',
    workoutPreferences: ''
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Carregar perfil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);

      // Carregar plano de treino ativo
      const { data: workoutData } = await supabase
        .from('workout_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      setWorkoutPlan(workoutData);

      // Carregar plano alimentar ativo
      const { data: mealData } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      setMealPlan(mealData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleDietaryRestrictionToggle = (restriction: string) => {
    setPreferences(prev => {
      const current = prev.dietaryRestrictions || [];
      if (current.includes(restriction)) {
        return {
          ...prev,
          dietaryRestrictions: current.filter(r => r !== restriction)
        };
      } else {
        return {
          ...prev,
          dietaryRestrictions: [...current, restriction]
        };
      }
    });
  };

  const handleEquipmentToggle = (equipment: string) => {
    setPreferences(prev => {
      const current = prev.equipmentAvailable || [];
      if (current.includes(equipment)) {
        return {
          ...prev,
          equipmentAvailable: current.filter(e => e !== equipment)
        };
      } else {
        return {
          ...prev,
          equipmentAvailable: [...current, equipment]
        };
      }
    });
  };

  const handlePersonalizeMeal = async () => {
    if (!profile || !mealPlan) {
      toast({
        title: "Erro",
        description: "Você precisa ter um perfil e plano alimentar configurados",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const userProfile: UserProfile = {
        weight: profile.weight,
        height: profile.height,
        age: profile.age,
        gender: profile.gender,
        activityLevel: profile.activity_level
      };

      const personalizedPlan = await personalizeWithAI({
        profile: userProfile,
        preferences,
        currentPlan: mealPlan,
        planType: 'meal'
      });

      // Desativar plano antigo
      await supabase
        .from('meal_plans')
        .update({ is_active: false })
        .eq('id', mealPlan.id);

      // Criar novo plano personalizado
      const { error } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user!.id,
          ...personalizedPlan,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Plano alimentar personalizado! 🎉",
        description: "Seu plano foi ajustado conforme suas preferências",
      });

      loadUserData();
    } catch (error: any) {
      toast({
        title: "Erro ao personalizar plano",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonalizeWorkout = async () => {
    if (!profile || !workoutPlan) {
      toast({
        title: "Erro",
        description: "Você precisa ter um perfil e plano de treino configurados",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const userProfile: UserProfile = {
        weight: profile.weight,
        height: profile.height,
        age: profile.age,
        gender: profile.gender,
        activityLevel: profile.activity_level
      };

      const personalizedPlan = await personalizeWithAI({
        profile: userProfile,
        preferences,
        currentPlan: workoutPlan,
        planType: 'workout'
      });

      // Desativar plano antigo
      await supabase
        .from('workout_plans')
        .update({ is_active: false })
        .eq('id', workoutPlan.id);

      // Criar novo plano personalizado
      const { error } = await supabase
        .from('workout_plans')
        .insert({
          user_id: user!.id,
          ...personalizedPlan,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Plano de treino personalizado! 🎉",
        description: "Seu plano foi ajustado conforme suas preferências",
      });

      loadUserData();
    } catch (error: any) {
      toast({
        title: "Erro ao personalizar plano",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          Personalização com IA
        </h1>
        <p className="text-muted-foreground">
          Ajuste seus planos conforme suas preferências e restrições
        </p>
      </div>

      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="nutrition">
            <Utensils className="w-4 h-4 mr-2" />
            Nutrição
          </TabsTrigger>
          <TabsTrigger value="workout">
            <Dumbbell className="w-4 h-4 mr-2" />
            Treino
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências Alimentares</CardTitle>
              <CardDescription>
                Personalize seu plano alimentar conforme suas restrições e gostos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Restrições Alimentares</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['Vegetariano', 'Vegano', 'Sem Glúten', 'Sem Lactose'].map(restriction => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Checkbox
                        id={restriction}
                        checked={preferences.dietaryRestrictions?.includes(restriction.toLowerCase())}
                        onCheckedChange={() => handleDietaryRestrictionToggle(restriction.toLowerCase())}
                      />
                      <Label htmlFor={restriction} className="cursor-pointer">
                        {restriction}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dislikedFoods">Alimentos que não gosta (separados por vírgula)</Label>
                <Input
                  id="dislikedFoods"
                  placeholder="Ex: brócolis, peixe, abacate"
                  value={preferences.dislikedFoods?.join(', ')}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    dislikedFoods: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mealPreferences">Outras preferências alimentares</Label>
                <Textarea
                  id="mealPreferences"
                  placeholder="Ex: Prefiro refeições rápidas, gosto de comida japonesa, não gosto de cozinhar..."
                  value={preferences.mealPreferences}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    mealPreferences: e.target.value
                  }))}
                  rows={4}
                />
              </div>

              <Button
                onClick={handlePersonalizeMeal}
                disabled={isLoading || !mealPlan}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isLoading ? 'Personalizando...' : 'Personalizar Plano Alimentar'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Treino</CardTitle>
              <CardDescription>
                Personalize seu plano de treino conforme equipamentos e preferências
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Equipamentos Disponíveis</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['Halteres', 'Barra', 'Elástico', 'Peso Corporal', 'Academia Completa'].map(equipment => (
                    <div key={equipment} className="flex items-center space-x-2">
                      <Checkbox
                        id={equipment}
                        checked={preferences.equipmentAvailable?.includes(equipment.toLowerCase())}
                        onCheckedChange={() => handleEquipmentToggle(equipment.toLowerCase())}
                      />
                      <Label htmlFor={equipment} className="cursor-pointer">
                        {equipment}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredExercises">Exercícios preferidos (separados por vírgula)</Label>
                <Input
                  id="preferredExercises"
                  placeholder="Ex: agachamento, flexão, corrida"
                  value={preferences.preferredExercises?.join(', ')}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    preferredExercises: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avoidedExercises">Exercícios a evitar (separados por vírgula)</Label>
                <Input
                  id="avoidedExercises"
                  placeholder="Ex: corrida, burpees, supino"
                  value={preferences.avoidedExercises?.join(', ')}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    avoidedExercises: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workoutPreferences">Outras preferências de treino</Label>
                <Textarea
                  id="workoutPreferences"
                  placeholder="Ex: Prefiro treinos curtos, tenho problema no joelho, gosto de HIIT..."
                  value={preferences.workoutPreferences}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    workoutPreferences: e.target.value
                  }))}
                  rows={4}
                />
              </div>

              <Button
                onClick={handlePersonalizeWorkout}
                disabled={isLoading || !workoutPlan}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isLoading ? 'Personalizando...' : 'Personalizar Plano de Treino'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Planos Atuais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mealPlan && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plano Alimentar Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{mealPlan.name}</p>
                <p className="text-sm text-muted-foreground">{mealPlan.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                  <div>
                    <p className="text-muted-foreground">Calorias</p>
                    <p className="font-semibold">{mealPlan.daily_calories} kcal</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Proteína</p>
                    <p className="font-semibold">{mealPlan.daily_protein}g</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {workoutPlan && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plano de Treino Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{workoutPlan.name}</p>
                <p className="text-sm text-muted-foreground">{workoutPlan.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                  <div>
                    <p className="text-muted-foreground">Frequência</p>
                    <p className="font-semibold">{workoutPlan.frequency_per_week}x/semana</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duração</p>
                    <p className="font-semibold">{workoutPlan.duration_minutes} min</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
