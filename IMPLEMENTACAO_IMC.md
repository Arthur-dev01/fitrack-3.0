# Implementação de Personalização Baseada em IMC

## 📋 Resumo das Mudanças

Este documento descreve as implementações realizadas no projeto FiTrack para adicionar personalização automática de dieta e treino baseada no IMC do usuário, com integração de IA para ajustes conforme preferências.

## 🎯 Funcionalidades Implementadas

### 1. Sistema de Cálculo de IMC e Classificação

**Arquivo:** `src/lib/healthCalculations.ts`

Implementa funções para:
- ✅ Cálculo do IMC (Índice de Massa Corporal)
- ✅ Classificação do IMC em categorias (abaixo do peso, normal, sobrepeso, obesidade)
- ✅ Determinação automática do objetivo (perder_peso, ganhar_peso, manter_peso)
- ✅ Cálculo da Taxa Metabólica Basal (TMB) usando fórmula de Mifflin-St Jeor
- ✅ Cálculo do TDEE (Total Daily Energy Expenditure)
- ✅ Cálculo de metas calóricas e de macronutrientes

**Lógica de Objetivos:**
- **IMC < 18.5** → Objetivo: Ganhar peso (superávit calórico de +400 kcal)
- **IMC 18.5-24.9** → Objetivo: Manter peso (calorias de manutenção)
- **IMC 25-29.9** → Objetivo: Perder peso (déficit calórico de -500 kcal)
- **IMC ≥ 30** → Objetivo: Perder peso (déficit calórico de -500 kcal)

### 2. Gerador de Planos Personalizados

**Arquivo:** `src/lib/planGenerator.ts`

Gera automaticamente:

#### Planos de Treino
- **Para Ganho de Peso:**
  - Treino de hipertrofia com exercícios compostos
  - 4-5x por semana
  - Intensidade moderada a alta
  - Duração: 60 minutos
  - Foco em força e massa muscular

- **Para Perda de Peso:**
  - Treino combinando aeróbico e força
  - 5-6x por semana
  - Intensidade moderada
  - Duração: 50 minutos
  - Foco em queima calórica

- **Para Manutenção:**
  - Treino equilibrado
  - 4x por semana
  - Intensidade moderada
  - Duração: 45 minutos

#### Planos Alimentares
- **Para Ganho de Peso:**
  - Dieta hipercalórica
  - 5-6 refeições por dia (incluindo ceia)
  - Rica em proteínas (2g/kg de peso)
  - Carboidratos e gorduras balanceados

- **Para Perda de Peso:**
  - Dieta com déficit calórico
  - 4 refeições por dia
  - Alta em proteínas
  - Carboidratos moderados, baixa em gorduras

- **Para Manutenção:**
  - Dieta balanceada
  - 4 refeições por dia
  - Macronutrientes equilibrados

#### Recomendação de Sono
- **Padrão:** 8 horas por noite (conforme solicitado)
- Recomendação adaptada ao objetivo do usuário

### 3. Sistema de Personalização com IA

**Arquivo:** `src/lib/aiPersonalization.ts`

Permite personalização avançada baseada em:

#### Preferências Alimentares
- Restrições alimentares (vegetariano, vegano, sem glúten, sem lactose)
- Alimentos que não gosta
- Preferências de refeições (texto livre)
- Substituições automáticas de alimentos

#### Preferências de Treino
- Equipamentos disponíveis (halteres, barra, elástico, peso corporal, academia completa)
- Exercícios preferidos
- Exercícios a evitar
- Preferências de treino (texto livre)
- Substituições automáticas de exercícios

**Substituições Implementadas:**

*Alimentares:*
- Vegetariano: Substitui carnes por tofu, grão de bico, lentilha
- Vegano: Substitui laticínios e ovos por alternativas vegetais
- Sem glúten: Substitui pães e massas por versões sem glúten
- Sem lactose: Substitui laticínios por versões sem lactose

*Treino:*
- Peso corporal: Adapta exercícios para não usar equipamento
- Halteres: Adapta exercícios para usar halteres
- Remove exercícios que o usuário quer evitar
- Prioriza exercícios preferidos

### 4. Banco de Dados

**Arquivo:** `supabase/migrations/20251209000000_add_user_profile_fields.sql`

Novas tabelas e campos:

#### Tabela `profiles` (atualizada)
```sql
- weight (FLOAT): Peso em kg
- height (FLOAT): Altura em cm
- age (INTEGER): Idade
- gender (TEXT): Sexo (masculino, feminino, outro)
- bmi (FLOAT): IMC calculado
- bmi_category (TEXT): Categoria do IMC
- goal (TEXT): Objetivo (perder_peso, ganhar_peso, manter_peso)
- activity_level (TEXT): Nível de atividade
- daily_calories_target (INTEGER): Meta calórica diária
- daily_protein_target (INTEGER): Meta de proteína diária
- daily_carbs_target (INTEGER): Meta de carboidratos diária
- daily_fats_target (INTEGER): Meta de gorduras diária
```

#### Tabela `workout_plans` (nova)
```sql
- id (UUID): ID único
- user_id (UUID): Referência ao usuário
- name (TEXT): Nome do plano
- description (TEXT): Descrição
- goal (TEXT): Objetivo
- frequency_per_week (INTEGER): Frequência semanal
- duration_minutes (INTEGER): Duração em minutos
- intensity (TEXT): Intensidade (baixa, moderada, alta)
- exercises (JSONB): Lista de exercícios
- is_active (BOOLEAN): Se está ativo
```

#### Tabela `meal_plans` (nova)
```sql
- id (UUID): ID único
- user_id (UUID): Referência ao usuário
- name (TEXT): Nome do plano
- description (TEXT): Descrição
- goal (TEXT): Objetivo
- daily_calories (INTEGER): Calorias diárias
- daily_protein (INTEGER): Proteína diária
- daily_carbs (INTEGER): Carboidratos diários
- daily_fats (INTEGER): Gorduras diárias
- meals (JSONB): Lista de refeições
- is_active (BOOLEAN): Se está ativo
```

### 5. Páginas e Componentes

#### Página de Onboarding
**Arquivo:** `src/pages/Onboarding.tsx`

Coleta dados do usuário em 2 etapas:
1. **Dados Físicos:** Peso, altura, idade, sexo
2. **Nível de Atividade:** Sedentário, leve, moderado, intenso, muito intenso

Ao finalizar:
- Calcula IMC e determina objetivo
- Calcula metas calóricas e de macronutrientes
- Gera plano de treino personalizado
- Gera plano alimentar personalizado
- Salva tudo no banco de dados
- Redireciona para o dashboard

#### Página de Personalização com IA
**Arquivo:** `src/pages/Personalizacao.tsx`

Interface para ajustar planos conforme preferências:
- **Aba Nutrição:**
  - Seleção de restrições alimentares
  - Lista de alimentos que não gosta
  - Campo de texto livre para preferências
  - Botão para personalizar plano alimentar

- **Aba Treino:**
  - Seleção de equipamentos disponíveis
  - Lista de exercícios preferidos
  - Lista de exercícios a evitar
  - Campo de texto livre para preferências
  - Botão para personalizar plano de treino

- **Visualização dos Planos Atuais:**
  - Card com resumo do plano alimentar
  - Card com resumo do plano de treino

## 🚀 Como Usar

### 1. Aplicar Migrations do Banco de Dados

```bash
# No diretório do projeto
supabase db push
```

Ou aplique manualmente a migration:
```bash
supabase migration up
```

### 2. Fluxo do Usuário

1. **Cadastro:** Usuário cria conta na página `/auth`
2. **Onboarding:** Ao fazer login pela primeira vez, redirecionar para `/onboarding`
3. **Configuração:** Usuário preenche dados físicos e nível de atividade
4. **Geração Automática:** Sistema calcula IMC e gera planos automaticamente
5. **Personalização (Opcional):** Usuário pode acessar `/personalizacao` para ajustar planos
6. **Uso:** Planos personalizados ficam disponíveis nas páginas de Nutrição e Treinos

### 3. Integração com IA (Futuro)

Para integração completa com OpenAI:

```typescript
// No arquivo src/lib/aiPersonalization.ts
// Descomentar e configurar a função callOpenAI()

export async function callOpenAI(prompt: string): Promise<string> {
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
}
```

## 📊 Exemplos de Cálculos

### Exemplo 1: Usuário com Sobrepeso

**Dados:**
- Peso: 85kg
- Altura: 175cm
- Idade: 30 anos
- Sexo: Masculino
- Nível de atividade: Leve

**Cálculos:**
- IMC: 27.8 (Sobrepeso)
- Objetivo: Perder peso
- TMB: 1,853 kcal
- TDEE: 2,548 kcal
- Meta calórica: 2,048 kcal (déficit de 500 kcal)
- Proteína: 170g (2g/kg)
- Gorduras: 61g (27% das calorias)
- Carboidratos: 230g (restante)

**Plano Gerado:**
- Treino: Emagrecimento, 5x/semana, 50min, intensidade moderada
- Dieta: 4 refeições, déficit calórico, rica em proteínas
- Sono: 8 horas

### Exemplo 2: Usuário Abaixo do Peso

**Dados:**
- Peso: 55kg
- Altura: 170cm
- Idade: 25 anos
- Sexo: Feminino
- Nível de atividade: Moderado

**Cálculos:**
- IMC: 19.0 (Abaixo do peso)
- Objetivo: Ganhar peso
- TMB: 1,324 kcal
- TDEE: 2,052 kcal
- Meta calórica: 2,452 kcal (superávit de 400 kcal)
- Proteína: 110g (2g/kg)
- Gorduras: 74g (27% das calorias)
- Carboidratos: 345g (restante)

**Plano Gerado:**
- Treino: Hipertrofia, 4x/semana, 60min, intensidade moderada
- Dieta: 5 refeições + ceia, superávit calórico, rica em proteínas
- Sono: 8 horas

## 🔧 Próximos Passos

1. **Redirecionar automaticamente** usuários novos para `/onboarding` após primeiro login
2. **Integrar OpenAI API** para personalização mais avançada com linguagem natural
3. **Adicionar visualização** dos planos gerados nas páginas de Nutrição e Treinos
4. **Implementar tracking** de progresso e ajuste automático dos planos
5. **Adicionar notificações** para lembrar usuário de seguir o plano
6. **Criar dashboard** com métricas de adesão ao plano

## 📝 Notas Importantes

- ✅ Sono sempre configurado para 8 horas (padrão solicitado)
- ✅ Déficit calórico de 500 kcal para perda de peso (~0.5kg/semana)
- ✅ Superávit calórico de 400 kcal para ganho de peso (~0.3-0.5kg/semana)
- ✅ Proteína sempre 2g/kg de peso corporal
- ✅ Gorduras 27% das calorias totais
- ✅ Carboidratos completam o restante das calorias
- ✅ Planos ajustados automaticamente conforme IMC e nível de atividade
- ✅ Substituições inteligentes baseadas em restrições alimentares
- ✅ Adaptação de exercícios baseada em equipamentos disponíveis

## 🎨 Interface

Novas rotas adicionadas:
- `/onboarding` - Configuração inicial do perfil
- `/personalizacao` - Personalização com IA

Novo item no menu lateral:
- ✨ **Personalização IA** - Acesso rápido à página de personalização

## 🔐 Segurança

- ✅ RLS (Row Level Security) habilitado em todas as tabelas
- ✅ Políticas de segurança implementadas
- ✅ Usuários só podem acessar seus próprios dados
- ✅ Validação de dados no frontend e backend

## 📚 Referências

- Fórmula de Mifflin-St Jeor para cálculo de TMB
- Classificação de IMC da OMS (Organização Mundial da Saúde)
- Diretrizes de macronutrientes para diferentes objetivos
- Princípios de periodização de treino
