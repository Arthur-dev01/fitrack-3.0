import { useState } from "react";
import { mockMeals } from "@/data/mockMeals";
import { MealCard } from "@/components/nutrition/MealCard";
import { MealModal } from "@/components/nutrition/MealModal";
import { Apple, Flame, TrendingUp } from "lucide-react";
import type { Meal } from "@/data/mockMeals";

const Nutricao = () => {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (meal: Meal) => {
    setSelectedMeal(meal);
    setModalOpen(true);
  };

  const totalCalories = mockMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalXP = mockMeals.reduce((acc, m) => acc + m.xp, 0);

  // Filter by category
  const breakfast = mockMeals.filter((m) => m.category === "café da manhã");
  const lunch = mockMeals.filter((m) => m.category === "almoço");
  const dinner = mockMeals.filter((m) => m.category === "jantar");
  const snacks = mockMeals.filter((m) => m.category === "lanche");

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Apple className="w-8 h-8 text-secondary" />
          Nutrição
        </h1>
        <p className="text-muted-foreground">
          Refeições balanceadas para atingir suas metas!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl gradient-secondary text-white shadow-glow">
          <Apple className="w-6 h-6 mb-2" />
          <p className="text-sm opacity-90">Total de Receitas</p>
          <p className="text-3xl font-bold">{mockMeals.length}</p>
        </div>
        <div className="p-4 rounded-xl gradient-primary text-white">
          <Flame className="w-6 h-6 mb-2" />
          <p className="text-sm opacity-90">Calorias Totais</p>
          <p className="text-3xl font-bold">{totalCalories}</p>
        </div>
        <div className="p-4 rounded-xl gradient-hero text-white">
          <TrendingUp className="w-6 h-6 mb-2" />
          <p className="text-sm opacity-90">XP Disponível</p>
          <p className="text-3xl font-bold">{totalXP}</p>
        </div>
      </div>

      {/* Breakfast */}
      {breakfast.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🌅 Café da Manhã
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {breakfast.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lunch */}
      {lunch.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🍽️ Almoço
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lunch.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Dinner */}
      {dinner.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🌙 Jantar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dinner.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Snacks */}
      {snacks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🥤 Lanches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {snacks.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <MealModal
        meal={selectedMeal}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Nutricao;
