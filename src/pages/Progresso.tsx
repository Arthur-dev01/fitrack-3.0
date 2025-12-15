import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, Flame, Moon, Apple, Dumbbell } from "lucide-react";

// Mock data para diferentes períodos
const weeklyData = [
  { day: "Seg", treinos: 2, calorias: 2200, sono: 7, peso: 75.5 },
  { day: "Ter", treinos: 1, calorias: 2400, sono: 6.5, peso: 75.4 },
  { day: "Qua", treinos: 2, calorias: 2100, sono: 8, peso: 75.3 },
  { day: "Qui", treinos: 1, calorias: 2300, sono: 7.5, peso: 75.2 },
  { day: "Sex", treinos: 3, calorias: 2500, sono: 7, peso: 75.1 },
  { day: "Sáb", treinos: 2, calorias: 2800, sono: 9, peso: 75.3 },
  { day: "Dom", treinos: 1, calorias: 2200, sono: 8.5, peso: 75.2 },
];

const monthlyData = [
  { week: "Sem 1", treinos: 8, calorias: 15400, sono: 7.2, peso: 76.2 },
  { week: "Sem 2", treinos: 10, calorias: 16200, sono: 7.5, peso: 75.8 },
  { week: "Sem 3", treinos: 9, calorias: 15800, sono: 7.8, peso: 75.4 },
  { week: "Sem 4", treinos: 12, calorias: 16500, sono: 7.6, peso: 75.1 },
];

const performanceData = [
  { area: "Treinos", score: 85, max: 100 },
  { area: "Nutrição", score: 78, max: 100 },
  { area: "Sono", score: 92, max: 100 },
  { area: "Consistência", score: 88, max: 100 },
  { area: "Intensidade", score: 75, max: 100 },
];

const Progresso = () => {
  const [period, setPeriod] = useState("week");
  const data = period === "week" ? weeklyData : monthlyData;
  const xAxisKey = period === "week" ? "day" : "week";

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Progresso
          </h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe sua evolução em todas as áreas
          </p>
        </div>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Última Semana</SelectItem>
            <SelectItem value="month">Último Mês</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-scale border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Treinos</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.reduce((acc, d) => acc + d.treinos, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {period === "week" ? "nos últimos 7 dias" : "nas últimas 4 semanas"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calorias Médias</CardTitle>
            <Flame className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(data.reduce((acc, d) => acc + d.calorias, 0) / data.length)}
            </div>
            <p className="text-xs text-muted-foreground">kcal por dia</p>
          </CardContent>
        </Card>

        <Card className="hover-scale border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sono Médio</CardTitle>
            <Moon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(data.reduce((acc, d) => acc + d.sono, 0) / data.length).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">por noite</p>
          </CardContent>
        </Card>

        <Card className="hover-scale border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Variação de Peso</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(data[data.length - 1].peso - data[0].peso).toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">
              {data[data.length - 1].peso < data[0].peso ? "⬇️ Redução" : "⬆️ Ganho"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs com Gráficos */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="workouts">Treinos</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrição</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Geral</CardTitle>
              <CardDescription>
                Acompanhe todas as métricas em um único gráfico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTreinos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSono" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey={xAxisKey} className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="treinos"
                    name="Treinos"
                    stroke="hsl(var(--primary))"
                    fill="url(#colorTreinos)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="sono"
                    name="Sono (h)"
                    stroke="hsl(var(--accent))"
                    fill="url(#colorSono)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Treinos */}
        <TabsContent value="workouts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequência de Treinos</CardTitle>
                <CardDescription>Treinos realizados por período</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey={xAxisKey} className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="treinos"
                      fill="hsl(var(--primary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução de Peso</CardTitle>
                <CardDescription>Acompanhamento do peso corporal</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey={xAxisKey} className="text-xs" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="peso"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Nutrição */}
        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consumo Calórico</CardTitle>
              <CardDescription>Calorias consumidas ao longo do período</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCalorias" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey={xAxisKey} className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="calorias"
                    name="Calorias"
                    stroke="hsl(var(--secondary))"
                    fill="url(#colorCalorias)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Performance</CardTitle>
              <CardDescription>
                Avaliação multidimensional do seu desempenho
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="area"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                  <Radar
                    name="Performance"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.5}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progresso;
