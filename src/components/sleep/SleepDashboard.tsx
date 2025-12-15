import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SleepRecord } from '@/types/sleep';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Moon, TrendingUp, Award, Clock } from 'lucide-react';

interface SleepDashboardProps {
  records: SleepRecord[];
  isLoading: boolean;
}

export function SleepDashboard({ records, isLoading }: SleepDashboardProps) {
  const stats = useMemo(() => {
    if (records.length === 0) {
      return {
        weekAverage: 0,
        bestNight: null,
        totalRecords: 0,
        averageQuality: 0,
        last7Days: [],
      };
    }

    // Last 7 days
    const last7Days = records.slice(0, 7).reverse();

    // Week average
    const weekTotal = last7Days.reduce((sum, record) => sum + record.duration_hours, 0);
    const weekAverage = weekTotal / last7Days.length;

    // Best night
    const bestNight = records.reduce((best, current) => 
      current.duration_hours > best.duration_hours ? current : best
    );

    // Average quality
    const totalQuality = records.reduce((sum, record) => sum + record.quality, 0);
    const averageQuality = totalQuality / records.length;

    // Chart data
    const chartData = last7Days.map(record => ({
      date: new Date(record.slept_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      hours: parseFloat(record.duration_hours.toFixed(1)),
      quality: record.quality,
    }));

    return {
      weekAverage,
      bestNight,
      totalRecords: records.length,
      averageQuality,
      last7Days: chartData,
    };
  }, [records]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Adicione registros de sono para ver suas estatísticas
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Semanal</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weekAverage.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Noite</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.bestNight?.duration_hours.toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.bestNight && new Date(stats.bestNight.slept_at).toLocaleDateString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecords}</div>
            <p className="text-xs text-muted-foreground">Noites registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualidade Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageQuality.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">Avaliação média</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Duração do Sono - Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.last7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Horas"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Qualidade do Sono - Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.last7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar 
                dataKey="quality" 
                fill="hsl(var(--primary))" 
                name="Qualidade"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
