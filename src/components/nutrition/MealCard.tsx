import { Flame, Award, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Meal } from "@/data/mockMeals";

interface MealCardProps {
  meal: Meal;
  onViewDetails: (meal: Meal) => void;
}

const categoryEmojis = {
  "café da manhã": "🌅",
  almoço: "🍽️",
  jantar: "🌙",
  lanche: "🥤",
};

const categoryColors = {
  "café da manhã": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  almoço: "bg-green-500/10 text-green-600 dark:text-green-400",
  jantar: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  lanche: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

export const MealCard = ({ meal, onViewDetails }: MealCardProps) => {
  return (
    <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{categoryEmojis[meal.category]}</div>
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-smooth">
              {meal.name}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {meal.category}
            </p>
          </div>
        </div>
        <Badge className={categoryColors[meal.category]}>
          {meal.calories} kcal
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {meal.motivation}
      </p>

      {/* Macros Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4 p-3 rounded-lg bg-muted/30">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Proteína</p>
          <p className="font-bold text-primary">{meal.macros.protein}g</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Carbs</p>
          <p className="font-bold text-secondary">{meal.macros.carbs}g</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Gordura</p>
          <p className="font-bold text-foreground">{meal.macros.fats}g</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Fibra</p>
          <p className="font-bold text-primary">{meal.macros.fiber}g</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm mb-4 text-muted-foreground">
        <Lightbulb className="w-4 h-4 text-secondary" />
        <span className="line-clamp-1">{meal.substitution}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Award className="w-4 h-4 text-secondary" />
          <span>{meal.xp} XP</span>
        </div>
        <Button
          onClick={() => onViewDetails(meal)}
          className="gradient-secondary text-white"
        >
          Ver Receita
        </Button>
      </div>
    </Card>
  );
};
