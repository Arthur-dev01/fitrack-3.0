import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Seg", steps: 8500, calories: 2200 },
  { day: "Ter", steps: 10200, calories: 2400 },
  { day: "Qua", steps: 9800, calories: 2300 },
  { day: "Qui", steps: 12000, calories: 2600 },
  { day: "Sex", steps: 11500, calories: 2500 },
  { day: "Sáb", steps: 9000, calories: 2100 },
  { day: "Dom", steps: 7500, calories: 1900 },
];

export const ProgressChart = () => {
  return (
    <Card className="p-6 shadow-card animate-fade-in-up">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-1">
          Atividade Semanal
        </h3>
        <p className="text-sm text-muted-foreground">
          Acompanhe seu progresso diário
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="day"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="steps"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="hsl(var(--secondary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--secondary))", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Passos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-muted-foreground">Calorias</span>
        </div>
      </div>
    </Card>
  );
};
