import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Workout } from "@/data/mockWorkouts";
import { Clock, Dumbbell, Zap, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WorkoutModalProps {
  workout: Workout | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WorkoutModal = ({ workout, open, onOpenChange }: WorkoutModalProps) => {
  if (!workout) return null;

  const handleComplete = () => {
    toast.success(`Treino concluído! +${workout.xp} XP ganhos! 🎉`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <span className="text-3xl">
              {workout.type === "cardio" && "🏃"}
              {workout.type === "força" && "💪"}
              {workout.type === "HIIT" && "⚡"}
              {workout.type === "funcional" && "🎯"}
              {workout.type === "flexibilidade" && "🧘"}
            </span>
            {workout.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {workout.description}
          </DialogDescription>
        </DialogHeader>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <Clock className="w-5 h-5 text-primary mb-1" />
            <p className="text-xs text-muted-foreground">Duração</p>
            <p className="font-semibold">{workout.duration} min</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
            <Dumbbell className="w-5 h-5 text-secondary mb-1" />
            <p className="text-xs text-muted-foreground">Equipamento</p>
            <p className="font-semibold capitalize">{workout.equipment}</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <Zap className="w-5 h-5 text-primary mb-1" />
            <p className="text-xs text-muted-foreground">Intensidade</p>
            <p className="font-semibold capitalize">{workout.intensity}</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
            <Award className="w-5 h-5 text-secondary mb-1" />
            <p className="text-xs text-muted-foreground">Recompensa</p>
            <p className="font-semibold">{workout.xp} XP</p>
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Exercícios
          </h3>
          {workout.exercises.map((exercise, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-smooth"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{exercise.name}</h4>
                  <Badge variant="outline" className="mb-2">
                    {exercise.repsOrTime}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    💡 {exercise.tips}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleComplete}
          className="w-full gradient-primary text-white mt-4"
          size="lg"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Marcar como Concluído
        </Button>
      </DialogContent>
    </Dialog>
  );
};
