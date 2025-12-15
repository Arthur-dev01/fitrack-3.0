import { Dumbbell, Clock, Zap, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Workout } from "@/data/mockWorkouts";
import { cn } from "@/lib/utils";

interface WorkoutCardProps {
  workout: Workout;
  onViewDetails: (workout: Workout) => void;
}

const intensityColors = {
  leve: "bg-green-500/10 text-green-600 dark:text-green-400",
  moderada: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  intensa: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const typeIcons = {
  cardio: "🏃",
  força: "💪",
  HIIT: "⚡",
  funcional: "🎯",
  flexibilidade: "🧘",
};

export const WorkoutCard = ({ workout, onViewDetails }: WorkoutCardProps) => {
  return (
    <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{typeIcons[workout.type]}</div>
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-smooth">
              {workout.name}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {workout.type}
            </p>
          </div>
        </div>
        <Badge className={cn("capitalize", intensityColors[workout.intensity])}>
          {workout.intensity}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {workout.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span>{workout.duration} min</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Dumbbell className="w-4 h-4 text-primary" />
          <span className="capitalize">{workout.equipment}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-secondary" />
          <span>{workout.exercises.length} exercícios</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Award className="w-4 h-4 text-secondary" />
          <span>{workout.xp} XP</span>
        </div>
      </div>

      <Button
        onClick={() => onViewDetails(workout)}
        className="w-full gradient-primary text-white"
      >
        Ver Detalhes
      </Button>
    </Card>
  );
};
