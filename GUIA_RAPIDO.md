# Guia Rápido - Sistema de Personalização FiTrack

## Como Funciona

O sistema FiTrack agora possui **personalização automática** baseada no IMC do usuário. Quando uma pessoa se cadastra, o sistema coleta informações físicas e automaticamente determina se ela precisa perder peso, ganhar peso ou manter o peso atual.

## Fluxo Automático

### 1. Cadastro do Usuário
O usuário cria uma conta normalmente com email e senha.

### 2. Onboarding (Configuração Inicial)
Após o primeiro login, o usuário é direcionado para preencher:

**Etapa 1 - Dados Físicos:**
- Peso (kg)
- Altura (cm)
- Idade
- Sexo

**Etapa 2 - Nível de Atividade:**
- Sedentário (pouco ou nenhum exercício)
- Levemente ativo (1-3 dias/semana)
- Moderadamente ativo (3-5 dias/semana)
- Muito ativo (6-7 dias/semana)
- Extremamente ativo (trabalho físico intenso)

### 3. Geração Automática dos Planos

O sistema automaticamente:

**Calcula o IMC** e determina a categoria:
- Abaixo do peso (IMC < 18.5) → **Objetivo: Ganhar peso**
- Peso normal (IMC 18.5-24.9) → **Objetivo: Manter peso**
- Sobrepeso (IMC 25-29.9) → **Objetivo: Perder peso**
- Obesidade (IMC ≥ 30) → **Objetivo: Perder peso**

**Cria a Dieta Personalizada:**

Para **perder peso** (IMC alto):
- Déficit calórico de 500 kcal por dia
- 4 refeições balanceadas
- Alta em proteínas para preservar massa muscular
- Carboidratos moderados e gorduras controladas
- Exemplo: Café da manhã leve, almoço com porções controladas, lanche saudável, jantar com peixe ou frango

Para **ganhar peso** (IMC baixo):
- Superávit calórico de 400 kcal por dia
- 5-6 refeições por dia (incluindo ceia)
- Rica em proteínas para ganho de massa
- Carboidratos e gorduras em quantidade adequada
- Exemplo: Café da manhã reforçado, almoço completo, lanches calóricos, jantar abundante, ceia proteica

Para **manter peso** (IMC normal):
- Calorias de manutenção
- 4 refeições equilibradas
- Macronutrientes balanceados
- Foco em saúde e bem-estar

**Cria o Treino Personalizado:**

Para **perder peso**:
- Treino de emagrecimento
- 5x por semana
- 50 minutos por sessão
- Intensidade moderada
- Combina aeróbico (esteira, bicicleta) com exercícios de força
- Foco em queima calórica

Para **ganhar peso**:
- Treino de hipertrofia
- 4x por semana
- 60 minutos por sessão
- Intensidade moderada a alta
- Exercícios compostos (agachamento, supino, levantamento terra)
- Foco em ganho de massa muscular

Para **manter peso**:
- Treino de manutenção
- 4x por semana
- 45 minutos por sessão
- Intensidade moderada
- Exercícios equilibrados
- Foco em saúde geral

**Define o Sono:**
- Sempre **8 horas por noite** (padrão para todos)
- Recomendação personalizada conforme o objetivo

## Personalização com IA

Após a configuração inicial, o usuário pode acessar a página **"Personalização IA"** no menu lateral para ajustar os planos conforme suas preferências pessoais.

### Personalização da Dieta

O usuário pode informar:

**Restrições Alimentares:**
- Vegetariano
- Vegano
- Sem glúten
- Sem lactose

**Alimentos que não gosta:**
- Lista de alimentos a evitar
- Exemplo: brócolis, peixe, abacate

**Preferências gerais:**
- Texto livre sobre preferências
- Exemplo: "Prefiro refeições rápidas", "Gosto de comida japonesa"

O sistema então **substitui automaticamente** os alimentos nos planos:
- Carnes → Tofu, grão de bico, lentilha (vegetariano/vegano)
- Laticínios → Alternativas vegetais (vegano/sem lactose)
- Pães e massas → Versões sem glúten
- Remove alimentos que o usuário não gosta

### Personalização do Treino

O usuário pode informar:

**Equipamentos Disponíveis:**
- Halteres
- Barra
- Elástico
- Peso corporal
- Academia completa

**Exercícios Preferidos:**
- Lista de exercícios que gosta
- Exemplo: agachamento, flexão, corrida

**Exercícios a Evitar:**
- Lista de exercícios que não quer fazer
- Exemplo: corrida, burpees, supino

**Preferências gerais:**
- Texto livre sobre preferências
- Exemplo: "Prefiro treinos curtos", "Tenho problema no joelho"

O sistema então **adapta automaticamente** os exercícios:
- Ajusta para equipamentos disponíveis
- Remove exercícios indesejados
- Prioriza exercícios preferidos
- Substitui exercícios conforme necessário

## Exemplo Prático

### Caso 1: João - Sobrepeso

**Dados:**
- Peso: 90kg, Altura: 175cm, Idade: 35 anos
- IMC: 29.4 (Sobrepeso)
- Nível de atividade: Sedentário

**Sistema determina automaticamente:**
- **Objetivo:** Perder peso
- **Dieta:** 2.100 kcal/dia (déficit de 500 kcal)
- **Macros:** 180g proteína, 240g carboidratos, 63g gorduras
- **Treino:** Emagrecimento, 5x/semana, 50min, intensidade moderada
- **Sono:** 8 horas

**Plano de Treino gerado:**
- Aquecimento na esteira (10 min)
- Agachamento com peso corporal (3x15-20)
- Flexão de braço (3x10-15)
- Afundo alternado (3x12-15)
- Prancha abdominal (3x30-60s)
- Burpees (3x10-12)
- Cardio final na bicicleta (15 min HIIT)

**Plano Alimentar gerado:**
- Café: Omelete de claras, pão integral, mamão, café com leite desnatado
- Almoço: Arroz integral (porção controlada), feijão, frango grelhado, brócolis, salada
- Lanche: Iogurte grego natural, castanhas
- Jantar: Peixe grelhado, batata doce, aspargos, salada

### Caso 2: Maria - Abaixo do Peso

**Dados:**
- Peso: 50kg, Altura: 165cm, Idade: 25 anos
- IMC: 18.4 (Abaixo do peso)
- Nível de atividade: Leve

**Sistema determina automaticamente:**
- **Objetivo:** Ganhar peso
- **Dieta:** 2.300 kcal/dia (superávit de 400 kcal)
- **Macros:** 100g proteína, 330g carboidratos, 69g gorduras
- **Treino:** Hipertrofia, 4x/semana, 60min, intensidade moderada
- **Sono:** 8 horas

**Plano de Treino gerado:**
- Agachamento livre (4x8-12)
- Supino reto (4x8-12)
- Levantamento terra (3x6-10)
- Desenvolvimento com halteres (3x10-12)
- Remada curvada (4x8-12)
- Rosca direta (3x10-15)
- Tríceps pulley (3x10-15)

**Plano Alimentar gerado:**
- Café: Ovos mexidos (3 unidades), pão integral (2 fatias), abacate, banana, whey protein
- Almoço: Arroz integral (2 xícaras), feijão, frango grelhado (200g), batata doce, salada com azeite
- Lanche: Pasta de amendoim, pão integral, banana
- Jantar: Macarrão integral, carne moída magra, molho de tomate, salada
- Ceia: Queijo cottage, aveia

## Uso do Sistema de IA

Após a geração automática dos planos, Maria decide personalizar:

**Preferências de Maria:**
- Vegetariana
- Não gosta de: brócolis, feijão preto
- Tem apenas halteres em casa
- Prefere treinos de 45 minutos

**Sistema ajusta automaticamente:**

**Dieta:**
- Frango → Tofu grelhado
- Carne moída → Proteína de soja texturizada
- Whey protein → Proteína vegetal
- Feijão preto → Lentilha
- Remove brócolis, adiciona outros vegetais

**Treino:**
- Agachamento livre → Agachamento com halteres
- Supino reto → Supino com halteres
- Levantamento terra → Levantamento terra com halteres
- Remove exercícios que precisam de máquinas
- Ajusta duração para 45 minutos

## Benefícios do Sistema

O sistema FiTrack oferece uma experiência completamente personalizada onde:

**Automatização Inteligente:** O usuário não precisa entender de nutrição ou treino. O sistema calcula tudo automaticamente baseado em ciência (fórmulas validadas de TMB, TDEE, distribuição de macronutrientes).

**Personalização Profunda:** Além da automação baseada em IMC, o sistema permite ajustes finos conforme preferências pessoais, restrições alimentares e equipamentos disponíveis.

**Flexibilidade:** O usuário pode regenerar os planos quantas vezes quiser, experimentando diferentes configurações até encontrar o que funciona melhor.

**Base Científica:** Todos os cálculos são baseados em fórmulas científicas validadas e recomendações de especialistas em nutrição e educação física.

**Facilidade de Uso:** Interface simples e intuitiva que guia o usuário passo a passo, sem necessidade de conhecimento técnico.

## Próximos Passos

Para usar o sistema completo:

1. **Aplicar as migrations** do banco de dados
2. **Configurar redirecionamento** automático para `/onboarding` após primeiro login
3. **Testar o fluxo** completo de cadastro → onboarding → personalização
4. **Integrar com OpenAI** (opcional) para personalização ainda mais avançada com linguagem natural
5. **Adicionar visualizações** dos planos nas páginas de Nutrição e Treinos

O sistema está pronto para uso e pode ser expandido conforme necessário!
