-- Adicionar campos de perfil físico e objetivo
ALTER TABLE public.profiles
ADD COLUMN weight FLOAT,
ADD COLUMN height FLOAT,
ADD COLUMN age INTEGER,
ADD COLUMN gender TEXT CHECK (gender IN ('masculino', 'feminino', 'outro')),
ADD COLUMN bmi FLOAT,
ADD COLUMN bmi_category TEXT,
ADD COLUMN goal TEXT CHECK (goal IN ('perder_peso', 'ganhar_peso', 'manter_peso')),
ADD COLUMN activity_level TEXT CHECK (activity_level IN ('sedentario', 'leve', 'moderado', 'intenso', 'muito_intenso')),
ADD COLUMN daily_calories_target INTEGER,
ADD COLUMN daily_protein_target INTEGER,
ADD COLUMN daily_carbs_target INTEGER,
ADD COLUMN daily_fats_target INTEGER;

-- Criar tabela de planos de treino personalizados
CREATE TABLE public.workout_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  goal TEXT NOT NULL,
  frequency_per_week INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  intensity TEXT NOT NULL CHECK (intensity IN ('baixa', 'moderada', 'alta')),
  exercises JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela workout_plans
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para workout_plans
CREATE POLICY "Usuários podem ver seus próprios planos de treino"
  ON public.workout_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios planos de treino"
  ON public.workout_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios planos de treino"
  ON public.workout_plans FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios planos de treino"
  ON public.workout_plans FOR DELETE
  USING (auth.uid() = user_id);

-- Criar tabela de planos alimentares personalizados
CREATE TABLE public.meal_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  goal TEXT NOT NULL,
  daily_calories INTEGER NOT NULL,
  daily_protein INTEGER NOT NULL,
  daily_carbs INTEGER NOT NULL,
  daily_fats INTEGER NOT NULL,
  meals JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela meal_plans
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para meal_plans
CREATE POLICY "Usuários podem ver seus próprios planos alimentares"
  ON public.meal_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios planos alimentares"
  ON public.meal_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios planos alimentares"
  ON public.meal_plans FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios planos alimentares"
  ON public.meal_plans FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at em workout_plans
CREATE TRIGGER set_updated_at_workout_plans
  BEFORE UPDATE ON public.workout_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger para atualizar updated_at em meal_plans
CREATE TRIGGER set_updated_at_meal_plans
  BEFORE UPDATE ON public.meal_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Índices para melhor performance
CREATE INDEX idx_workout_plans_user_id ON public.workout_plans(user_id);
CREATE INDEX idx_workout_plans_is_active ON public.workout_plans(is_active);
CREATE INDEX idx_meal_plans_user_id ON public.meal_plans(user_id);
CREATE INDEX idx_meal_plans_is_active ON public.meal_plans(is_active);
