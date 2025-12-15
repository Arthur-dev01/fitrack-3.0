import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Meal } from "@/data/mockMeals";
import { Flame, Award, Lightbulb, ChefHat, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface MealModalProps {
  meal: Meal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MealModal = ({ meal, open, onOpenChange }: MealModalProps) => {
  if (!meal) return null;

  const handleComplete = () => {
    toast.success(`Refeição registrada! +${meal.xp} XP ganhos! 🎉`);
    onOpenChange(false);
  };

  const totalMacros = meal.macros.protein + meal.macros.carbs + meal.macros.fats;
  const proteinPercent = (meal.macros.protein / totalMacros) * 100;
  const carbsPercent = (meal.macros.carbs / totalMacros) * 100;
  const fatsPercent = (meal.macros.fats / totalMacros) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <span className="text-3xl">
              {meal.category === "café da manhã" && "🌅"}
              {meal.category === "almoço" && "🍽️"}
              {meal.category === "jantar" && "🌙"}
              {meal.category === "lanche" && "🥤"}
            </span>
            {meal.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {meal.motivation}
          </DialogDescription>
        </DialogHeader>

        {/* Calories & XP */}
        <div className="flex gap-3 my-4">
          <div className="flex-1 p-4 rounded-lg gradient-secondary text-white">
            <Flame className="w-5 h-5 mb-1" />
            <p className="text-sm opacity-90">Calorias</p>
            <p className="text-2xl font-bold">{meal.calories}</p>
          </div>
          <div className="flex-1 p-4 rounded-lg gradient-primary text-white">
            <Award className="w-5 h-5 mb-1" />
            <p className="text-sm opacity-90">Recompensa</p>
            <p className="text-2xl font-bold">{meal.xp} XP</p>
          </div>
        </div>

        {/* Macros Distribution */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-bold">Distribuição de Macronutrientes</h3>
          
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-medium text-primary">Proteína</span>
              <span>{meal.macros.protein}g ({proteinPercent.toFixed(0)}%)</span>
            </div>
            <Progress value={proteinPercent} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-medium text-secondary">Carboidratos</span>
              <span>{meal.macros.carbs}g ({carbsPercent.toFixed(0)}%)</span>
            </div>
            <Progress value={carbsPercent} className="h-2 [&>div]:bg-secondary" />
          </div>

          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-medium">Gorduras</span>
              <span>{meal.macros.fats}g ({fatsPercent.toFixed(0)}%)</span>
            </div>
            <Progress value={fatsPercent} className="h-2 [&>div]:bg-muted-foreground" />
          </div>

          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Fibras</span>
              <span className="text-primary font-bold">{meal.macros.fiber}g</span>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            Ingredientes
          </h3>
          <ul className="space-y-2">
            {meal.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm p-2 rounded bg-muted/30"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Prep Tips */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-secondary" />
            Dicas de Preparo
          </h3>
          <ul className="space-y-2">
            {meal.prepTips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm p-3 rounded-lg bg-secondary/5 border border-secondary/20"
              >
                <span className="text-secondary font-bold">{index + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Substitution */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
          <p className="text-sm font-medium mb-1">💡 Substituição Saudável</p>
          <p className="text-sm text-muted-foreground">{meal.substitution}</p>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleComplete}
          className="w-full gradient-secondary text-white"
          size="lg"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Registrar Refeição
        </Button>
      </DialogContent>
    </Dialog>
  );
};
