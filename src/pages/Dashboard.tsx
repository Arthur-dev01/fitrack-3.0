import { Footprints, Flame, Moon, Weight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { MotivationalCard } from "@/components/dashboard/MotivationalCard";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Bem-vindo de volta! 👋
        </h1>
        <p className="text-muted-foreground">
          Aqui está seu resumo de hoje
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Passos Hoje"
          value="8,547"
          subtitle="Meta: 10,000"
          icon={Footprints}
          gradient="primary"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Calorias Queimadas"
          value="2,340"
          subtitle="kcal"
          icon={Flame}
          gradient="secondary"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Horas de Sono"
          value="7.5h"
          subtitle="Última noite"
          icon={Moon}
          gradient="hero"
          trend={{ value: 5, positive: false }}
        />
        <StatCard
          title="Peso Atual"
          value="75.2"
          subtitle="kg"
          icon={Weight}
          gradient="primary"
          trend={{ value: 2, positive: true }}
        />
      </div>

      {/* Motivational Card */}
      <MotivationalCard />

      {/* Progress Chart */}
      <ProgressChart />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-dashed border-primary/50 bg-primary/5 flex flex-col items-center justify-center text-center hover:border-primary transition-smooth cursor-pointer group">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-bounce">
            <Footprints className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">
            Registrar Atividade
          </h4>
          <p className="text-sm text-muted-foreground">
            Adicione um novo treino
          </p>
        </div>

        <div className="p-6 rounded-xl border border-dashed border-secondary/50 bg-secondary/5 flex flex-col items-center justify-center text-center hover:border-secondary transition-smooth cursor-pointer group">
          <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-bounce">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">
            Registrar Refeição
          </h4>
          <p className="text-sm text-muted-foreground">
            Acompanhe sua nutrição
          </p>
        </div>

        <div className="p-6 rounded-xl border border-dashed border-primary/50 bg-primary/5 flex flex-col items-center justify-center text-center hover:border-primary transition-smooth cursor-pointer group">
          <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center mb-3 group-hover:scale-110 transition-bounce">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">
            Registrar Sono
          </h4>
          <p className="text-sm text-muted-foreground">
            Monitore sua qualidade de sono
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
