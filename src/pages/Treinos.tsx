import { useState } from "react";
import { mockWorkouts } from "@/data/mockWorkouts";
import { WorkoutCard } from "@/components/workouts/WorkoutCard";
import { WorkoutModal } from "@/components/workouts/WorkoutModal";
import { Dumbbell, Trophy, TrendingUp } from "lucide-react";
import type { Workout } from "@/data/mockWorkouts";

const Treinos = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (workout: Workout) => {
    setSelectedWorkout(workout);
    setModalOpen(true);
  };

  const totalXP = mockWorkouts.reduce((acc, w) => acc + w.xp, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Dumbbell className="w-8 h-8 text-primary" />
          Treinos
        </h1>
        <p className="text-muted-foreground">
          Escolha seu treino e alcance seus objetivos!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl gradient-primary text-white shadow-glow">
          <Trophy className="w-6 h-6 mb-2" />
          <p className="text-sm opacity-90">Total de Treinos</p>
          <p className="text-3xl font-bold">{mockWorkouts.length}</p>
        </div>
        <div className="p-4 rounded-xl gradient-secondary text-white">
          <TrendingUp className="w-6 h-6 mb-2" />
          <p className="text-sm opacity-90">XP Disponível</p>
          <p className="text-3xl font-bold">{totalXP}</p>
        </div>
        <div className="p-4 rounded-xl gradient-hero text-white">
          <Dumbbell className="w-6 h-6 mb-2" />
          <p className="text-sm opacity-90">Treinos desta Semana</p>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      {/* Workouts Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4">Todos os Treinos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <WorkoutModal
        workout={selectedWorkout}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Treinos;
